'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Image, FileCode } from 'lucide-react';
import { useCanvasExport } from '@/hooks/useCanvasExport';

interface ExportImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultFileName?: string;
}

export function ExportImageDialog({ open, onOpenChange, defaultFileName = 'architecture-diagram' }: ExportImageDialogProps) {
  const { exportToPng, exportToSvg } = useCanvasExport();
  const [fileName, setFileName] = useState(defaultFileName);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPng = async () => {
    setIsExporting(true);
    try {
      await exportToPng(`${fileName}.png`);
      onOpenChange(false);
    } catch (error) {
      alert('Failed to export PNG');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportSvg = async () => {
    setIsExporting(true);
    try {
      await exportToSvg(`${fileName}.svg`);
      onOpenChange(false);
    } catch (error) {
      alert('Failed to export SVG');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export as Image
          </DialogTitle>
          <DialogDescription>
            Export your diagram as PNG or SVG image file
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* File Name */}
          <div className="space-y-2">
            <Label htmlFor="fileName">File Name</Label>
            <Input
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="architecture-diagram"
              disabled={isExporting}
            />
            <p className="text-xs text-gray-500">
              File extension will be added automatically
            </p>
          </div>

          {/* Image Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
            <div className="font-semibold text-blue-900 mb-1">Export Settings:</div>
            <div className="text-blue-700 space-y-0.5">
              <div>• Resolution: 2048 x 1536 px</div>
              <div>• Background: White</div>
              <div>• Format: PNG (raster) or SVG (vector)</div>
            </div>
          </div>

          {/* Format Comparison */}
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-gray-200 rounded-lg p-3 text-center">
              <Image className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="font-semibold text-sm mb-1">PNG</div>
              <div className="text-xs text-gray-600">
                Raster image
                <br />
                Best for presentations
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-3 text-center">
              <FileCode className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="font-semibold text-sm mb-1">SVG</div>
              <div className="text-xs text-gray-600">
                Vector image
                <br />
                Scales infinitely
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isExporting}
          >
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={handleExportPng}
              disabled={isExporting || !fileName.trim()}
              className="gap-2 bg-purple-600 hover:bg-purple-700"
            >
              {isExporting ? (
                <>Exporting...</>
              ) : (
                <>
                  <Image className="w-4 h-4" />
                  Export PNG
                </>
              )}
            </Button>
            <Button
              onClick={handleExportSvg}
              disabled={isExporting || !fileName.trim()}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              {isExporting ? (
                <>Exporting...</>
              ) : (
                <>
                  <FileCode className="w-4 h-4" />
                  Export SVG
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}