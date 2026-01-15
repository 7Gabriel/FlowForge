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
  EdgeTypes, // ⚠️ Novo
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { TriggerNode } from './nodes/TriggerNode';
import { LLMNode } from './nodes/LLMNode';
import { HTTPNode } from './nodes/HTTPNode';
import { ConditionNode } from './nodes/ConditionNode';
import { OutputNode } from './nodes/OutputNode';
import { C4Node } from '@/components/architecture/nodes/C4Node';
import { AnimatedEdge } from '@/components/architecture/edges/AnimatedEdge'; // ⚠️ Novo
import { NodeType } from '@/lib/workflow/types';
import { getNodeTemplate } from '@/lib/workflow/node-templates';
import { getC4Template } from '@/lib/architecture/c4-templates';
import { C4NodeCategory } from '@/lib/architecture/c4-types';
import { useAppMode } from '@/contexts/AppModeContext'; // ⚠️ Novo
import { AppMode } from '@/lib/types'; // ⚠️ Novo

const nodeTypes: NodeTypes = {
  [NodeType.TRIGGER]: TriggerNode,
  [NodeType.LLM]: LLMNode,
  [NodeType.HTTP]: HTTPNode,
  [NodeType.CONDITION]: ConditionNode,
  [NodeType.OUTPUT]: OutputNode,
  'architecture': C4Node,
};

// ⚠️ NOVO: Edge Types
const edgeTypes: EdgeTypes = {
  'animated': AnimatedEdge,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const { mode } = useAppMode(); // ⚠️ Novo

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      console.log('✅ Connection created');
      
      // ⚠️ NOVO: Usar edge animado em Architecture mode
      const newEdge = {
        ...connection,
        type: mode === AppMode.ARCHITECTURE ? 'animated' : 'default',
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [mode, setEdges]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      if (!reactFlowInstance) {
        return;
      }

      const nodeType = event.dataTransfer.getData('application/reactflow');
      const isArchitecture = event.dataTransfer.getData('nodeType') === 'architecture';

      if (!nodeType) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      let newNode: Node;

      if (isArchitecture) {
        const template = getC4Template(nodeType as C4NodeCategory);
        if (!template) {
          console.error('Architecture template not found:', nodeType);
          return;
        }

        newNode = {
          id: `arch-${Date.now()}`,
          type: 'architecture',
          position,
          data: {
            ...template.defaultData,
            category: template.category,
            level: template.level,
            color: template.color,
            icon: template.iconName,
          },
        };
      } else {
        const template = getNodeTemplate(nodeType as NodeType);
        if (!template) {
          console.error('Workflow template not found:', nodeType);
          return;
        }

        newNode = {
          id: `${nodeType}-${Date.now()}`,
          type: nodeType,
          position,
          data: { ...template.defaultData },
        };
      }

      setNodes((nds) => nds.concat(newNode));
      console.log('✅ Node created:', newNode);
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div 
      ref={reactFlowWrapper} 
      className="w-full h-full bg-gray-50"
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
        edgeTypes={edgeTypes} // ⚠️ Novo
        fitView
        selectNodesOnDrag={false}
        panOnDrag={[1, 2]}
        selectionOnDrag={false}
        className="bg-gray-50"
      >
        <Background color="#e5e7eb" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            if (node.type === 'architecture') {
              return (node.data as any).color || '#438DD5';
            }
            
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