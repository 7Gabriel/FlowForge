'use client';

import { useCallback, useEffect, useState } from 'react';
import { Node, useOnSelectionChange, useReactFlow } from 'reactflow';
import { ArchitectureNodeData } from '@/lib/architecture/c4-types';

export function useArchitectureNode() {
  const { setNodes } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState<Node<ArchitectureNodeData> | null>(null);

  // Listen to selection changes
  useOnSelectionChange({
    onChange: ({ nodes }) => {
      if (nodes.length === 1 && nodes[0].type === 'architecture') {
        setSelectedNode(nodes[0] as Node<ArchitectureNodeData>);
      } else {
        setSelectedNode(null);
      }
    },
  });

  // Update node data
  const updateNodeData = useCallback(
    (updates: Partial<ArchitectureNodeData>) => {
      if (!selectedNode) return;

      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === selectedNode.id) {
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
    },
    [selectedNode, setNodes]
  );

  return {
    selectedNode,
    updateNodeData,
  };
}