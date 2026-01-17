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

  {
    category: C4NodeCategory.PERSON,
    label: 'Person',
    description: 'System user or actor',
    level: C4Level.CONTEXT,
    color: '#4CAF50',
    iconName: 'User',
    defaultData: {
      label: 'Person',
      description: 'A person who uses the system',
      technology: '',
      category: C4NodeCategory.PERSON,
      level: C4Level.CONTEXT,
      color: '#4CAF50',
      icon: 'User',

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
      technology: '',
      category: C4NodeCategory.EXTERNAL_SYSTEM,
      level: C4Level.CONTEXT,
      color: '#999999',
      icon: 'Globe',
    },
  },
  


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
      description: 'Kafka',
      technology: 'Apache Kafka',
      category: C4NodeCategory.KAFKA_TOPIC,
      level: C4Level.CONTAINER,
      color: '#231F20',
      icon: 'Layers',
	
    },
  },

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