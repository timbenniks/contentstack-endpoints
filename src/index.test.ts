import { describe, it, expect } from 'vitest';
import { getContentstackEndpoints } from './index.js';
import { Region } from './types';

describe('getContentstackEndpoints', () => {

  it('should return default NA endpoints when no parameters are provided', () => {
    const endpoints = getContentstackEndpoints();
    expect(endpoints.contentDelivery).toBe('https://cdn.contentstack.io');
    expect(endpoints.contentManagement).toBe('https://api.contentstack.io');
    expect(endpoints.automate).toBe('https://automations-api.contentstack.com');
  });

  it('should return default NA endpoints without https omitHTTPS parameter is provided', () => {
    const endpoints = getContentstackEndpoints(Region.US, true);
    expect(endpoints.contentDelivery).toBe('cdn.contentstack.io');
    expect(endpoints.contentManagement).toBe('api.contentstack.io');
    expect(endpoints.automate).toBe('automations-api.contentstack.com');
  });

  it('should return EU endpoints', () => {
    const endpoints = getContentstackEndpoints(Region.EU);
    expect(endpoints.contentDelivery).toBe('https://eu-cdn.contentstack.com');
    expect(endpoints.contentManagement).toBe('https://eu-api.contentstack.com');
    expect(endpoints.automate).toBe('https://eu-prod-automations-api.contentstack.com');
  });

  it('should return Azure NA endpoints', () => {
    const endpoints = getContentstackEndpoints(Region.AZURE_NA);
    expect(endpoints.contentDelivery).toBe('https://azure-na-cdn.contentstack.com');
    expect(endpoints.contentManagement).toBe('https://azure-na-api.contentstack.com');
  });

  it('should return GCP NA endpoints without automate endpoint', () => {
    const endpoints = getContentstackEndpoints(Region.GCP_NA);
    expect(endpoints.contentDelivery).toBe('https://gcp-na-cdn.contentstack.com');
    expect(endpoints.automate).toBeUndefined();
  });

  it('should include GraphQL preview endpoints', () => {
    const endpoints = getContentstackEndpoints(Region.AZURE_EU);
    expect(endpoints.graphqlPreview).toBe('https://azure-eu-graphql-preview.contentstack.com');
  });

});