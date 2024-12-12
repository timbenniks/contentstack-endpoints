"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAutomateEndpoint = getAutomateEndpoint;
function getAutomateEndpoint(cloud, region, prefix) {
    if (cloud === 'gcp') {
        return undefined;
    }
    return `https://${prefix}${cloud === 'default' && region === 'eu' ? 'prod-' : ''}automations-api.contentstack.com`;
}
