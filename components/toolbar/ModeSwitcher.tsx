'use client';

import React from 'react';
import { Workflow, Building2 } from 'lucide-react';
import { useAppMode } from '@/contexts/AppModeContext';
import { AppMode } from '@/lib/types';
import { useReactFlow } from 'reactflow';
import { useWorkflowExecution } from '@/contexts/WorkflowExecutionContext';
import { useArchitectureSimulation } from '@/contexts/ArchitectureSimulationContext';

export function ModeSwitcher() {
  const { mode, setMode } = useAppMode();
  const { setNodes, setEdges } = useReactFlow();
  const { clearResults } = useWorkflowExecution();
  const { resetSimulation } = useArchitectureSimulation();

  // ========================================
  // ⚠️ NOVO: Limpar ao trocar de mode
  // ========================================
  const handleModeChange = (newMode: AppMode) => {
    if (newMode === mode) return;

    // Confirmar se há nodes no canvas
    const hasNodes = document.querySelectorAll('.react-flow__node').length > 0;
    
    if (hasNodes) {
      const confirm = window.confirm(
        'Changing mode will clear the current canvas. Do you want to continue?'
      );
      
      if (!confirm) return;
    }

    // Limpar tudo
    setNodes([]);
    setEdges([]);
    clearResults();
    resetSimulation();

    // Trocar mode
    setMode(newMode);
    console.log(`✅ Switched to ${newMode} mode`);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => handleModeChange(AppMode.WORKFLOW)}
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
        onClick={() => handleModeChange(AppMode.ARCHITECTURE)}
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