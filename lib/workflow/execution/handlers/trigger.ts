import { Node } from 'reactflow';
import { NodeHandler, ExecutionContext, NodeExecutionResult, NodeExecutionStatus } from '../types';
import { TriggerNodeData } from '../../types';

export class TriggerHandler implements NodeHandler {
  async execute(node: Node<TriggerNodeData>, context: ExecutionContext): Promise<NodeExecutionResult> {
    const startTime = Date.now();
    
    try {
      const output = {
        triggeredAt: new Date().toISOString(),
        triggerType: node.data.triggerType,
      };

      return {
        nodeId: node.id,
        nodeType: node.type!,
        status: NodeExecutionStatus.SUCCESS,
        startTime,
        endTime: Date.now(),
        duration: Date.now() - startTime,
        output,
        logs: [`Trigger activated: ${node.data.triggerType}`],
      };
    } catch (error: any) {
      return {
        nodeId: node.id,
        nodeType: node.type!,
        status: NodeExecutionStatus.ERROR,
        startTime,
        endTime: Date.now(),
        duration: Date.now() - startTime,
        error: {
          message: error.message,
          stack: error.stack,
        },
      };
    }
  }
}