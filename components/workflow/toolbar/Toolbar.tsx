'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Save,
  FolderOpen,
  Download,
  Upload,
  Trash2,
  Play,
  FileJson,
} from 'lucide-react';
import { useWorkflowPersistence } from '@/hooks/useWorkflowPersistence';
import { WorkflowDialog } from './WorkflowDialog';
import { ConfirmDialog } from './ConfirmDialog';

export function Toolbar() {
  const {
    saveWorkflow,
    loadWorkflow,
    deleteWorkflow,
    listWorkflows,
    exportToFile,
    importFromFile,
    clearWorkflow,
  } = useWorkflowPersistence();

  const [currentWorkflowId, setCurrentWorkflowId] = useState<string | null>(null);
  const [currentWorkflowName, setCurrentWorkflowName] = useState('Untitled Workflow');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // ========================================
  // Save Workflow
  // ========================================
  const handleSave = (name: string, description: string) => {
    try {
      const id = saveWorkflow({
        id: currentWorkflowId || undefined,
        name,
        description,
      });
      setCurrentWorkflowId(id);
      setCurrentWorkflowName(name);
      console.log('✅ Workflow saved successfully');
    } catch (error) {
      console.error('❌ Failed to save workflow:', error);
      alert('Failed to save workflow');
    }
  };

  // ========================================
  // Load Workflow
  // ========================================
  const handleLoad = (workflowId: string) => {
    try {
      const metadata = loadWorkflow(workflowId);
      setCurrentWorkflowId(metadata.id);
      setCurrentWorkflowName(metadata.name);
      console.log('✅ Workflow loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load workflow:', error);
      alert('Failed to load workflow');
    }
  };

  // ========================================
  // Delete Workflow
  // ========================================
  const handleDelete = (workflowId: string) => {
    try {
      deleteWorkflow(workflowId);
      if (workflowId === currentWorkflowId) {
        setCurrentWorkflowId(null);
        setCurrentWorkflowName('Untitled Workflow');
      }
      console.log('✅ Workflow deleted successfully');
    } catch (error) {
      console.error('❌ Failed to delete workflow:', error);
      alert('Failed to delete workflow');
    }
  };

  // ========================================
  // Export to File
  // ========================================
  const handleExport = () => {
    try {
      exportToFile({
        name: currentWorkflowName,
      });
      console.log('✅ Workflow exported successfully');
    } catch (error) {
      console.error('❌ Failed to export workflow:', error);
      alert('Failed to export workflow');
    }
  };

  // ========================================
  // Import from File
  // ========================================
  const handleImport = async () => {
    try {
      const metadata = await importFromFile();
      setCurrentWorkflowId(metadata.id);
      setCurrentWorkflowName(metadata.name);
      console.log('✅ Workflow imported successfully');
    } catch (error) {
      console.error('❌ Failed to import workflow:', error);
      alert('Failed to import workflow');
    }
  };

  // ========================================
  // Clear Canvas
  // ========================================
  const handleClear = () => {
    clearWorkflow();
    setCurrentWorkflowId(null);
    setCurrentWorkflowName('Untitled Workflow');
    setShowClearConfirm(false);
    console.log('✅ Canvas cleared');
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left: Workflow Info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <FileJson className="w-5 h-5 text-gray-400" />
              <h1 className="text-lg font-semibold text-gray-800">
                {currentWorkflowName}
              </h1>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Save */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowSaveDialog(true)}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </Button>

            {/* Load */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowLoadDialog(true)}
              className="gap-2"
            >
              <FolderOpen className="w-4 h-4" />
              Load
            </Button>

            <div className="w-px h-6 bg-gray-200" />

            {/* Export */}
            <Button
              size="sm"
              variant="outline"
              onClick={handleExport}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>

            {/* Import */}
            <Button
              size="sm"
              variant="outline"
              onClick={handleImport}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              Import
            </Button>

            <div className="w-px h-6 bg-gray-200" />

            {/* Clear */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowClearConfirm(true)}
              className="gap-2 hover:text-red-600 hover:border-red-600"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </Button>

            <div className="w-px h-6 bg-gray-200" />

            {/* Run (placeholder for next phase) */}
            <Button
              size="sm"
              className="gap-2 bg-green-600 hover:bg-green-700"
              disabled
            >
              <Play className="w-4 h-4" />
              Run
            </Button>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <WorkflowDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        mode="save"
        workflows={listWorkflows()}
        onSave={handleSave}
        onLoad={handleLoad}
        onDelete={handleDelete}
        currentWorkflowName={currentWorkflowName}
      />

      <WorkflowDialog
        open={showLoadDialog}
        onOpenChange={setShowLoadDialog}
        mode="load"
        workflows={listWorkflows()}
        onSave={handleSave}
        onLoad={handleLoad}
        onDelete={handleDelete}
      />

      <ConfirmDialog
        open={showClearConfirm}
        onOpenChange={setShowClearConfirm}
        title="Clear Canvas"
        description="Are you sure you want to clear the canvas? This action cannot be undone."
        confirmText="Clear Canvas"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={handleClear}
      />
    </>
  );
}