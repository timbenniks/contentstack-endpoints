import { describe, it, expect } from 'vitest';
import { getContentstackEndpoints } from './index.js';

describe('getContentstackEndpoints', () => {
  it('should return default NA endpoints when no parameters are provided', () => {
    const endpoints = getContentstackEndpoints();
    expect(endpoints.contentDelivery).toBe('https://cdn.contentstack.com/');
    expect(endpoints.contentManagement).toBe('https://api.contentstack.com/');
    expect(endpoints.automate).toBe('https://automations-api.contentstack.com');
  });

  it('should return EU endpoints', () => {
    const endpoints = getContentstackEndpoints('default', 'eu');
    expect(endpoints.contentDelivery).toBe('https://eu-cdn.contentstack.com/');
    expect(endpoints.contentManagement).toBe('https://eu-api.contentstack.com/');
    expect(endpoints.automate).toBe('https://eu-prod-automations-api.contentstack.com');
  });

  it('should return Azure NA endpoints', () => {
    const endpoints = getContentstackEndpoints('azure', 'na');
    expect(endpoints.contentDelivery).toBe('https://azure-na-cdn.contentstack.com/');
    expect(endpoints.contentManagement).toBe('https://azure-na-api.contentstack.com/');
  });

  it('should return GCP NA endpoints without automate endpoint', () => {
    const endpoints = getContentstackEndpoints('gcp', 'na');
    expect(endpoints.contentDelivery).toBe('https://gcp-na-cdn.contentstack.com/');
    expect(endpoints.automate).toBeUndefined();
  });

  it('should include GraphQL preview endpoints', () => {
    const endpoints = getContentstackEndpoints('azure', 'eu');
    expect(endpoints.graphqlPreview).toBe('https://azure-eu-graphql-preview.contentstack.com/');
  });
});