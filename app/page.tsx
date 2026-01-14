import { WorkflowProvider } from '@/components/workflow/WorkflowProvider';
import { WorkflowCanvas } from '@/components/workflow/WorkflowCanvas';
import { NodePalette } from '@/components/workflow/toolbar/NodePalette';
import { PropertiesPanel } from '@/components/workflow/properties/PropertiesPanel';

export default function Home() {
  return (
    <WorkflowProvider>
      <main className="flex w-full h-screen">
        <NodePalette />
        <div className="flex-1">
          <WorkflowCanvas />
        </div>
        <PropertiesPanel />
      </main>
    </WorkflowProvider>
  );
}