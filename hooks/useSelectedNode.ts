'use client';

import { useCallback, useState } from 'react';
import { Node, useOnSelectionChange, useReactFlow } from 'reactflow';

export function useSelectedNode() {
  const { setNodes } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);


  useOnSelectionChange({
    onChange: ({ nodes }) => {
  
      if (nodes.length === 1 && nodes[0].type !== 'architecture') {
        setSelectedNode(nodes[0]);
      } else {
        setSelectedNode(null);
      }
    },
  });


  const updateNodeData = useCallback(
    (updates: any) => {
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