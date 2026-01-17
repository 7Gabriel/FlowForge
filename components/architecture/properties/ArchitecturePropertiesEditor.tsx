'use client';

import React, { useState, useEffect } from 'react';
import { useReactFlow } from 'reactflow';
import { C4Level } from '@/lib/architecture/c4-types';

interface ArchitecturePropertiesEditorProps {
  nodeId: string;
}

export function ArchitecturePropertiesEditor({ nodeId }: ArchitecturePropertiesEditorProps) {
  const reactFlow = useReactFlow();
  
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [technology, setTechnology] = useState('');
  const [color, setColor] = useState('#2196F3');


  useEffect(() => {
    try {
      const nodes = reactFlow.getNodes();
      const node = nodes.find((n) => n.id === nodeId);
      
      if (node && node.data) {
        setLabel(node.data.label || '');
        setDescription(node.data.description || '');
        setTechnology(node.data.technology || '');
        setColor(node.data.color || '#2196F3');
      }
    } catch (error) {
      console.error('Error loading node data:', error);
    }
  }, [nodeId, reactFlow]);


  const updateNode = (updates: any) => {
    try {
      reactFlow.setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...updates,
              },
            };
          }
          return node;
        })
      );
    } catch (error) {
      console.error('Error updating node:', error);
    }
  };


  let selectedNode = null;
  try {
    const nodes = reactFlow.getNodes();
    selectedNode = nodes.find((n) => n.id === nodeId);
  } catch (error) {
    console.error('Error getting selected node:', error);
  }

  if (!selectedNode) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        Node not found
      </div>
    );
  }


  const levelLabels: Record<string, string> = {
    'context': 'Context',
    'container': 'Container',
    'component': 'Component',
    'code': 'Code',
  };

  const nodeLevel = selectedNode.data?.level || 'container';
  const nodeType = selectedNode.type || 'unknown';

  return (
    <div className="p-4 space-y-4">
 
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            C4 Level
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            {levelLabels[nodeLevel] || 'Unknown'}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Type
          </div>
          <div className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
            {nodeType}
          </div>
        </div>
      </div>


      <div className="border-t border-gray-200" />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Label
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
            updateNode({ label: e.target.value });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter label..."
        />
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            updateNode({ description: e.target.value });
          }}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Enter description..."
        />
      </div>

 
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Technology
        </label>
        <input
          type="text"
          value={technology}
          onChange={(e) => {
            setTechnology(e.target.value);
            updateNode({ technology: e.target.value });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., React, Node.js, PostgreSQL"
        />
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              updateNode({ color: e.target.value });
            }}
            className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => {
              const newColor = e.target.value;
              if (/^#[0-9A-F]{6}$/i.test(newColor)) {
                setColor(newColor);
                updateNode({ color: newColor });
              }
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            placeholder="#2196F3"
          />
        </div>
      </div>


      <div className="pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex justify-between">
            <span>Node ID:</span>
            <span className="font-mono">{nodeId.substring(0, 12)}...</span>
          </div>
          <div className="flex justify-between">
            <span>Category:</span>
            <span className="font-mono">{selectedNode.data?.category || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}