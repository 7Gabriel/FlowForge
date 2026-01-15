'use client';

import React from 'react';
import { Node } from 'reactflow';
import { ArchitectureNodeData } from '@/lib/architecture/c4-types';
import { useNodeForm } from '@/hooks/useNodeForm';
import { FormField } from '@/components/workflow/properties/FormField';
import { Input } from '@/components/workflow/properties/Input';
import { Textarea } from '@/components/workflow/properties/Textarea';

interface ArchitectureNodeEditorProps {
  node: Node<ArchitectureNodeData>;
  onUpdate: (data: Partial<ArchitectureNodeData>) => void;
}

export function ArchitectureNodeEditor({ node, onUpdate }: ArchitectureNodeEditorProps) {
  const { formData, updateField } = useNodeForm({
    initialData: node.data,
    onUpdate,
  });

  return (
    <div className="p-4 space-y-4">
      {/* Label */}
      <FormField
        label="Label"
        description="Display name of the component"
      >
        <Input
          value={formData.label || ''}
          onChange={(e) => updateField('label', e.target.value)}
          placeholder="Enter label"
        />
      </FormField>

      {/* Technology */}
      <FormField
        label="Technology"
        description="Tech stack or platform"
      >
        <Input
          value={formData.technology || ''}
          onChange={(e) => updateField('technology', e.target.value)}
          placeholder="e.g., PostgreSQL, Node.js, AWS Lambda"
        />
      </FormField>

      {/* Description */}
      <FormField
        label="Description"
        description="Brief description of the component"
      >
        <Textarea
          value={formData.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Enter description"
          rows={3}
        />
      </FormField>

      {/* Metadata Específica por Tipo */}
      {renderMetadataFields(node.data.category, formData, updateField)}
    </div>
  );
}

// ========================================
// Metadata Fields por Categoria
// ========================================

function renderMetadataFields(
  category: string,
  formData: any,
  updateField: (field: string, value: any) => void
) {
  const metadata = formData.metadata || {};

  switch (category) {
    case 'database':
    case 'dynamodb':
      return (
        <FormField
          label="Database Type"
          description="SQL or NoSQL database"
        >
          <select
            value={metadata.dbType || 'sql'}
            onChange={(e) => updateField('metadata', { ...metadata, dbType: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sql">SQL</option>
            <option value="nosql">NoSQL</option>
          </select>
        </FormField>
      );

    case 'api':
    case 'api-gateway':
      return (
        <>
          <FormField
            label="Endpoint"
            description="API endpoint path"
          >
            <Input
              value={metadata.endpoint || ''}
              onChange={(e) => updateField('metadata', { ...metadata, endpoint: e.target.value })}
              placeholder="/api/v1"
            />
          </FormField>
          <FormField
            label="Method"
            description="HTTP method"
          >
            <select
              value={metadata.method || 'GET'}
              onChange={(e) => updateField('metadata', { ...metadata, method: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </FormField>
        </>
      );

    case 'lambda':
      return (
        <>
          <FormField
            label="Runtime"
            description="Lambda runtime environment"
          >
            <select
              value={metadata.runtime || 'nodejs20.x'}
              onChange={(e) => updateField('metadata', { ...metadata, runtime: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="nodejs20.x">Node.js 20.x</option>
              <option value="nodejs18.x">Node.js 18.x</option>
              <option value="python3.12">Python 3.12</option>
              <option value="python3.11">Python 3.11</option>
              <option value="java21">Java 21</option>
              <option value="java17">Java 17</option>
              <option value="dotnet8">DotNet 8</option>
            </select>
          </FormField>
          <FormField
            label="Timeout (seconds)"
            description="Function timeout"
          >
            <Input
              type="number"
              value={metadata.timeout || 30}
              onChange={(e) => updateField('metadata', { ...metadata, timeout: parseInt(e.target.value) })}
              min={1}
              max={900}
            />
          </FormField>
          <FormField
            label="Memory (MB)"
            description="Allocated memory"
          >
            <Input
              type="number"
              value={metadata.memory || 128}
              onChange={(e) => updateField('metadata', { ...metadata, memory: parseInt(e.target.value) })}
              min={128}
              max={10240}
              step={64}
            />
          </FormField>
        </>
      );

    case 'sqs':
      return (
        <FormField
          label="Queue Name"
          description="SQS queue identifier"
        >
          <Input
            value={metadata.queueName || ''}
            onChange={(e) => updateField('metadata', { ...metadata, queueName: e.target.value })}
            placeholder="orders-queue"
          />
        </FormField>
      );

    case 'sns':
      return (
        <FormField
          label="Topic Name"
          description="SNS topic identifier"
        >
          <Input
            value={metadata.topicName || ''}
            onChange={(e) => updateField('metadata', { ...metadata, topicName: e.target.value })}
            placeholder="notifications"
          />
        </FormField>
      );

    case 'kafka-topic':
      return (
        <>
          <FormField
            label="Topic Name"
            description="Kafka topic name"
          >
            <Input
              value={metadata.topicName || ''}
              onChange={(e) => updateField('metadata', { ...metadata, topicName: e.target.value })}
              placeholder="events"
            />
          </FormField>
          <FormField
            label="Partitions"
            description="Number of partitions"
          >
            <Input
              type="number"
              value={metadata.partitions || 3}
              onChange={(e) => updateField('metadata', { ...metadata, partitions: parseInt(e.target.value) })}
              min={1}
            />
          </FormField>
        </>
      );

    case 'compensating-action':
      return (
        <FormField
          label="Compensation Action"
          description="Rollback strategy"
        >
          <select
            value={metadata.compensationAction || 'rollback'}
            onChange={(e) => updateField('metadata', { ...metadata, compensationAction: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="rollback">Rollback</option>
            <option value="retry">Retry</option>
            <option value="ignore">Ignore</option>
            <option value="compensate">Compensate</option>
          </select>
        </FormField>
      );

    default:
      return null;
  }
}