import { ExecutionContext } from './types';

export function evaluateCondition(
  expression: string,
  context: ExecutionContext
): boolean {
  try {
  
    const safeContext = {
  
      ...context.variables,
      
      getNodeResult: (nodeId: string) => {
        return context.nodeResults.get(nodeId)?.output;
      },
      
      hasNodeResult: (nodeId: string) => {
        return context.nodeResults.has(nodeId);
      },
    };


    const func = new Function(
      ...Object.keys(safeContext),
      `return (${expression});`
    );

    const result = func(...Object.values(safeContext));

    return Boolean(result);
  } catch (error) {
    console.error('❌ Failed to evaluate condition:', error);
    throw new Error(`Invalid condition expression: ${expression}`);
  }
}


export function interpolateVariables(
  text: string,
  context: ExecutionContext
): string {

  return text.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
    if (varName in context.variables) {
      return String(context.variables[varName]);
    }
    return match;
  });
}


export function extractVariables(data: any): Record<string, any> {
  const variables: Record<string, any> = {};

  if (typeof data === 'object' && data !== null) {
   
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value !== 'object') {
        variables[key] = value;
      } else {
       
        variables[key] = value;
      }
    });
  } else {
    variables.result = data;
  }

  return variables;
}