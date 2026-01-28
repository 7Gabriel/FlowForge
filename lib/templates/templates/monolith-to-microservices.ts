import { ArchitectureTemplate, TemplateCategory } from '../template-types';

export const monolithToMicroservicesTemplate: ArchitectureTemplate = {
  id: 'monolith-to-microservices',
  name: 'Monolith to Microservices Migration',
  description: 'Migration strategy from monolithic architecture to microservices using the Strangler Fig pattern',
  category: TemplateCategory.MONOLITHIC,
  tags: ['migration', 'strangler-fig', 'monolith', 'microservices', 'modernization'],
  difficulty: 'advanced',
  author: 'FlowForge',
  nodes: [
    // User
    {
      id: 'user',
      type: 'person',
      position: { x: 400, y: 50 },
      data: {
        label: 'User',
        description: 'Application user',
        category: 'user',
        level: 'context',
        color: '#4CAF50',
      },
    },
    
    // API Gateway / Routing Layer
    {
      id: 'api-gateway',
      type: 'container-web',
      position: { x: 400, y: 230 },
      data: {
        label: 'API Gateway',
        description: 'Routes requests to monolith or microservices',
        technology: 'Kong, NGINX',
        category: 'api-gateway',
        level: 'container',
        color: '#2196F3',
      },
    },
    
    // Legacy Monolith (Left Side)
    {
      id: 'monolith',
      type: 'container-service',
      position: { x: 100, y: 430 },
      data: {
        label: 'Legacy Monolith',
        description: 'Existing monolithic application (being phased out)',
        technology: 'Java, Spring MVC',
        category: 'api',
        level: 'container',
        color: '#FF5722',
      },
    },
    
    // Monolith Database
    {
      id: 'monolith-db',
      type: 'database',
      position: { x: 100, y: 630 },
      data: {
        label: 'Monolith DB',
        description: 'Legacy database',
        technology: 'Oracle',
        category: 'database',
        level: 'container',
        color: '#FF5722',
      },
    },
    
    // New Microservices (Right Side)
    {
      id: 'user-service',
      type: 'container-service',
      position: { x: 550, y: 430 },
      data: {
        label: 'User Service',
        description: 'Extracted user management (NEW)',
        technology: 'Node.js, Express',
        category: 'api',
        level: 'container',
        color: '#4CAF50',
      },
    },
    
    {
      id: 'order-service',
      type: 'container-service',
      position: { x: 700, y: 430 },
      data: {
        label: 'Order Service',
        description: 'Extracted order processing (NEW)',
        technology: 'Go',
        category: 'api',
        level: 'container',
        color: '#4CAF50',
      },
    },
    
    // New Microservices Databases
    {
      id: 'user-db',
      type: 'database',
      position: { x: 550, y: 630 },
      data: {
        label: 'User DB',
        description: 'Dedicated user database',
        technology: 'PostgreSQL',
        category: 'database',
        level: 'container',
        color: '#4CAF50',
      },
    },
    
    {
      id: 'order-db',
      type: 'database',
      position: { x: 700, y: 630 },
      data: {
        label: 'Order DB',
        description: 'Dedicated order database',
        technology: 'MongoDB',
        category: 'database',
        level: 'container',
        color: '#4CAF50',
      },
    },
    
    // Anti-Corruption Layer
    {
      id: 'acl',
      type: 'component',
      position: { x: 350, y: 530 },
      data: {
        label: 'Anti-Corruption Layer',
        description: 'Translates between old and new systems',
        technology: 'Adapter Pattern',
        category: 'adapter',
        level: 'component',
        color: '#FFC107',
      },
    },
  ],
  edges: [
    // User → API Gateway
    {
      id: 'e-user-gateway',
      source: 'user',
      target: 'api-gateway',
      type: 'editable',
      data: { label: 'HTTPS', edgeStyle: 'solid' },
      style: { stroke: '#3B82F6', strokeWidth: 3 },
      markerEnd: { type: 'arrowclosed' as const, color: '#3B82F6' },
    },
    
    // API Gateway → Monolith (legacy routes)
    {
      id: 'e-gateway-monolith',
      source: 'api-gateway',
      target: 'monolith',
      type: 'editable',
      data: { label: 'Legacy Routes', edgeStyle: 'dashed' },
      style: { stroke: '#FF5722', strokeWidth: 3 },
      markerEnd: { type: 'arrowclosed' as const, color: '#FF5722' },
    },
    
    // API Gateway → New Microservices
    {
      id: 'e-gateway-user',
      source: 'api-gateway',
      target: 'user-service',
      type: 'editable',
      data: { label: 'New Routes', edgeStyle: 'solid' },
      style: { stroke: '#4CAF50', strokeWidth: 3 },
      markerEnd: { type: 'arrowclosed' as const, color: '#4CAF50' },
    },
    
    {
      id: 'e-gateway-order',
      source: 'api-gateway',
      target: 'order-service',
      type: 'editable',
      data: { label: 'New Routes', edgeStyle: 'solid' },
      style: { stroke: '#4CAF50', strokeWidth: 3 },
      markerEnd: { type: 'arrowclosed' as const, color: '#4CAF50' },
    },
    
    // Monolith → Monolith DB
    {
      id: 'e-monolith-db',
      source: 'monolith',
      target: 'monolith-db',
      type: 'editable',
      data: { label: 'SQL', edgeStyle: 'solid' },
      style: { stroke: '#FF5722', strokeWidth: 3 },
      markerEnd: { type: 'arrowclosed' as const, color: '#FF5722' },
    },
    
    // Microservices → Databases
    {
      id: 'e-user-db',
      source: 'user-service',
      target: 'user-db',
      type: 'editable',
      data: { label: 'SQL', edgeStyle: 'solid' },
      style: { stroke: '#4CAF50', strokeWidth: 3 },
      markerEnd: { type: 'arrowclosed' as const, color: '#4CAF50' },
    },
    
    {
      id: 'e-order-db',
      source: 'order-service',
      target: 'order-db',
      type: 'editable',
      data: { label: 'NoSQL', edgeStyle: 'solid' },
      style: { stroke: '#4CAF50', strokeWidth: 3 },
      markerEnd: { type: 'arrowclosed' as const, color: '#4CAF50' },
    },
    
    // Anti-Corruption Layer connections
    {
      id: 'e-monolith-acl',
      source: 'monolith',
      target: 'acl',
      type: 'editable',
      data: { label: 'Sync Data', edgeStyle: 'dashed' },
      style: { stroke: '#FFC107', strokeWidth: 3 },
      markerEnd: { type: 'arrowclosed' as const, color: '#FFC107' },
    },
    
    {
      id: 'e-acl-user',
      source: 'acl',
      target: 'user-service',
      type: 'editable',
      data: { label: 'Transform', edgeStyle: 'dashed' },
      style: { stroke: '#FFC107', strokeWidth: 3 },
      markerEnd: { type: 'arrowclosed' as const, color: '#FFC107' },
    },
  ],
};