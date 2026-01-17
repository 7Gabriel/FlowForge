'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { NodeItem } from './NodeItem';
import { nodeTemplates, NodeTemplate } from '@/lib/workflow/node-templates';

type Category = 'input' | 'processing' | 'logic' | 'output';

const categoryLabels: Record<Category, string> = {
  input: 'Input',
  processing: 'Processing',
  logic: 'Logic',
  output: 'Output',
};

export function NodePalette() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<Category>>(
    new Set(['input', 'processing', 'logic', 'output'])
  );

  const toggleCategory = (category: Category) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };


  const filteredTemplates = nodeTemplates.filter((template) =>
    template.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const groupedTemplates = filteredTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<Category, NodeTemplate[]>);

  return (
    <div className="w-80 h-screen bg-white border-r border-gray-200 flex flex-col">
   
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Node Palette
        </h2>
        
       
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

     
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(groupedTemplates).map(([category, templates]) => {
          const cat = category as Category;
          const isExpanded = expandedCategories.has(cat);

          return (
            <div key={category}>
             
              <button
                onClick={() => toggleCategory(cat)}
                className="flex items-center gap-2 w-full text-left mb-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                {categoryLabels[cat]}
                <span className="text-xs text-gray-400 ml-auto">
                  {templates.length}
                </span>
              </button>

            
              {isExpanded && (
                <div className="space-y-2">
                  {templates.map((template) => (
                    <NodeItem key={template.type} template={template} />
                  ))}
                </div>
              )}
            </div>
          );
        })}

    
        {filteredTemplates.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No nodes found</p>
          </div>
        )}
      </div>


      <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
        Drag & drop nodes to the canvas
      </div>
    </div>
  );
}