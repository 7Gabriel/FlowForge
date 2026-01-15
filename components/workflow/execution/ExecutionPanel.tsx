'use client';

import React from 'react';
import { WorkflowExecutionResult, ExecutionStatus } from '@/lib/workflow/execution/types';
import { NodeExecutionCard } from './NodeExecutionCard';
import { PlayCircle, CheckCircle2, XCircle, Clock, Activity } from 'lucide-react';

interface ExecutionPanelProps {
  result: WorkflowExecutionResult | null;
  isExecuting: boolean;
}

export function ExecutionPanel({ result, isExecuting }: ExecutionPanelProps) {
  if (isExecuting) {
    return (
      <div className="w-96 h-screen bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600 animate-pulse" />
            <h2 className="text-lg font-semibold text-gray-800">Executing...</h2>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-500">Running workflow...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="w-96 h-screen bg-white border-l border-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <PlayCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Run workflow to see results</p>
        </div>
      </div>
    );
  }

  const statusConfig = {
    [ExecutionStatus.SUCCESS]: {
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      label: 'Success',
    },
    [ExecutionStatus.ERROR]: {
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      label: 'Failed',
    },
    [ExecutionStatus.RUNNING]: {
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      label: 'Running',
    },
    [ExecutionStatus.IDLE]: {
      icon: Clock,
      color: 'text-gray-400',
      bgColor: 'bg-gray-50',
      label: 'Idle',
    },
    [ExecutionStatus.PAUSED]: {
      icon: Clock,
      color: 'text-gray-400',
      bgColor: 'bg-gray-50',
      label: 'Paused',
    },
  };

  const config = statusConfig[result.status];
  const StatusIcon = config.icon;

  return (
    <div className="w-96 h-screen bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <StatusIcon className={`w-5 h-5 ${config.color}`} />
          <h2 className="text-lg font-semibold text-gray-800">
            Execution Results
          </h2>
        </div>

        {/* Stats */}
        <div className={`${config.bgColor} rounded-lg p-3`}>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-gray-500">Status</div>
              <div className={`font-semibold ${config.color}`}>{config.label}</div>
            </div>
            <div>
              <div className="text-gray-500">Duration</div>
              <div className="font-semibold text-gray-800">{result.duration}ms</div>
            </div>
            <div>
              <div className="text-gray-500">Success</div>
              <div className="font-semibold text-green-600">{result.stats.successNodes}</div>
            </div>
            <div>
              <div className="text-gray-500">Failed</div>
              <div className="font-semibold text-red-600">{result.stats.errorNodes}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Node Results */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {result.nodeResults.map((nodeResult) => (
          <NodeExecutionCard key={nodeResult.nodeId} result={nodeResult} />
        ))}
      </div>

      {/* Final Output */}
      {result.finalOutput && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-xs font-semibold text-gray-600 mb-2">Final Output:</div>
          <pre className="text-xs bg-white p-2 rounded border border-gray-200 overflow-x-auto max-h-32">
            {JSON.stringify(result.finalOutput, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}