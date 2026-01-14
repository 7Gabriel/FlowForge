import { 
    Play, 
    Brain, 
    Globe, 
    GitBranch, 
    Save,
    LucideIcon 
  } from 'lucide-react';
  import { NodeType } from './types';
  
  export interface NodeTemplate {
    type: NodeType;
    label: string;
    description: string;
    icon: LucideIcon;
    color: 'green' | 'purple' | 'blue' | 'amber' | 'red';
    category: 'input' | 'processing' | 'logic' | 'output';
    defaultData: any;
  }
  
  export const nodeTemplates: NodeTemplate[] = [
    // INPUT NODES
    {
      type: NodeType.TRIGGER,
      label: 'Trigger',
      description: 'Start your workflow',
      icon: Play,
      color: 'green',
      category: 'input',
      defaultData: {
        label: 'New Trigger',
        triggerType: 'manual',
        description: '',
      },
    },
  
    // PROCESSING NODES
    {
      type: NodeType.LLM,
      label: 'LLM',
      description: 'Call AI model',
      icon: Brain,
      color: 'purple',
      category: 'processing',
      defaultData: {
        label: 'New LLM',
        provider: 'openai',
        model: 'gpt-4',
        prompt: '',
        temperature: 0.7,
        maxTokens: 1000,
      },
    },
    {
      type: NodeType.HTTP,
      label: 'HTTP Request',
      description: 'Make API calls',
      icon: Globe,
      color: 'blue',
      category: 'processing',
      defaultData: {
        label: 'New HTTP Request',
        method: 'GET',
        url: '',
        headers: {},
        body: '',
      },
    },
  
    // LOGIC NODES
    {
      type: NodeType.CONDITION,
      label: 'Condition',
      description: 'Branch based on logic',
      icon: GitBranch,
      color: 'amber',
      category: 'logic',
      defaultData: {
        label: 'New Condition',
        condition: '',
        paths: {
          true: 'True path',
          false: 'False path',
        },
      },
    },
  
    // OUTPUT NODES
    {
      type: NodeType.OUTPUT,
      label: 'Output',
      description: 'Save or send results',
      icon: Save,
      color: 'red',
      category: 'output',
      defaultData: {
        label: 'New Output',
        outputType: 'json',
        destination: '',
      },
    },
  ];
  
  export const getNodeTemplate = (type: NodeType): NodeTemplate | undefined => {
    return nodeTemplates.find((template) => template.type === type);
  };