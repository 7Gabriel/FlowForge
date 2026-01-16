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
  EdgeTypes,
  ReactFlowInstance,
  MarkerType, // ⚠️ Novo
} from 'reactflow';
import 'reactflow/dist/style.css';

import { TriggerNode } from './nodes/TriggerNode';
import { LLMNode } from './nodes/LLMNode';
import { HTTPNode } from './nodes/HTTPNode';
import { ConditionNode } from './nodes/ConditionNode';
import { OutputNode } from './nodes/OutputNode';
import { C4Node } from '@/components/architecture/nodes/C4Node';
import { GroupNode } from '@/components/architecture/nodes/GroupNode';
import { AnimatedEdge } from '@/components/architecture/edges/AnimatedEdge';
import { NodeType } from '@/lib/workflow/types';
import { getNodeTemplate } from '@/lib/workflow/node-templates';
import { getC4Template } from '@/lib/architecture/c4-templates';
import { getGroupTemplate } from '@/lib/architecture/group-templates';
import { C4NodeCategory, GroupStyle } from '@/lib/architecture/c4-types';
import { useAppMode } from '@/contexts/AppModeContext';
import { AppMode } from '@/lib/types';
import { EditableEdge } from '@/components/architecture/edges/EditableEdge'; // ⚠️ Novo


const nodeTypes: NodeTypes = {
  [NodeType.TRIGGER]: TriggerNode,
  [NodeType.LLM]: LLMNode,
  [NodeType.HTTP]: HTTPNode,
  [NodeType.CONDITION]: ConditionNode,
  [NodeType.OUTPUT]: OutputNode,
  'architecture': C4Node,
  'group': GroupNode,
};

const edgeTypes: EdgeTypes = {
  'animated': AnimatedEdge,
  'editable': EditableEdge, // ⚠️ Novo
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

// ⚠️ NOVO: Default edge options com setas
const defaultEdgeOptions = {
  type: 'smoothstep',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: '#94A3B8',
  },
  style: {
    strokeWidth: 2,
    stroke: '#94A3B8',
  },
};

export function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const { mode } = useAppMode();

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      console.log('✅ Connection created');
      
      const newEdge = {
        ...connection,
        type: mode === AppMode.ARCHITECTURE ? 'editable' : 'smoothstep',
        animated: false, // Animação controlada pelo edgeStyle
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: mode === AppMode.ARCHITECTURE ? '#3B82F6' : '#94A3B8',
        },
        style: {
          strokeWidth: 2,
          stroke: mode === AppMode.ARCHITECTURE ? '#3B82F6' : '#94A3B8',
        },
        data: {
          label: '',
          edgeStyle: 'dashed' as const, // ⚠️ Estilo padrão
          onLabelChange: (edgeId: string, newLabel: string) => {
            setEdges((eds) =>
              eds.map((edge) =>
                edge.id === edgeId
                  ? { ...edge, data: { ...edge.data, label: newLabel } }
                  : edge
              )
            );
          },
          // ⚠️ NOVO: Handler para mudar estilo
          onStyleChange: (edgeId: string, newStyle: string) => {
            setEdges((eds) =>
              eds.map((edge) =>
                edge.id === edgeId
                  ? { ...edge, data: { ...edge.data, edgeStyle: newStyle } }
                  : edge
              )
            );
          },
        },
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
      const dragType = event.dataTransfer.getData('nodeType');

      if (!nodeType) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      let newNode: Node;

      if (dragType === 'group') {
        const template = getGroupTemplate(nodeType as GroupStyle);
        if (!template) {
          console.error('Group template not found:', nodeType);
          return;
        }

        newNode = {
          id: `group-${Date.now()}`,
          type: 'group',
          position,
          data: {
            label: template.label,
            description: template.description,
            color: template.color,
            borderStyle: template.borderStyle,
            borderWidth: template.borderWidth,
            backgroundColor: template.backgroundColor,
            category: 'group',
          },
          style: {
            width: 400,
            height: 300,
            zIndex: -1,
          },
        };
      } else if (dragType === 'architecture') {
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
          style: {
            width: 180,
            height: 140,
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
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions} // ⚠️ Novo
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
            if (node.type === 'group') {
              return (node.data as any).color || '#607D8B';
            }
            
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