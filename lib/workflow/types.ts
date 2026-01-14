// Tipos base do React Flow
import { Node, Edge } from 'reactflow';

// ========================================
// Node Data Types
// ========================================

export enum NodeType {
  TRIGGER = 'trigger',
  LLM = 'llm',
  HTTP = 'http',
  CONDITION = 'condition',
  OUTPUT = 'output',
}

// Base para todos os nodes
export interface BaseNodeData {
  label: string;
  description?: string;
}

// Trigger Node - Input do workflow
export interface TriggerNodeData extends BaseNodeData {
  triggerType: 'manual' | 'webhook' | 'schedule';
  config?: {
    webhookUrl?: string;
    schedule?: string; // cron expression
  };
}

// LLM Node - Chamada para modelo de IA
export interface LLMNodeData extends BaseNodeData {
  provider: 'openai' | 'anthropic' | 'azure';
  model: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

// HTTP Node - Request HTTP
export interface HTTPNodeData extends BaseNodeData {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: string;
}

// Condition Node - Lógica condicional
export interface ConditionNodeData extends BaseNodeData {
  condition: string; // expressão JavaScript
  paths: {
    true: string;  // label do caminho true
    false: string; // label do caminho false
  };
}

// Output Node - Saída do workflow
export interface OutputNodeData extends BaseNodeData {
  outputType: 'json' | 'text' | 'webhook';
  destination?: string;
}

// Union type para todos os node data types
export type WorkflowNodeData =
  | TriggerNodeData
  | LLMNodeData
  | HTTPNodeData
  | ConditionNodeData
  | OutputNodeData;

// ========================================
// Workflow Types
// ========================================

export interface WorkflowNode extends Node {
  type: NodeType;
  data: WorkflowNodeData;
}

export interface WorkflowEdge extends Edge {
  animated?: boolean;
  label?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: Date;
  updatedAt: Date;
}

// ========================================
// Execution Types (para quando formos executar)
// ========================================

export interface ExecutionContext {
  workflowId: string;
  variables: Record<string, any>;
  currentNodeId: string;
}

export interface ExecutionResult {
  success: boolean;
  data?: any;
  error?: string;
}