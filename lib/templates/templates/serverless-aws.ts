import { ArchitectureTemplate, TemplateCategory } from '../template-types';
import { MarkerType } from 'reactflow';

export const serverlessAwsTemplate: ArchitectureTemplate = {
  id: 'serverless-aws',
  name: 'Serverless AWS Architecture',
  description: 'Serverless application using AWS Lambda, API Gateway, DynamoDB, and S3',
  category: TemplateCategory.SERVERLESS,
  tags: ['serverless', 'aws', 'lambda', 'api-gateway', 'dynamodb', 's3'],
  difficulty: 'intermediate',
  author: 'FlowForge',
  nodes: [
    // User
    {
      id: 'user-mobile',
      type: 'person',
      position: { x: 400, y: 50 },
      data: {
        label: 'Mobile User',
        description: 'User accessing serverless application',
        category: 'user',
        level: 'context',
        color: '#4CAF50',
      },
    },
    
    // CloudFront
    {
      id: 'cloudfront',
      type: 'external-system',
      position: { x: 400, y: 200 },
      data: {
        label: 'CloudFront CDN',
        description: 'Global content delivery network',
        technology: 'AWS CloudFront',
        category: 'cdn',
        level: 'container',
        color: '#FF5722',
      },
    },
    
    // S3 for Static Content
    {
      id: 's3-static',
      type: 'database',
      position: { x: 100, y: 200 },
      data: {
        label: 'S3 Static Assets',
        description: 'Stores static web content',
        technology: 'AWS S3',
        category: 'storage',
        level: 'container',
        color: '#2196F3',
      },
    },
    
    // API Gateway
    {
      id: 'api-gateway',
      type: 'container-web',
      position: { x: 400, y: 380 },
      data: {
        label: 'API Gateway',
        description: 'RESTful API endpoints',
        technology: 'AWS API Gateway',
        category: 'api-gateway',
        level: 'container',
        color: '#2196F3',
      },
    },
    
    // Lambda Functions
    {
      id: 'lambda-auth',
      type: 'container-service',
      position: { x: 100, y: 560 },
      data: {
        label: 'Auth Function',
        description: 'Authenticates user requests',
        technology: 'AWS Lambda (Node.js)',
        category: 'lambda',
        level: 'container',
        color: '#2196F3',
      },
    },
    {
      id: 'lambda-users',
      type: 'container-service',
      position: { x: 300, y: 560 },
      data: {
        label: 'Users Function',
        description: 'Manages user data',
        technology: 'AWS Lambda (Python)',
        category: 'lambda',
        level: 'container',
        color: '#2196F3',
      },
    },
    {
      id: 'lambda-orders',
      type: 'container-service',
      position: { x: 500, y: 560 },
      data: {
        label: 'Orders Function',
        description: 'Processes orders',
        technology: 'AWS Lambda (Node.js)',
        category: 'lambda',
        level: 'container',
        color: '#2196F3',
      },
    },
    {
      id: 'lambda-notifications',
      type: 'container-service',
      position: { x: 700, y: 560 },
      data: {
        label: 'Notifications Function',
        description: 'Sends notifications',
        technology: 'AWS Lambda (Python)',
        category: 'lambda',
        level: 'container',
        color: '#2196F3',
      },
    },
    
    // DynamoDB Tables
    {
      id: 'dynamodb-users',
      type: 'database',
      position: { x: 300, y: 750 },
      data: {
        label: 'Users Table',
        description: 'User data storage',
        technology: 'AWS DynamoDB',
        category: 'dynamodb',
        level: 'container',
        color: '#2196F3',
      },
    },
    {
      id: 'dynamodb-orders',
      type: 'database',
      position: { x: 500, y: 750 },
      data: {
        label: 'Orders Table',
        description: 'Order data storage',
        technology: 'AWS DynamoDB',
        category: 'dynamodb',
        level: 'container',
        color: '#2196F3',
      },
    },
    
    // SQS Queue
    {
      id: 'sqs-queue',
      type: 'external-system',
      position: { x: 900, y: 560 },
      data: {
        label: 'SQS Queue',
        description: 'Async message queue',
        technology: 'AWS SQS',
        category: 'sqs',
        level: 'container',
        color: '#FF5722',
      },
    },
    
    // SNS Topic
    {
      id: 'sns-topic',
      type: 'external-system',
      position: { x: 900, y: 750 },
      data: {
        label: 'SNS Topic',
        description: 'Push notifications',
        technology: 'AWS SNS',
        category: 'sns',
        level: 'container',
        color: '#FF5722',
      },
    },
  ],
  edges: [
    // User → CloudFront
    {
      id: 'e-user-cloudfront',
      source: 'user-mobile',
      target: 'cloudfront',
      type: 'editable',
      data: { label: 'HTTPS', edgeStyle: 'solid' },
      style: { stroke: '#3B82F6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    
    // CloudFront → S3
    {
      id: 'e-cloudfront-s3',
      source: 'cloudfront',
      target: 's3-static',
      type: 'editable',
      data: { label: 'Cache', edgeStyle: 'solid' },
      style: { stroke: '#3B82F6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    
    // CloudFront → API Gateway
    {
      id: 'e-cloudfront-api',
      source: 'cloudfront',
      target: 'api-gateway',
      type: 'editable',
      data: { label: 'API Calls', edgeStyle: 'solid' },
      style: { stroke: '#3B82F6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    
    // API Gateway → Lambda Functions
    {
      id: 'e-api-auth',
      source: 'api-gateway',
      target: 'lambda-auth',
      type: 'editable',
      data: { label: '/auth', edgeStyle: 'solid' },
      style: { stroke: '#3B82F6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    {
      id: 'e-api-users',
      source: 'api-gateway',
      target: 'lambda-users',
      type: 'editable',
      data: { label: '/users', edgeStyle: 'solid' },
      style: { stroke: '#3B82F6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    {
      id: 'e-api-orders',
      source: 'api-gateway',
      target: 'lambda-orders',
      type: 'editable',
      data: { label: '/orders', edgeStyle: 'solid' },
      style: { stroke: '#3B82F6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    
    // Lambda → DynamoDB
    {
      id: 'e-users-db',
      source: 'lambda-users',
      target: 'dynamodb-users',
      type: 'editable',
      data: { label: 'Query', edgeStyle: 'solid' },
      style: { stroke: '#3B82F6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    {
      id: 'e-orders-db',
      source: 'lambda-orders',
      target: 'dynamodb-orders',
      type: 'editable',
      data: { label: 'Query', edgeStyle: 'solid' },
      style: { stroke: '#3B82F6', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    
    // Lambda → SQS (Async)
    {
      id: 'e-orders-sqs',
      source: 'lambda-orders',
      target: 'sqs-queue',
      type: 'editable',
      animated: true,
      data: { label: 'Send Message', edgeStyle: 'dashed' },
      style: { stroke: '#FF5722', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#FF5722' },
    },
    
    // SQS → Lambda Notifications
    {
      id: 'e-sqs-notifications',
      source: 'sqs-queue',
      target: 'lambda-notifications',
      type: 'editable',
      animated: true,
      data: { label: 'Trigger', edgeStyle: 'dashed' },
      style: { stroke: '#FF5722', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#FF5722' },
    },
    
    // Lambda Notifications → SNS
    {
      id: 'e-notifications-sns',
      source: 'lambda-notifications',
      target: 'sns-topic',
      type: 'editable',
      animated: true,
      data: { label: 'Publish', edgeStyle: 'dashed' },
      style: { stroke: '#FF5722', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#FF5722' },
    },
  ],
};