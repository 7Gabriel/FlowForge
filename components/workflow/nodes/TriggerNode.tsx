import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { Play } from 'lucide-react';
import { TriggerNodeData } from '@/lib/workflow/types';
import { BaseNode } from './BaseNode';

export const TriggerNode = memo(({ data, selected }: NodeProps<TriggerNodeData>) => {
  return (
    <BaseNode
      selected={selected}
      icon={Play}
      label={data.label}
      color="green"
      hasOutput={true}
      executionStatus={(data as any).executionStatus}
    >
      <div>Type: {data.triggerType}</div>
      {data.description && (
        <div className="text-gray-400">{data.description}</div>
      )}
    </BaseNode>
  );
});

TriggerNode.displayName = 'TriggerNode';