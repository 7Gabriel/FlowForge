import { C4NodeCategory, C4Level, C4VisualStyle, ArchitectureNodeData } from './c4-types';

export interface C4Template {
  category: C4NodeCategory;
  label: string;
  description: string;
  level: C4Level;
  color: string;
  iconName: string;
  defaultData: ArchitectureNodeData;
}

export const c4Templates: C4Template[] = [
  // ========================================
  // CONTEXT LEVEL
  // ========================================
  {
    category: C4NodeCategory.USER,
    label: 'User',
    description: 'System user or actor',
    level: C4Level.CONTEXT,
    color: '#4CAF50',
    iconName: 'User',
    defaultData: {
      label: 'User',
      description: 'A person who uses the system',
      technology: '',
      category: C4NodeCategory.USER,
      level: C4Level.CONTEXT,
      color: '#4CAF50',
      icon: 'User',
      visualStyle: C4VisualStyle.PERSON,
    },
  },

  // ========================================
  // CONTAINER LEVEL
  // ========================================
  {
    category: C4NodeCategory.WEB_APP,
    label: 'Web Application',
    description: 'Frontend web application',
    level: C4Level.CONTAINER,
    color: '#2196F3',
    iconName: 'Globe',
    defaultData: {
      label: 'Web App',
      description: 'Provides UI functionality',
      technology: 'React, Next.js',
      category: C4NodeCategory.WEB_APP,
      level: C4Level.CONTAINER,
      color: '#2196F3',
      icon: 'Globe',
      visualStyle: C4VisualStyle.CONTAINER_WEB,
    },
  },

  {
    category: C4NodeCategory.MOBILE_APP,
    label: 'Mobile App',
    description: 'Mobile application',
    level: C4Level.CONTAINER,
    color: '#2196F3',
    iconName: 'Smartphone',
    defaultData: {
      label: 'Mobile App',
      description: 'Native mobile application',
      technology: 'iOS, Android',
      category: C4NodeCategory.MOBILE_APP,
      level: C4Level.CONTAINER,
      color: '#2196F3',
      icon: 'Smartphone',
      visualStyle: C4VisualStyle.CONTAINER_WEB,
    },
  },

  {
    category: C4NodeCategory.API,
    label: 'API',
    description: 'Backend API service',
    level: C4Level.CONTAINER,
    color: '#2196F3',
    iconName: 'Server',
    defaultData: {
      label: 'API',
      description: 'Provides business logic',
      technology: 'Node.js, Express',
      category: C4NodeCategory.API,
      level: C4Level.CONTAINER,
      color: '#2196F3',
      icon: 'Server',
      visualStyle: C4VisualStyle.CONTAINER_SERVICE,
    },
  },

  {
    category: C4NodeCategory.DATABASE,
    label: 'Database',
    description: 'Data storage',
    level: C4Level.CONTAINER,
    color: '#2196F3',
    iconName: 'Database',
    defaultData: {
      label: 'Database',
      description: 'Stores application data',
      technology: 'PostgreSQL',
      category: C4NodeCategory.DATABASE,
      level: C4Level.CONTAINER,
      color: '#2196F3',
      icon: 'Database',
      visualStyle: C4VisualStyle.DATABASE,
    },
  },

  {
    category: C4NodeCategory.CACHE,
    label: 'Cache',
    description: 'Caching layer',
    level: C4Level.CONTAINER,
    color: '#2196F3',
    iconName: 'Zap',
    defaultData: {
      label: 'Cache',
      description: 'In-memory cache',
      technology: 'Redis',
      category: C4NodeCategory.CACHE,
      level: C4Level.CONTAINER,
      color: '#2196F3',
      icon: 'Zap',
      visualStyle: C4VisualStyle.DATABASE,
    },
  },

  {
    category: C4NodeCategory.MESSAGE_QUEUE,
    label: 'Message Queue',
    description: 'Asynchronous messaging',
    level: C4Level.CONTAINER,
    color: '#2196F3',
    iconName: 'MessageSquare',
    defaultData: {
      label: 'Queue',
      description: 'Message queue',
      technology: 'RabbitMQ',
      category: C4NodeCategory.MESSAGE_QUEUE,
      level: C4Level.CONTAINER,
      color: '#2196F3',
      icon: 'MessageSquare',
      visualStyle: C4VisualStyle.CONTAINER_SERVICE,
    },
  },

  // ========================================
  // AWS SERVICES
  // ========================================
  {
    category: C4NodeCategory.LAMBDA,
    label: 'AWS Lambda',
    description: 'Serverless function',
    level: C4Level.CONTAINER,
    color: '#FF9900',
    iconName: 'Zap',
    defaultData: {
      label: 'Lambda',
      description: 'Serverless compute',
      technology: 'AWS Lambda',
      category: C4NodeCategory.LAMBDA,
      level: C4Level.CONTAINER,
      color: '#FF9900',
      icon: 'Zap',
      visualStyle: C4VisualStyle.CONTAINER_SERVICE,
    },
  },

  {
    category: C4NodeCategory.API_GATEWAY,
    label: 'API Gateway',
    description: 'API management',
    level: C4Level.CONTAINER,
    color: '#FF9900',
    iconName: 'Network',
    defaultData: {
      label: 'API Gateway',
      description: 'Managed API gateway',
      technology: 'AWS',
      category: C4NodeCategory.API_GATEWAY,
      level: C4Level.CONTAINER,
      color: '#FF9900',
      icon: 'Network',
      visualStyle: C4VisualStyle.CONTAINER_SERVICE,
    },
  },

  {
    category: C4NodeCategory.DYNAMODB,
    label: 'DynamoDB',
    description: 'NoSQL database',
    level: C4Level.CONTAINER,
    color: '#FF9900',
    iconName: 'Database',
    defaultData: {
      label: 'DynamoDB',
      description: 'NoSQL database',
      technology: 'AWS',
      category: C4NodeCategory.DYNAMODB,
      level: C4Level.CONTAINER,
      color: '#FF9900',
      icon: 'Database',
      visualStyle: C4VisualStyle.DATABASE,
    },
  },

  {
    category: C4NodeCategory.S3,
    label: 'S3',
    description: 'Object storage',
    level: C4Level.CONTAINER,
    color: '#FF9900',
    iconName: 'Archive',
    defaultData: {
      label: 'S3',
      description: 'Object storage',
      technology: 'AWS',
      category: C4NodeCategory.S3,
      level: C4Level.CONTAINER,
      color: '#FF9900',
      icon: 'Archive',
      visualStyle: C4VisualStyle.DATABASE,
    },
  },

  {
    category: C4NodeCategory.SQS,
    label: 'SQS',
    description: 'Message queue',
    level: C4Level.CONTAINER,
    color: '#FF9900',
    iconName: 'Mail',
    defaultData: {
      label: 'SQS',
      description: 'Message queue service',
      technology: 'AWS',
      category: C4NodeCategory.SQS,
      level: C4Level.CONTAINER,
      color: '#FF9900',
      icon: 'Mail',
      visualStyle: C4VisualStyle.CONTAINER_SERVICE,
    },
  },

  {
    category: C4NodeCategory.SNS,
    label: 'SNS',
    description: 'Pub/Sub messaging',
    level: C4Level.CONTAINER,
    color: '#FF9900',
    iconName: 'Activity',
    defaultData: {
      label: 'SNS',
      description: 'Notification service',
      technology: 'AWS',
      category: C4NodeCategory.SNS,
      level: C4Level.CONTAINER,
      color: '#FF9900',
      icon: 'Activity',
      visualStyle: C4VisualStyle.CONTAINER_SERVICE,
    },
  },

  {
    category: C4NodeCategory.SES,
    label: 'Amazon SES',
    description: 'Email service',
    level: C4Level.CONTAINER,
    color: '#FF5722',
    iconName: 'Mail',
    defaultData: {
      label: 'Amazon SES',
      description: 'Cloud-based email service',
      technology: 'AWS',
      category: C4NodeCategory.SES,
      level: C4Level.CONTAINER,
      color: '#FF5722',
      icon: 'Mail',
      visualStyle: C4VisualStyle.EXTERNAL_SYSTEM,
    },
  },

  {
    category: C4NodeCategory.STEP_FUNCTIONS,
    label: 'Step Functions',
    description: 'Workflow orchestration',
    level: C4Level.CONTAINER,
    color: '#FF9900',
    iconName: 'GitBranch',
    defaultData: {
      label: 'Step Functions',
      description: 'Serverless orchestration',
      technology: 'AWS',
      category: C4NodeCategory.STEP_FUNCTIONS,
      level: C4Level.CONTAINER,
      color: '#FF9900',
      icon: 'GitBranch',
      visualStyle: C4VisualStyle.CONTAINER_SERVICE,
    },
  },

  // ========================================
  // COMPONENT LEVEL
  // ========================================
  {
    category: C4NodeCategory.CONTROLLER,
    label: 'Controller',
    description: 'HTTP controller',
    level: C4Level.COMPONENT,
    color: '#2196F3',
    iconName: 'Box',
    defaultData: {
      label: 'Controller',
      description: 'Handles HTTP requests',
      technology: 'Spring, Express',
      category: C4NodeCategory.CONTROLLER,
      level: C4Level.COMPONENT,
      color: '#2196F3',
      icon: 'Box',
      visualStyle: C4VisualStyle.COMPONENT,
    },
  },

  {
    category: C4NodeCategory.SERVICE,
    label: 'Service',
    description: 'Business logic',
    level: C4Level.COMPONENT,
    color: '#2196F3',
    iconName: 'Cpu',
    defaultData: {
      label: 'Service',
      description: 'Business logic layer',
      technology: '',
      category: C4NodeCategory.SERVICE,
      level: C4Level.COMPONENT,
      color: '#2196F3',
      icon: 'Cpu',
      visualStyle: C4VisualStyle.COMPONENT,
    },
  },

  {
    category: C4NodeCategory.REPOSITORY,
    label: 'Repository',
    description: 'Data access',
    level: C4Level.COMPONENT,
    color: '#2196F3',
    iconName: 'Archive',
    defaultData: {
      label: 'Repository',
      description: 'Data access layer',
      technology: '',
      category: C4NodeCategory.REPOSITORY,
      level: C4Level.COMPONENT,
      color: '#2196F3',
      icon: 'Archive',
      visualStyle: C4VisualStyle.COMPONENT,
    },
  },
];

export const getC4Template = (category: C4NodeCategory): C4Template | undefined => {
  return c4Templates.find((template) => template.category === category);
};

export const getTemplatesByLevel = (level: C4Level): C4Template[] => {
  return c4Templates.filter((template) => template.level === level);
};