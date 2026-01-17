'use client';

import React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  type?: 'success' | 'error' | 'info';
}

export function AlertModal({
  isOpen,
  title,
  message,
  onClose,
  type = 'info',
}: AlertModalProps) {
  if (!isOpen) return null;

  const configs = {
    success: {
      icon: CheckCircle,
      iconColor: 'text-green-600',
      bg: 'bg-green-50',
      buttonColor: 'bg-green-600 hover:bg-green-700',
    },
    error: {
      icon: AlertCircle,
      iconColor: 'text-red-600',
      bg: 'bg-red-50',
      buttonColor: 'bg-red-600 hover:bg-red-700',
    },
    info: {
      icon: Info,
      iconColor: 'text-blue-600',
      bg: 'bg-blue-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${config.bg}`}>
              <Icon className={`w-5 h-5 ${config.iconColor}`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${config.buttonColor}`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}