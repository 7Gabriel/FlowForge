import { ExecutionContext } from './types';

// ========================================
// Avaliar expressões JavaScript com segurança
// ========================================

export function evaluateCondition(
  expression: string,
  context: ExecutionContext
): boolean {
  try {
    // Criar contexto seguro com variáveis disponíveis
    const safeContext = {
      // Variáveis globais
      ...context.variables,
      
      // Helper: Acessar resultado de node anterior
      getNodeResult: (nodeId: string) => {
        return context.nodeResults.get(nodeId)?.output;
      },
      
      // Helper: Verificar se node foi executado
      hasNodeResult: (nodeId: string) => {
        return context.nodeResults.has(nodeId);
      },
    };

    // Criar função que avalia a expressão
    // IMPORTANTE: Usar Function constructor é perigoso em produção
    // Em produção real, usar biblioteca como expr-eval ou vm2
    const func = new Function(
      ...Object.keys(safeContext),
      `return (${expression});`
    );

    // Executar com valores do contexto
    const result = func(...Object.values(safeContext));

    return Boolean(result);
  } catch (error) {
    console.error('❌ Failed to evaluate condition:', error);
    throw new Error(`Invalid condition expression: ${expression}`);
  }
}

// ========================================
// Substituir variáveis em strings (template)
// ========================================

export function interpolateVariables(
  text: string,
  context: ExecutionContext
): string {
  // Substituir {{variableName}} por valor real
  return text.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
    if (varName in context.variables) {
      return String(context.variables[varName]);
    }
    return match; // Manter original se não encontrar
  });
}

// ========================================
// Extrair variáveis de um resultado
// ========================================

export function extractVariables(data: any): Record<string, any> {
  const variables: Record<string, any> = {};

  if (typeof data === 'object' && data !== null) {
    // Se for objeto, achatar para variáveis simples
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value !== 'object') {
        variables[key] = value;
      } else {
        // Para objetos aninhados, usar JSON
        variables[key] = value;
      }
    });
  } else {
    // Para valores primitivos, usar como 'result'
    variables.result = data;
  }

  return variables;
}