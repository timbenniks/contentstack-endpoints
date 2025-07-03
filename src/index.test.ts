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

  // Test missing regions
  it('should return AU endpoints', () => {
    const endpoints = getContentstackEndpoints(Region.AU);
    expect(endpoints.contentDelivery).toBe('https://au-cdn.contentstack.com');
    expect(endpoints.contentManagement).toBe('https://au-api.contentstack.com');
    expect(endpoints.automate).toBe('https://au-prod-automations-api.contentstack.com');
    expect(endpoints.application).toBe('https://au-app.contentstack.com');
  });

  it('should return Azure EU endpoints', () => {
    const endpoints = getContentstackEndpoints(Region.AZURE_EU);
    expect(endpoints.contentDelivery).toBe('https://azure-eu-cdn.contentstack.com');
    expect(endpoints.contentManagement).toBe('https://azure-eu-api.contentstack.com');
    expect(endpoints.automate).toBe('https://azure-eu-automations-api.contentstack.com');
    expect(endpoints.application).toBe('https://azure-eu-app.contentstack.com');
  });

  // Test all endpoint properties for US region
  describe('US region - all endpoints', () => {
    const endpoints = getContentstackEndpoints(Region.US);

    it('should have all expected endpoint properties', () => {
      expect(endpoints.application).toBe('https://app.contentstack.com');
      expect(endpoints.contentDelivery).toBe('https://cdn.contentstack.io');
      expect(endpoints.contentManagement).toBe('https://api.contentstack.io');
      expect(endpoints.imageDelivery).toBe('https://images.contentstack.io');
      expect(endpoints.assets).toBe('https://assets.contentstack.io');
      expect(endpoints.preview).toBe('https://rest-preview.contentstack.com');
      expect(endpoints.graphql).toBe('https://graphql.contentstack.com');
      expect(endpoints.graphqlPreview).toBe('https://graphql-preview.contentstack.com');
      expect(endpoints.brandKit).toBe('https://brand-kits-api.contentstack.com');
      expect(endpoints.brandKitGenAI).toBe('https://ai.contentstack.com/brand-kits');
      expect(endpoints.personalizeManagement).toBe('https://personalize-api.contentstack.com');
      expect(endpoints.personalizeEdge).toBe('https://personalize-edge.contentstack.com');
      expect(endpoints.automate).toBe('https://automations-api.contentstack.com');
    });
  });

  // Test omitHttps functionality for different regions
  describe('omitHttps functionality', () => {
    it('should omit https from EU endpoints', () => {
      const endpoints = getContentstackEndpoints(Region.EU, true);
      expect(endpoints.contentDelivery).toBe('eu-cdn.contentstack.com');
      expect(endpoints.contentManagement).toBe('eu-api.contentstack.com');
      expect(endpoints.application).toBe('eu-app.contentstack.com');
      expect(endpoints.graphql).toBe('eu-graphql.contentstack.com');
    });

    it('should omit https from Azure NA endpoints', () => {
      const endpoints = getContentstackEndpoints(Region.AZURE_NA, true);
      expect(endpoints.contentDelivery).toBe('azure-na-cdn.contentstack.com');
      expect(endpoints.contentManagement).toBe('azure-na-api.contentstack.com');
      expect(endpoints.brandKit).toBe('azure-na-brand-kits-api.contentstack.com');
    });

    it('should omit https from GCP EU endpoints', () => {
      const endpoints = getContentstackEndpoints(Region.GCP_EU, true);
      expect(endpoints.contentDelivery).toBe('gcp-eu-cdn.contentstack.com');
      expect(endpoints.contentManagement).toBe('gcp-eu-api.contentstack.com');
      expect(endpoints.personalizeManagement).toBe('gcp-eu-personalize-api.contentstack.com');
    });
  });

  // Test specific endpoint differences between regions
  describe('region-specific endpoint variations', () => {
    it('should use different automate endpoints for EU vs US', () => {
      const usEndpoints = getContentstackEndpoints(Region.US);
      const euEndpoints = getContentstackEndpoints(Region.EU);

      expect(usEndpoints.automate).toBe('https://automations-api.contentstack.com');
      expect(euEndpoints.automate).toBe('https://eu-prod-automations-api.contentstack.com');
    });

    it('should have automate endpoint for Azure regions', () => {
      const azureNaEndpoints = getContentstackEndpoints(Region.AZURE_NA);
      const azureEuEndpoints = getContentstackEndpoints(Region.AZURE_EU);

      expect(azureNaEndpoints.automate).toBe('https://azure-na-automations-api.contentstack.com');
      expect(azureEuEndpoints.automate).toBe('https://azure-eu-automations-api.contentstack.com');
    });

    it('should not have automate endpoint for GCP NA', () => {
      const gcpNaEndpoints = getContentstackEndpoints(Region.GCP_NA);
      expect(gcpNaEndpoints.automate).toBeUndefined();
    });
  });
});

describe('getRegionForString', () => {
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

  // Additional test cases for getRegionForString
  it('Should return Region.US for "us"', () => {
    const region = getRegionForString("us");
    expect(region).toBe(Region.US);
  });

  it('Should return Region.US for "US"', () => {
    const region = getRegionForString("US");
    expect(region).toBe(Region.US);
  });

  it('Should return Region.AU for "au"', () => {
    const region = getRegionForString("au");
    expect(region).toBe(Region.AU);
  });

  it('Should return Region.AU for "AU"', () => {
    const region = getRegionForString("AU");
    expect(region).toBe(Region.AU);
  });

  it('Should return Region.AZURE_EU for "azure-eu"', () => {
    const region = getRegionForString("azure-eu");
    expect(region).toBe(Region.AZURE_EU);
  });

  it('Should return Region.AZURE_EU for "AZURE_EU"', () => {
    const region = getRegionForString("AZURE_EU");
    expect(region).toBe(Region.AZURE_EU);
  });

  it('Should return Region.GCP_EU for "gcp-eu"', () => {
    const region = getRegionForString("gcp-eu");
    expect(region).toBe(Region.GCP_EU);
  });

  it('Should return Region.GCP_EU for "GCP_EU"', () => {
    const region = getRegionForString("GCP_EU");
    expect(region).toBe(Region.GCP_EU);
  });

  // Edge cases
  it('Should handle mixed case input', () => {
    const region = getRegionForString("Gcp-Eu");
    expect(region).toBe(Region.GCP_EU);
  });

  it('Should return undefined for invalid region string', () => {
    const region = getRegionForString("invalid-region");
    expect(region).toBeUndefined();
  });

  it('Should return undefined for empty string', () => {
    const region = getRegionForString("");
    expect(region).toBeUndefined();
  });
});