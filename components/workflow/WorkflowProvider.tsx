'use client';

import { ReactFlowProvider } from 'reactflow';
import { ReactNode } from 'react';
import { WorkflowExecutionProvider } from '@/contexts/WorkflowExecutionContext';
import { AppModeProvider } from '@/contexts/AppModeContext';
import { ArchitectureSimulationProvider } from '@/contexts/ArchitectureSimulationContext'; // ⚠️ Novo

interface WorkflowProviderProps {
  children: ReactNode;
}

export function WorkflowProvider({ children }: WorkflowProviderProps) {
  return (
    <ReactFlowProvider>
      <AppModeProvider>
        <WorkflowExecutionProvider>
          <ArchitectureSimulationProvider> {/* ⚠️ Novo */}
            {children}
          </ArchitectureSimulationProvider>
        </WorkflowExecutionProvider>
      </AppModeProvider>
    </ReactFlowProvider>
  );
}