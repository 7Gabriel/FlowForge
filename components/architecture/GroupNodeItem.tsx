import React from 'react';
import { GroupTemplate } from '@/lib/architecture/group-templates';
import { Box } from 'lucide-react';

interface GroupNodeItemProps {
  template: GroupTemplate;
}

export function GroupNodeItem({ template }: GroupNodeItemProps) {
  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', template.style);
    event.dataTransfer.setData('nodeType', 'group');
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="flex items-start gap-3 p-3 rounded-lg cursor-grab active:cursor-grabbing transition-all duration-150 hover:shadow-md"
      style={{
        backgroundColor: template.backgroundColor,
        border: `2px ${template.borderStyle} ${template.color}`,
      }}
    >
      <div className="mt-0.5" style={{ color: template.color }}>
        <Box className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-gray-800">
          {template.label}
        </div>
        <div className="text-xs text-gray-600 mt-0.5">
          {template.description}
        </div>
      </div>
    </div>
  );
}