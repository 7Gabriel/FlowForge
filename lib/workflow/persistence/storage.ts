import { SerializedWorkflow, WorkflowListItem, STORAGE_KEY_PREFIX, STORAGE_KEY_LIST } from './types';

// ========================================
// LocalStorage Wrapper com Type Safety
// ========================================

class WorkflowStorage {
  // Salvar workflow
  save(workflow: SerializedWorkflow): void {
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

  // Carregar workflow por ID
  load(workflowId: string): SerializedWorkflow | null {
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

  // Deletar workflow
  delete(workflowId: string): void {
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

  // Listar todos os workflows
  list(): WorkflowListItem[] {
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

  // Atualizar lista de workflows (metadata)
  private updateWorkflowList(workflow: SerializedWorkflow): void {
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

    // Ordenar por data (mais recente primeiro)
    list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(list));
  }

  // Remover da lista
  private removeFromWorkflowList(workflowId: string): void {
    const list = this.list();
    const filtered = list.filter((item) => item.id !== workflowId);
    localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(filtered));
  }

  // Limpar tudo (útil para debug)
  clear(): void {
    const list = this.list();
    list.forEach((item) => {
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}${item.id}`);
    });
    localStorage.removeItem(STORAGE_KEY_LIST);
    console.log('✅ All workflows cleared');
  }
}

// Singleton instance
export const workflowStorage = new WorkflowStorage();