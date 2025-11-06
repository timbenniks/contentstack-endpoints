import { ContentstackEndpoints, Region, RegionInput } from './types';
import { regionEndpoints, regionAliasMap, DEFAULT_REGION_ID } from './regions-data';

function removeHttps(url: string): string {
  return url.replace(/^https:\/\//, '');
}

/**
 * Get Contentstack API endpoints for a specific region.
 * 
 * @param region - The Contentstack region as a string or Region enum (defaults to NA/US)
 * @param omitHttps - Whether to remove the "https://" prefix from URLs
 * @returns Object containing all API endpoints for the region, or empty object for invalid regions
 * 
 * @example
 * ```typescript
 * // Using strings (recommended - simple and clean)
 * const endpoints = getContentstackEndpoints("eu");
 * console.log(endpoints.contentDelivery); // "https://eu-cdn.contentstack.com"
 * 
 * // Supports all aliases
 * getContentstackEndpoints("us");      // Same as "na"
 * getContentstackEndpoints("aws-na");  // Same as "na"
 * getContentstackEndpoints("aws_eu");  // Same as "eu"
 * 
 * // Omit HTTPS prefix
 * const endpointsNoHttps = getContentstackEndpoints("eu", true);
 * console.log(endpointsNoHttps.contentDelivery); // "eu-cdn.contentstack.com"
 * 
 * // Legacy enum usage still works
 * const endpoints2 = getContentstackEndpoints(Region.EU);
 * ```
 */
export function getContentstackEndpoints(
  region?: RegionInput,
  omitHttps: boolean = false
): ContentstackEndpoints {
  // Handle default region (only when undefined, not null or empty string)
  if (region === undefined) {
    region = Region[DEFAULT_REGION_ID.toUpperCase().replace(/-/g, '_') as keyof typeof Region];
  }
  
  // Convert string to Region enum if needed
  let resolvedRegion: Region | undefined;
  if (typeof region === 'string') {
    resolvedRegion = getRegionForString(region);
  } else {
    resolvedRegion = region as Region;
  }

  // If region is null, undefined, or not found in regionEndpoints, return empty object
  const endpoints: ContentstackEndpoints = resolvedRegion && regionEndpoints[resolvedRegion];

  if (!endpoints) {
    return {};
  }

  if (omitHttps) {
    return Object.fromEntries(
      Object.entries(endpoints).map(([key, value]: [string, string]) => [key, removeHttps(value)])
    ) as ContentstackEndpoints;
  }

  return endpoints;
}

/**
 * Convert a region string to a Region enum value.
 * Supports all official Contentstack region aliases.
 * 
 * @param regionAsString - Region identifier string (e.g., "eu", "us", "azure-na")
 * @returns Region enum value, or undefined for invalid inputs
 * 
 * @example
 * ```typescript
 * getRegionForString("eu"); // Region.EU
 * getRegionForString("us"); // Region.NA (official alias)
 * getRegionForString("aws-na"); // Region.NA
 * getRegionForString("invalid"); // undefined
 * ```
 */
export function getRegionForString(regionAsString: string): Region | undefined {
  if (!regionAsString || typeof regionAsString !== 'string') {
    return undefined;
  }

  // Normalize the input: replace dashes with underscores and convert to uppercase
  const normalizedInput = regionAsString.replace(/-/g, '_').toUpperCase();

  // Look up in the alias map (which includes all official aliases from Contentstack)
  return regionAliasMap[normalizedInput];
}

export { Region } from './types';
export type { ContentstackEndpoints, RegionInput } from './types';
