import { Node } from 'reactflow';
import { NodeHandler, ExecutionContext, NodeExecutionResult, NodeExecutionStatus } from '../types';
import { LLMNodeData } from '../../types';
import { interpolateVariables } from '../evaluator';

export class LLMHandler implements NodeHandler {
  async execute(node: Node<LLMNodeData>, context: ExecutionContext): Promise<NodeExecutionResult> {
    const startTime = Date.now();
    const logs: string[] = [];

    try {
      const prompt = interpolateVariables(node.data.prompt, context);
      logs.push(`Provider: ${node.data.provider}`);
      logs.push(`Model: ${node.data.model}`);
      logs.push(`Prompt length: ${prompt.length} chars`);

      const apiKey = context.config.apiKeys?.[node.data.provider];
      
      if (!apiKey && context.config.mode === 'production') {
        throw new Error(`API key for ${node.data.provider} not configured`);
      }

      // SIMULAÇÃO: Em produção real, fazer chamada real
      if (context.config.mode === 'test') {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));

        const output = {
          response: `[SIMULATED RESPONSE]\n\nThis is a simulated response from ${node.data.model}.\n\nPrompt received: ${prompt.substring(0, 100)}...`,
          model: node.data.model,
          provider: node.data.provider,
          usage: {
            prompt_tokens: Math.floor(prompt.length / 4),
            completion_tokens: 50,
            total_tokens: Math.floor(prompt.length / 4) + 50,
          },
        };

        logs.push('Simulated LLM call completed');

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
      }

      // PRODUÇÃO: Fazer chamada real (exemplo com OpenAI)
      if (node.data.provider === 'openai') {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: node.data.model,
            messages: [{ role: 'user', content: prompt }],
            temperature: node.data.temperature || 0.7,
            max_tokens: node.data.maxTokens || 1000,
          }),
        });

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        const output = {
          response: data.choices[0].message.content,
          model: node.data.model,
          provider: node.data.provider,
          usage: data.usage,
        };

        logs.push('OpenAI API call completed');

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
      }

      throw new Error(`Provider ${node.data.provider} not implemented`);

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