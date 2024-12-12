import { Cloud, Region } from '../types/clouds.js';

export function getAutomateEndpoint(cloud: Cloud, region: Region, prefix: string): string | undefined {
  if (cloud === 'gcp') {
    return undefined;
  }
  
  return `https://${prefix}${cloud === 'default' && region === 'eu' ? 'prod-' : ''}automations-api.contentstack.com`;
}