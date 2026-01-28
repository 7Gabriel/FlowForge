import { ArchitectureTemplate, TemplateCategory } from '../template-types';
import { MarkerType } from 'reactflow';

export const microservicesEcommerceTemplate: ArchitectureTemplate = {
  id: 'microservices-ecommerce',
  name: 'Microservices E-commerce',
  description: 'Complete e-commerce architecture with microservices, API Gateway, and event-driven communication',
  category: TemplateCategory.MICROSERVICES,
  tags: ['microservices', 'e-commerce', 'api-gateway', 'kafka', 'rest'],
  difficulty: 'intermediate',
  author: 'FlowForge',
  nodes: [
    // Layer 1: User
    {
      id: 'user-customer',
      type: 'person',
      position: { x: 400, y: 50 },
      data: {
        label: 'Customer',
        description: 'E-commerce customer browsing and purchasing products',
        category: 'user',
        level: 'context',
        color: '#4CAF50',
      },
    },
    
    // Layer 2: API Gateway
    {
      id: 'api-gateway',
      type: 'container-web',
      position: { x: 400, y: 250 },
      data: {
        label: 'API Gateway',
        description: 'Routes and authenticates requests to microservices',
        technology: 'Kong, NGINX',
        category: 'api-gateway',
        level: 'container',
        color: '#2196F3',
      },
    },
    
    // Layer 3: Microservices
    {
      id: 'product-service',
      type: 'container-service',
      position: { x: 100, y: 450 },
      data: {
        label: 'Product Service',
        description: 'Manages product catalog and inventory',
        technology: 'Node.js, Express',
        category: 'api',
        level: 'container',
        color: '#2196F3',
      },
    },
    {
      id: 'order-service',
      type: 'container-service',
      position: { x: 400, y: 450 },
      data: {
        label: 'Order Service',
        description: 'Handles order creation and processing',
        technology: 'Java, Spring Boot',
        category: 'api',
        level: 'container',
        color: '#2196F3',
      },
    },
    {
      id: 'payment-service',
      type: 'container-service',
      position: { x: 700, y: 450 },
      data: {
        label: 'Payment Service',
        description: 'Processes payments and refunds',
        technology: 'Python, FastAPI',
        category: 'api',
        level: 'container',
        color: '#2196F3',
      },
    },
    
    // Layer 4: Databases
    {
      id: 'product-db',
      type: 'database',
      position: { x: 100, y: 680 },
      data: {
        label: 'Product DB',
        description: 'Product catalog and inventory data',
        technology: 'PostgreSQL',
        category: 'database',
        level: 'container',
        color: '#2196F3',
      },
    },
    {
      id: 'order-db',
      type: 'database',
      position: { x: 400, y: 680 },
      data: {
        label: 'Order DB',
        description: 'Order and transaction history',
        technology: 'MongoDB',
        category: 'database',
        level: 'container',
        color: '#2196F3',
      },
    },
    
    // Event Bus
    {
      id: 'event-bus',
      type: 'external-system',
      position: { x: 1000, y: 450 },
      data: {
        label: 'Event Bus',
        description: 'Asynchronous event streaming',
        technology: 'Apache Kafka',
        category: 'message-queue',
        level: 'container',
        color: '#FF5722',
      },
    },
    
    // External Payment Gateway
    {
      id: 'stripe',
      type: 'external-system',
      position: { x: 700, y: 680 },
      data: {
        label: 'Stripe',
        description: 'External payment processor',
        technology: 'Stripe API',
        category: 'external',
        level: 'context',
        color: '#FF5722',
      },
    },
  ],
  edges: [
    // User → API Gateway
    {
      id: 'e-user-api',
      source: 'user-customer',
      target: 'api-gateway',
      type: 'editable',
      animated: false,
      data: { label: 'HTTPS', edgeStyle: 'solid' },
      style: { stroke: '#3B82F6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    
    // API Gateway → Services
    {
      id: 'e-api-product',
      source: 'api-gateway',
      target: 'product-service',
      type: 'editable',
      data: { label: 'REST API', edgeStyle: 'solid' },
      style: { stroke: '#3B82F6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    {
      id: 'e-api-order',
      source: 'api-gateway',
      target: 'order-service',
      type: 'editable',
      data: { label: 'REST API', edgeStyle: 'solid' },
      style: { stroke: '#3B82F6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    {
      id: 'e-api-payment',
      source: 'api-gateway',
      target: 'payment-service',
      type: 'editable',
      data: { label: 'REST API', edgeStyle: 'solid' },
      style: { stroke: '#3B82F6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    
    // Services → Databases
    {
      id: 'e-product-db',
      source: 'product-service',
      target: 'product-db',
      type: 'editable',
      data: { label: 'SQL Queries', edgeStyle: 'solid' },
      style: { stroke: '#3B82F6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    {
      id: 'e-order-db',
      source: 'order-service',
      target: 'order-db',
      type: 'editable',
      data: { label: 'NoSQL', edgeStyle: 'solid' },
      style: { stroke: '#3B82F6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    
    // Services → Event Bus (Async)
    {
      id: 'e-order-kafka',
      source: 'order-service',
      target: 'event-bus',
      type: 'editable',
      animated: true,
      data: { label: 'OrderCreated', edgeStyle: 'dashed' },
      style: { stroke: '#FF5722', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#FF5722' },
    },
    {
      id: 'e-payment-kafka',
      source: 'payment-service',
      target: 'event-bus',
      type: 'editable',
      animated: true,
      data: { label: 'PaymentProcessed', edgeStyle: 'dashed' },
      style: { stroke: '#FF5722', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#FF5722' },
    },
    
    // Payment Service → Stripe
    {
      id: 'e-payment-stripe',
      source: 'payment-service',
      target: 'stripe',
      type: 'editable',
      data: { label: 'Payment API', edgeStyle: 'solid' },
      style: { stroke: '#FF5722', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#FF5722' },
    },
  ],
};