import React from 'react';
import { TriggerNodeData } from '@/lib/workflow/types';
import { FormField } from '../FormField';
import { Input } from '../Input';
import { Select } from '../Select';
import { Textarea } from '../Textarea';
import { useNodeForm } from '@/hooks/useNodeForm';

interface TriggerEditorProps {
  nodeId: string;
  data: TriggerNodeData;
  onUpdate: (nodeId: string, data: Partial<TriggerNodeData>) => void;
}

export function TriggerEditor({ nodeId, data, onUpdate }: TriggerEditorProps) {
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

      <FormField label="Trigger Type">
        <Select
          value={formData.triggerType}
          onChange={(e) => updateField('triggerType', e.target.value as 'manual' | 'webhook' | 'schedule')}
          options={[
            { value: 'manual', label: 'Manual' },
            { value: 'webhook', label: 'Webhook' },
            { value: 'schedule', label: 'Schedule' },
          ]}
        />
      </FormField>

      {formData.triggerType === 'webhook' && (
        <FormField 
          label="Webhook URL"
          description="The URL that will trigger this workflow"
        >
          <Input
            value={formData.config?.webhookUrl || ''}
            onChange={(e) => updateField('config', { 
              ...formData.config, 
              webhookUrl: e.target.value 
            })}
            placeholder="https://..."
          />
        </FormField>
      )}

      {formData.triggerType === 'schedule' && (
        <FormField 
          label="Schedule (Cron)"
          description="Use cron syntax (e.g., 0 9 * * *)"
        >
          <Input
            value={formData.config?.schedule || ''}
            onChange={(e) => updateField('config', { 
              ...formData.config, 
              schedule: e.target.value 
            })}
            placeholder="0 9 * * *"
          />
        </FormField>
      )}

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