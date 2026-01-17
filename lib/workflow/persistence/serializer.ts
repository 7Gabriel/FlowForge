import { Node, Edge, Viewport } from 'reactflow';
import { SerializedWorkflow, WorkflowMetadata, WORKFLOW_VERSION } from './types';



export function serializeWorkflow(
  nodes: Node[],
  edges: Edge[],
  viewport: Viewport,
  metadata?: Partial<WorkflowMetadata>
): SerializedWorkflow {
  const now = new Date().toISOString();
  
  const fullMetadata: WorkflowMetadata = {
    id: metadata?.id || generateWorkflowId(),
    name: metadata?.name || 'Untitled Workflow',
    description: metadata?.description,
    version: WORKFLOW_VERSION,
    createdAt: metadata?.createdAt || now,
    updatedAt: now,
    tags: metadata?.tags || [],
  };

  return {
    metadata: fullMetadata,
    nodes,
    edges,
    viewport: {
      x: viewport.x,
      y: viewport.y,
      zoom: viewport.zoom,
    },
  };
}



export function deserializeWorkflow(serialized: SerializedWorkflow): {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
  metadata: WorkflowMetadata;
} {
  return {
    nodes: serialized.nodes,
    edges: serialized.edges,
    viewport: serialized.viewport || { x: 0, y: 0, zoom: 1 },
    metadata: serialized.metadata,
  };
}



export function validateWorkflow(data: any): data is SerializedWorkflow {
  if (!data || typeof data !== 'object') {
    return false;
  }


  if (!data.metadata || typeof data.metadata !== 'object') {
    return false;
  }

  const metadata = data.metadata;
  if (
    !metadata.id ||
    !metadata.name ||
    !metadata.version ||
    !metadata.createdAt ||
    !metadata.updatedAt
  ) {
    return false;
  }

  if (!Array.isArray(data.nodes) || !Array.isArray(data.edges)) {
    return false;
  }

  return true;
}


function generateWorkflowId(): string {
  return `wf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}