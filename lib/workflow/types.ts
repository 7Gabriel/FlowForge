import { Node, Edge } from 'reactflow';
import { NodeExecutionResult, NodeExecutionStatus } from './execution/types';

export enum NodeType {
  TRIGGER = 'trigger',
  LLM = 'llm',
  HTTP = 'http',
  CONDITION = 'condition',
  OUTPUT = 'output',
}

export interface BaseNodeData {
  label: string;
  description?: string;
}

export interface TriggerNodeData extends BaseNodeData {
  triggerType: 'manual' | 'webhook' | 'schedule';
  config?: {
    webhookUrl?: string;
    schedule?: string; // cron expression
  };
}

export interface LLMNodeData extends BaseNodeData {
  provider: 'openai' | 'anthropic' | 'azure';
  model: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface HTTPNodeData extends BaseNodeData {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: string;
}

export interface ConditionNodeData extends BaseNodeData {
  condition: string;
  paths: {
    true: string;
    false: string;
  };
}

export interface OutputNodeData extends BaseNodeData {
  outputType: 'json' | 'text' | 'webhook';
  destination?: string;
}

export type WorkflowNodeData =
  | TriggerNodeData
  | LLMNodeData
  | HTTPNodeData
  | ConditionNodeData
  | OutputNodeData;

export interface WorkflowNode extends Node {
  type: NodeType;
  data: WorkflowNodeData;
}

export type WorkflowEdge = Edge & {
  animated?: boolean;
  label?: string;
};

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: Date;
  updatedAt: Date;
}

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

export interface BaseNodeDataWithExecution extends BaseNodeData {
  executionStatus?: NodeExecutionStatus;
  executionResult?: NodeExecutionResult;
}

export interface TriggerNodeDataWithExecution extends TriggerNodeData, BaseNodeDataWithExecution {}
export interface LLMNodeDataWithExecution extends LLMNodeData, BaseNodeDataWithExecution {}
export interface HTTPNodeDataWithExecution extends HTTPNodeData, BaseNodeDataWithExecution {}
export interface ConditionNodeDataWithExecution extends ConditionNodeData, BaseNodeDataWithExecution {}
export interface OutputNodeDataWithExecution extends OutputNodeData, BaseNodeDataWithExecution {}