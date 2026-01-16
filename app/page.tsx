'use client';

import { WorkflowProvider } from '@/components/workflow/WorkflowProvider';
import { WorkflowCanvas } from '@/components/workflow/WorkflowCanvas';
import { NodePalette } from '@/components/workflow/toolbar/NodePalette';
import { ArchitectureNodePalette } from '@/components/architecture/ArchitectureNodePalette';
import { PropertiesPanel } from '@/components/workflow/properties/PropertiesPanel';
import { ArchitecturePropertiesPanel } from '@/components/architecture/properties/ArchitecturePropertiesPanel';
import { ExecutionPanel } from '@/components/workflow/execution/ExecutionPanel';
import { Toolbar } from '@/components/workflow/toolbar/Toolbar';
import { useWorkflowExecution } from '@/contexts/WorkflowExecutionContext';
import { useAppMode } from '@/contexts/AppModeContext';
import { AppMode } from '@/lib/types';

function WorkflowContent() {
  const { executionResult, isExecuting } = useWorkflowExecution();
  const { mode } = useAppMode();

  const hasExecutionResult = executionResult !== null || isExecuting;

  return (
    <main className="flex w-full h-screen">
      <Toolbar />
      <div className="flex flex-1 pt-[57px]">
        {/* Node Palette - Condicional por Mode */}
        {mode === AppMode.WORKFLOW ? (
          <NodePalette />
        ) : (
          <ArchitectureNodePalette />
        )}
        
        {/* Canvas */}
        <div className="flex-1">
          <WorkflowCanvas />
        </div>
        
        {/* Properties Panel - SEMPRE VISÍVEL por Mode */}
        {mode === AppMode.WORKFLOW ? (
          <PropertiesPanel />
        ) : (
          <ArchitecturePropertiesPanel />
        )}
        
        {/* Execution Panel - Só aparece quando há resultado (Workflow only) */}
        {mode === AppMode.WORKFLOW && hasExecutionResult && (
          <ExecutionPanel result={executionResult} isExecuting={isExecuting} />
        )}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <WorkflowProvider>
      <WorkflowContent />
    </WorkflowProvider>
  );
}