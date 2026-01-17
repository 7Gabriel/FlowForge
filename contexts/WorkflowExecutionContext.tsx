'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Node, Edge } from 'reactflow';
import { ArchitectureExecutor } from '@/lib/workflow/execution/architecture-executor';

interface WorkflowExecutionContextType {
  executionResult: any;
  isExecuting: boolean;
  executeWorkflow: (nodes: Node[], edges: Edge[]) => Promise<void>;
  clearResults: () => void;
}

const WorkflowExecutionContext = createContext<WorkflowExecutionContextType | undefined>(undefined);

export function WorkflowExecutionProvider({ children }: { children: React.ReactNode }) {
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const executeWorkflow = useCallback(async (nodes: Node[], edges: Edge[]) => {
    setIsExecuting(true);
    setExecutionResult(null);

    try {
      console.log('🎬 Execute Workflow called with nodes:', nodes.length);

      const executor = new ArchitectureExecutor();
      const result = await executor.execute(
        nodes, 
        edges, 
        (step) => {
          console.log('📍 Step update:', step);
        },
        (nodeId, status) => {
          console.log('🎨 Highlight node:', nodeId, status);
          window.dispatchEvent(new CustomEvent('architecture:highlight-node', { 
            detail: { nodeId, status } 
          }));
        },
        (edgeId, highlight) => {
          console.log('🎨 Highlight edge:', edgeId, highlight);
          window.dispatchEvent(new CustomEvent('architecture:highlight-edge', { 
            detail: { edgeId, highlight } 
          }));
        }
      );

      setExecutionResult(result);
      console.log('✅ Architecture execution completed:', result);
    } catch (error) {
      console.error('❌ Execution error:', error);
      setExecutionResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        steps: [],
        totalDuration: 0,
      });
    } finally {
      setIsExecuting(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setExecutionResult(null);
    setIsExecuting(false);
  }, []);

  return (
    <WorkflowExecutionContext.Provider
      value={{
        executionResult,
        isExecuting,
        executeWorkflow,
        clearResults,
      }}
    >
      {children}
    </WorkflowExecutionContext.Provider>
  );
}

export function useWorkflowExecution() {
  const context = useContext(WorkflowExecutionContext);
  if (!context) {
    throw new Error('useWorkflowExecution must be used within WorkflowExecutionProvider');
  }
  return context;
}