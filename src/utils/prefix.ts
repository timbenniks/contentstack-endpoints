import { Cloud, Region } from '../types/clouds.js';

export function getUrlPrefix(cloud: Cloud, region: Region): string {
  return cloud === 'default' 
    ? region === 'eu' ? 'eu-' : ''
    : `${cloud}-${region}-`;
}