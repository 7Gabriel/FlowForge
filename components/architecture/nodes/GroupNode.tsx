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
        className="w-full h-full rounded-lg relative"
        style={{
          border: `${data.borderWidth}px ${data.borderStyle} ${data.color}`,
          backgroundColor: data.backgroundColor || 'transparent',
        }}
      >
        {/* Header/Title */}
        <div
          className="absolute top-2 left-2 px-3 py-1 rounded font-semibold text-sm shadow-sm"
          style={{
            backgroundColor: data.color,
            color: '#FFFFFF',
          }}
        >
          {data.label}
        </div>

        {/* Description (optional) */}
        {data.description && (
          <div
            className="absolute top-10 left-2 px-2 py-0.5 text-xs italic opacity-75"
            style={{
              color: data.color,
            }}
          >
            {data.description}
          </div>
        )}

        {/* Content Area */}
        <div className="w-full h-full" />
      </div>
    </>
  );
});

GroupNode.displayName = 'GroupNode';