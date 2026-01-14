import { Node, Edge } from 'reactflow';

export interface WorkflowMetadata {
  id: string;
  name: string;
  description?: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface SerializedWorkflow {
  metadata: WorkflowMetadata;
  nodes: Node[];
  edges: Edge[];
  viewport?: {
    x: number;
    y: number;
    zoom: number;
  };
}

export interface WorkflowListItem {
  id: string;
  name: string;
  description?: string;
  updatedAt: string;
  nodeCount: number;
  edgeCount: number;
}

export const WORKFLOW_VERSION = '1.0.0';
export const STORAGE_KEY_PREFIX = 'workflow_';
export const STORAGE_KEY_LIST = 'workflow_list';