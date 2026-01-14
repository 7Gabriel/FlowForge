import React, { ReactNode, memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { LucideIcon } from 'lucide-react';

interface BaseNodeProps {
  selected: boolean;
  icon: LucideIcon;
  label: string;
  color: 'green' | 'purple' | 'blue' | 'amber' | 'red';
  hasInput?: boolean;
  hasOutput?: boolean;
  children?: ReactNode;
}

const colorClasses = {
  green: {
    border: 'border-green-500',
    borderSelected: 'border-green-500 ring-2 ring-green-200',
    bg: 'bg-green-100',
    text: 'text-green-600',
    handle: '!bg-green-500',
  },
  purple: {
    border: 'border-purple-400',
    borderSelected: 'border-purple-500 ring-2 ring-purple-200',
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    handle: '!bg-purple-500',
  },
  blue: {
    border: 'border-blue-400',
    borderSelected: 'border-blue-500 ring-2 ring-blue-200',
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    handle: '!bg-blue-500',
  },
  amber: {
    border: 'border-amber-400',
    borderSelected: 'border-amber-500 ring-2 ring-amber-200',
    bg: 'bg-amber-100',
    text: 'text-amber-600',
    handle: '!bg-amber-500',
  },
  red: {
    border: 'border-red-400',
    borderSelected: 'border-red-500 ring-2 ring-red-200',
    bg: 'bg-red-100',
    text: 'text-red-600',
    handle: '!bg-red-500',
  },
};

export const BaseNode = memo(({
  selected,
  icon: Icon,
  label,
  color,
  hasInput = false,
  hasOutput = false,
  children,
}: BaseNodeProps) => {
  const colors = colorClasses[color];

  return (
    <div
      className={`
        px-4 py-3 rounded-lg border-2 bg-white shadow-md min-w-[200px]
        ${selected ? colors.borderSelected : colors.border}
        transition-all duration-200
      `}
    >
      {/* Input Handle */}
      {hasInput && (
        <Handle
          type="target"
          position={Position.Left}
          className={`w-3 h-3 ${colors.handle} border-2 border-white`}
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1.5 ${colors.bg} rounded`}>
          <Icon className={`w-4 h-4 ${colors.text}`} />
        </div>
        <div className="font-semibold text-sm text-gray-700 truncate">
          {label}
        </div>
      </div>

      {/* Custom Content */}
      {children && (
        <div className="text-xs text-gray-500 space-y-1">
          {children}
        </div>
      )}

      {/* Output Handle */}
      {hasOutput && (
        <Handle
          type="source"
          position={Position.Right}
          className={`w-3 h-3 ${colors.handle} border-2 border-white`}
        />
      )}
    </div>
  );
});

BaseNode.displayName = 'BaseNode';