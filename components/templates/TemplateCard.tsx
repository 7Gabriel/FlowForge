'use client';

import React from 'react';
import { ArchitectureTemplate } from '@/lib/templates/template-types';
import { Layers, Tag, User, TrendingUp } from 'lucide-react';

interface TemplateCardProps {
  template: ArchitectureTemplate;
  onSelect: () => void;
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
};

const difficultyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <div className="group bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-xl transition-all duration-200 overflow-hidden cursor-pointer">
      {/* Thumbnail / Preview */}
      <div className="h-40 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center border-b-2 border-gray-200 group-hover:border-blue-500 transition-colors">
        <div className="text-center p-4">
          <Layers className="w-12 h-12 text-blue-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-gray-700">
            {template.nodes.length} Components
          </p>
          <p className="text-xs text-gray-500">
            {template.edges.length} Connections
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title & Difficulty */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1">
            {template.name}
          </h3>
          {template.difficulty && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${difficultyColors[template.difficulty]}`}>
              {difficultyLabels[template.difficulty]}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
          {template.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
          {template.tags.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium text-gray-500">
              +{template.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
          {template.author && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <User className="w-3 h-3" />
              {template.author}
            </div>
          )}
          <button
            onClick={onSelect}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Use Template
          </button>
        </div>
      </div>
    </div>
  );
}