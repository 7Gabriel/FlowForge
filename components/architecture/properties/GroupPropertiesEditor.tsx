'use client';

import React, { useState, useEffect } from 'react';
import { useReactFlow } from 'reactflow';

interface GroupPropertiesEditorProps {
  nodeId: string;
}

export function GroupPropertiesEditor({ nodeId }: GroupPropertiesEditorProps) {
  const { getNodes, setNodes } = useReactFlow();
  
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#607D8B');
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [borderStyle, setBorderStyle] = useState<'solid' | 'dashed' | 'dotted'>('dashed');
  const [borderWidth, setBorderWidth] = useState(2);


  useEffect(() => {
    const nodes = getNodes();
    const node = nodes.find((n) => n.id === nodeId);
    
    if (node && node.data) {
      setLabel(node.data.label || '');
      setDescription(node.data.description || '');
      setColor(node.data.color || '#607D8B');
      setBackgroundColor(node.data.backgroundColor || 'transparent');
      setBorderStyle(node.data.borderStyle || 'dashed');
      setBorderWidth(node.data.borderWidth || 2);
    }
  }, [nodeId, getNodes]);

  const updateNode = (updates: any) => {
    setNodes((nodes) =>
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
  };

  return (
    <div className="p-4 space-y-4">
 
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Group name..."
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
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Group description..."
        />
      </div>

  
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Border Color
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
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="#607D8B"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Background Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={backgroundColor === 'transparent' ? '#FFFFFF' : backgroundColor}
            onChange={(e) => {
              setBackgroundColor(e.target.value);
              updateNode({ backgroundColor: e.target.value });
            }}
            className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={backgroundColor}
            onChange={(e) => {
              setBackgroundColor(e.target.value);
              updateNode({ backgroundColor: e.target.value });
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="transparent"
          />
        </div>
      </div>

     
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Border Style
        </label>
        <select
          value={borderStyle}
          onChange={(e) => {
            const newStyle = e.target.value as 'solid' | 'dashed' | 'dotted';
            setBorderStyle(newStyle);
            updateNode({ borderStyle: newStyle });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
        </select>
      </div>

     
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Border Width: {borderWidth}px
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={borderWidth}
          onChange={(e) => {
            const newWidth = parseInt(e.target.value);
            setBorderWidth(newWidth);
            updateNode({ borderWidth: newWidth });
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}