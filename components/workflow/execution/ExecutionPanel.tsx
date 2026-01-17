'use client';

import React from 'react';
import { CheckCircle, XCircle, Clock, Loader2, X } from 'lucide-react';
import { useWorkflowExecution } from '@/contexts/WorkflowExecutionContext';

interface ExecutionPanelProps {
  result: any;
  isExecuting: boolean;
}

export function ExecutionPanel({ result, isExecuting }: ExecutionPanelProps) {
  const { clearResults } = useWorkflowExecution();

  if (!result && !isExecuting) return null;


  const isArchitecture = result?.steps?.[0]?.nodeType !== undefined;

  const statusConfig = result?.success
    ? {
        icon: CheckCircle,
        text: 'Success',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
      }
    : {
        icon: XCircle,
        text: 'Failed',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
      };

  const StatusIcon = statusConfig.icon;

  return (
    <div className="w-96 h-screen bg-white border-l border-gray-200 flex flex-col shadow-lg">
   
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
          <h2 className="text-lg font-semibold text-gray-800">
            {isExecuting ? 'Executing...' : 'Execution Results'}
          </h2>
        </div>
        <button
          onClick={clearResults}
          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      
      <div className={`p-4 ${statusConfig.bgColor} border-b ${statusConfig.borderColor}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Status</span>
          <span className={`text-sm font-bold ${statusConfig.color}`}>
            {isExecuting ? 'Running' : statusConfig.text}
          </span>
        </div>
        {!isExecuting && result && (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Duration</span>
              <span className="text-sm text-gray-600">{result.totalDuration || 0}ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {isArchitecture ? 'Nodes Processed' : 'Success'}
              </span>
              <span className="text-sm text-gray-600">
                {result.steps?.length || 0}
              </span>
            </div>
            {result.error && (
              <div className="mt-3 p-2 bg-red-100 border border-red-200 rounded">
                <p className="text-xs text-red-800 font-mono">{result.error}</p>
              </div>
            )}
          </>
        )}
        {isExecuting && (
          <div className="flex items-center gap-2 mt-2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            <span className="text-sm text-gray-600">Processing nodes...</span>
          </div>
        )}
      </div>
]
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Execution Flow</h3>
        
        {result?.steps?.length > 0 ? (
          <div className="space-y-3">
            {result.steps.map((step: any, index: number) => {
              const stepStatus = step.status || 'success';
              const stepIcon = stepStatus === 'success' 
                ? CheckCircle 
                : stepStatus === 'error' 
                ? XCircle 
                : Clock;
              
              const StepIcon = stepIcon;
              
              const iconColor = stepStatus === 'success'
                ? 'text-green-600'
                : stepStatus === 'error'
                ? 'text-red-600'
                : 'text-gray-400';

              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <StepIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {step.nodeName || step.name || `Step ${index + 1}`}
                      </span>
                      {step.duration && (
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {step.duration}ms
                        </span>
                      )}
                    </div>
                    
                    {step.nodeType && (
                      <div className="text-xs text-gray-500 mb-1">
                        Type: {step.nodeType}
                      </div>
                    )}
                    
                    {step.message && (
                      <div className="text-xs text-gray-600 mt-1">
                        {step.message}
                      </div>
                    )}
                    
                    {step.output && (
                      <div className="mt-2 p-2 bg-white border border-gray-200 rounded">
                        <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap break-words">
                          {typeof step.output === 'string' 
                            ? step.output 
                            : JSON.stringify(step.output, null, 2)}
                        </pre>
                      </div>
                    )}
                    
                    {step.error && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                        <p className="text-xs text-red-800 font-mono">{step.error}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <Clock className="w-8 h-8 mb-2" />
            <p className="text-sm">No execution steps yet</p>
          </div>
        )}
      </div>

  
      {!isExecuting && result && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={clearResults}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Results
          </button>
        </div>
      )}
    </div>
  );
}