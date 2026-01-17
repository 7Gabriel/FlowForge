import { Node } from 'reactflow';


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


export interface ExecutionContext {

  variables: Record<string, any>;
  

  nodeResults: Map<string, NodeExecutionResult>;
  

  workflowId: string;
  executionId: string;
  startTime: number;
  

  config: ExecutionConfig;
}

export interface ExecutionConfig {

  nodeTimeout?: number;
  

  allowParallel?: boolean;
  

  apiKeys?: {
    openai?: string;
    anthropic?: string;
    [key: string]: string | undefined;
  };
  

  mode: 'test' | 'production';
}



export interface NodeExecutionResult {
  nodeId: string;
  nodeType: string;
  status: NodeExecutionStatus;
  startTime: number;
  endTime?: number;
  duration?: number;
  
  
  output?: any;
  
  
  logs?: string[];
  

  error?: {
    message: string;
    stack?: string;
    code?: string;
  };
}



export interface WorkflowExecutionResult {
  executionId: string;
  status: ExecutionStatus;
  startTime: number;
  endTime?: number;
  duration?: number;
  

  nodeResults: NodeExecutionResult[];
  

  finalOutput?: any;
  

  stats: {
    totalNodes: number;
    successNodes: number;
    errorNodes: number;
    skippedNodes: number;
  };
}



export interface NodeHandler {
  execute(
    node: Node,
    context: ExecutionContext
  ): Promise<NodeExecutionResult>;
}