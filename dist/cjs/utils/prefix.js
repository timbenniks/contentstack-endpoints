"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlPrefix = getUrlPrefix;
function getUrlPrefix(cloud, region) {
    return cloud === 'default'
        ? region === 'eu' ? 'eu-' : ''
        : `${cloud}-${region}-`;
}
