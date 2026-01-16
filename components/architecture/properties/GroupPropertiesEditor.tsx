'use client';

import React from 'react';
import { Node } from 'reactflow';
import { GroupNodeData } from '@/lib/architecture/c4-types';
import { useNodeForm } from '@/hooks/useNodeForm';
import { FormField } from '@/components/workflow/properties/FormField';
import { Input } from '@/components/workflow/properties/Input';
import { Textarea } from '@/components/workflow/properties/Textarea';

interface GroupPropertiesEditorProps {
  node: Node<GroupNodeData>;
  onUpdate: (data: Partial<GroupNodeData>) => void;
}

export function GroupPropertiesEditor({ node, onUpdate }: GroupPropertiesEditorProps) {
  // ⚠️ LOG para debug
  console.log('📝 GroupPropertiesEditor - Node:', node);
  console.log('📝 GroupPropertiesEditor - Data:', node.data);

  // ⚠️ PROTEÇÃO: Verificar se node.data existe
  if (!node || !node.data) {
    return (
      <div className="p-4 text-center text-red-600">
        <p className="text-sm">Error: Node data is missing</p>
      </div>
    );
  }

  const { formData, updateField } = useNodeForm({
    initialData: node.data,
    onUpdate,
  });

  return (
    <div className="p-4 space-y-4">
      {/* Label */}
      <FormField
        label="Group Label"
        description="Name of the container/group"
      >
        <Input
          value={formData.label || ''}
          onChange={(e) => updateField('label', e.target.value)}
          placeholder="Enter group name"
        />
      </FormField>

      {/* Description */}
      <FormField
        label="Description"
        description="Brief description of the group"
      >
        <Textarea
          value={formData.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Enter description"
          rows={2}
        />
      </FormField>

      {/* Color */}
      <FormField
        label="Border Color"
        description="Color of the group border"
      >
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={formData.color || '#FF9900'}
            onChange={(e) => updateField('color', e.target.value)}
            className="w-12 h-10 border border-gray-200 rounded cursor-pointer"
          />
          <Input
            value={formData.color || '#FF9900'}
            onChange={(e) => updateField('color', e.target.value)}
            placeholder="#FF9900"
          />
        </div>
      </FormField>

      {/* Background Color */}
      <FormField
        label="Background Color"
        description="Fill color of the group"
      >
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={formData.backgroundColor || '#FFF4E6'}
            onChange={(e) => updateField('backgroundColor', e.target.value)}
            className="w-12 h-10 border border-gray-200 rounded cursor-pointer"
          />
          <Input
            value={formData.backgroundColor || '#FFF4E6'}
            onChange={(e) => updateField('backgroundColor', e.target.value)}
            placeholder="#FFF4E6"
          />
        </div>
      </FormField>

      {/* Border Style */}
      <FormField
        label="Border Style"
        description="Line style of the border"
      >
        <select
          value={formData.borderStyle || 'dashed'}
          onChange={(e) => updateField('borderStyle', e.target.value as any)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="dashed">Dashed</option>
          <option value="solid">Solid</option>
          <option value="dotted">Dotted</option>
        </select>
      </FormField>

      {/* Border Width */}
      <FormField
        label="Border Width"
        description="Thickness of the border (px)"
      >
        <Input
          type="number"
          value={formData.borderWidth || 3}
          onChange={(e) => updateField('borderWidth', parseInt(e.target.value))}
          min={1}
          max={10}
        />
      </FormField>
    </div>
  );
}