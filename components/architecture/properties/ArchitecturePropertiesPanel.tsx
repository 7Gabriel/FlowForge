'use client';

import React from 'react';
import { useArchitectureNode } from '@/hooks/useArchitectureNode';
import { useReactFlow } from 'reactflow';
import { ArchitectureNodeEditor } from './ArchitectureNodeEditor';
import { GroupPropertiesEditor } from './GroupPropertiesEditor';

export function ArchitecturePropertiesPanel() {
  const { selectedNode, updateNodeData } = useArchitectureNode();
  const { getNode } = useReactFlow();

  // ⚠️ PROTEÇÃO: Verificar se node existe
  if (!selectedNode) {
    return (
      <div className="w-96 h-screen bg-white border-l border-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-sm">Select a component to edit properties</div>
        </div>
      </div>
    );
  }

  // ⚠️ PROTEÇÃO: Pegar node do React Flow
  const selectedReactFlowNode = getNode(selectedNode.id);
  
  if (!selectedReactFlowNode) {
    return (
      <div className="w-96 h-screen bg-white border-l border-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-sm">Node not found</div>
        </div>
      </div>
    );
  }

  const isGroupNode = selectedReactFlowNode.type === 'group';

  // ⚠️ LOG para debug
  console.log('🔍 Selected Node:', {
    id: selectedReactFlowNode.id,
    type: selectedReactFlowNode.type,
    isGroup: isGroupNode,
    data: selectedReactFlowNode.data,
  });

  return (
    <div className="w-96 h-screen bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Properties</h2>
          <p className="text-xs text-gray-500">
            {isGroupNode ? 'Group Container' : ((selectedNode.data as any)?.category || 'Component')}
          </p>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto">
        {isGroupNode ? (
          <GroupPropertiesEditor
            node={selectedReactFlowNode}
            onUpdate={updateNodeData}
          />
        ) : (
          <ArchitectureNodeEditor
            node={selectedNode}
            onUpdate={updateNodeData}
          />
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500">
          <div className="font-semibold mb-1">Node ID:</div>
          <div className="font-mono bg-white px-2 py-1 rounded border border-gray-200 truncate">
            {selectedNode.id}
          </div>
          {/* ⚠️ DEBUG INFO */}
          <div className="font-semibold mb-1 mt-2">Node Type:</div>
          <div className="font-mono bg-white px-2 py-1 rounded border border-gray-200 truncate">
            {selectedReactFlowNode.type}
          </div>
        </div>
      </div>
    </div>
  );
}