import { WorkflowProvider } from '@/components/workflow/WorkflowProvider';
import { WorkflowCanvas } from '@/components/workflow/WorkflowCanvas';
import { NodePalette } from '@/components/workflow/toolbar/NodePalette';
import { PropertiesPanel } from '@/components/workflow/properties/PropertiesPanel';
import { Toolbar } from '@/components/workflow/toolbar/Toolbar';

export default function Home() {
  return (
    <WorkflowProvider>
      <main className="flex w-full h-screen">
        <Toolbar />
        <div className="flex flex-1 pt-[57px]"> {/* Offset para o Toolbar */}
          <NodePalette />
          <div className="flex-1">
            <WorkflowCanvas />
          </div>
          <PropertiesPanel />
        </div>
      </main>
    </WorkflowProvider>
  );
}