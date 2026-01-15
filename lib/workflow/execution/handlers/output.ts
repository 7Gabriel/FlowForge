import { Node } from 'reactflow';
import { NodeHandler, ExecutionContext, NodeExecutionResult, NodeExecutionStatus } from '../types';
import { OutputNodeData } from '../../types';

export class OutputHandler implements NodeHandler {  // ⚠️ Adicionar export
  async execute(node: Node<OutputNodeData>, context: ExecutionContext): Promise<NodeExecutionResult> {
    const startTime = Date.now();
    const logs: string[] = [];

    try {
      const collectedData: Record<string, any> = {};
      
      context.nodeResults.forEach((result, nodeId) => {
        if (result.output) {
          collectedData[nodeId] = result.output;
        }
      });

      logs.push(`Output type: ${node.data.outputType}`);
      logs.push(`Destination: ${node.data.destination || 'none'}`);

      const output = {
        outputType: node.data.outputType,
        destination: node.data.destination,
        data: collectedData,
        timestamp: new Date().toISOString(),
      };

      if (node.data.outputType === 'webhook' && node.data.destination) {
        logs.push(`Sending to webhook: ${node.data.destination}`);
      }

      return {
        nodeId: node.id,
        nodeType: node.type!,
        status: NodeExecutionStatus.SUCCESS,
        startTime,
        endTime: Date.now(),
        duration: Date.now() - startTime,
        output,
        logs,
      };
    } catch (error: any) {
      logs.push(`Error: ${error.message}`);
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
        logs,
      };
    }
  }
}