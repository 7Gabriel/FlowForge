'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Node } from 'reactflow';

interface ClipboardContextType {
  copiedNodes: Node[];
  copyNodes: (nodes: Node[]) => void;
  cutNodes: (nodes: Node[], onCut: () => void) => void;
  pasteNodes: (position?: { x: number; y: number }) => Node[];
  hasCopiedNodes: boolean;
  clearClipboard: () => void;
}

const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export function ClipboardProvider({ children }: { children: React.ReactNode }) {
  const [copiedNodes, setCopiedNodes] = useState<Node[]>([]);
  const [isCut, setIsCut] = useState(false);
  const [cutCallback, setCutCallback] = useState<(() => void) | null>(null);

  const copyNodes = useCallback((nodes: Node[]) => {
    if (nodes.length === 0) return;
    
  
    setCopiedNodes(nodes);
    setIsCut(false);
    setCutCallback(null);
  }, []);

  const cutNodes = useCallback((nodes: Node[], onCut: () => void) => {
    if (nodes.length === 0) return;
    
 
    setCopiedNodes(nodes);
    setIsCut(true);
    setCutCallback(() => onCut);
  }, []);

  const pasteNodes = useCallback((position?: { x: number; y: number }) => {
    if (copiedNodes.length === 0) return [];


    // Calculate offset for pasted nodes
    const offset = position 
      ? { x: position.x, y: position.y }
      : { x: 50, y: 50 }; // Default offset if no position provided

    // Get the bounding box of copied nodes
    const minX = Math.min(...copiedNodes.map(n => n.position.x));
    const minY = Math.min(...copiedNodes.map(n => n.position.y));

    // Create new nodes with updated IDs and positions
    const newNodes = copiedNodes.map((node) => {
      const relativeX = node.position.x - minX;
      const relativeY = node.position.y - minY;

      return {
        ...node,
        id: `${node.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        position: {
          x: offset.x + relativeX,
          y: offset.y + relativeY,
        },
        selected: false, // Deselect copied nodes
      };
    });

    // If this was a cut operation, execute the cut callback
    if (isCut && cutCallback) {
      cutCallback();
      setIsCut(false);
      setCutCallback(null);
      setCopiedNodes([]); // Clear clipboard after cut+paste
    }

    return newNodes;
  }, [copiedNodes, isCut, cutCallback]);

  const clearClipboard = useCallback(() => {

    setCopiedNodes([]);
    setIsCut(false);
    setCutCallback(null);
  }, []);

  const hasCopiedNodes = copiedNodes.length > 0;

  return (
    <ClipboardContext.Provider
      value={{
        copiedNodes,
        copyNodes,
        cutNodes,
        pasteNodes,
        hasCopiedNodes,
        clearClipboard,
      }}
    >
      {children}
    </ClipboardContext.Provider>
  );
}

export function useClipboard() {
  const context = useContext(ClipboardContext);
  if (!context) {
    throw new Error('useClipboard must be used within ClipboardProvider');
  }
  return context;
}