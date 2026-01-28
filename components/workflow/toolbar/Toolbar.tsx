'use client';

import { Sparkles } from 'lucide-react';
import { TemplatesModal } from '@/components/templates/TemplatesModal';
import { getTemplateById } from '@/lib/templates/template-registry';
import React, { useState, useRef, useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import { 
  Save, 
  FolderOpen, 
  Download, 
  Image as ImageIcon, 
  Upload, 
  Trash2,
  FileJson,
  Edit2,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  Play
} from 'lucide-react';
import { useWorkflowExecution } from '@/contexts/WorkflowExecutionContext';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { AlertModal } from '@/components/ui/alert-modal';
import { toPng } from 'html-to-image';

export function Toolbar() {
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();
  const { executeWorkflow, clearResults } = useWorkflowExecution();
  const [workflowTitle, setWorkflowTitle] = useState('FlowForge');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(workflowTitle);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal states
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  const showAlert = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setAlertModal({ isOpen: true, title, message, type });
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmModal({ isOpen: true, title, message, onConfirm });
  };

  const handleSave = () => {
    const nodes = getNodes();
    const edges = getEdges();
    const data = { nodes, edges, title: workflowTitle };
    localStorage.setItem('flowforge-diagram', JSON.stringify(data));
    showAlert('Saved Successfully', 'Your diagram has been saved to browser storage.', 'success');
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('flowforge-diagram');
    if (saved) {
      const data = JSON.parse(saved);
      setNodes(data.nodes || []);
      setEdges(data.edges || []);
      if (data.title) setWorkflowTitle(data.title);
      showAlert('Loaded Successfully', 'Your diagram has been loaded from browser storage.', 'success');
    } else {
      showAlert('No Saved Data', 'No saved diagram found in browser storage.', 'info');
    }
  };

  const handleExportJSON = () => {
    const nodes = getNodes();
    const edges = getEdges();
    const data = { nodes, edges, title: workflowTitle };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workflowTitle.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportImage = async () => {
    const element = document.querySelector('.react-flow') as HTMLElement;
    if (!element) {
      showAlert('Export Failed', 'Canvas not found!', 'error');
      return;
    }

    try {
      const dataUrl = await toPng(element, {
        backgroundColor: '#ffffff',
        width: element.offsetWidth,
        height: element.offsetHeight,
      });

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${workflowTitle.replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting image:', error);
      showAlert('Export Failed', 'Failed to export image. Please try again.', 'error');
    }
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        setNodes(data.nodes || []);
        setEdges(data.edges || []);
        if (data.title) setWorkflowTitle(data.title);
        showAlert('Imported Successfully', 'Your diagram has been imported.', 'success');
      } catch (error) {
        console.error('Error importing file:', error);
        showAlert('Import Failed', 'Failed to import file. Please check the file format.', 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleClear = () => {
    showConfirm(
      'Clear Diagram',
      'Are you sure you want to clear all nodes and edges? This action cannot be undone.',
      () => {
        setNodes([]);
        setEdges([]);
        clearResults();
        setWorkflowTitle('FlowForge');
        setTimeout(() => {
          setNodes([]);
          setEdges([]);
        }, 0);
        setConfirmModal({ ...confirmModal, isOpen: false });
      }
    );
  };

  const handleBringToFront = () => {
    const nodes = getNodes();
    const selectedNodes = nodes.filter(n => n.selected);
    
    if (selectedNodes.length === 0) {
      showAlert('No Selection', 'Please select a node first.', 'info');
      return;
    }
  
    const maxZIndex = Math.max(...nodes.map(n => {
      const z = n.style?.zIndex;
      return typeof z === 'number' ? z : (typeof z === 'string' ? parseInt(z, 10) : 0);
    }), 0); 
  
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.selected) {
          return {
            ...node,
            style: {
              ...node.style,
              zIndex: maxZIndex + 1,
            },
          };
        }
        return node;
      })
    );
  };
  
  const handleSendToBack = () => {
    const nodes = getNodes();
    const selectedNodes = nodes.filter(n => n.selected);
    
    if (selectedNodes.length === 0) {
      showAlert('No Selection', 'Please select a node first.', 'info');
      return;
    }
  
    const minZIndex = Math.min(...nodes.map(n => {
      const z = n.style?.zIndex;
      return typeof z === 'number' ? z : (typeof z === 'string' ? parseInt(z, 10) : 0);
    }), 0); 
  
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.selected) {
          return {
            ...node,
            style: {
              ...node.style,
              zIndex: minZIndex - 1,
            },
          };
        }
        return node;
      })
    );
  };

  const handleSimulate = () => {
    const nodes = getNodes();
    const edges = getEdges();
    
    if (nodes.length === 0) {
      showAlert('No Nodes', 'Please add nodes to your diagram before simulating.', 'info');
      return;
    }

    console.log('🎬 Starting simulation...');
    executeWorkflow(nodes, edges);
  };

  const handleLoadTemplate = useCallback((templateId: string) => {
    const template = getTemplateById(templateId);
    if (!template) {
      showAlert('Template Not Found', 'The selected template could not be loaded.', 'error');
      return;
    }
  
    // Clear current diagram
    setNodes([]);
    setEdges([]);
  
    // Load template nodes and edges
    setTimeout(() => {
      setNodes(template.nodes);
      setEdges(template.edges);
      showAlert('Template Loaded', `"${template.name}" has been loaded successfully!`, 'success');
    }, 100);
  }, [setNodes, setEdges]);

  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50 shadow-sm">
        {/* Left Section - Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileJson className="w-5 h-5 text-gray-600" />
            {isEditingTitle ? (
              <div className="flex items-center gap-2">
                <input
                  ref={titleInputRef}
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setWorkflowTitle(editedTitle);
                      setIsEditingTitle(false);
                    } else if (e.key === 'Escape') {
                      setEditedTitle(workflowTitle);
                      setIsEditingTitle(false);
                    }
                  }}
                  className="px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ width: `${Math.max(editedTitle.length * 8 + 20, 150)}px` }}
                  autoFocus
                />
                <button
                  onClick={() => {
                    setWorkflowTitle(editedTitle);
                    setIsEditingTitle(false);
                  }}
                  className="p-1 text-green-600 hover:bg-green-50 rounded"
                  title="Save"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setEditedTitle(workflowTitle);
                    setIsEditingTitle(false);
                  }}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  title="Cancel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group">
                <h1 className="text-xl font-semibold text-gray-800">{workflowTitle}</h1>
                <button
                  onClick={() => {
                    setEditedTitle(workflowTitle);
                    setIsEditingTitle(true);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-600 hover:bg-gray-100 rounded transition-opacity"
                  title="Edit title"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleBringToFront}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Bring to Front"
          >
            <ArrowUp className="w-4 h-4" />
            Front
          </button>
          <button
            onClick={handleSendToBack}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Send to Back"
          >
            <ArrowDown className="w-4 h-4" />
            Back
          </button>
          <div className="w-px h-6 bg-gray-300" />

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            Save
          </button>

          <button
            onClick={handleLoad}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FolderOpen className="w-4 h-4" />
            Load
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>

          <button
            onClick={handleExportImage}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ImageIcon className="w-4 h-4" />
            Export Image
          </button>

          <button
            onClick={handleImport}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            Import
          </button>

          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
          <button
            onClick={() => setIsTemplatesModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-colors font-medium shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            Templates
          </button>

          <button
            onClick={handleSimulate}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
          >
            <Play className="w-4 h-4" />
            Simulate
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Templates Modal */}
      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectTemplate={handleLoadTemplate}
      />

      {/* Modals */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        confirmText="Clear"
        cancelText="Cancel"
        type="danger"
      />

      <AlertModal
        isOpen={alertModal.isOpen}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
      />
    </>
  );
}