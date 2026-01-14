import React from 'react';
import { OutputNodeData } from '@/lib/workflow/types';
import { FormField } from '../FormField';
import { Input } from '../Input';
import { Select } from '../Select';
import { Textarea } from '../Textarea';
import { useNodeForm } from '@/hooks/useNodeForm';

interface OutputEditorProps {
  nodeId: string;
  data: OutputNodeData;
  onUpdate: (nodeId: string, data: Partial<OutputNodeData>) => void;
}

export function OutputEditor({ nodeId, data, onUpdate }: OutputEditorProps) {
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

      <FormField label="Output Type">
        <Select
          value={formData.outputType}
          onChange={(e) => updateField('outputType', e.target.value as 'json' | 'text' | 'webhook')}
          options={[
            { value: 'json', label: 'JSON' },
            { value: 'text', label: 'Text' },
            { value: 'webhook', label: 'Webhook' },
          ]}
        />
      </FormField>

      <FormField 
        label="Destination"
        description={
          formData.outputType === 'webhook' 
            ? 'Webhook URL to send results' 
            : 'File path or storage location'
        }
      >
        <Input
          value={formData.destination || ''}
          onChange={(e) => updateField('destination', e.target.value)}
          placeholder={
            formData.outputType === 'webhook'
              ? 'https://webhook.site/...'
              : '/path/to/output'
          }
        />
      </FormField>

      <FormField label="Description">
        <Textarea
          value={formData.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Optional description..."
          rows={3}
        />
      </FormField>
    </div>
  );
}