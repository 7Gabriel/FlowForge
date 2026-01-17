'use client';

import React from 'react';
import { X, Settings } from 'lucide-react';
import { useSelectedNode } from '@/hooks/useSelectedNode';
import { NodeType } from '@/lib/workflow/types';
import { TriggerEditor } from './editors/TriggerEditor';
import { LLMEditor } from './editors/LLMEditor';
import { HTTPEditor } from './editors/HTTPEditor';
import { ConditionEditor } from './editors/ConditionEditor';
import { OutputEditor } from './editors/OutputEditor';

export function PropertiesPanel() {
  const { selectedNode, updateNodeData } = useSelectedNode();

  if (!selectedNode) {
    return (
      <div className="w-96 h-screen bg-white border-l border-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <Settings className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Select a node to edit properties</p>
        </div>
      </div>
    );
  }

  const renderEditor = () => {
    switch (selectedNode.type) {
      case NodeType.TRIGGER:
        return (
          <TriggerEditor
            nodeId={selectedNode.id}
            data={selectedNode.data}
            onUpdate={updateNodeData}
          />
        );
      case NodeType.LLM:
        return (
          <LLMEditor
            nodeId={selectedNode.id}
            data={selectedNode.data}
            onUpdate={updateNodeData}
          />
        );
      case NodeType.HTTP:
        return (
          <HTTPEditor
            nodeId={selectedNode.id}
            data={selectedNode.data}
            onUpdate={updateNodeData}
          />
        );
      case NodeType.CONDITION:
        return (
          <ConditionEditor
            nodeId={selectedNode.id}
            data={selectedNode.data}
            onUpdate={updateNodeData}
          />
        );
      case NodeType.OUTPUT:
        return (
          <OutputEditor
            nodeId={selectedNode.id}
            data={selectedNode.data}
            onUpdate={updateNodeData}
          />
        );
      default:
        return <p className="text-sm text-gray-500">Unknown node type</p>;
    }
  };

  return (
    <div className="w-96 h-screen bg-white border-l border-gray-200 flex flex-col">
    
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Properties</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {selectedNode.type}
          </p>
        </div>
        <button
          onClick={() => {
            // Desselecionar node (implementaremos depois)
          }}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

     
      <div className="flex-1 overflow-y-auto p-4">
        {renderEditor()}
      </div>

  
      <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
        Node ID: <span className="font-mono">{selectedNode.id}</span>
      </div>
    </div>
  );
}