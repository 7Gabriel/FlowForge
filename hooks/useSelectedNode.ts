import { useCallback, useState, useEffect } from 'react';
import { Node, useReactFlow, useOnSelectionChange } from 'reactflow';

export function useSelectedNode() {
  const { setNodes } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Escutar mudanças de seleção
  useOnSelectionChange({
    onChange: ({ nodes }) => {
      // nodes é um array de nodes selecionados
      if (nodes.length > 0) {
        setSelectedNode(nodes[0]); // Pegar o primeiro selecionado
        console.log('✅ Node selected:', nodes[0].id, nodes[0].type);
      } else {
        setSelectedNode(null);
        console.log('❌ No node selected');
      }
    },
  });

  // Atualizar dados do node selecionado
  const updateNodeData = useCallback(
    (nodeId: string, newData: Partial<any>) => {
      console.log('📝 Updating node:', nodeId, newData);
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...newData,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  return {
    selectedNode,
    updateNodeData,
  };
}