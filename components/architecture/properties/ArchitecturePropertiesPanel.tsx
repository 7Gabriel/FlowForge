'use client';

import React, { useState, useEffect } from 'react';
import { useReactFlow } from 'reactflow';
import { ArchitecturePropertiesEditor } from './ArchitecturePropertiesEditor';
import { GroupPropertiesEditor } from './GroupPropertiesEditor';
import { Settings } from 'lucide-react';

export function ArchitecturePropertiesPanel() {
  const reactFlow = useReactFlow();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [, forceUpdate] = useState(0);

  // Polling para detectar mudanças de seleção
  useEffect(() => {
    const checkSelection = () => {
      try {
        const nodes = reactFlow.getNodes();
        const selected = nodes.find((node) => node.selected);
        
        if (selected?.id !== selectedNodeId) {
          console.log('🔄 Selection changed:', selected?.id);
          setSelectedNodeId(selected?.id || null);
        }
      } catch (error) {
        console.error('Error checking selection:', error);
      }
    };

    // Check imediatamente
    checkSelection();

    // Check a cada 100ms
    const interval = setInterval(checkSelection, 100);

    return () => clearInterval(interval);
  }, [reactFlow, selectedNodeId]);

  // Pegar o node selecionado
  let selectedNode = null;
  let allNodes = [];
  
  try {
    allNodes = reactFlow.getNodes();
    selectedNode = allNodes.find((node) => node.id === selectedNodeId);
  } catch (error) {
    console.error('Error getting nodes:', error);
  }

  const isGroup = selectedNode?.type === 'group';

  return (
    <div className="w-80 h-screen bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-gray-800">
          <Settings className="w-5 h-5" />
          <h2 className="text-lg font-semibold">
            {isGroup ? 'Group Properties' : 'Properties'}
          </h2>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {selectedNode
            ? isGroup
              ? 'Edit group container'
              : 'Edit component properties'
            : 'Select a component to edit'}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {selectedNode ? (
          isGroup ? (
            <GroupPropertiesEditor nodeId={selectedNode.id} />
          ) : (
            <ArchitecturePropertiesEditor nodeId={selectedNode.id} />
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
            <Settings className="w-12 h-12 mb-3 opacity-50" />
            <p className="text-sm">Select a component to view and edit its properties</p>
          </div>
        )}
      </div>
    </div>
  );
}