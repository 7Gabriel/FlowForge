'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { WorkflowListItem } from '@/lib/workflow/persistence/types';
import { FileText, Trash2, Download, Clock } from 'lucide-react';

interface WorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'save' | 'load';
  workflows: WorkflowListItem[];
  onSave: (name: string, description: string) => void;
  onLoad: (workflowId: string) => void;
  onDelete: (workflowId: string) => void;
  currentWorkflowName?: string;
}

export function WorkflowDialog({
  open,
  onOpenChange,
  mode,
  workflows,
  onSave,
  onLoad,
  onDelete,
  currentWorkflowName = '',
}: WorkflowDialogProps) {
  const [name, setName] = useState(currentWorkflowName);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (mode === 'save') {
      setName(currentWorkflowName);
      setDescription('');
    }
  }, [open, mode, currentWorkflowName]);

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please enter a workflow name');
      return;
    }
    onSave(name.trim(), description.trim());
    onOpenChange(false);
  };

  const handleLoad = (workflowId: string) => {
    onLoad(workflowId);
    onOpenChange(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'save' ? 'Save Workflow' : 'Load Workflow'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'save'
              ? 'Save your workflow to continue later'
              : 'Choose a workflow to load'}
          </DialogDescription>
        </DialogHeader>

        {mode === 'save' ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workflow Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Awesome Workflow"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does this workflow do?"
                rows={3}
              />
            </div>
          </div>
        ) : (
          <div className="py-4">
            {workflows.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No saved workflows yet</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {workflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <FileText className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {workflow.name}
                      </div>
                      {workflow.description && (
                        <div className="text-xs text-gray-500 truncate mt-0.5">
                          {workflow.description}
                        </div>
                      )}
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(workflow.updatedAt)}
                        </span>
                        <span>{workflow.nodeCount} nodes</span>
                        <span>{workflow.edgeCount} connections</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleLoad(workflow.id)}
                        className="h-8 px-2"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete "${workflow.name}"?`)) {
                            onDelete(workflow.id);
                          }
                        }}
                        className="h-8 px-2 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {mode === 'save' && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Workflow</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}