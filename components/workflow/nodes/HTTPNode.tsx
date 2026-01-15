import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { Globe } from 'lucide-react';
import { HTTPNodeData } from '@/lib/workflow/types';
import { BaseNode } from './BaseNode';

export const HTTPNode = memo(({ data, selected }: NodeProps<HTTPNodeData>) => {
  return (
    <BaseNode
      selected={selected}
      icon={Globe}
      label={data.label}
      color="blue"
      hasInput={true}
      hasOutput={true}
      executionStatus={(data as any).executionStatus}
    >
      <div className="flex items-center gap-1">
        <span className="font-semibold text-blue-600">{data.method}</span>
        <span>•</span>
        <span className="truncate max-w-[150px]">{data.url}</span>
      </div>
      {data.description && (
        <div className="text-gray-400">{data.description}</div>
      )}
    </BaseNode>
  );
});

HTTPNode.displayName = 'HTTPNode';