'use client';

import React from 'react';
import { Workflow, Building2 } from 'lucide-react';
import { useAppMode } from '@/contexts/AppModeContext';
import { AppMode } from '@/lib/types';

export function ModeSwitcher() {
  const { mode, setMode } = useAppMode();

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setMode(AppMode.WORKFLOW)}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-all
          ${mode === AppMode.WORKFLOW 
            ? 'bg-white text-blue-600 shadow' 
            : 'text-gray-600 hover:text-gray-800'
          }
        `}
      >
        <Workflow className="w-4 h-4" />
        Workflow
      </button>
      <button
        onClick={() => setMode(AppMode.ARCHITECTURE)}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-all
          ${mode === AppMode.ARCHITECTURE 
            ? 'bg-white text-blue-600 shadow' 
            : 'text-gray-600 hover:text-gray-800'
          }
        `}
      >
        <Building2 className="w-4 h-4" />
        Architecture
      </button>
    </div>
  );
}