import { ArchitectureTemplate, TemplateCategory } from '../template-types';
import { MarkerType } from 'reactflow';

export const cqrsPatternTemplate: ArchitectureTemplate = {
  id: 'cqrs-pattern',
  name: 'CQRS Pattern',
  description: 'Command Query Responsibility Segregation with separate read and write models',
  category: TemplateCategory.PATTERNS,
  tags: ['cqrs', 'event-sourcing', 'read-write-separation', 'ddd'],
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
    
    // API Gateway
    {
      id: 'api-gateway',
      type: 'container-web',
      position: { x: 400, y: 200 },
      data: {
        label: 'API Gateway',
        description: 'Routes commands and queries',
        technology: 'Express Gateway',
        category: 'api-gateway',
        level: 'container',
        color: '#2196F3',
      },
    },
    
    // WRITE SIDE (Command)
    {
      id: 'command-handler',
      type: 'container-service',
      position: { x: 150, y: 380 },
      data: {
        label: 'Command Handler',
        description: 'Processes write operations',
        technology: 'Java, Spring Boot',
        category: 'api',
        level: 'container',
        color: '#FF5722',
      },
    },
    
    {
      id: 'write-db',
      type: 'database',
      position: { x: 150, y: 580 },
      data: {
        label: 'Write Database',
        description: 'Normalized transactional data',
        technology: 'PostgreSQL',
        category: 'database',
        level: 'container',
        color: '#FF5722',
      },
    },
    
    // Event Store (Center)
    {
      id: 'event-store',
      type: 'database',
      position: { x: 400, y: 480 },
      data: {
        label: 'Event Store',
        description: 'Immutable event log',
        technology: 'EventStoreDB',
        category: 'database',
        level: 'container',
        color: '#FFC107',
      },
    },
    
    // Event Bus
    {
      id: 'event-bus',
      type: 'external-system',
      position: { x: 400, y: 650 },
      data: {
        label: 'Event Bus',
        description: 'Publishes domain events',
        technology: 'Kafka',
        category: 'message-queue',
        level: 'container',
        color: '#FFC107',
      },
    },
    
    // READ SIDE (Query)
    {
      id: 'query-handler',
      type: 'container-service',
      position: { x: 650, y: 380 },
      data: {
        label: 'Query Handler',
        description: 'Handles read operations',
        technology: 'Node.js, Express',
        category: 'api',
        level: 'container',
        color: '#4CAF50',
      },
    },
    
    {
      id: 'read-db',
      type: 'database',
      position: { x: 650, y: 580 },
      data: {
        label: 'Read Database',
        description: 'Denormalized query-optimized data',
        technology: 'MongoDB',
        category: 'database',
        level: 'container',
        color: '#4CAF50',
      },
    },
    
    // Projections (Event Handler)
    {
      id: 'projection-service',
      type: 'container-service',
      position: { x: 650, y: 750 },
      data: {
        label: 'Projection Service',
        description: 'Updates read models from events',
        technology: 'Python, Consumer',
        category: 'api',
        level: 'container',
        color: '#9C27B0',
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
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    
    // API Gateway → Command Handler (Write)
    {
      id: 'e-gateway-command',
      source: 'api-gateway',
      target: 'command-handler',
      type: 'editable',
      data: { label: 'Commands (POST/PUT/DELETE)', edgeStyle: 'solid' },
      style: { stroke: '#FF5722', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#FF5722' },
    },
    
    // API Gateway → Query Handler (Read)
    {
      id: 'e-gateway-query',
      source: 'api-gateway',
      target: 'query-handler',
      type: 'editable',
      data: { label: 'Queries (GET)', edgeStyle: 'solid' },
      style: { stroke: '#4CAF50', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#4CAF50' },
    },
    
    // Command Handler → Write DB
    {
      id: 'e-command-writedb',
      source: 'command-handler',
      target: 'write-db',
      type: 'editable',
      data: { label: 'Persist', edgeStyle: 'solid' },
      style: { stroke: '#FF5722', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#FF5722' },
    },
    
    // Command Handler → Event Store
    {
      id: 'e-command-eventstore',
      source: 'command-handler',
      target: 'event-store',
      type: 'editable',
      data: { label: 'Append Events', edgeStyle: 'solid' },
      style: { stroke: '#FFC107', strokeWidth: 3 },
      markerEnd: {type: MarkerType.ArrowClosed, color: '#FFC107' },
    },
    
    // Event Store → Event Bus
    {
      id: 'e-eventstore-bus',
      source: 'event-store',
      target: 'event-bus',
      type: 'editable',
      animated: true,
      data: { label: 'Publish', edgeStyle: 'dashed' },
      style: { stroke: '#FFC107', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#FFC107' },
    },
    
    // Event Bus → Projection Service
    {
      id: 'e-bus-projection',
      source: 'event-bus',
      target: 'projection-service',
      type: 'editable',
      animated: true,
      data: { label: 'Subscribe', edgeStyle: 'dashed' },
      style: { stroke: '#9C27B0', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9C27B0' },
    },
    
    // Projection Service → Read DB
    {
      id: 'e-projection-readdb',
      source: 'projection-service',
      target: 'read-db',
      type: 'editable',
      data: { label: 'Update View', edgeStyle: 'solid' },
      style: { stroke: '#9C27B0', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9C27B0' },
    },
    
    // Query Handler → Read DB
    {
      id: 'e-query-readdb',
      source: 'query-handler',
      target: 'read-db',
      type: 'editable',
      data: { label: 'Query', edgeStyle: 'solid' },
      style: { stroke: '#4CAF50', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#4CAF50' },
    },
  ],
};