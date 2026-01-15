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
  Square,
  Loader2,
  Image, // ⚠️ Novo
} from 'lucide-react';
import { useWorkflowPersistence } from '@/hooks/useWorkflowPersistence';
import { useWorkflowExecution } from '@/contexts/WorkflowExecutionContext';
import { useArchitectureSimulation } from '@/contexts/ArchitectureSimulationContext';
import { useAppMode } from '@/contexts/AppModeContext';
import { AppMode } from '@/lib/types';
import { WorkflowDialog } from './WorkflowDialog';
import { ConfirmDialog } from './ConfirmDialog';
import { ModeSwitcher } from '@/components/toolbar/ModeSwitcher';
import { ExportImageDialog } from './ExportImageDialog'; // ⚠️ Novo

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

  const { executeWorkflow, clearResults, isExecuting } = useWorkflowExecution();
  const { status: simulationStatus, startSimulation, resetSimulation } = useArchitectureSimulation();
  const { mode } = useAppMode();

  const [currentWorkflowId, setCurrentWorkflowId] = useState<string | null>(null);
  const [currentWorkflowName, setCurrentWorkflowName] = useState('Untitled Workflow');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showExportImageDialog, setShowExportImageDialog] = useState(false); // ⚠️ Novo

  // ... (todos os handlers anteriores permanecem iguais)

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

  const handleRun = async () => {
    try {
      clearResults();
      await executeWorkflow({
        mode: 'test',
      });
    } catch (error) {
      console.error('❌ Failed to execute workflow:', error);
      alert('Failed to execute workflow');
    }
  };

  const handleClear = () => {
    clearWorkflow();
    clearResults();
    setCurrentWorkflowId(null);
    setCurrentWorkflowName('Untitled Workflow');
    setShowClearConfirm(false);
    console.log('✅ Canvas cleared');
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FileJson className="w-5 h-5 text-gray-400" />
              <h1 className="text-lg font-semibold text-gray-800">
                {currentWorkflowName}
              </h1>
            </div>
            <ModeSwitcher />
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Save */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowSaveDialog(true)}
              className="gap-2"
              disabled={isExecuting || simulationStatus === 'running'}
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
              disabled={isExecuting || simulationStatus === 'running'}
            >
              <FolderOpen className="w-4 h-4" />
              Load
            </Button>

            <div className="w-px h-6 bg-gray-200" />

            {/* Export JSON */}
            <Button
              size="sm"
              variant="outline"
              onClick={handleExport}
              className="gap-2"
              disabled={isExecuting || simulationStatus === 'running'}
            >
              <Download className="w-4 h-4" />
              Export JSON
            </Button>

            {/* ⚠️ NOVO: Export Image */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowExportImageDialog(true)}
              className="gap-2"
              disabled={isExecuting || simulationStatus === 'running'}
            >
              <Image className="w-4 h-4" />
              Export Image
            </Button>

            {/* Import */}
            <Button
              size="sm"
              variant="outline"
              onClick={handleImport}
              className="gap-2"
              disabled={isExecuting || simulationStatus === 'running'}
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
              disabled={isExecuting || simulationStatus === 'running'}
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </Button>

            <div className="w-px h-6 bg-gray-200" />

            {/* Run / Simulate */}
            {mode === AppMode.ARCHITECTURE ? (
              simulationStatus === 'running' ? (
                <Button
                  size="sm"
                  className="gap-2 bg-amber-600 hover:bg-amber-700"
                  disabled
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Simulating...
                </Button>
              ) : simulationStatus === 'completed' ? (
                <Button
                  size="sm"
                  className="gap-2 bg-gray-600 hover:bg-gray-700"
                  onClick={resetSimulation}
                >
                  <Play className="w-4 h-4" />
                  Reset
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                  onClick={startSimulation}
                >
                  <Play className="w-4 h-4" />
                  Simulate
                </Button>
              )
            ) : (
              isExecuting ? (
                <Button
                  size="sm"
                  className="gap-2 bg-red-600 hover:bg-red-700"
                  disabled
                >
                  <Square className="w-4 h-4" />
                  Running...
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="gap-2 bg-green-600 hover:bg-green-700"
                  onClick={handleRun}
                >
                  <Play className="w-4 h-4" />
                  Run
                </Button>
              )
            )}
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

      {/* ⚠️ NOVO: Export Image Dialog */}
      <ExportImageDialog
        open={showExportImageDialog}
        onOpenChange={setShowExportImageDialog}
        defaultFileName={currentWorkflowName.toLowerCase().replace(/\s+/g, '-')}
      />
    </>
  );
}