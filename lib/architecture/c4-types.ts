// ========================================
// C4 Model - Levels
// ========================================

export enum C4Level {
    CONTEXT = 'context',
    CONTAINER = 'container',
    COMPONENT = 'component',
    CODE = 'code',
  }
  
  // ========================================
  // C4 Model - Node Categories
  // ========================================
  
  export enum C4NodeCategory {
    // CONTEXT LEVEL
    PERSON = 'person',                    // Usuário/Ator
    EXTERNAL_SYSTEM = 'external-system',  // Sistema externo
    
    // CONTAINER LEVEL
    WEB_APP = 'web-app',
    MOBILE_APP = 'mobile-app',
    API = 'api',
    DATABASE = 'database',
    MESSAGE_BROKER = 'message-broker',
    FILE_STORAGE = 'file-storage',
    
    // COMPONENT LEVEL
    CONTROLLER = 'controller',
    SERVICE = 'service',
    REPOSITORY = 'repository',
    ENTITY = 'entity',
    
    // CLOUD SERVICES
    LAMBDA = 'lambda',
    STEP_FUNCTION = 'step-function',
    SQS = 'sqs',
    SNS = 'sns',
    S3 = 's3',
    DYNAMODB = 'dynamodb',
    API_GATEWAY = 'api-gateway',
    KAFKA_TOPIC = 'kafka-topic',
    
    // SAGA PATTERN
    SAGA_ORCHESTRATOR = 'saga-orchestrator',
    COMPENSATING_ACTION = 'compensating-action',
  }
  
  // ========================================
  // Architecture Node Data
  // ========================================
  
  export interface ArchitectureNodeData {
    label: string;
    category: C4NodeCategory;
    level: C4Level;
    description?: string;
    technology?: string;
    
    // Metadata específica
    metadata?: {
      // Para APIs
      endpoint?: string;
      method?: string;
      
      // Para DBs
      dbType?: 'sql' | 'nosql';
      
      // Para Lambdas/Functions
      runtime?: string;
      timeout?: number;
      memory?: number;
      
      // Para Message Brokers
      topicName?: string;
      queueName?: string;
      
      // Para Saga
      compensationAction?: string;
      sagaStep?: number;
    };
    
    // Visual
    color?: string;
    icon?: string;
  }
  
  // ========================================
  // Architecture Relationship (Edge)
  // ========================================
  
  export interface ArchitectureRelationship {
    id: string;
    source: string;
    target: string;
    label?: string;
    type: RelationshipType;
    protocol?: string; // HTTP, gRPC, AMQP, etc
    isCompensation?: boolean; // Para Saga patterns
  }
  
  export enum RelationshipType {
    USES = 'uses',                    // A usa B
    DEPENDS_ON = 'depends-on',        // A depende de B
    READS_FROM = 'reads-from',        // A lê de B
    WRITES_TO = 'writes-to',          // A escreve em B
    PUBLISHES_TO = 'publishes-to',    // A publica em B
    SUBSCRIBES_TO = 'subscribes-to',  // A se inscreve em B
    CALLS = 'calls',                  // A chama B (sync)
    TRIGGERS = 'triggers',            // A dispara B (async)
    COMPENSATES = 'compensates',      // A compensa B (saga)
  }
  
  // ========================================
  // Diagram Metadata
  // ========================================
  
  export interface ArchitectureDiagram {
    id: string;
    name: string;
    description: string;
    level: C4Level;
    nodes: ArchitectureNodeData[];
    relationships: ArchitectureRelationship[];
    metadata: {
      author?: string;
      version: string;
      tags?: string[];
      createdAt: string;
      updatedAt: string;
    };
  }