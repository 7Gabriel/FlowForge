import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import { workflowStorage } from '@/lib/workflow/persistence/storage';
import { serializeWorkflow, deserializeWorkflow } from '@/lib/workflow/persistence/serializer';
import { exportWorkflowToFile, importWorkflowFromFile } from '@/lib/workflow/persistence/import-export';
import { WorkflowMetadata } from '@/lib/workflow/persistence/types';

export function useWorkflowPersistence() {
  const { getNodes, getEdges, setNodes, setEdges, getViewport, setViewport } = useReactFlow();


  const saveWorkflow = useCallback(
    (metadata?: Partial<WorkflowMetadata>) => {
      const nodes = getNodes();
      const edges = getEdges();
      const viewport = getViewport();

      const serialized = serializeWorkflow(nodes, edges, viewport, metadata);
      workflowStorage.save(serialized);

      return serialized.metadata.id;
    },
    [getNodes, getEdges, getViewport]
  );

  const loadWorkflow = useCallback(
    (workflowId: string) => {
      const serialized = workflowStorage.load(workflowId);
      if (!serialized) {
        throw new Error('Workflow not found');
      }

      const { nodes, edges, viewport } = deserializeWorkflow(serialized);
      setNodes(nodes);
      setEdges(edges);
      setViewport(viewport);

      return serialized.metadata;
    },
    [setNodes, setEdges, setViewport]
  );

  
  const deleteWorkflow = useCallback((workflowId: string) => {
    workflowStorage.delete(workflowId);
  }, []);


  const listWorkflows = useCallback(() => {
    return workflowStorage.list();
  }, []);


  const exportToFile = useCallback(
    (metadata?: Partial<WorkflowMetadata>) => {
      const nodes = getNodes();
      const edges = getEdges();
      const viewport = getViewport();

      const serialized = serializeWorkflow(nodes, edges, viewport, metadata);
      exportWorkflowToFile(serialized);
    },
    [getNodes, getEdges, getViewport]
  );

  
  const importFromFile = useCallback(async () => {
    const serialized = await importWorkflowFromFile();
    const { nodes, edges, viewport } = deserializeWorkflow(serialized);
    
    setNodes(nodes);
    setEdges(edges);
    setViewport(viewport);

    return serialized.metadata;
  }, [setNodes, setEdges, setViewport]);


  const clearWorkflow = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setViewport({ x: 0, y: 0, zoom: 1 });
  }, [setNodes, setEdges, setViewport]);

  return {
    saveWorkflow,
    loadWorkflow,
    deleteWorkflow,
    listWorkflows,
    exportToFile,
    importFromFile,
    clearWorkflow,
  };
}