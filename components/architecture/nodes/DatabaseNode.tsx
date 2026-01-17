import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { Database as DatabaseIcon } from 'lucide-react';

export const DatabaseNode = memo(({ data, selected }: NodeProps) => {
  return (
    <>
      <NodeResizer
        color="#2196F3"
        isVisible={selected}
        minWidth={180}
        minHeight={200}
      />

      <div
        className="w-full h-full flex flex-col items-center justify-center relative"
        style={{
          minWidth: '180px',
          minHeight: '200px',
        }}
      >
        {/* Handles Bidirecionais */}
        <Handle type="target" position={Position.Top} id="top-target" className="w-3 h-3 !bg-blue-500" style={{ top: -6 }} />
        <Handle type="source" position={Position.Top} id="top-source" className="w-3 h-3 !bg-green-500" style={{ top: -6, left: '55%' }} />
        
        <Handle type="target" position={Position.Right} id="right-target" className="w-3 h-3 !bg-blue-500" style={{ right: -6 }} />
        <Handle type="source" position={Position.Right} id="right-source" className="w-3 h-3 !bg-green-500" style={{ right: -6, top: '55%' }} />
        
        <Handle type="target" position={Position.Bottom} id="bottom-target" className="w-3 h-3 !bg-blue-500" style={{ bottom: -6 }} />
        <Handle type="source" position={Position.Bottom} id="bottom-source" className="w-3 h-3 !bg-green-500" style={{ bottom: -6, left: '55%' }} />
        
        <Handle type="target" position={Position.Left} id="left-target" className="w-3 h-3 !bg-blue-500" style={{ left: -6 }} />
        <Handle type="source" position={Position.Left} id="left-source" className="w-3 h-3 !bg-green-500" style={{ left: -6, top: '55%' }} />

        {/* Cilindro SVG */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 180 200"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
        >
          <ellipse
            cx="90"
            cy="30"
            rx="85"
            ry="25"
            fill="#E3F2FD"
            stroke={selected ? '#1976D2' : '#2196F3'}
            strokeWidth="3"
          />
          
          <rect
            x="5"
            y="30"
            width="170"
            height="140"
            fill="#E3F2FD"
            stroke="none"
          />
          
          <line x1="5" y1="30" x2="5" y2="170" stroke={selected ? '#1976D2' : '#2196F3'} strokeWidth="3" />
          <line x1="175" y1="30" x2="175" y2="170" stroke={selected ? '#1976D2' : '#2196F3'} strokeWidth="3" />
          
          <ellipse
            cx="90"
            cy="170"
            rx="85"
            ry="25"
            fill="#E3F2FD"
            stroke={selected ? '#1976D2' : '#2196F3'}
            strokeWidth="3"
          />
        </svg>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center" style={{ marginTop: '40px' }}>
          <div className="mb-2">
            <DatabaseIcon className="w-12 h-12 text-blue-700" />
          </div>

          <div className="font-bold text-base text-blue-900 text-center mb-1 px-4">
            {data?.label || 'Database'}
          </div>

          {data?.technology && (
            <div className="text-xs text-blue-700 italic text-center px-4">
              [{data.technology}]
            </div>
          )}

          {data?.description && (
            <div className="text-xs text-blue-800 text-center mt-1 px-6">
              {data.description}
            </div>
          )}
        </div>
      </div>
    </>
  );
});

DatabaseNode.displayName = 'DatabaseNode';