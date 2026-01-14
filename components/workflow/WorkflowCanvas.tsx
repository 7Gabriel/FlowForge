'use client';

import { useCallback, useRef, DragEvent, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  OnConnect,
  NodeTypes,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { TriggerNode } from './nodes/TriggerNode';
import { LLMNode } from './nodes/LLMNode';
import { HTTPNode } from './nodes/HTTPNode';
import { ConditionNode } from './nodes/ConditionNode';
import { OutputNode } from './nodes/OutputNode';
import { NodeType } from '@/lib/workflow/types';
import { getNodeTemplate } from '@/lib/workflow/node-templates';

const nodeTypes: NodeTypes = {
  [NodeType.TRIGGER]: TriggerNode,
  [NodeType.LLM]: LLMNode,
  [NodeType.HTTP]: HTTPNode,
  [NodeType.CONDITION]: ConditionNode,
  [NodeType.OUTPUT]: OutputNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      
      if (!type || !reactFlowInstance) {
        return;
      }

      const template = getNodeTemplate(type);
      if (!template) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { ...template.defaultData },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div 
      ref={reactFlowWrapper} 
      className="w-full h-screen bg-gray-50"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        fitView
        // ========================================
        // Configurações de Seleção
        // ========================================
        selectNodesOnDrag={false}  // Não selecionar durante drag
        panOnDrag={[1, 2]}  // Pan com botão do meio ou direito
        selectionOnDrag={false}  // Não criar selection box durante drag
        // ========================================
        className="bg-gray-50"
      >
        <Background color="#e5e7eb" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case NodeType.TRIGGER:
                return '#10b981';
              case NodeType.LLM:
                return '#a855f7';
              case NodeType.HTTP:
                return '#3b82f6';
              case NodeType.CONDITION:
                return '#f59e0b';
              case NodeType.OUTPUT:
                return '#ef4444';
              default:
                return '#6b7280';
            }
          }}
          className="!bg-white !border-2 !border-gray-200"
        />
      </ReactFlow>
    </div>
  );
}