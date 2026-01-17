'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Box } from 'lucide-react';
import { C4Level } from '@/lib/architecture/c4-types';
import { c4Templates, getTemplatesByLevel } from '@/lib/architecture/c4-templates';
import { groupTemplates } from '@/lib/architecture/group-templates';
import { ArchitectureNodeItem } from './ArchitectureNodeItem';
import { GroupNodeItem } from './GroupNodeItem';

const levelLabels: Record<C4Level, string> = {
  [C4Level.CONTEXT]: 'Context',
  [C4Level.CONTAINER]: 'Container',
  [C4Level.COMPONENT]: 'Component',
  [C4Level.CODE]: 'Code',
};

const levelDescriptions: Record<C4Level, string> = {
  [C4Level.CONTEXT]: 'System boundaries and external actors',
  [C4Level.CONTAINER]: 'Applications, services, and data stores',
  [C4Level.COMPONENT]: 'Internal components and modules',
  [C4Level.CODE]: 'Classes and code structures',
};

export function ArchitectureNodePalette() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedLevels, setExpandedLevels] = useState<Set<C4Level>>(
    new Set([C4Level.CONTEXT, C4Level.CONTAINER])
  );
  const [expandedGroups, setExpandedGroups] = useState(true);

  const toggleLevel = (level: C4Level) => {
    setExpandedLevels((prev) => {
      const next = new Set(prev);
      if (next.has(level)) {
        next.delete(level);
      } else {
        next.add(level);
      }
      return next;
    });
  };


  const filteredTemplates = c4Templates.filter((template) =>
    template.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.defaultData.technology?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const filteredGroups = groupTemplates.filter((template) =>
    template.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const groupedByLevel = filteredTemplates.reduce((acc, template) => {
    if (!acc[template.level]) {
      acc[template.level] = [];
    }
    acc[template.level].push(template);
    return acc;
  }, {} as Record<C4Level, typeof c4Templates>);

  return (
    <div className="w-80 h-screen bg-white border-r border-gray-200 flex flex-col">
 
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Architecture Palette
        </h2>
        <p className="text-xs text-gray-500 mb-3">
          C4 Model Components
        </p>
        

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

   
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
      
        {filteredGroups.length > 0 && (
          <div>
            <button
              onClick={() => setExpandedGroups(!expandedGroups)}
              className="flex items-start gap-2 w-full text-left mb-2 hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <div className="mt-0.5">
                {expandedGroups ? (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-800 flex items-center gap-2">
                  <Box className="w-4 h-4" />
                  Groups / Containers
                  <span className="text-xs text-gray-400 font-normal">
                    {filteredGroups.length}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Visual grouping containers
                </div>
              </div>
            </button>

            {expandedGroups && (
              <div className="space-y-2 ml-6">
                {filteredGroups.map((template) => (
                  <GroupNodeItem key={template.style} template={template} />
                ))}
              </div>
            )}
          </div>
        )}

      
        {Object.values(C4Level).map((level) => {
          const templates = groupedByLevel[level] || [];
          const isExpanded = expandedLevels.has(level);

          if (templates.length === 0) return null;

          return (
            <div key={level}>
              <button
                onClick={() => toggleLevel(level)}
                className="flex items-start gap-2 w-full text-left mb-2 hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <div className="mt-0.5">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-800 flex items-center gap-2">
                    {levelLabels[level]}
                    <span className="text-xs text-gray-400 font-normal">
                      {templates.length}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {levelDescriptions[level]}
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="space-y-2 ml-6">
                  {templates.map((template) => (
                    <ArchitectureNodeItem key={template.category} template={template} />
                  ))}
                </div>
              )}
            </div>
          );
        })}

  
        {filteredTemplates.length === 0 && filteredGroups.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No components found</p>
          </div>
        )}
      </div>

   
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-600">
          <div className="font-semibold mb-1">C4 Model Levels:</div>
          <div className="space-y-0.5">
            <div><span className="font-mono">1.</span> Context - System scope</div>
            <div><span className="font-mono">2.</span> Container - Applications</div>
            <div><span className="font-mono">3.</span> Component - Internal parts</div>
            <div><span className="font-mono">4.</span> Code - Implementation</div>
          </div>
        </div>
      </div>
    </div>
  );
}