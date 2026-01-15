'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useArchitectureNode } from '@/hooks/useArchitectureNode';
import { ArchitectureNodeEditor } from './ArchitectureNodeEditor';

export function ArchitecturePropertiesPanel() {
  const { selectedNode, updateNodeData } = useArchitectureNode();

  if (!selectedNode) {
    return (
      <div className="w-96 h-screen bg-white border-l border-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-sm">Select a component to edit properties</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 h-screen bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Properties</h2>
          <p className="text-xs text-gray-500">{selectedNode.data.category}</p>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto">
        <ArchitectureNodeEditor
          node={selectedNode}
          onUpdate={updateNodeData}
        />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500">
          <div className="font-semibold mb-1">Node ID:</div>
          <div className="font-mono bg-white px-2 py-1 rounded border border-gray-200 truncate">
            {selectedNode.id}
          </div>
        </div>
      </div>
    </div>
  );
}