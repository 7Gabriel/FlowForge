import { GroupNodeData } from './c4-types';

export enum GroupStyle {
  ORCHESTRATOR = 'orchestrator',
  SAGA = 'saga',
  BOUNDED_CONTEXT = 'bounded-context',
  SYSTEM = 'system',
  CUSTOM = 'custom',
}

export interface GroupTemplate {
  style: GroupStyle;
  label: string;
  description: string;
  color: string;
  borderStyle: 'dashed' | 'solid' | 'dotted';
  borderWidth: number;
  backgroundColor: string;
}

export const groupTemplates: GroupTemplate[] = [
  {
    style: GroupStyle.ORCHESTRATOR,
    label: 'Orchestrator (Step Functions)',
    description: 'Workflow orchestration container',
    color: '#FF9900',
    borderStyle: 'dashed',
    borderWidth: 3,
    backgroundColor: '#FFF4E6',
  },
  {
    style: GroupStyle.SAGA,
    label: 'Saga Pattern',
    description: 'Distributed transaction saga',
    color: '#9C27B0',
    borderStyle: 'dashed',
    borderWidth: 3,
    backgroundColor: '#F3E5F5',
  },
  {
    style: GroupStyle.BOUNDED_CONTEXT,
    label: 'Bounded Context',
    description: 'DDD bounded context',
    color: '#2196F3',
    borderStyle: 'dashed',
    borderWidth: 3,
    backgroundColor: '#E3F2FD',
  },
  {
    style: GroupStyle.SYSTEM,
    label: 'System Boundary',
    description: 'System or microservice boundary',
    color: '#4CAF50',
    borderStyle: 'dashed',
    borderWidth: 3,
    backgroundColor: '#E8F5E9',
  },
  {
    style: GroupStyle.CUSTOM,
    label: 'Custom Group',
    description: 'Custom grouping container',
    color: '#607D8B',
    borderStyle: 'dashed',
    borderWidth: 2,
    backgroundColor: '#ECEFF1',
  },
];

export const getGroupTemplate = (style: GroupStyle): GroupTemplate | undefined => {
  return groupTemplates.find((template) => template.style === style);
};