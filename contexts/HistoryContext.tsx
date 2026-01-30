'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Node, Edge } from 'reactflow';

interface HistoryState {
  nodes: Node[];
  edges: Edge[];
  timestamp: number;
}

interface HistoryContextType {
  canUndo: boolean;
  canRedo: boolean;
  undo: () => { nodes: Node[]; edges: Edge[] } | null;
  redo: () => { nodes: Node[]; edges: Edge[] } | null;
  pushState: (nodes: Node[], edges: Edge[]) => void;
  clearHistory: () => void;
  getHistorySize: () => { past: number; future: number };
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

const MAX_HISTORY_SIZE = 50; // Maximum number of undo steps

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [past, setPast] = useState<HistoryState[]>([]);
  const [future, setFuture] = useState<HistoryState[]>([]);
  const isUndoRedoAction = useRef(false);

  const pushState = useCallback((nodes: Node[], edges: Edge[]) => {
    // Don't add to history if this is an undo/redo action
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      return;
    }

    const newState: HistoryState = {
      nodes: JSON.parse(JSON.stringify(nodes)), // Deep clone
      edges: JSON.parse(JSON.stringify(edges)), // Deep clone
      timestamp: Date.now(),
    };

    setPast((prev) => {
      const newPast = [...prev, newState];
      // Keep only last MAX_HISTORY_SIZE states
      if (newPast.length > MAX_HISTORY_SIZE) {
        return newPast.slice(newPast.length - MAX_HISTORY_SIZE);
      }
      return newPast;
    });

    // Clear future when new action is performed
    setFuture([]);

    console.log('📝 State pushed to history');
  }, []);

  const undo = useCallback(() => {
    if (past.length === 0) {
      console.log('⚠️ Nothing to undo');
      return null;
    }

    const previousState = past[past.length - 1];
    const newPast = past.slice(0, -1);

    setPast(newPast);
    setFuture((prev) => [...prev, previousState]);
    isUndoRedoAction.current = true;

    console.log('↩️ Undo - restored state from', new Date(previousState.timestamp).toLocaleTimeString());

    return {
      nodes: JSON.parse(JSON.stringify(previousState.nodes)),
      edges: JSON.parse(JSON.stringify(previousState.edges)),
    };
  }, [past]);

  const redo = useCallback(() => {
    if (future.length === 0) {
      console.log('⚠️ Nothing to redo');
      return null;
    }

    const nextState = future[future.length - 1];
    const newFuture = future.slice(0, -1);

    setFuture(newFuture);
    setPast((prev) => [...prev, nextState]);
    isUndoRedoAction.current = true;

    console.log('↪️ Redo - restored state from', new Date(nextState.timestamp).toLocaleTimeString());

    return {
      nodes: JSON.parse(JSON.stringify(nextState.nodes)),
      edges: JSON.parse(JSON.stringify(nextState.edges)),
    };
  }, [future]);

  const clearHistory = useCallback(() => {
    setPast([]);
    setFuture([]);
    console.log('🗑️ History cleared');
  }, []);

  const getHistorySize = useCallback(() => {
    return {
      past: past.length,
      future: future.length,
    };
  }, [past.length, future.length]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  return (
    <HistoryContext.Provider
      value={{
        canUndo,
        canRedo,
        undo,
        redo,
        pushState,
        clearHistory,
        getHistorySize,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within HistoryProvider');
  }
  return context;
}