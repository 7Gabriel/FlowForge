import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { Brain } from 'lucide-react';
import { LLMNodeData } from '@/lib/workflow/types';
import { BaseNode } from './BaseNode';

export const LLMNode = memo(({ data, selected }: NodeProps<LLMNodeData>) => {
  return (
    <BaseNode
      selected={selected}
      icon={Brain}
      label={data.label}
      color="purple"
      hasInput={true}
      hasOutput={true}
      executionStatus={(data as any).executionStatus} // ⚠️ Novo
    >
      <div>{data.provider} • {data.model}</div>
      {data.prompt && (
        <div className="text-gray-400 truncate max-w-[180px]">
          {data.prompt}
        </div>
      )}
    </BaseNode>
  );
});

LLMNode.displayName = 'LLMNode';