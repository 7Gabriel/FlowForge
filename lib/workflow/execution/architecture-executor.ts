import { Node, Edge } from 'reactflow';

export interface ArchitectureExecutionStep {
  nodeId: string;
  nodeName: string;
  nodeType: string;
  status: 'pending' | 'executing' | 'success' | 'error';
  timestamp: number;
  message?: string;
}

export interface ArchitectureExecutionResult {
  success: boolean;
  steps: ArchitectureExecutionStep[];
  totalDuration: number;
  error?: string;
}

export class ArchitectureExecutor {
  async execute(
    nodes: Node[],
    edges: Edge[],
    onStepUpdate?: (step: ArchitectureExecutionStep) => void,
    onNodeHighlight?: (nodeId: string, status: 'executing' | 'success' | 'error' | null) => void,
    onEdgeHighlight?: (edgeId: string, highlight: boolean) => void
  ): Promise<ArchitectureExecutionResult> {
    const startTime = Date.now();
    const steps: ArchitectureExecutionStep[] = [];

    try {
      console.log('🎬 Starting Architecture Execution');

      const startNode = this.findStartNode(nodes);
      
      if (!startNode) {
        throw new Error('No starting node found. Add a Person or User node.');
      }

      const executionOrder = this.getExecutionOrder(startNode, nodes, edges);
     
      for (let i = 0; i < executionOrder.length; i++) {
        const node = executionOrder[i];
        const nextNode = executionOrder[i + 1];

 
        if (onNodeHighlight) {
          onNodeHighlight(node.id, 'executing');
        }

        const step: ArchitectureExecutionStep = {
          nodeId: node.id,
          nodeName: node.data?.label || 'Unknown',
          nodeType: node.type || 'unknown',
          status: 'executing',
          timestamp: Date.now(),
          message: `Processing ${node.data?.label || 'node'}...`,
        };

        steps.push(step);
        if (onStepUpdate) onStepUpdate(step);

        await this.delay(800);

       
        step.status = 'success';
        step.message = `✅ ${node.data?.label || 'Node'} completed`;
        if (onStepUpdate) onStepUpdate(step);
        if (onNodeHighlight) {
          onNodeHighlight(node.id, 'success');
        }

        
        if (nextNode && onEdgeHighlight) {
          const connectingEdge = edges.find(
            e => e.source === node.id && e.target === nextNode.id
          );
          
          if (connectingEdge) {
            onEdgeHighlight(connectingEdge.id, true);
            await this.delay(400);
            onEdgeHighlight(connectingEdge.id, false);
          }
        }

        
        await this.delay(200);
      }

      const totalDuration = Date.now() - startTime;

      
      await this.delay(1000);
      if (onNodeHighlight) {
        executionOrder.forEach(node => onNodeHighlight(node.id, null));
      }

      return {
        success: true,
        steps,
        totalDuration,
      };
    } catch (error) {
      console.error('❌ Architecture execution failed:', error);
      
      const totalDuration = Date.now() - startTime;
      
      return {
        success: false,
        steps,
        totalDuration,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private findStartNode(nodes: Node[]): Node | null {
    const personNode = nodes.find(n => 
      n.type === 'person' || 
      n.data?.category === 'user' ||
      n.data?.label?.toLowerCase().includes('user') ||
      n.data?.label?.toLowerCase().includes('person')
    );
    
    if (personNode) return personNode;

    const externalNode = nodes.find(n => n.type === 'external-system');
    if (externalNode) return externalNode;

    return nodes[0] || null;
  }

  private getExecutionOrder(startNode: Node, nodes: Node[], edges: Edge[]): Node[] {
    const visited = new Set<string>();
    const order: Node[] = [];

    const visit = (nodeId: string) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);

      const node = nodes.find(n => n.id === nodeId);
      if (!node) return;

      order.push(node);

      const outgoingEdges = edges.filter(e => e.source === nodeId);
      
      for (const edge of outgoingEdges) {
        visit(edge.target);
      }
    };

    visit(startNode.id);

    return order;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}