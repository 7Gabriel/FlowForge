import { Node } from 'reactflow';
import { NodeHandler, ExecutionContext, NodeExecutionResult, NodeExecutionStatus } from '../types';
import { HTTPNodeData } from '../../types';
import { interpolateVariables } from '../evaluator';

export class HTTPHandler implements NodeHandler {
  async execute(node: Node<HTTPNodeData>, context: ExecutionContext): Promise<NodeExecutionResult> {
    const startTime = Date.now();
    const logs: string[] = [];

    try {
      const url = interpolateVariables(node.data.url, context);
      logs.push(`Making ${node.data.method} request to: ${url}`);

      let body = node.data.body;
      if (body) {
        body = interpolateVariables(body, context);
      }

      const headers = {
        'Content-Type': 'application/json',
        ...node.data.headers,
      };

      const response = await fetch(url, {
        method: node.data.method,
        headers,
        body: body && (node.data.method === 'POST' || node.data.method === 'PUT') ? body : undefined,
      });

      logs.push(`Response status: ${response.status}`);

      let output: any;
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        output = await response.json();
      } else {
        output = await response.text();
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
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