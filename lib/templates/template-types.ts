import { Node, Edge } from 'reactflow';

export enum TemplateCategory {
  MICROSERVICES = 'microservices',
  EVENT_DRIVEN = 'event-driven',
  SERVERLESS = 'serverless',
  MONOLITHIC = 'monolithic',
  PATTERNS = 'patterns',
}

export interface ArchitectureTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  thumbnail?: string; // URL or base64
  tags: string[];
  nodes: Node[];
  edges: Edge[];
  author?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  thumbnail?: string;
  tags: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}