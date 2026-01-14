import React from 'react';
import { NodeTemplate } from '@/lib/workflow/node-templates';

interface NodeItemProps {
  template: NodeTemplate;
}

export function NodeItem({ template }: NodeItemProps) {
  const Icon = template.icon;

  const colorClasses = {
    green: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
    purple: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100',
    blue: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100',
    amber: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100',
    red: 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100',
  };

  const onDragStart = (event: React.DragEvent) => {
    // Passamos o tipo do node via dataTransfer
    event.dataTransfer.setData('application/reactflow', template.type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`
        flex items-start gap-3 p-3 rounded-lg border-2 cursor-grab active:cursor-grabbing
        transition-colors duration-150
        ${colorClasses[template.color]}
      `}
    >
      <div className="mt-0.5">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">
          {template.label}
        </div>
        <div className="text-xs opacity-75 mt-0.5">
          {template.description}
        </div>
      </div>
    </div>
  );
}