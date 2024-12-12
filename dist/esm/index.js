import { getUrlPrefix, getAutomateEndpoint } from './utils';
export function getContentstackEndpoints(cloud = 'default', region = 'na') {
    const prefix = getUrlPrefix(cloud, region);
    const endpoints = {
        contentDelivery: `https://${prefix}cdn.contentstack.com/`,
        contentManagement: `https://${prefix}api.contentstack.com/`,
        imageDelivery: `https://${prefix}images.contentstack.com/`,
        assets: `https://${prefix}assets.contentstack.com/`,
        graphql: `https://${prefix}graphql.contentstack.com/`,
        graphqlPreview: `https://${prefix}graphql-preview.contentstack.com/`,
        brandKit: `https://${prefix}brand-kits-api.contentstack.com/`,
        brandKitGenAI: `https://${prefix}ai.contentstack.com/brand-kits`,
        personalizeManagement: `https://${prefix}personalize-api.contentstack.com`,
        personalizeEdge: `https://${prefix}personalize-edge.contentstack.com`
    };
    const automateEndpoint = getAutomateEndpoint(cloud, region, prefix);
    if (automateEndpoint) {
        endpoints.automate = automateEndpoint;
    }
    return endpoints;
}
export * from './types';
