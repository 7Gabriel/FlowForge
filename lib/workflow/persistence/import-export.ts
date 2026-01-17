import { SerializedWorkflow } from './types';
import { validateWorkflow } from './serializer';


export function exportWorkflowToFile(workflow: SerializedWorkflow): void {
  const json = JSON.stringify(workflow, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${workflow.metadata.name.replace(/\s+/g, '_')}_${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
  console.log('✅ Workflow exported:', workflow.metadata.name);
}



export function importWorkflowFromFile(): Promise<SerializedWorkflow> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }

      try {
        const text = await file.text();
        const data = JSON.parse(text);
        
        if (!validateWorkflow(data)) {
          reject(new Error('Invalid workflow file format'));
          return;
        }

        console.log('✅ Workflow imported:', data.metadata.name);
        resolve(data);
      } catch (error) {
        console.error('❌ Failed to import workflow:', error);
        reject(new Error('Failed to parse workflow file'));
      }
    };

    input.click();
  });
}


export function exportWorkflowToClipboard(workflow: SerializedWorkflow): void {
  const json = JSON.stringify(workflow, null, 2);
  navigator.clipboard.writeText(json).then(
    () => {
      console.log('✅ Workflow copied to clipboard');
    },
    (error) => {
      console.error('❌ Failed to copy to clipboard:', error);
    }
  );
}


export async function importWorkflowFromClipboard(): Promise<SerializedWorkflow> {
  try {
    const text = await navigator.clipboard.readText();
    const data = JSON.parse(text);
    
    if (!validateWorkflow(data)) {
      throw new Error('Invalid workflow format in clipboard');
    }

    console.log('✅ Workflow imported from clipboard');
    return data;
  } catch (error) {
    console.error('❌ Failed to import from clipboard:', error);
    throw new Error('Failed to import workflow from clipboard');
  }
}