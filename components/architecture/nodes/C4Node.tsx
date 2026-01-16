import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { ArchitectureNodeData } from '@/lib/architecture/c4-types';
import { getIconByName } from '@/lib/architecture/icon-registry';
import { Box, Loader2 } from 'lucide-react';

export const C4Node = memo(({ data, selected }: NodeProps<ArchitectureNodeData>) => {
  const IconComponent = data.icon ? (getIconByName(data.icon) || Box) : Box;
  
  const simulationStatus = (data as any).simulationStatus;

  let borderColor = selected ? '#3B82F6' : 'transparent';
  let borderWidth = '2px';
  
  if (simulationStatus === 'executing') {
    borderColor = '#10B981';
    borderWidth = '4px';
  } else if (simulationStatus === 'completed') {
    borderColor = '#6B7280';
    borderWidth = '2px';
  }

  return (
    <>
      {/* Resizer */}
      <NodeResizer
        color={data.color || '#438DD5'}
        isVisible={selected}
        minWidth={150}
        minHeight={100}
      />

      <div
        className={`
          relative px-6 py-4 rounded-lg border-2 shadow-lg
          ${selected ? 'ring-4 ring-blue-300' : ''}
          ${simulationStatus === 'executing' ? 'animate-pulse' : ''}
          transition-all duration-200
        `}
        style={{
          backgroundColor: data.color || '#438DD5',
          borderColor,
          borderWidth,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Execution Status Badge */}
        {simulationStatus === 'executing' && (
          <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1.5 shadow-lg">
            <Loader2 className="w-4 h-4 text-white animate-spin" />
          </div>
        )}

        {/* ========================================
            HANDLES BIDIRECIONAIS (8 handles total)
            ======================================== */}

        {/* TOP - Input + Output */}
        <Handle
          type="target"
          position={Position.Top}
          id="top-target"
          className="w-3 h-3 !bg-gray-400 border-2 border-white hover:!bg-blue-500 transition-colors"
        />
        <Handle
          type="source"
          position={Position.Top}
          id="top-source"
          className="w-3 h-3 !bg-gray-400 border-2 border-white hover:!bg-blue-500 transition-colors"
          style={{ top: 0 }}
        />

        {/* RIGHT - Input + Output */}
        <Handle
          type="target"
          position={Position.Right}
          id="right-target"
          className="w-3 h-3 !bg-gray-400 border-2 border-white hover:!bg-blue-500 transition-colors"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="right-source"
          className="w-3 h-3 !bg-gray-400 border-2 border-white hover:!bg-blue-500 transition-colors"
          style={{ right: 0 }}
        />

        {/* BOTTOM - Input + Output */}
        <Handle
          type="target"
          position={Position.Bottom}
          id="bottom-target"
          className="w-3 h-3 !bg-gray-400 border-2 border-white hover:!bg-blue-500 transition-colors"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom-source"
          className="w-3 h-3 !bg-gray-400 border-2 border-white hover:!bg-blue-500 transition-colors"
          style={{ bottom: 0 }}
        />

        {/* LEFT - Input + Output */}
        <Handle
          type="target"
          position={Position.Left}
          id="left-target"
          className="w-3 h-3 !bg-gray-400 border-2 border-white hover:!bg-blue-500 transition-colors"
        />
        <Handle
          type="source"
          position={Position.Left}
          id="left-source"
          className="w-3 h-3 !bg-gray-400 border-2 border-white hover:!bg-blue-500 transition-colors"
          style={{ left: 0 }}
        />

        {/* Content */}
        <div className="text-center text-white">
          <div className="flex justify-center mb-2">
            <IconComponent className="w-8 h-8" />
          </div>
          <div className="font-bold text-sm mb-1">
            {data.label}
          </div>
          {data.technology && (
            <div className="text-xs opacity-90 italic">
              [{data.technology}]
            </div>
          )}
          {data.description && (
            <div className="text-xs opacity-75 mt-2">
              {data.description}
            </div>
          )}
        </div>
      </div>
    </>
  );
});

C4Node.displayName = 'C4Node';