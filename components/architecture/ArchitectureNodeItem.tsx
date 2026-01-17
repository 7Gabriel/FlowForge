import React from 'react';
import { C4Template } from '@/lib/architecture/c4-templates';
import { getIconByName } from '@/lib/architecture/icon-registry';
import { Box } from 'lucide-react';

interface ArchitectureNodeItemProps {
  template: C4Template;
}

export function ArchitectureNodeItem({ template }: ArchitectureNodeItemProps) {
  const Icon = getIconByName(template.iconName) || Box;

  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', template.category);
    event.dataTransfer.setData('nodeType', 'architecture');
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`
        flex items-start gap-3 p-3 rounded-lg border-2 cursor-grab active:cursor-grabbing
        transition-all duration-150 hover:shadow-md
      `}
      style={{
        backgroundColor: `${template.color}15`,
        borderColor: template.color,
      }}
    >
      <div className="mt-0.5" style={{ color: template.color }}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-gray-800">
          {template.label}
        </div>
        <div className="text-xs text-gray-600 mt-0.5">
          {template.description}
        </div>
        {template.defaultData.technology && (
          <div className="text-xs text-gray-500 mt-1 italic">
            {template.defaultData.technology}
          </div>
        )}
      </div>
    </div>
  );
}