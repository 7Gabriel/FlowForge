// ========================================
// C4 Model Levels
// ========================================

export enum C4Level {
    CONTEXT = 'context',
    CONTAINER = 'container',
    COMPONENT = 'component',
    CODE = 'code',
  }
  
  // ========================================
  // C4 Node Categories
  // ========================================
  
  export enum C4NodeCategory {
    // Context Level
    PERSON = 'person',
    EXTERNAL_SYSTEM = 'external-system',
    SYSTEM = 'system',
    KAFKA_TOPIC = 'kafka-topic',
  
    // Container Level
    WEB_APP = 'web-app',
    MOBILE_APP = 'mobile-app',
    API = 'api',
    DATABASE = 'database',
    CACHE = 'cache',
    MESSAGE_QUEUE = 'message-queue',
  
    // AWS Services
    LAMBDA = 'lambda',
    API_GATEWAY = 'api-gateway',
    DYNAMODB = 'dynamodb',
    S3 = 's3',
    SQS = 'sqs',
    SNS = 'sns',
    SES = 'ses',
    STEP_FUNCTIONS = 'step-functions',
  
    // Component Level
    CONTROLLER = 'controller',
    SERVICE = 'service',
    REPOSITORY = 'repository',
  }
  
  // ========================================
  // C4 Visual Styles
  // ========================================
  
  export enum C4VisualStyle {
    PERSON = 'person',
    EXTERNAL_SYSTEM = 'external-system',
    CONTAINER_WEB = 'container-web',
    CONTAINER_SERVICE = 'container-service',
    COMPONENT = 'component',
    DATABASE = 'database',
  }
  
  // ========================================
  // Architecture Node Data
  // ========================================
  
  export interface ArchitectureNodeData {
    label: string;
    description?: string;
    technology?: string;
    category: C4NodeCategory;
    level: C4Level;
    color?: string;
    icon?: string;
    visualStyle?: C4VisualStyle;
    
    // Metadata específica por categoria
    dbType?: 'SQL' | 'NoSQL';
    endpoint?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    runtime?: string;
    timeout?: number;
    memory?: number;
    queueName?: string;
    topicName?: string;
    partitions?: number;
    compensationAction?: 'rollback' | 'retry' | 'ignore' | 'compensate';
  }
  
  // ========================================
  // Group/Container Types
  // ========================================
  
  export enum GroupStyle {
    ORCHESTRATOR = 'orchestrator',
    SAGA = 'saga',
    BOUNDED_CONTEXT = 'bounded-context',
    SYSTEM = 'system',
    CUSTOM = 'custom',
  }
  
  export interface GroupNodeData {
    label: string;
    description?: string;
    color: string;
    borderStyle: 'dashed' | 'solid' | 'dotted';
    borderWidth: number;
    backgroundColor?: string;
    category: 'group';
  }