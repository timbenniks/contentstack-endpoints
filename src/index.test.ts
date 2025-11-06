import { describe, it, expect } from 'vitest';
import { getContentstackEndpoints, getRegionForString } from './index.js';
import { Region } from './types';

describe('getContentstackEndpoints', () => {

  // Test string-based API (recommended usage)
  describe('string-based API (recommended)', () => {
    it('should accept "na" string and return NA endpoints', () => {
      const endpoints = getContentstackEndpoints("na");
      expect(endpoints.contentDelivery).toBe('https://cdn.contentstack.io');
      expect(endpoints.contentManagement).toBe('https://api.contentstack.io');
    });

    it('should accept "us" string alias and return NA endpoints', () => {
      const endpoints = getContentstackEndpoints("us");
      expect(endpoints.contentDelivery).toBe('https://cdn.contentstack.io');
      expect(endpoints.contentManagement).toBe('https://api.contentstack.io');
    });

    it('should accept "aws-na" string alias and return NA endpoints', () => {
      const endpoints = getContentstackEndpoints("aws-na");
      expect(endpoints.contentDelivery).toBe('https://cdn.contentstack.io');
    });

    it('should accept "aws_na" string alias and return NA endpoints', () => {
      const endpoints = getContentstackEndpoints("aws_na");
      expect(endpoints.contentDelivery).toBe('https://cdn.contentstack.io');
    });

    it('should accept "eu" string and return EU endpoints', () => {
      const endpoints = getContentstackEndpoints("eu");
      expect(endpoints.contentDelivery).toBe('https://eu-cdn.contentstack.com');
      expect(endpoints.contentManagement).toBe('https://eu-api.contentstack.com');
    });

    it('should accept "aws-eu" string alias and return EU endpoints', () => {
      const endpoints = getContentstackEndpoints("aws-eu");
      expect(endpoints.contentDelivery).toBe('https://eu-cdn.contentstack.com');
    });

    it('should accept "aws_eu" string alias and return EU endpoints', () => {
      const endpoints = getContentstackEndpoints("aws_eu");
      expect(endpoints.contentDelivery).toBe('https://eu-cdn.contentstack.com');
    });

    it('should accept "au" string and return AU endpoints', () => {
      const endpoints = getContentstackEndpoints("au");
      expect(endpoints.contentDelivery).toBe('https://au-cdn.contentstack.com');
    });

    it('should accept "azure-na" string and return Azure NA endpoints', () => {
      const endpoints = getContentstackEndpoints("azure-na");
      expect(endpoints.contentDelivery).toBe('https://azure-na-cdn.contentstack.com');
    });

    it('should accept "azure_na" string alias and return Azure NA endpoints', () => {
      const endpoints = getContentstackEndpoints("azure_na");
      expect(endpoints.contentDelivery).toBe('https://azure-na-cdn.contentstack.com');
    });

    it('should accept "gcp-eu" string and return GCP EU endpoints', () => {
      const endpoints = getContentstackEndpoints("gcp-eu");
      expect(endpoints.contentDelivery).toBe('https://gcp-eu-cdn.contentstack.com');
    });

    it('should handle case-insensitive strings', () => {
      const endpoints1 = getContentstackEndpoints("EU");
      const endpoints2 = getContentstackEndpoints("Eu");
      const endpoints3 = getContentstackEndpoints("eu");
      expect(endpoints1).toEqual(endpoints2);
      expect(endpoints2).toEqual(endpoints3);
    });

    it('should work with omitHttps for string inputs', () => {
      const endpoints = getContentstackEndpoints("eu", true);
      expect(endpoints.contentDelivery).toBe('eu-cdn.contentstack.com');
      expect(endpoints.contentManagement).toBe('eu-api.contentstack.com');
    });

    it('should return empty object for invalid string', () => {
      const endpoints = getContentstackEndpoints("invalid-region");
      expect(endpoints).toEqual({});
    });
  });

  it('should return default NA endpoints when no parameters are provided', () => {
    const endpoints = getContentstackEndpoints();
    expect(endpoints.contentDelivery).toBe('https://cdn.contentstack.io');
    expect(endpoints.contentManagement).toBe('https://api.contentstack.io');
    expect(endpoints.automate).toBe('https://automations-api.contentstack.com');
    expect(endpoints.auth).toBe('https://auth-api.contentstack.com');
    expect(endpoints.launch).toBe('https://launch-api.contentstack.com');
    expect(endpoints.developerHub).toBe('https://developerhub-api.contentstack.com');
    expect(endpoints.genAI).toBe('https://ai.contentstack.com');
  });

  it('should return default NA endpoints without https when omitHTTPS parameter is provided', () => {
    const endpoints = getContentstackEndpoints(Region.NA, true);
    expect(endpoints.contentDelivery).toBe('cdn.contentstack.io');
    expect(endpoints.contentManagement).toBe('api.contentstack.io');
    expect(endpoints.automate).toBe('automations-api.contentstack.com');
  });

  it('should support Region.US for backward compatibility (same as Region.NA)', () => {
    const endpointsUS = getContentstackEndpoints(Region.US);
    const endpointsNA = getContentstackEndpoints(Region.NA);
    expect(endpointsUS).toEqual(endpointsNA);
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

  it('should return GCP NA endpoints with automate endpoint', () => {
    const endpoints = getContentstackEndpoints(Region.GCP_NA);
    expect(endpoints.contentDelivery).toBe('https://gcp-na-cdn.contentstack.com');
    expect(endpoints.automate).toBe('https://gcp-na-automations-api.contentstack.com');
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

  // Test all endpoint properties for NA region
  describe('NA region - all endpoints', () => {
    const endpoints = getContentstackEndpoints(Region.NA);

    it('should have all expected endpoint properties', () => {
      expect(endpoints.application).toBe('https://app.contentstack.com');
      expect(endpoints.contentDelivery).toBe('https://cdn.contentstack.io');
      expect(endpoints.contentManagement).toBe('https://api.contentstack.io');
      expect(endpoints.images).toBe('https://images.contentstack.io');
      expect(endpoints.assets).toBe('https://assets.contentstack.io');
      expect(endpoints.preview).toBe('https://rest-preview.contentstack.com');
      expect(endpoints.graphqlDelivery).toBe('https://graphql.contentstack.com');
      expect(endpoints.graphqlPreview).toBe('https://graphql-preview.contentstack.com');
      expect(endpoints.brandKit).toBe('https://brand-kits-api.contentstack.com');
      expect(endpoints.genAI).toBe('https://ai.contentstack.com');
      expect(endpoints.personalize).toBe('https://personalize-api.contentstack.com');
      expect(endpoints.personalizeEdge).toBe('https://personalize-edge.contentstack.com');
      expect(endpoints.automate).toBe('https://automations-api.contentstack.com');
      expect(endpoints.auth).toBe('https://auth-api.contentstack.com');
      expect(endpoints.launch).toBe('https://launch-api.contentstack.com');
      expect(endpoints.developerHub).toBe('https://developerhub-api.contentstack.com');
    });
  });

  // Test backward compatibility aliases (v1.x property names)
  describe('Backward compatibility - v1.x property names', () => {
    const endpoints = getContentstackEndpoints(Region.NA);

    it('should support v1.x graphql alias (maps to graphqlDelivery)', () => {
      expect(endpoints.graphql).toBe('https://graphql.contentstack.com');
      expect(endpoints.graphql).toBe(endpoints.graphqlDelivery);
    });

    it('should support v1.x imageDelivery alias (maps to images)', () => {
      expect(endpoints.imageDelivery).toBe('https://images.contentstack.io');
      expect(endpoints.imageDelivery).toBe(endpoints.images);
    });

    it('should support v1.x brandKitGenAI alias (maps to genAI)', () => {
      expect(endpoints.brandKitGenAI).toBe('https://ai.contentstack.com');
      expect(endpoints.brandKitGenAI).toBe(endpoints.genAI);
    });

    it('should support v1.x personalizeManagement alias (maps to personalize)', () => {
      expect(endpoints.personalizeManagement).toBe('https://personalize-api.contentstack.com');
      expect(endpoints.personalizeManagement).toBe(endpoints.personalize);
    });

    it('should work with all regions', () => {
      const euEndpoints = getContentstackEndpoints(Region.EU);
      expect(euEndpoints.graphql).toBe('https://eu-graphql.contentstack.com');
      expect(euEndpoints.imageDelivery).toBe('https://eu-images.contentstack.com');

      const azureEndpoints = getContentstackEndpoints(Region.AZURE_NA);
      expect(azureEndpoints.graphql).toBe('https://azure-na-graphql.contentstack.com');
      expect(azureEndpoints.brandKitGenAI).toBe('https://azure-na-ai.contentstack.com');
    });
  });

  // Test omitHttps functionality for different regions
  describe('omitHttps functionality', () => {
    it('should omit https from EU endpoints', () => {
      const endpoints = getContentstackEndpoints(Region.EU, true);
      expect(endpoints.contentDelivery).toBe('eu-cdn.contentstack.com');
      expect(endpoints.contentManagement).toBe('eu-api.contentstack.com');
      expect(endpoints.application).toBe('eu-app.contentstack.com');
      expect(endpoints.graphqlDelivery).toBe('eu-graphql.contentstack.com');
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
      expect(endpoints.personalize).toBe('gcp-eu-personalize-api.contentstack.com');
    });
  });

  // Test specific endpoint differences between regions
  describe('region-specific endpoint variations', () => {
    it('should use different automate endpoints for EU vs NA', () => {
      const naEndpoints = getContentstackEndpoints(Region.NA);
      const euEndpoints = getContentstackEndpoints(Region.EU);

      expect(naEndpoints.automate).toBe('https://automations-api.contentstack.com');
      expect(euEndpoints.automate).toBe('https://eu-prod-automations-api.contentstack.com');
    });

    it('should have automate endpoint for Azure regions', () => {
      const azureNaEndpoints = getContentstackEndpoints(Region.AZURE_NA);
      const azureEuEndpoints = getContentstackEndpoints(Region.AZURE_EU);

      expect(azureNaEndpoints.automate).toBe('https://azure-na-automations-api.contentstack.com');
      expect(azureEuEndpoints.automate).toBe('https://azure-eu-automations-api.contentstack.com');
    });

    it('should have automate endpoint for GCP regions', () => {
      const gcpNaEndpoints = getContentstackEndpoints(Region.GCP_NA);
      const gcpEuEndpoints = getContentstackEndpoints(Region.GCP_EU);
      expect(gcpNaEndpoints.automate).toBe('https://gcp-na-automations-api.contentstack.com');
      expect(gcpEuEndpoints.automate).toBe('https://gcp-eu-automations-api.contentstack.com');
    });
  });
});

describe('getContentstackEndpoints - unrecognized regions', () => {
  it('should return empty object for unrecognized region', () => {
    // Cast to simulate an invalid region for testing purposes
    const invalidRegion = 'INVALID_REGION' as Region;
    const endpoints = getContentstackEndpoints(invalidRegion);
    expect(endpoints).toEqual({});
  });

  it('should return empty object for unrecognized region with omitHttps true', () => {
    // Cast to simulate an invalid region for testing purposes  
    const invalidRegion = 'ANOTHER_INVALID' as Region;
    const endpoints = getContentstackEndpoints(invalidRegion, true);
    expect(endpoints).toEqual({});
  });

  it('should handle null region gracefully', () => {
    // Cast to simulate a null region for testing purposes
    const nullRegion = null as unknown as Region;
    const endpoints = getContentstackEndpoints(nullRegion);
    expect(endpoints).toEqual({});
  });
});

describe('getRegionForString', () => {
  it('Should return Region.NA for "NA"', () => {
    const region = getRegionForString("NA")
    expect(region).toBe(Region.NA);
  });

  it('Should return Region.NA for "US" (backward compatibility)', () => {
    const region = getRegionForString("US")
    expect(region).toBe(Region.NA);
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

  // Additional test cases for getRegionForString
  it('Should return Region.NA for "na"', () => {
    const region = getRegionForString("na");
    expect(region).toBe(Region.NA);
  });

  it('Should return Region.NA for "us" (official alias)', () => {
    const region = getRegionForString("us");
    expect(region).toBe(Region.NA);
  });

  it('Should return Region.NA for "aws-na" (official alias)', () => {
    const region = getRegionForString("aws-na");
    expect(region).toBe(Region.NA);
  });

  it('Should return Region.NA for "aws_na" (official alias)', () => {
    const region = getRegionForString("aws_na");
    expect(region).toBe(Region.NA);
  });

  it('Should return Region.EU for "aws-eu" (official alias)', () => {
    const region = getRegionForString("aws-eu");
    expect(region).toBe(Region.EU);
  });

  it('Should return Region.EU for "aws_eu" (official alias)', () => {
    const region = getRegionForString("aws_eu");
    expect(region).toBe(Region.EU);
  });

  it('Should return Region.AU for "aws-au" (official alias)', () => {
    const region = getRegionForString("aws-au");
    expect(region).toBe(Region.AU);
  });

  it('Should return Region.AU for "aws_au" (official alias)', () => {
    const region = getRegionForString("aws_au");
    expect(region).toBe(Region.AU);
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

  it('Should return undefined for null input', () => {
    const region = getRegionForString(null as any);
    expect(region).toBeUndefined();
  });

  it('Should return undefined for undefined input', () => {
    const region = getRegionForString(undefined as any);
    expect(region).toBeUndefined();
  });

  it('Should return undefined for random invalid strings', () => {
    expect(getRegionForString("xyz")).toBeUndefined();
    expect(getRegionForString("test-region")).toBeUndefined();
    expect(getRegionForString("123")).toBeUndefined();
  });
});