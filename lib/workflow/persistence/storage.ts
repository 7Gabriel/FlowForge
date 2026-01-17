import { SerializedWorkflow, WorkflowListItem, STORAGE_KEY_PREFIX, STORAGE_KEY_LIST } from './types';


const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';



class WorkflowStorage {

  save(workflow: SerializedWorkflow): void {
    if (!isBrowser) {
      console.warn('localStorage not available (SSR)');
      return;
    }

    try {
      const key = `${STORAGE_KEY_PREFIX}${workflow.metadata.id}`;
      localStorage.setItem(key, JSON.stringify(workflow));
      this.updateWorkflowList(workflow);
      console.log('✅ Workflow saved:', workflow.metadata.name);
    } catch (error) {
      console.error('❌ Failed to save workflow:', error);
      throw new Error('Failed to save workflow to localStorage');
    }
  }

  load(workflowId: string): SerializedWorkflow | null {
    if (!isBrowser) {
      console.warn('localStorage not available (SSR)');
      return null;
    }

    try {
      const key = `${STORAGE_KEY_PREFIX}${workflowId}`;
      const data = localStorage.getItem(key);
      
      if (!data) {
        return null;
      }

      const workflow = JSON.parse(data) as SerializedWorkflow;
      console.log('✅ Workflow loaded:', workflow.metadata.name);
      return workflow;
    } catch (error) {
      console.error('❌ Failed to load workflow:', error);
      return null;
    }
  }


  delete(workflowId: string): void {
    if (!isBrowser) {
      console.warn('localStorage not available (SSR)');
      return;
    }

    try {
      const key = `${STORAGE_KEY_PREFIX}${workflowId}`;
      localStorage.removeItem(key);
      this.removeFromWorkflowList(workflowId);
      console.log('✅ Workflow deleted:', workflowId);
    } catch (error) {
      console.error('❌ Failed to delete workflow:', error);
      throw new Error('Failed to delete workflow');
    }
  }


  list(): WorkflowListItem[] {
    if (!isBrowser) {
      console.warn('localStorage not available (SSR)');
      return [];
    }

    try {
      const data = localStorage.getItem(STORAGE_KEY_LIST);
      if (!data) {
        return [];
      }
      return JSON.parse(data) as WorkflowListItem[];
    } catch (error) {
      console.error('❌ Failed to list workflows:', error);
      return [];
    }
  }


  private updateWorkflowList(workflow: SerializedWorkflow): void {
    if (!isBrowser) return;

    const list = this.list();
    const existingIndex = list.findIndex((item) => item.id === workflow.metadata.id);

    const listItem: WorkflowListItem = {
      id: workflow.metadata.id,
      name: workflow.metadata.name,
      description: workflow.metadata.description,
      updatedAt: workflow.metadata.updatedAt,
      nodeCount: workflow.nodes.length,
      edgeCount: workflow.edges.length,
    };

    if (existingIndex >= 0) {
      list[existingIndex] = listItem;
    } else {
      list.push(listItem);
    }


    list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(list));
  }


  private removeFromWorkflowList(workflowId: string): void {
    if (!isBrowser) return;

    const list = this.list();
    const filtered = list.filter((item) => item.id !== workflowId);
    localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(filtered));
  }


  clear(): void {
    if (!isBrowser) {
      console.warn('localStorage not available (SSR)');
      return;
    }

    const list = this.list();
    list.forEach((item) => {
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}${item.id}`);
    });
    localStorage.removeItem(STORAGE_KEY_LIST);
    console.log('✅ All workflows cleared');
  }
}


export const workflowStorage = new WorkflowStorage();