import React from 'react';
import { ConditionNodeData } from '@/lib/workflow/types';
import { FormField } from '../FormField';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { useNodeForm } from '@/hooks/useNodeForm';

interface ConditionEditorProps {
  nodeId: string;
  data: ConditionNodeData;
  onUpdate: (nodeId: string, data: Partial<ConditionNodeData>) => void;
}

export function ConditionEditor({ nodeId, data, onUpdate }: ConditionEditorProps) {
  const { formData, updateField } = useNodeForm({
    initialData: data,
    onUpdate: (updatedData) => onUpdate(nodeId, updatedData),
  });

  return (
    <div className="space-y-4">
      <FormField label="Label">
        <Input
          value={formData.label}
          onChange={(e) => updateField('label', e.target.value)}
          placeholder="Enter label..."
        />
      </FormField>

      <FormField 
        label="Condition (JavaScript)"
        description="Use variables from previous nodes"
      >
        <Textarea
          value={formData.condition}
          onChange={(e) => updateField('condition', e.target.value)}
          placeholder="result.status === 'success'"
          rows={4}
          className="font-mono text-xs"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="True Path Label">
          <Input
            value={formData.paths.true}
            onChange={(e) => updateField('paths', { 
              ...formData.paths, 
              true: e.target.value 
            })}
            placeholder="Success"
          />
        </FormField>

        <FormField label="False Path Label">
          <Input
            value={formData.paths.false}
            onChange={(e) => updateField('paths', { 
              ...formData.paths, 
              false: e.target.value 
            })}
            placeholder="Error"
          />
        </FormField>
      </div>

      <FormField label="Description">
        <Textarea
          value={formData.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Optional description..."
          rows={2}
        />
      </FormField>
    </div>
  );
}