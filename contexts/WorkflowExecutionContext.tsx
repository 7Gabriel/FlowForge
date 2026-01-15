'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useReactFlow } from 'reactflow';
import { WorkflowExecutor } from '@/lib/workflow/execution/executor';
import {
  WorkflowExecutionResult,
  ExecutionConfig,
} from '@/lib/workflow/execution/types';

interface WorkflowExecutionContextType {
  executionResult: WorkflowExecutionResult | null;
  isExecuting: boolean;
  executeWorkflow: (config?: Partial<ExecutionConfig>) => Promise<WorkflowExecutionResult>;
  clearResults: () => void;
}

const WorkflowExecutionContext = createContext<WorkflowExecutionContextType | undefined>(undefined);

export function WorkflowExecutionProvider({ children }: { children: ReactNode }) {
  const { getNodes, getEdges, setNodes } = useReactFlow();
  const [executionResult, setExecutionResult] = useState<WorkflowExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const executeWorkflow = useCallback(
    async (config?: Partial<ExecutionConfig>) => {
      setIsExecuting(true);
      setExecutionResult(null);

      try {
        const nodes = getNodes();
        const edges = getEdges();

        console.log('🚀 Starting workflow execution with', nodes.length, 'nodes');

        // Resetar estado visual dos nodes
        setNodes((nodes) =>
          nodes.map((node) => ({
            ...node,
            data: {
              ...node.data,
              executionStatus: undefined,
            },
          }))
        );

        const executor = new WorkflowExecutor(nodes, edges, {
          mode: 'test',
          ...config,
        });

        const result = await executor.execute();
        setExecutionResult(result);

        // Atualizar visual dos nodes com resultados
        setNodes((nodes) =>
          nodes.map((node) => {
            const nodeResult = result.nodeResults.find((r) => r.nodeId === node.id);
            if (!nodeResult) {
              return node;
            }

            return {
              ...node,
              data: {
                ...node.data,
                executionStatus: nodeResult.status,
                executionResult: nodeResult,
              },
            };
          })
        );

        return result;
      } catch (error) {
        console.error('❌ Execution failed:', error);
        throw error;
      } finally {
        setIsExecuting(false);
      }
    },
    [getNodes, getEdges, setNodes]
  );

  const clearResults = useCallback(() => {
    setExecutionResult(null);
    setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          executionStatus: undefined,
          executionResult: undefined,
        },
      }))
    );
  }, [setNodes]);

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