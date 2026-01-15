'use client';

import { useCallback } from 'react';
import { useReactFlow, getNodesBounds, getViewportForBounds } from 'reactflow';
import { toPng, toSvg } from 'html-to-image';

const IMAGE_WIDTH = 2048;
const IMAGE_HEIGHT = 1536;

export function useCanvasExport() {
  const { getNodes } = useReactFlow();

  // ========================================
  // Download helper
  // ========================================
  const downloadImage = useCallback((dataUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();
  }, []);

  // ========================================
  // Export to PNG
  // ========================================
  const exportToPng = useCallback(
    async (fileName: string = 'architecture-diagram.png') => {
      try {
        const nodesBounds = getNodesBounds(getNodes());
        const viewport = getViewportForBounds(
          nodesBounds,
          IMAGE_WIDTH,
          IMAGE_HEIGHT,
          0.5,
          2,
          0.2 // padding
        );

        const element = document.querySelector('.react-flow__viewport') as HTMLElement;
        if (!element) {
          throw new Error('Canvas element not found');
        }

        console.log('📸 Exporting to PNG...');

        const dataUrl = await toPng(element, {
          backgroundColor: '#ffffff',
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          style: {
            width: `${IMAGE_WIDTH}px`,
            height: `${IMAGE_HEIGHT}px`,
            transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
          },
        });

        downloadImage(dataUrl, fileName);
        console.log('✅ PNG exported successfully');
      } catch (error) {
        console.error('❌ Failed to export PNG:', error);
        throw error;
      }
    },
    [getNodes, downloadImage]
  );

  // ========================================
  // Export to SVG
  // ========================================
  const exportToSvg = useCallback(
    async (fileName: string = 'architecture-diagram.svg') => {
      try {
        const nodesBounds = getNodesBounds(getNodes());
        const viewport = getViewportForBounds(
          nodesBounds,
          IMAGE_WIDTH,
          IMAGE_HEIGHT,
          0.5,
          2,
          0.2
        );

        const element = document.querySelector('.react-flow__viewport') as HTMLElement;
        if (!element) {
          throw new Error('Canvas element not found');
        }

        console.log('📸 Exporting to SVG...');

        const dataUrl = await toSvg(element, {
          backgroundColor: '#ffffff',
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          style: {
            width: `${IMAGE_WIDTH}px`,
            height: `${IMAGE_HEIGHT}px`,
            transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
          },
        });

        downloadImage(dataUrl, fileName);
        console.log('✅ SVG exported successfully');
      } catch (error) {
        console.error('❌ Failed to export SVG:', error);
        throw error;
      }
    },
    [getNodes, downloadImage]
  );

  return {
    exportToPng,
    exportToSvg,
  };
}