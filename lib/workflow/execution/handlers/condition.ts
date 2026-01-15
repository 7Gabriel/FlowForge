import { Node } from 'reactflow';
import { NodeHandler, ExecutionContext, NodeExecutionResult, NodeExecutionStatus } from '../types';
import { ConditionNodeData } from '../../types';
import { evaluateCondition } from '../evaluator';

export class ConditionHandler implements NodeHandler {  // ⚠️ Adicionar export
  async execute(node: Node<ConditionNodeData>, context: ExecutionContext): Promise<NodeExecutionResult> {
    const startTime = Date.now();
    const logs: string[] = [];

    try {
      logs.push(`Evaluating condition: ${node.data.condition}`);

      const result = evaluateCondition(node.data.condition, context);

      logs.push(`Condition result: ${result ? 'TRUE' : 'FALSE'}`);

      const output = {
        conditionResult: result,
        conditionExpression: node.data.condition,
        path: result ? 'true' : 'false',
      };

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