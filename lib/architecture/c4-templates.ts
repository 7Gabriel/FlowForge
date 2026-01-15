import { C4NodeCategory, C4Level, ArchitectureNodeData } from './c4-types';

export interface C4NodeTemplate {
  category: C4NodeCategory;
  label: string;
  level: C4Level;
  description: string;
  iconName: string; // ⚠️ Mudou de 'icon' para 'iconName' (string)
  color: string;
  defaultData: Partial<ArchitectureNodeData>;
}

export const c4Templates: C4NodeTemplate[] = [
  // CONTEXT LEVEL
  {
    category: C4NodeCategory.PERSON,
    label: 'Person',
    level: C4Level.CONTEXT,
    description: 'User or actor',
    iconName: 'User', // ⚠️ String agora
    color: '#08427B',
    defaultData: {
      label: 'User',
      description: 'System user',
    },
  },
  {
    category: C4NodeCategory.EXTERNAL_SYSTEM,
    label: 'External System',
    level: C4Level.CONTEXT,
    description: 'External software system',
    iconName: 'Globe',
    color: '#999999',
    defaultData: {
      label: 'External System',
      description: 'Third-party system',
    },
  },

  // CONTAINER LEVEL
  {
    category: C4NodeCategory.WEB_APP,
    label: 'Web Application',
    level: C4Level.CONTAINER,
    description: 'Web-based application',
    iconName: 'Globe',
    color: '#438DD5',
    defaultData: {
      label: 'Web App',
      technology: 'React, Next.js',
    },
  },
  {
    category: C4NodeCategory.API,
    label: 'API',
    level: C4Level.CONTAINER,
    description: 'REST/GraphQL API',
    iconName: 'Server',
    color: '#438DD5',
    defaultData: {
      label: 'API',
      technology: 'Node.js, Express',
      metadata: {
        endpoint: '/api/v1',
      },
    },
  },
  {
    category: C4NodeCategory.DATABASE,
    label: 'Database',
    level: C4Level.CONTAINER,
    description: 'Data storage',
    iconName: 'Database',
    color: '#438DD5',
    defaultData: {
      label: 'Database',
      technology: 'PostgreSQL',
      metadata: {
        dbType: 'sql',
      },
    },
  },
  {
    category: C4NodeCategory.MESSAGE_BROKER,
    label: 'Message Broker',
    level: C4Level.CONTAINER,
    description: 'Async messaging',
    iconName: 'MessageSquare',
    color: '#438DD5',
    defaultData: {
      label: 'Message Broker',
      technology: 'RabbitMQ, Kafka',
    },
  },

  // AWS/CLOUD SERVICES
  {
    category: C4NodeCategory.LAMBDA,
    label: 'Lambda Function',
    level: C4Level.CONTAINER,
    description: 'Serverless function',
    iconName: 'Zap',
    color: '#FF9900',
    defaultData: {
      label: 'Lambda',
      technology: 'AWS Lambda',
      metadata: {
        runtime: 'nodejs20.x',
        timeout: 30,
        memory: 128,
      },
    },
  },
  {
    category: C4NodeCategory.STEP_FUNCTION,
    label: 'Step Function',
    level: C4Level.CONTAINER,
    description: 'Workflow orchestrator',
    iconName: 'GitBranch',
    color: '#FF9900',
    defaultData: {
      label: 'Step Function',
      technology: 'AWS Step Functions',
    },
  },
  {
    category: C4NodeCategory.API_GATEWAY,
    label: 'API Gateway',
    level: C4Level.CONTAINER,
    description: 'API management',
    iconName: 'Server',
    color: '#FF9900',
    defaultData: {
      label: 'API Gateway',
      technology: 'AWS API Gateway',
    },
  },
  {
    category: C4NodeCategory.SQS,
    label: 'SQS Queue',
    level: C4Level.CONTAINER,
    description: 'Message queue',
    iconName: 'Mail',
    color: '#FF9900',
    defaultData: {
      label: 'SQS Queue',
      technology: 'AWS SQS',
      metadata: {
        queueName: 'orders-queue',
      },
    },
  },
  {
    category: C4NodeCategory.SNS,
    label: 'SNS Topic',
    level: C4Level.CONTAINER,
    description: 'Pub/sub messaging',
    iconName: 'Activity',
    color: '#FF9900',
    defaultData: {
      label: 'SNS Topic',
      technology: 'AWS SNS',
      metadata: {
        topicName: 'notifications',
      },
    },
  },
  {
    category: C4NodeCategory.S3,
    label: 'S3 Bucket',
    level: C4Level.CONTAINER,
    description: 'Object storage',
    iconName: 'Archive',
    color: '#FF9900',
    defaultData: {
      label: 'S3 Bucket',
      technology: 'AWS S3',
    },
  },
  {
    category: C4NodeCategory.DYNAMODB,
    label: 'DynamoDB',
    level: C4Level.CONTAINER,
    description: 'NoSQL database',
    iconName: 'Database',
    color: '#FF9900',
    defaultData: {
      label: 'DynamoDB',
      technology: 'AWS DynamoDB',
      metadata: {
        dbType: 'nosql',
      },
    },
  },
  {
    category: C4NodeCategory.KAFKA_TOPIC,
    label: 'Kafka Topic',
    level: C4Level.CONTAINER,
    description: 'Event streaming',
    iconName: 'Layers',
    color: '#231F20',
    defaultData: {
      label: 'Kafka Topic',
      technology: 'Apache Kafka',
      metadata: {
        topicName: 'events',
      },
    },
  },

  // SAGA PATTERN
  {
    category: C4NodeCategory.SAGA_ORCHESTRATOR,
    label: 'Saga Orchestrator',
    level: C4Level.COMPONENT,
    description: 'Coordinates distributed transactions',
    iconName: 'GitBranch',
    color: '#F39C12',
    defaultData: {
      label: 'Saga Orchestrator',
      technology: 'Step Functions / Custom',
    },
  },
  {
    category: C4NodeCategory.COMPENSATING_ACTION,
    label: 'Compensating Action',
    level: C4Level.COMPONENT,
    description: 'Rollback/compensation logic',
    iconName: 'Play',
    color: '#E74C3C',
    defaultData: {
      label: 'Compensate',
      metadata: {
        compensationAction: 'rollback',
      },
    },
  },
];

export const getC4Template = (category: C4NodeCategory): C4NodeTemplate | undefined => {
  return c4Templates.find((template) => template.category === category);
};

export const getTemplatesByLevel = (level: C4Level): C4NodeTemplate[] => {
  return c4Templates.filter((template) => template.level === level);
};