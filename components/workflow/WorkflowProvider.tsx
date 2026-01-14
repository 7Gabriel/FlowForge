'use client';

import { ReactFlowProvider } from 'reactflow';
import { ReactNode } from 'react';

interface WorkflowProviderProps {
  children: ReactNode;
}

export function WorkflowProvider({ children }: WorkflowProviderProps) {
  return <ReactFlowProvider>{children}</ReactFlowProvider>;
}