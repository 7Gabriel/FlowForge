import { ArchitectureTemplate, TemplateCategory } from './template-types';
import { microservicesEcommerceTemplate } from './templates/microservices-ecommerce';
import { eventDrivenKafkaTemplate } from './templates/event-driven-kafka';
import { serverlessAwsTemplate } from './templates/serverless-aws';
import { monolithToMicroservicesTemplate } from './templates/monolith-to-microservices';
import { cqrsPatternTemplate } from './templates/cqrs-pattern';

export const templateRegistry: ArchitectureTemplate[] = [
  microservicesEcommerceTemplate,
  eventDrivenKafkaTemplate,
  serverlessAwsTemplate,
  monolithToMicroservicesTemplate,
  cqrsPatternTemplate,
];

export function getTemplateById(id: string): ArchitectureTemplate | undefined {
  return templateRegistry.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: TemplateCategory): ArchitectureTemplate[] {
  return templateRegistry.filter((t) => t.category === category);
}

export function getAllTemplates(): ArchitectureTemplate[] {
  return templateRegistry;
}

export function getTemplateCategories(): TemplateCategory[] {
  return Object.values(TemplateCategory);
}