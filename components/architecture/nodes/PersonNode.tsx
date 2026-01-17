import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { User } from 'lucide-react';

export const PersonNode = memo(({ data, selected }: NodeProps) => {
  return (
    <>
      <NodeResizer
        color="#4CAF50"
        isVisible={selected}
        minWidth={180}
        minHeight={160}
      />

      <div
        className="w-full h-full flex flex-col items-center justify-center p-4 relative"
        style={{
          backgroundColor: '#E8F5E9',
          border: selected ? '3px solid #1976D2' : '3px solid #4CAF50',
          borderRadius: '8px',
        }}
      >
        {/* TOP - Target e Source */}
        <Handle 
          type="target" 
          position={Position.Top} 
          id="top-target" 
          className="w-3 h-3 !bg-blue-500"
          style={{ top: -6 }}
        />
        <Handle 
          type="source" 
          position={Position.Top} 
          id="top-source" 
          className="w-3 h-3 !bg-green-500"
          style={{ top: -6, left: '55%' }}
        />

        {/* RIGHT - Target e Source */}
        <Handle 
          type="target" 
          position={Position.Right} 
          id="right-target" 
          className="w-3 h-3 !bg-blue-500"
          style={{ right: -6 }}
        />
        <Handle 
          type="source" 
          position={Position.Right} 
          id="right-source" 
          className="w-3 h-3 !bg-green-500"
          style={{ right: -6, top: '55%' }}
        />

        {/* BOTTOM - Target e Source */}
        <Handle 
          type="target" 
          position={Position.Bottom} 
          id="bottom-target" 
          className="w-3 h-3 !bg-blue-500"
          style={{ bottom: -6 }}
        />
        <Handle 
          type="source" 
          position={Position.Bottom} 
          id="bottom-source" 
          className="w-3 h-3 !bg-green-500"
          style={{ bottom: -6, left: '55%' }}
        />

        {/* LEFT - Target e Source */}
        <Handle 
          type="target" 
          position={Position.Left} 
          id="left-target" 
          className="w-3 h-3 !bg-blue-500"
          style={{ left: -6 }}
        />
        <Handle 
          type="source" 
          position={Position.Left} 
          id="left-source" 
          className="w-3 h-3 !bg-green-500"
          style={{ left: -6, top: '55%' }}
        />

        {/* Conteúdo */}
        <div className="text-6xl mb-2">👤</div>
        <div className="font-bold text-base text-green-900 text-center">
          {data?.label || 'User'}
        </div>
        {data?.description && (
          <div className="text-xs text-green-800 text-center mt-1">
            {data.description}
          </div>
        )}
      </div>
    </>
  );
});

PersonNode.displayName = 'PersonNode';