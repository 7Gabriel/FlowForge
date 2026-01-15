import React, { ReactNode, memo } from 'react';
import { Handle, Position } from 'reactflow';
import { LucideIcon, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { NodeExecutionStatus } from '@/lib/workflow/execution/types';

interface BaseNodeProps {
  selected: boolean;
  icon: LucideIcon;
  label: string;
  color: 'green' | 'purple' | 'blue' | 'amber' | 'red';
  hasInput?: boolean;
  hasOutput?: boolean;
  children?: ReactNode;
  executionStatus?: NodeExecutionStatus; // ⚠️ Novo
}

const colorClasses = {
  green: {
    border: 'border-green-500',
    borderSelected: 'border-green-500 ring-4 ring-green-200',
    bg: 'bg-green-100',
    text: 'text-green-600',
    handle: '!bg-green-500',
  },
  purple: {
    border: 'border-purple-400',
    borderSelected: 'border-purple-500 ring-4 ring-purple-200',
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    handle: '!bg-purple-500',
  },
  blue: {
    border: 'border-blue-400',
    borderSelected: 'border-blue-500 ring-4 ring-blue-200',
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    handle: '!bg-blue-500',
  },
  amber: {
    border: 'border-amber-400',
    borderSelected: 'border-amber-500 ring-4 ring-amber-200',
    bg: 'bg-amber-100',
    text: 'text-amber-600',
    handle: '!bg-amber-500',
  },
  red: {
    border: 'border-red-400',
    borderSelected: 'border-red-500 ring-4 ring-red-200',
    bg: 'bg-red-100',
    text: 'text-red-600',
    handle: '!bg-red-500',
  },
};

// ========================================
// Status Badge Component
// ========================================
function ExecutionStatusBadge({ status }: { status: NodeExecutionStatus }) {
  switch (status) {
    case NodeExecutionStatus.RUNNING:
      return (
        <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1 shadow-lg animate-pulse">
          <Loader2 className="w-3 h-3 text-white animate-spin" />
        </div>
      );
    case NodeExecutionStatus.SUCCESS:
      return (
        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 shadow-lg">
          <CheckCircle2 className="w-3 h-3 text-white" />
        </div>
      );
    case NodeExecutionStatus.ERROR:
      return (
        <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 shadow-lg">
          <XCircle className="w-3 h-3 text-white" />
        </div>
      );
    default:
      return null;
  }
}

export const BaseNode = memo(({
  selected,
  icon: Icon,
  label,
  color,
  hasInput = false,
  hasOutput = false,
  children,
  executionStatus, // ⚠️ Novo
}: BaseNodeProps) => {
  const colors = colorClasses[color];

  // Adicionar animação durante execução
  const isRunning = executionStatus === NodeExecutionStatus.RUNNING;

  return (
    <div
      className={`
        relative px-4 py-3 rounded-lg border-2 bg-white shadow-md min-w-[200px]
        ${selected ? colors.borderSelected : colors.border}
        ${isRunning ? 'animate-pulse' : ''}
        transition-all duration-200
        ${selected ? 'shadow-lg' : ''}
      `}
    >
      {/* Execution Status Badge */}
      {executionStatus && <ExecutionStatusBadge status={executionStatus} />}

      {/* Input Handle */}
      {hasInput && (
        <Handle
          type="target"
          position={Position.Left}
          className={`w-3 h-3 ${colors.handle} border-2 border-white transition-all`}
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
          className={`w-3 h-3 ${colors.handle} border-2 border-white transition-all`}
        />
      )}
    </div>
  );
});

BaseNode.displayName = 'BaseNode';