import { Node } from 'reactflow';

// ========================================
// Execution Status
// ========================================

export enum ExecutionStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  SUCCESS = 'success',
  ERROR = 'error',
  PAUSED = 'paused',
}

export enum NodeExecutionStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  SUCCESS = 'success',
  ERROR = 'error',
  SKIPPED = 'skipped',
}

// ========================================
// Execution Context (dados compartilhados)
// ========================================

export interface ExecutionContext {
  // Variáveis globais do workflow
  variables: Record<string, any>;
  
  // Resultados de cada node (por ID)
  nodeResults: Map<string, NodeExecutionResult>;
  
  // Metadata da execução
  workflowId: string;
  executionId: string;
  startTime: number;
  
  // Configurações
  config: ExecutionConfig;
}

export interface ExecutionConfig {
  // Timeout por node (ms)
  nodeTimeout?: number;
  
  // Permitir execução paralela
  allowParallel?: boolean;
  
  // API Keys (para LLM, APIs externas)
  apiKeys?: {
    openai?: string;
    anthropic?: string;
    [key: string]: string | undefined;
  };
  
  // Modo de execução
  mode: 'test' | 'production';
}

// ========================================
// Node Execution Result
// ========================================

export interface NodeExecutionResult {
  nodeId: string;
  nodeType: string;
  status: NodeExecutionStatus;
  startTime: number;
  endTime?: number;
  duration?: number;
  
  // Dados de saída
  output?: any;
  
  // Logs
  logs?: string[];
  
  // Erro (se houver)
  error?: {
    message: string;
    stack?: string;
    code?: string;
  };
}

// ========================================
// Workflow Execution Result
// ========================================

export interface WorkflowExecutionResult {
  executionId: string;
  status: ExecutionStatus;
  startTime: number;
  endTime?: number;
  duration?: number;
  
  // Resultados de cada node
  nodeResults: NodeExecutionResult[];
  
  // Output final do workflow
  finalOutput?: any;
  
  // Estatísticas
  stats: {
    totalNodes: number;
    successNodes: number;
    errorNodes: number;
    skippedNodes: number;
  };
}

// ========================================
// Node Handler Interface
// ========================================

export interface NodeHandler {
  execute(
    node: Node,
    context: ExecutionContext
  ): Promise<NodeExecutionResult>;
}