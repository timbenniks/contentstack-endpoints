import { ContentstackEndpoints, Region } from './types';

const defaultEndpoints: ContentstackEndpoints = {
  application: 'https://app.contentstack.com',
  contentDelivery: 'https://cdn.contentstack.io',
  contentManagement: 'https://api.contentstack.io',
  imageDelivery: 'https://images.contentstack.io',
  assets: 'https://assets.contentstack.io',
  preview: 'https://rest-preview.contentstack.com',
  graphql: 'https://graphql.contentstack.com',
  graphqlPreview: 'https://graphql-preview.contentstack.com',
  brandKit: 'https://brand-kits-api.contentstack.com',
  brandKitGenAI: 'https://ai.contentstack.com/brand-kits',
  personalizeManagement: 'https://personalize-api.contentstack.com',
  personalizeEdge: 'https://personalize-edge.contentstack.com',
  automate: 'https://automations-api.contentstack.com'
};

const regionEndpoints: Record<Region, ContentstackEndpoints> = {
  [Region.US]: defaultEndpoints,
  [Region.EU]: {
    application: 'https://eu-app.contentstack.com',
    contentDelivery: 'https://eu-cdn.contentstack.com',
    contentManagement: 'https://eu-api.contentstack.com',
    imageDelivery: 'https://eu-images.contentstack.com',
    assets: 'https://eu-assets.contentstack.com',
    preview: 'https://eu-rest-preview.contentstack.com',
    graphql: 'https://eu-graphql.contentstack.com',
    graphqlPreview: 'https://eu-graphql-preview.contentstack.com',
    brandKit: 'https://eu-brand-kits-api.contentstack.com',
    brandKitGenAI: 'https://eu-ai.contentstack.com/brand-kits',
    personalizeManagement: 'https://eu-personalize-api.contentstack.com',
    personalizeEdge: 'https://eu-personalize-edge.contentstack.com',
    automate: 'https://eu-prod-automations-api.contentstack.com'
  },
  [Region.AU]: {
    application: 'https://au-app.contentstack.com',
    contentDelivery: 'https://au-cdn.contentstack.com',
    contentManagement: 'https://au-api.contentstack.com',
    imageDelivery: 'https://au-images.contentstack.com',
    assets: 'https://au-assets.contentstack.com',
    preview: 'https://au-rest-preview.contentstack.com',
    graphql: 'https://au-graphql.contentstack.com',
    graphqlPreview: 'https://au-graphql-preview.contentstack.com',
    brandKit: 'https://au-brand-kits-api.contentstack.com',
    brandKitGenAI: 'https://au-ai.contentstack.com/brand-kits',
    personalizeManagement: 'https://au-personalize-api.contentstack.com',
    personalizeEdge: 'https://au-personalize-edge.contentstack.com',
    automate: 'https://au-prod-automations-api.contentstack.com'
  },
  [Region.AZURE_NA]: {
    application: 'https://azure-na-app.contentstack.com',
    contentDelivery: 'https://azure-na-cdn.contentstack.com',
    contentManagement: 'https://azure-na-api.contentstack.com',
    imageDelivery: 'https://azure-na-images.contentstack.com',
    assets: 'https://azure-na-assets.contentstack.com',
    preview: 'https://azure-na-rest-preview.contentstack.com',
    graphql: 'https://azure-na-graphql.contentstack.com',
    graphqlPreview: 'https://azure-na-graphql-preview.contentstack.com',
    brandKit: 'https://azure-na-brand-kits-api.contentstack.com',
    brandKitGenAI: 'https://azure-na-ai.contentstack.com/brand-kits',
    personalizeManagement: 'https://azure-na-personalize-api.contentstack.com',
    personalizeEdge: 'https://azure-na-personalize-edge.contentstack.com',
    automate: 'https://azure-na-automations-api.contentstack.com'
  },
  [Region.AZURE_EU]: {
    application: 'https://azure-eu-app.contentstack.com',
    contentDelivery: 'https://azure-eu-cdn.contentstack.com',
    contentManagement: 'https://azure-eu-api.contentstack.com',
    imageDelivery: 'https://azure-eu-images.contentstack.com',
    assets: 'https://azure-eu-assets.contentstack.com',
    preview: 'https://azure-eu-rest-preview.contentstack.com',
    graphql: 'https://azure-eu-graphql.contentstack.com',
    graphqlPreview: 'https://azure-eu-graphql-preview.contentstack.com',
    brandKit: 'https://azure-eu-brand-kits-api.contentstack.com',
    brandKitGenAI: 'https://azure-eu-ai.contentstack.com/brand-kits',
    personalizeManagement: 'https://azure-eu-personalize-api.contentstack.com',
    personalizeEdge: 'https://azure-eu-personalize-edge.contentstack.com',
    automate: 'https://azure-eu-automations-api.contentstack.com'
  },
  [Region.GCP_NA]: {
    application: 'https://gcp-na-app.contentstack.com',
    contentDelivery: 'https://gcp-na-cdn.contentstack.com',
    contentManagement: 'https://gcp-na-api.contentstack.com',
    imageDelivery: 'https://gcp-na-images.contentstack.com',
    assets: 'https://gcp-na-assets.contentstack.com',
    preview: 'https://gcp-na-rest-preview.contentstack.com',
    graphql: 'https://gcp-na-graphql.contentstack.com',
    graphqlPreview: 'https://gcp-na-graphql-preview.contentstack.com',
    brandKit: 'https://gcp-na-brand-kits-api.contentstack.com',
    brandKitGenAI: 'https://gcp-na-ai.contentstack.com/brand-kits',
    personalizeManagement: 'https://gcp-na-personalize-api.contentstack.com',
    personalizeEdge: 'https://gcp-na-personalize-edge.contentstack.com',
  },
  [Region.GCP_EU]: {
    application: 'https://gcp-eu-app.contentstack.com',
    contentDelivery: 'https://gcp-eu-cdn.contentstack.com',
    contentManagement: 'https://gcp-eu-api.contentstack.com',
    imageDelivery: 'https://gcp-eu-images.contentstack.com',
    assets: 'https://gcp-eu-assets.contentstack.com',
    preview: 'https://gcp-eu-rest-preview.contentstack.com',
    graphql: 'https://gcp-eu-graphql.contentstack.com',
    graphqlPreview: 'https://gcp-eu-graphql-preview.contentstack.com',
    brandKit: 'https://gcp-eu-brand-kits-api.contentstack.com',
    brandKitGenAI: 'https://gcp-eu-ai.contentstack.com/brand-kits',
    personalizeManagement: 'https://gcp-eu-personalize-api.contentstack.com',
    personalizeEdge: 'https://gcp-eu-personalize-edge.contentstack.com',
  }
};

function removeHttps(url: string): string {
  return url.replace(/^https:\/\//, '');
}

export function getContentstackEndpoints(region: Region = Region.US, omitHttps: boolean = false): ContentstackEndpoints {
  const endpoints: ContentstackEndpoints = regionEndpoints[region] || defaultEndpoints;
  if (omitHttps) {
    return Object.fromEntries(
      Object.entries(endpoints).map(([key, value]: [string, string]) => [key, removeHttps(value)])
    ) as ContentstackEndpoints;
  }
  return endpoints;
}

export function getRegionForString(regionAsString: string) {
  regionAsString = regionAsString.replace(/-/g, '_');
  return Region[regionAsString.toLocaleUpperCase() as keyof typeof Region];
}

export type { ContentstackEndpoints, Region };
