import { 
    User, Globe, Server, Database, Cloud, MessageSquare,
    Box, Code, FileText, Zap, Play, GitBranch,
    Mail, Archive, HardDrive, Layers, Activity,
    LucideIcon
  } from 'lucide-react';
  

  export const iconRegistry: Record<string, LucideIcon> = {
    User,
    Globe,
    Server,
    Database,
    Cloud,
    MessageSquare,
    Box,
    Code,
    FileText,
    Zap,
    Play,
    GitBranch,
    Mail,
    Archive,
    HardDrive,
    Layers,
    Activity,
  };
  
  export function getIconByName(name: string): LucideIcon | null {
    return iconRegistry[name] || null;
  }