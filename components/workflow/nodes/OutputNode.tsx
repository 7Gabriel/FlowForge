import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { Save } from 'lucide-react';
import { OutputNodeData } from '@/lib/workflow/types';
import { BaseNode } from './BaseNode';

export const OutputNode = memo(({ data, selected }: NodeProps<OutputNodeData>) => {
  return (
    <BaseNode
      selected={selected}
      icon={Save}
      label={data.label}
      color="red"
      hasInput={true}
      hasOutput={false}
      executionStatus={(data as any).executionStatus} // ⚠️ Novo
    >
      <div>Type: {data.outputType}</div>
      {data.destination && (
        <div className="text-gray-400 truncate max-w-[180px]">
          → {data.destination}
        </div>
      )}
      {data.description && (
        <div className="text-gray-400 mt-1">{data.description}</div>
      )}
    </BaseNode>
  );
});

OutputNode.displayName = 'OutputNode';