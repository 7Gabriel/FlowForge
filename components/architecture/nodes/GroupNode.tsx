import React, { memo } from 'react';
import { NodeProps } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { GroupNodeData } from '@/lib/architecture/c4-types';

export const GroupNode = memo(({ data, selected }: NodeProps<GroupNodeData>) => {
  return (
    <>
      {/* Resizer para ajustar tamanho */}
      <NodeResizer
        color={data.color}
        isVisible={selected}
        minWidth={300}
        minHeight={200}
      />

      {/* Container */}
      <div
        className="w-full h-full rounded-lg relative overflow-visible"
        style={{
          border: `${data.borderWidth}px ${data.borderStyle} ${data.color}`,
          backgroundColor: data.backgroundColor || 'transparent',
        }}
      >
        {/* Header/Badge no topo esquerdo FORA da borda */}
        <div
          className="absolute px-3 py-1 rounded font-semibold text-xs shadow-md"
          style={{
            backgroundColor: data.color,
            color: '#FFFFFF',
            top: '-12px',
            left: '8px',
            zIndex: 10,
          }}
        >
          {data.label}
        </div>

        {/* Description (opcional) - dentro do container */}
        {data.description && (
          <div
            className="absolute top-3 left-3 text-xs italic opacity-60"
            style={{
              color: data.color,
              maxWidth: 'calc(100% - 24px)',
            }}
          >
            {data.description}
          </div>
        )}

        {/* Content Area - nodes filhos renderizam aqui */}
        <div className="w-full h-full" />
      </div>
    </>
  );
});

GroupNode.displayName = 'GroupNode';