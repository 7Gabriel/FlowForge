import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { getIconByName } from '@/lib/architecture/icon-registry';
import { Server, Terminal } from 'lucide-react';

export const ContainerServiceNode = memo(({ data, selected }: NodeProps) => {
  const IconComponent = data?.icon ? (getIconByName(data.icon) || Server) : Server;

  return (
    <>
      <NodeResizer
        color="#2196F3"
        isVisible={selected}
        minWidth={180}
        minHeight={160}
      />

      <div
        className="w-full h-full flex flex-col relative"
        style={{
          backgroundColor: '#E3F2FD',
          border: selected ? '3px solid #1976D2' : '3px solid #2196F3',
          borderRadius: '8px',
        }}
      >
         
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

        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="mb-2">
            <IconComponent className="w-10 h-10 text-blue-700" />
          </div>

          <div className="font-bold text-base text-blue-900 text-center mb-1">
            {data?.label || 'Service'}
          </div>

          {data?.technology && (
            <div className="text-xs text-blue-700 italic text-center">
              [{data.technology}]
            </div>
          )}

          {data?.description && (
            <div className="text-xs text-blue-800 text-center mt-1 px-2">
              {data.description}
          </div>
          )}
        </div>
      </div>
    </>
  );
});

ContainerServiceNode.displayName = 'ContainerServiceNode';