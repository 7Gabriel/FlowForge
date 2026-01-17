'use client';

import { ReactFlowProvider } from 'reactflow';
import { WorkflowProvider } from '@/components/workflow/WorkflowProvider';
import { WorkflowCanvas } from '@/components/workflow/WorkflowCanvas';
import { ArchitectureNodePalette } from '@/components/architecture/ArchitectureNodePalette';
import { ArchitecturePropertiesPanel } from '@/components/architecture/properties/ArchitecturePropertiesPanel';
import { Toolbar } from '@/components/workflow/toolbar/Toolbar';

export default function Home() {
  return (
    <WorkflowProvider>
      <ReactFlowProvider>
        <main className="flex w-full h-screen">
          {/* Toolbar agora DENTRO do ReactFlowProvider */}
          <Toolbar />
          
          <div className="flex flex-1 pt-[57px]">
            {/* Architecture Palette */}
            <ArchitectureNodePalette />
            
            {/* Canvas */}
            <div className="flex-1">
              <WorkflowCanvas />
            </div>
            
            {/* Properties Panel */}
            <ArchitecturePropertiesPanel />
          </div>
        </main>
      </ReactFlowProvider>
    </WorkflowProvider>
  );
}