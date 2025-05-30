import { describe, it, expect } from 'vitest';
import { getContentstackEndpoints, getRegionForString } from './index.js';
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

  it('should return GCP EU endpoints', () => {
    const endpoints = getContentstackEndpoints(Region.GCP_EU);
    expect(endpoints.contentDelivery).toBe('https://gcp-eu-cdn.contentstack.com');
    expect(endpoints.contentManagement).toBe('https://gcp-eu-api.contentstack.com');
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

  it('Should return Region.EU for "EU"', () => {
    const region = getRegionForString("EU")
    expect(region).toBe(Region.EU);
  });

  it('Should return Region.AZURE_NA for "AZURE_NA"', () => {
    const region = getRegionForString("AZURE_NA")
    expect(region).toBe(Region.AZURE_NA);
  });

  it('Should return Region.AZURE_NA for "azure-na"', () => {
    const region = getRegionForString("azure-na")
    expect(region).toBe(Region.AZURE_NA);
  });

  it('Should return Region.GCP_NA for "gcp-na"', () => {
    const region = getRegionForString("gcp-na")
    expect(region).toBe(Region.GCP_NA);
  });
});