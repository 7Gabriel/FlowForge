import { Node, Edge } from 'reactflow';
import {
  ExecutionContext,
  ExecutionConfig,
  WorkflowExecutionResult,
  NodeExecutionResult,
  ExecutionStatus,
  NodeExecutionStatus,
  NodeHandler,
} from './types';
import { TriggerHandler } from './handlers/trigger';
import { HTTPHandler } from './handlers/http';
import { LLMHandler } from './handlers/llm';
import { ConditionHandler } from './handlers/condition';
import { OutputHandler } from './handlers/output';
import { extractVariables } from './evaluator';

// ========================================
// Registry de Handlers (usando string literals)
// ========================================

const handlerRegistry: Record<string, NodeHandler> = {
  'trigger': new TriggerHandler(),
  'http': new HTTPHandler(),
  'llm': new LLMHandler(),
  'condition': new ConditionHandler(),
  'output': new OutputHandler(),
};

// ========================================
// Workflow Executor
// ========================================

export class WorkflowExecutor {
  private nodes: Node[];
  private edges: Edge[];
  private context: ExecutionContext;

  constructor(
    nodes: Node[],
    edges: Edge[],
    config: Partial<ExecutionConfig> = {}
  ) {
    this.nodes = nodes;
    this.edges = edges;

    this.context = {
      variables: {},
      nodeResults: new Map(),
      workflowId: `wf_${Date.now()}`,
      executionId: `exec_${Date.now()}`,
      startTime: Date.now(),
      config: {
        mode: 'test',
        nodeTimeout: 30000,
        allowParallel: false,
        ...config,
      },
    };
  }

  async execute(): Promise<WorkflowExecutionResult> {
    console.log('🚀 Starting workflow execution...');

    try {
      const startNode = this.findStartNode();
      if (!startNode) {
        throw new Error('No trigger node found');
      }

      await this.executeFromNode(startNode.id);

      const stats = this.calculateStats();
      const finalOutput = this.getFinalOutput();

      const result: WorkflowExecutionResult = {
        executionId: this.context.executionId,
        status: stats.errorNodes > 0 ? ExecutionStatus.ERROR : ExecutionStatus.SUCCESS,
        startTime: this.context.startTime,
        endTime: Date.now(),
        duration: Date.now() - this.context.startTime,
        nodeResults: Array.from(this.context.nodeResults.values()),
        finalOutput,
        stats,
      };

      console.log('✅ Workflow execution completed:', result);
      return result;

    } catch (error: any) {
      console.error('❌ Workflow execution failed:', error);

      const result: WorkflowExecutionResult = {
        executionId: this.context.executionId,
        status: ExecutionStatus.ERROR,
        startTime: this.context.startTime,
        endTime: Date.now(),
        duration: Date.now() - this.context.startTime,
        nodeResults: Array.from(this.context.nodeResults.values()),
        stats: this.calculateStats(),
      };

      return result;
    }
  }

  private async executeFromNode(nodeId: string): Promise<void> {
    const node = this.nodes.find((n) => n.id === nodeId);
    if (!node) {
      console.warn(`Node ${nodeId} not found`);
      return;
    }

    if (this.context.nodeResults.has(nodeId)) {
      console.log(`Node ${nodeId} already executed, skipping`);
      return;
    }

    console.log(`▶️  Executing node: ${nodeId} (${node.type})`);

    const handler = handlerRegistry[node.type as string]; // ⚠️ Cast para string
    if (!handler) {
      throw new Error(`No handler found for node type: ${node.type}`);
    }

    const result = await handler.execute(node, this.context);
    this.context.nodeResults.set(nodeId, result);

    if (result.status === NodeExecutionStatus.SUCCESS && result.output) {
      const newVariables = extractVariables(result.output);
      this.context.variables = {
        ...this.context.variables,
        ...newVariables,
      };
    }

    if (result.status === NodeExecutionStatus.ERROR) {
      console.error(`❌ Node ${nodeId} failed:`, result.error);
      return;
    }

    const nextNodes = this.getNextNodes(nodeId, result);

    for (const nextNodeId of nextNodes) {
      await this.executeFromNode(nextNodeId);
    }
  }

  private getNextNodes(nodeId: string, result: NodeExecutionResult): string[] {
    const outgoingEdges = this.edges.filter((edge) => edge.source === nodeId);

    if (result.output?.conditionResult !== undefined) {
      const targetHandle = result.output.conditionResult ? 'true' : 'false';
      return outgoingEdges
        .filter((edge) => edge.sourceHandle === targetHandle)
        .map((edge) => edge.target);
    }

    return outgoingEdges.map((edge) => edge.target);
  }

  private findStartNode(): Node | undefined {
    return this.nodes.find((node) => node.type === 'trigger'); // ⚠️ String literal
  }

  private calculateStats() {
    const results = Array.from(this.context.nodeResults.values());
    return {
      totalNodes: this.nodes.length,
      successNodes: results.filter((r) => r.status === NodeExecutionStatus.SUCCESS).length,
      errorNodes: results.filter((r) => r.status === NodeExecutionStatus.ERROR).length,
      skippedNodes: this.nodes.length - results.length,
    };
  }

  private getFinalOutput(): any {
    const outputResults = Array.from(this.context.nodeResults.values())
      .filter((r) => r.nodeType === 'output') // ⚠️ String literal
      .sort((a, b) => (b.endTime || 0) - (a.endTime || 0));

    return outputResults[0]?.output;
  }
}