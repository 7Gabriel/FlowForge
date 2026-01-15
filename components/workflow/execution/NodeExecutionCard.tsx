import React, { useState } from 'react';
import { NodeExecutionResult, NodeExecutionStatus } from '@/lib/workflow/execution/types';
import { CheckCircle2, XCircle, Clock, ChevronDown, ChevronRight, Terminal } from 'lucide-react';

interface NodeExecutionCardProps {
  result: NodeExecutionResult;
}

export function NodeExecutionCard({ result }: NodeExecutionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusConfig = {
    [NodeExecutionStatus.SUCCESS]: {
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    [NodeExecutionStatus.ERROR]: {
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
    [NodeExecutionStatus.RUNNING]: {
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    [NodeExecutionStatus.PENDING]: {
      icon: Clock,
      color: 'text-gray-400',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
    },
    [NodeExecutionStatus.SKIPPED]: {
      icon: Clock,
      color: 'text-gray-400',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
    },
  };

  const config = statusConfig[result.status];
  const StatusIcon = config.icon;

  return (
    <div className={`border-2 rounded-lg ${config.borderColor} ${config.bgColor} overflow-hidden`}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <StatusIcon className={`w-5 h-5 ${config.color} flex-shrink-0`} />
        <div className="flex-1 text-left">
          <div className="font-semibold text-sm text-gray-800">
            {result.nodeType}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>{result.nodeId}</span>
            {result.duration && <span>• {result.duration}ms</span>}
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-3 space-y-3 border-t border-gray-200">
          {/* Output */}
          {result.output && (
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">Output:</div>
              <pre className="text-xs bg-white p-2 rounded border border-gray-200 overflow-x-auto">
                {JSON.stringify(result.output, null, 2)}
              </pre>
            </div>
          )}

          {/* Logs */}
          {result.logs && result.logs.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
                <Terminal className="w-3 h-3" />
                Logs:
              </div>
              <div className="bg-gray-900 text-green-400 p-2 rounded text-xs font-mono space-y-1">
                {result.logs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {result.error && (
            <div>
              <div className="text-xs font-semibold text-red-600 mb-1">Error:</div>
              <div className="bg-red-50 border border-red-200 p-2 rounded text-xs text-red-800">
                <div className="font-semibold">{result.error.message}</div>
                {result.error.stack && (
                  <pre className="mt-2 text-xs overflow-x-auto">
                    {result.error.stack}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}