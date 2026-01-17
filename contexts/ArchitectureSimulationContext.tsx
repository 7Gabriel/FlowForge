'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Node, Edge, useReactFlow } from 'reactflow';

export enum SimulationStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

interface SimulationStep {
  nodeId: string;
  timestamp: number;
  status: 'pending' | 'executing' | 'completed';
}

interface ArchitectureSimulationContextType {
  status: SimulationStatus;
  currentStep: number;
  steps: SimulationStep[];
  startSimulation: () => Promise<void>;
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  resetSimulation: () => void;
}

const ArchitectureSimulationContext = createContext<ArchitectureSimulationContextType | undefined>(
  undefined
);

export function ArchitectureSimulationProvider({ children }: { children: ReactNode }) {
  const { getNodes, getEdges, setNodes } = useReactFlow();
  const [status, setStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  
  const findStartNodes = useCallback((nodes: Node[], edges: Edge[]): Node[] => {
    const nodesWithInput = new Set(edges.map((e) => e.target));
    return nodes.filter((node) => !nodesWithInput.has(node.id));
  }, []);


  const topologicalSort = useCallback((nodes: Node[], edges: Edge[]): string[] => {
    const startNodes = findStartNodes(nodes, edges);
    const visited = new Set<string>();
    const order: string[] = [];

    const queue = [...startNodes.map((n) => n.id)];

    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      
      if (visited.has(nodeId)) continue;
      visited.add(nodeId);
      order.push(nodeId);

      const nextNodes = edges
        .filter((e) => e.source === nodeId)
        .map((e) => e.target);

      queue.push(...nextNodes);
    }

    return order;
  }, [findStartNodes]);

  const startSimulation = useCallback(async () => {
    const nodes = getNodes();
    const edges = getEdges();

    if (nodes.length === 0) {
      console.warn('No nodes to simulate');
      return;
    }

    setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          simulationStatus: undefined,
        },
      }))
    );

    const executionOrder = topologicalSort(nodes, edges);
    
    const simulationSteps: SimulationStep[] = executionOrder.map((nodeId) => ({
      nodeId,
      timestamp: Date.now(),
      status: 'pending',
    }));

    setSteps(simulationSteps);
    setStatus(SimulationStatus.RUNNING);
    setCurrentStep(0);
    setIsPaused(false);

    console.log('🎬 Simulation started. Execution order:', executionOrder);

    for (let i = 0; i < executionOrder.length; i++) {

      while (isPaused) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const nodeId = executionOrder[i];
      setCurrentStep(i);

      setNodes((nodes) =>
        nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            simulationStatus: node.id === nodeId ? 'executing' : node.data.simulationStatus,
          },
        }))
      );

      console.log(`▶️  Executing node ${i + 1}/${executionOrder.length}: ${nodeId}`);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setNodes((nodes) =>
        nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            simulationStatus: node.id === nodeId ? 'completed' : node.data.simulationStatus,
          },
        }))
      );
    }

    setStatus(SimulationStatus.COMPLETED);
    console.log('✅ Simulation completed');
  }, [getNodes, getEdges, setNodes, topologicalSort, isPaused]);

  const pauseSimulation = useCallback(() => {
    setIsPaused(true);
    setStatus(SimulationStatus.PAUSED);
  }, []);

  const resumeSimulation = useCallback(() => {
    setIsPaused(false);
    setStatus(SimulationStatus.RUNNING);
  }, []);

  const resetSimulation = useCallback(() => {
    setStatus(SimulationStatus.IDLE);
    setCurrentStep(0);
    setSteps([]);
    setIsPaused(false);

    setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          simulationStatus: undefined,
        },
      }))
    );

    console.log('🔄 Simulation reset');
  }, [setNodes]);

  return (
    <ArchitectureSimulationContext.Provider
      value={{
        status,
        currentStep,
        steps,
        startSimulation,
        pauseSimulation,
        resumeSimulation,
        resetSimulation,
      }}
    >
      {children}
    </ArchitectureSimulationContext.Provider>
  );
}

export function useArchitectureSimulation() {
  const context = useContext(ArchitectureSimulationContext);
  if (!context) {
    throw new Error('useArchitectureSimulation must be used within ArchitectureSimulationProvider');
  }
  return context;
}