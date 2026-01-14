import { memo } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import { GitBranch } from 'lucide-react';
import { ConditionNodeData } from '@/lib/workflow/types';

export const ConditionNode = memo(({ data, selected }: NodeProps<ConditionNodeData>) => {
  return (
    <div
      className={`
        px-4 py-3 rounded-lg border-2 bg-white shadow-md min-w-[200px]
        ${selected ? 'border-amber-500 ring-2 ring-amber-200' : 'border-amber-400'}
        transition-all duration-200
      `}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-amber-500 border-2 border-white"
      />

      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-amber-100 rounded">
          <GitBranch className="w-4 h-4 text-amber-600" />
        </div>
        <div className="font-semibold text-sm text-gray-700 truncate">
          {data.label}
        </div>
      </div>

      {/* Body */}
      <div className="text-xs text-gray-500 space-y-1">
        <div className="font-mono bg-gray-50 p-1 rounded truncate">
          {data.condition}
        </div>
        {data.description && (
          <div className="text-gray-400">{data.description}</div>
        )}
      </div>

      {/* Output Handles - TRUE (top) e FALSE (bottom) */}
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{ top: '35%' }}
        className="w-3 h-3 !bg-green-500 border-2 border-white"
      />
      <div
        className="absolute right-[-45px] text-[10px] text-green-600 font-semibold"
        style={{ top: '32%' }}
      >
        TRUE
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="false"
        style={{ top: '65%' }}
        className="w-3 h-3 !bg-red-500 border-2 border-white"
      />
      <div
        className="absolute right-[-50px] text-[10px] text-red-600 font-semibold"
        style={{ top: '62%' }}
      >
        FALSE
      </div>
    </div>
  );
});

ConditionNode.displayName = 'ConditionNode';