// Tipos base do React Flow
import { Node, Edge } from 'reactflow';
import { NodeExecutionResult, NodeExecutionStatus } from './execution/types';


// ========================================
// Node Data Types
// ========================================

export enum NodeType {
  TRIGGER = 'trigger',
  LLM = 'llm',
  HTTP = 'http',
  CONDITION = 'condition',
  OUTPUT = 'output',
}

// Base para todos os nodes
export interface BaseNodeData {
  label: string;
  description?: string;
}

// Trigger Node - Input do workflow
export interface TriggerNodeData extends BaseNodeData {
  triggerType: 'manual' | 'webhook' | 'schedule';
  config?: {
    webhookUrl?: string;
    schedule?: string; // cron expression
  };
}

// LLM Node - Chamada para modelo de IA
export interface LLMNodeData extends BaseNodeData {
  provider: 'openai' | 'anthropic' | 'azure';
  model: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

// HTTP Node - Request HTTP
export interface HTTPNodeData extends BaseNodeData {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: string;
}

// Condition Node - Lógica condicional
export interface ConditionNodeData extends BaseNodeData {
  condition: string; // expressão JavaScript
  paths: {
    true: string;  // label do caminho true
    false: string; // label do caminho false
  };
}

// Output Node - Saída do workflow
export interface OutputNodeData extends BaseNodeData {
  outputType: 'json' | 'text' | 'webhook';
  destination?: string;
}

// Union type para todos os node data types
export type WorkflowNodeData =
  | TriggerNodeData
  | LLMNodeData
  | HTTPNodeData
  | ConditionNodeData
  | OutputNodeData;

// ========================================
// Workflow Types
// ========================================

export interface WorkflowNode extends Node {
  type: NodeType;
  data: WorkflowNodeData;
}

export interface WorkflowEdge extends Edge {
  animated?: boolean;
  label?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: Date;
  updatedAt: Date;
}

// ========================================
// Execution Types (para quando formos executar)
// ========================================

export interface ExecutionContext {
  workflowId: string;
  variables: Record<string, any>;
  currentNodeId: string;
}

export interface ExecutionResult {
  success: boolean;
  data?: any;
  error?: string;
}

export interface BaseNodeDataWithExecution extends BaseNodeData {
  executionStatus?: NodeExecutionStatus;
  executionResult?: NodeExecutionResult;
}

import { useState, useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import { WorkflowExecutor } from '@/lib/workflow/execution/executor';
import {
  WorkflowExecutionResult,
  ExecutionStatus,
  ExecutionConfig,
} from '@/lib/workflow/execution/types';

export function useWorkflowExecution() {
  const { getNodes, getEdges, setNodes } = useReactFlow();
  const [executionResult, setExecutionResult] = useState<WorkflowExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // ========================================
  // Executar Workflow
  // ========================================
  const executeWorkflow = useCallback(
    async (config?: Partial<ExecutionConfig>) => {
      setIsExecuting(true);
      setExecutionResult(null);

      try {
        const nodes = getNodes();
        const edges = getEdges();

        console.log('🚀 Starting workflow execution with', nodes.length, 'nodes');

        // Resetar estado visual dos nodes
        setNodes((nodes) =>
          nodes.map((node) => ({
            ...node,
            data: {
              ...node.data,
              executionStatus: undefined,
            },
          }))
        );

        // Criar executor
        const executor = new WorkflowExecutor(nodes, edges, {
          mode: 'test', // Modo teste (simulado)
          ...config,
        });

        // Executar
        const result = await executor.execute();
        setExecutionResult(result);

        // Atualizar visual dos nodes com resultados
        updateNodesWithResults(result);

        return result;
      } catch (error) {
        console.error('❌ Execution failed:', error);
        throw error;
      } finally {
        setIsExecuting(false);
      }
    },
    [getNodes, getEdges, setNodes]
  );

  // ========================================
  // Atualizar visual dos nodes
  // ========================================
  const updateNodesWithResults = useCallback(
    (result: WorkflowExecutionResult) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          const nodeResult = result.nodeResults.find((r) => r.nodeId === node.id);
          if (!nodeResult) {
            return node;
          }

          return {
            ...node,
            data: {
              ...node.data,
              executionStatus: nodeResult.status,
              executionResult: nodeResult,
            },
          };
        })
      );
    },
    [setNodes]
  );

  // ========================================
  // Limpar resultados
  // ========================================
  const clearResults = useCallback(() => {
    setExecutionResult(null);
    setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          executionStatus: undefined,
          executionResult: undefined,
        },
      }))
    );
  }, [setNodes]);

  return {
    executeWorkflow,
    clearResults,
    executionResult,
    isExecuting,
  };
}


export interface BaseNodeDataWithExecution extends BaseNodeData {
  executionStatus?: NodeExecutionStatus;
  executionResult?: NodeExecutionResult;
}

// Re-exportar types com execução
export interface TriggerNodeDataWithExecution extends TriggerNodeData, BaseNodeDataWithExecution {}
export interface LLMNodeDataWithExecution extends LLMNodeData, BaseNodeDataWithExecution {}
export interface HTTPNodeDataWithExecution extends HTTPNodeData, BaseNodeDataWithExecution {}
export interface ConditionNodeDataWithExecution extends ConditionNodeData, BaseNodeDataWithExecution {}
export interface OutputNodeDataWithExecution extends OutputNodeData, BaseNodeDataWithExecution {}
