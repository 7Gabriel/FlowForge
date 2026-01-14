import React from 'react';
import { HTTPNodeData } from '@/lib/workflow/types';
import { FormField } from '../FormField';
import { Input } from '../Input';
import { Select } from '../Select';
import { Textarea } from '../Textarea';
import { useNodeForm } from '@/hooks/useNodeForm';

interface HTTPEditorProps {
  nodeId: string;
  data: HTTPNodeData;
  onUpdate: (nodeId: string, data: Partial<HTTPNodeData>) => void;
}

export function HTTPEditor({ nodeId, data, onUpdate }: HTTPEditorProps) {
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

      <FormField label="Method">
        <Select
          value={formData.method}
          onChange={(e) => updateField('method', e.target.value as 'GET' | 'POST' | 'PUT' | 'DELETE')}
          options={[
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' },
            { value: 'PUT', label: 'PUT' },
            { value: 'DELETE', label: 'DELETE' },
          ]}
        />
      </FormField>

      <FormField label="URL">
        <Input
          value={formData.url}
          onChange={(e) => updateField('url', e.target.value)}
          placeholder="https://api.example.com/endpoint"
        />
      </FormField>

      <FormField 
        label="Headers (JSON)"
        description="Optional HTTP headers"
      >
        <Textarea
          value={JSON.stringify(formData.headers || {}, null, 2)}
          onChange={(e) => {
            try {
              const headers = JSON.parse(e.target.value);
              updateField('headers', headers);
            } catch {
              // Permitir JSON inválido durante digitação
            }
          }}
          placeholder='{"Authorization": "Bearer token"}'
          rows={4}
          className="font-mono text-xs"
        />
      </FormField>

      {(formData.method === 'POST' || formData.method === 'PUT') && (
        <FormField label="Body">
          <Textarea
            value={formData.body || ''}
            onChange={(e) => updateField('body', e.target.value)}
            placeholder="Request body..."
            rows={6}
            className="font-mono text-xs"
          />
        </FormField>
      )}

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