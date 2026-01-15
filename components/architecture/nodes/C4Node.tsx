import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { ArchitectureNodeData } from '@/lib/architecture/c4-types';
import { getIconByName } from '@/lib/architecture/icon-registry';
import { Box, Loader2 } from 'lucide-react';

export const C4Node = memo(({ data, selected }: NodeProps<ArchitectureNodeData>) => {
  const IconComponent = data.icon ? (getIconByName(data.icon) || Box) : Box;
  
  // ⚠️ NOVO: Estado de simulação
  const simulationStatus = (data as any).simulationStatus;

  // Determinar estilo baseado em simulação
  let borderColor = selected ? '#3B82F6' : 'transparent';
  let borderWidth = '2px';
  
  if (simulationStatus === 'executing') {
    borderColor = '#10B981'; // Verde
    borderWidth = '4px';
  } else if (simulationStatus === 'completed') {
    borderColor = '#6B7280'; // Cinza
    borderWidth = '2px';
  }

  return (
    <div
      className={`
        relative px-6 py-4 rounded-lg border-2 shadow-lg min-w-[180px] max-w-[250px]
        ${selected ? 'ring-4 ring-blue-300' : ''}
        ${simulationStatus === 'executing' ? 'animate-pulse' : ''}
        transition-all duration-200
      `}
      style={{
        backgroundColor: data.color || '#438DD5',
        borderColor,
        borderWidth,
      }}
    >
      {/* ⚠️ NOVO: Indicador de execução */}
      {simulationStatus === 'executing' && (
        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1.5 shadow-lg">
          <Loader2 className="w-4 h-4 text-white animate-spin" />
        </div>
      )}

      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-gray-400 border-2 border-white"
      />

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

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-gray-400 border-2 border-white"
      />
    </div>
  );
});

C4Node.displayName = 'C4Node';