import React from 'react';
import { LLMNodeData } from '@/lib/workflow/types';
import { FormField } from '../FormField';
import { Input } from '../Input';
import { Select } from '../Select';
import { Textarea } from '../Textarea';
import { useNodeForm } from '@/hooks/useNodeForm';

interface LLMEditorProps {
  nodeId: string;
  data: LLMNodeData;
  onUpdate: (nodeId: string, data: Partial<LLMNodeData>) => void;
}

export function LLMEditor({ nodeId, data, onUpdate }: LLMEditorProps) {
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

      <FormField label="Provider">
        <Select
          value={formData.provider}
          onChange={(e) => updateField('provider', e.target.value as 'openai' | 'anthropic' | 'azure')}
          options={[
            { value: 'openai', label: 'OpenAI' },
            { value: 'anthropic', label: 'Anthropic' },
            { value: 'azure', label: 'Azure OpenAI' },
          ]}
        />
      </FormField>

      <FormField label="Model">
        <Input
          value={formData.model}
          onChange={(e) => updateField('model', e.target.value)}
          placeholder="gpt-4, claude-3-opus..."
        />
      </FormField>

      <FormField label="Prompt">
        <Textarea
          value={formData.prompt}
          onChange={(e) => updateField('prompt', e.target.value)}
          placeholder="Enter your prompt..."
          rows={6}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField 
          label="Temperature"
          description="0-1, higher = more random"
        >
          <Input
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={formData.temperature || 0.7}
            onChange={(e) => updateField('temperature', parseFloat(e.target.value))}
          />
        </FormField>

        <FormField 
          label="Max Tokens"
          description="Maximum response length"
        >
          <Input
            type="number"
            min="1"
            max="4096"
            value={formData.maxTokens || 1000}
            onChange={(e) => updateField('maxTokens', parseInt(e.target.value))}
          />
        </FormField>
      </div>
    </div>
  );
}