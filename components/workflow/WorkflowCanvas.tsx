'use client';

import { useCallback, useRef, DragEvent, useState, KeyboardEvent, useEffect } from 'react';
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
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { TriggerNode } from './nodes/TriggerNode';
import { LLMNode } from './nodes/LLMNode';
import { HTTPNode } from './nodes/HTTPNode';
import { ConditionNode } from './nodes/ConditionNode';
import { OutputNode } from './nodes/OutputNode';
import { C4Node } from '@/components/architecture/nodes/C4Node';
import { GroupNode } from '@/components/architecture/nodes/GroupNode';
import { PersonNode } from '@/components/architecture/nodes/PersonNode';
import { ExternalSystemNode } from '@/components/architecture/nodes/ExternalSystemNode';
import { ContainerWebNode } from '@/components/architecture/nodes/ContainerWebNode';
import { ContainerServiceNode } from '@/components/architecture/nodes/ContainerServiceNode';
import { DatabaseNode } from '@/components/architecture/nodes/DatabaseNode';
import { ComponentNode } from '@/components/architecture/nodes/ComponentNode';
import { AnimatedEdge } from '@/components/architecture/edges/AnimatedEdge';
import { EditableEdge } from '@/components/architecture/edges/EditableEdge';
import { NodeType } from '@/lib/workflow/types';
import { getNodeTemplate } from '@/lib/workflow/node-templates';
import { getC4Template } from '@/lib/architecture/c4-templates';
import { getGroupTemplate } from '@/lib/architecture/group-templates';
import { C4NodeCategory, GroupStyle, C4VisualStyle } from '@/lib/architecture/c4-types';
import { useAppMode } from '@/contexts/AppModeContext';
import { AppMode } from '@/lib/types';

const nodeTypes: NodeTypes = {
 
  [NodeType.TRIGGER]: TriggerNode,
  [NodeType.LLM]: LLMNode,
  [NodeType.HTTP]: HTTPNode,
  [NodeType.CONDITION]: ConditionNode,
  [NodeType.OUTPUT]: OutputNode,
  

  'architecture': C4Node,
  'group': GroupNode,
  

  'person': PersonNode,
  'external-system': ExternalSystemNode,
  'container-web': ContainerWebNode,
  'container-service': ContainerServiceNode,
  'database': DatabaseNode,
  'component': ComponentNode,
};

const edgeTypes: EdgeTypes = {
  'animated': AnimatedEdge,
  'editable': EditableEdge,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

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

  const defaultEdgeOptions = {
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#94A3B8',
    },
    style: {
      strokeWidth: 3,
      stroke: '#94A3B8',
    },
  };

  useEffect(() => {
    const handleNodeHighlight = (event: any) => {
      const { nodeId, status } = event.detail;
      
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === nodeId) {
            let borderColor = '#2196F3';
            let borderWidth = '3px';
            let boxShadow = 'none';
            
            if (status === 'executing') {
              borderColor = '#FFA500';
              borderWidth = '4px';
              boxShadow = '0 0 20px rgba(255, 165, 0, 0.6)';
            } else if (status === 'success') {
              borderColor = '#4CAF50';
              borderWidth = '4px';
              boxShadow = '0 0 20px rgba(76, 175, 80, 0.6)';
            } else if (status === 'error') {
              borderColor = '#F44336';
              borderWidth = '4px';
              boxShadow = '0 0 20px rgba(244, 67, 54, 0.6)';
            }
            
            return {
              ...node,
              style: {
                ...node.style,
                borderColor,
                borderWidth,
                boxShadow,
                transition: 'all 0.3s ease',
              },
            };
          }
          return node;
        })
      );
    };

    const handleEdgeHighlight = (event: any) => {
      const { edgeId, highlight } = event.detail;
      
      setEdges((edges) =>
        edges.map((edge) => {
          if (edge.id === edgeId) {
            return {
              ...edge,
              animated: highlight,
              style: {
                ...edge.style,
                stroke: highlight ? '#FFA500' : '#3B82F6',
                strokeWidth: highlight ? 4 : 3,
              },
            };
          }
          return edge;
        })
      );
    };

    window.addEventListener('architecture:highlight-node', handleNodeHighlight as EventListener);
    window.addEventListener('architecture:highlight-edge', handleEdgeHighlight as EventListener);

    return () => {
      window.removeEventListener('architecture:highlight-node', handleNodeHighlight as EventListener);
      window.removeEventListener('architecture:highlight-edge', handleEdgeHighlight as EventListener);
    };
  }, [setNodes, setEdges]);

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      console.log('✅ Connection created');
      
      const newEdge = {
        ...connection,
        type: 'editable',
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: '#3B82F6',
        },
        style: {
          strokeWidth: 3, 
          stroke: '#3B82F3',
          cursor: 'pointer', 
        },
        data: {
          label: '',
          edgeStyle: 'dashed' as const,
          onLabelChange: (edgeId: string, newLabel: string) => {
            setEdges((eds) =>
              eds.map((edge) =>
                edge.id === edgeId
                  ? { ...edge, data: { ...edge.data, label: newLabel } }
                  : edge
              )
            );
          },
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
    [setEdges]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
  
      if (!reactFlowInstance) {
        console.error('❌ ReactFlow instance not ready');
        return;
      }
  
      const nodeType = event.dataTransfer.getData('application/reactflow');
      const dragType = event.dataTransfer.getData('nodeType');

  
      if (!nodeType) {
        console.error('❌ No nodeType found');
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
          console.error('❌ Group template not found:', nodeType);
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
            width: 500,
            height: 350,
            zIndex: -1,
          },
        };
      } else if (dragType === 'architecture') {
        const template = getC4Template(nodeType as C4NodeCategory);
        if (!template) {
          console.error('❌ Architecture template not found:', nodeType);
          return;
        }

  
        const visualStyle = template.defaultData.visualStyle;
        let nodeTypeStr = 'architecture';
        let nodeWidth = 180;
        let nodeHeight = 140;
  
        switch (visualStyle) {
          case C4VisualStyle.PERSON:
            nodeTypeStr = 'person';
            nodeWidth = 180;
            nodeHeight = 160;
            break;
          case C4VisualStyle.EXTERNAL_SYSTEM:
            nodeTypeStr = 'external-system';
            nodeWidth = 180;
            nodeHeight = 140;
            break;
          case C4VisualStyle.CONTAINER_WEB:
            nodeTypeStr = 'container-web';
            nodeWidth = 200;
            nodeHeight = 160;
            break;
          case C4VisualStyle.CONTAINER_SERVICE:
            nodeTypeStr = 'container-service';
            nodeWidth = 200;
            nodeHeight = 160;
            break;
          case C4VisualStyle.DATABASE:
            nodeTypeStr = 'database';
            nodeWidth = 180;
            nodeHeight = 200;
            break;
          case C4VisualStyle.COMPONENT:
            nodeTypeStr = 'component';
            nodeWidth = 160;
            nodeHeight = 120;
            break;
          default:
            nodeTypeStr = 'architecture';
            nodeWidth = 180;
            nodeHeight = 140;
        }
  
        newNode = {
          id: `arch-${Date.now()}`,
          type: nodeTypeStr,
          position,
          data: {
            ...template.defaultData,
            category: template.category,
            level: template.level,
            color: template.color,
            icon: template.iconName,
            visualStyle: visualStyle,
          },
          style: {
            width: nodeWidth,
            height: nodeHeight,
          },
        };
      } else {
        const template = getNodeTemplate(nodeType as NodeType);
        if (!template) {
          console.error('❌ Workflow template not found:', nodeType);
          return;
        }
  
        newNode = {
          id: `${nodeType}-${Date.now()}`,
          type: nodeType,
          position,
          data: { ...template.defaultData },
        };
      }
  
      setNodes((nds) => {
        const updated = nds.concat(newNode);
        return updated;
      });
    },
    [reactFlowInstance, setNodes]
  );

  const onNodesDelete = useCallback((deleted: Node[]) => {
    console.log('🗑️ Nodes deleted:', deleted);
  }, []);

  const onEdgesDelete = useCallback((deleted: Edge[]) => {
    console.log('🗑️ Edges deleted:', deleted);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        const selectedNodes = nodes.filter((node) => node.selected);
        const selectedEdges = edges.filter((edge) => edge.selected);

        if (selectedNodes.length > 0 || selectedEdges.length > 0) {
          if (selectedNodes.length > 0) {
            setNodes((nds) => nds.filter((node) => !node.selected));
          }
          
          if (selectedEdges.length > 0) {
            setEdges((eds) => eds.filter((edge) => !edge.selected));
          }
        }
      }
    },
    [nodes, edges, setNodes, setEdges]
  );

  

  return (
    <div 
      ref={reactFlowWrapper} 
      className="w-full h-full bg-gray-50"
      onDrop={onDrop}
      onDragOver={onDragOver}
      tabIndex={0}
      onKeyDown={handleKeyDown as any}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        selectNodesOnDrag={false}
        panOnDrag={[1, 2]}
        selectionOnDrag={false}
        deleteKeyCode="Delete"
        className="bg-gray-50"
      >
        <Background color="#e5e7eb" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            if (node.type === 'group') {
              return (node.data as any).color || '#607D8B';
            }
            
            if (node.type === 'person') return '#4CAF50';
            if (node.type === 'external-system') return '#FF5722';
            if (node.type === 'container-web') return '#2196F3';
            if (node.type === 'container-service') return '#2196F3';
            if (node.type === 'database') return '#2196F3';
            if (node.type === 'component') return '#2196F3';
            
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