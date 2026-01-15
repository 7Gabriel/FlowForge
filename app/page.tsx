'use client';

import { WorkflowProvider } from '@/components/workflow/WorkflowProvider';
import { WorkflowCanvas } from '@/components/workflow/WorkflowCanvas';
import { NodePalette } from '@/components/workflow/toolbar/NodePalette';
import { ArchitectureNodePalette } from '@/components/architecture/ArchitectureNodePalette';
import { PropertiesPanel } from '@/components/workflow/properties/PropertiesPanel';
import { ArchitecturePropertiesPanel } from '@/components/architecture/properties/ArchitecturePropertiesPanel'; // ⚠️ Novo
import { ExecutionPanel } from '@/components/workflow/execution/ExecutionPanel';
import { Toolbar } from '@/components/workflow/toolbar/Toolbar';
import { useWorkflowExecution } from '@/contexts/WorkflowExecutionContext';
import { useAppMode } from '@/contexts/AppModeContext';
import { AppMode } from '@/lib/types';

function WorkflowContent() {
  const { executionResult, isExecuting } = useWorkflowExecution();
  const { mode } = useAppMode();

  return (
    <main className="flex w-full h-screen">
      <Toolbar />
      <div className="flex flex-1 pt-[57px]">
        {/* Node Palette (conditional) */}
        {mode === AppMode.WORKFLOW ? (
          <NodePalette />
        ) : (
          <ArchitectureNodePalette />
        )}
        
        {/* Canvas */}
        <div className="flex-1">
          <WorkflowCanvas />
        </div>
        
        {/* Properties Panel (conditional) */}
        {mode === AppMode.WORKFLOW ? (
          <PropertiesPanel />
        ) : (
          <ArchitecturePropertiesPanel /> // ⚠️ Novo
        )}
        
        {/* Execution Panel (only for Workflow mode) */}
        {mode === AppMode.WORKFLOW && (
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