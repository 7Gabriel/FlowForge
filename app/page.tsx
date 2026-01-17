'use client';

import { ReactFlowProvider } from 'reactflow';
import { WorkflowProvider } from '@/components/workflow/WorkflowProvider';
import { WorkflowCanvas } from '@/components/workflow/WorkflowCanvas';
import { ArchitectureNodePalette } from '@/components/architecture/ArchitectureNodePalette';
import { ArchitecturePropertiesPanel } from '@/components/architecture/properties/ArchitecturePropertiesPanel';
import { ExecutionPanel } from '@/components/workflow/execution/ExecutionPanel';
import { Toolbar } from '@/components/workflow/toolbar/Toolbar';
import { useWorkflowExecution } from '@/contexts/WorkflowExecutionContext';

function AppContent() {
  const { executionResult, isExecuting } = useWorkflowExecution();
  const hasExecutionResult = executionResult !== null || isExecuting;

  return (
    <ReactFlowProvider>
      <main className="flex w-full h-screen">
        <Toolbar />
        
        <div className="flex flex-1 pt-[57px]">
          <ArchitectureNodePalette />
          <div className="flex-1">
            <WorkflowCanvas />
          </div>
          <ArchitecturePropertiesPanel />
          {hasExecutionResult && (
            <ExecutionPanel result={executionResult} isExecuting={isExecuting} />
          )}
        </div>
      </main>
    </ReactFlowProvider>
  );
}

export default function Home() {
  return (
    <WorkflowProvider>
      <AppContent />
    </WorkflowProvider>
  );
}