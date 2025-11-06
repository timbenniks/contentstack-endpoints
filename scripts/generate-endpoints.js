#!/usr/bin/env node

/**
 * This script fetches the official Contentstack regions configuration
 * and generates TypeScript types and endpoint mappings.
 *
 * Run: npm run generate-endpoints
 */

import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REGIONS_URL = "https://artifacts.contentstack.com/regions.json";

async function fetchRegions() {
  console.log("🔍 Fetching regions from:", REGIONS_URL);
  const response = await fetch(REGIONS_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch regions: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  console.log(`✅ Found ${data.regions.length} regions`);
  return data;
}

function generateRegionEnum(regions) {
  const enumEntries = regions
    .map((region) => {
      return `  ${region.id.toUpperCase().replace(/-/g, "_")} = "${region.id}"`;
    })
    .join(",\n");

  return `export enum Region {
${enumEntries}
}`;
}

function generateEndpointsInterface(regions) {
  // Collect all unique endpoint keys across all regions
  const allKeys = new Set();
  regions.forEach((region) => {
    Object.keys(region.endpoints).forEach((key) => allKeys.add(key));
  });

  const properties = Array.from(allKeys)
    .sort()
    .map((key) => {
      return `  ${key}?: string;`;
    })
    .join("\n");

  // Deprecated properties for v1.x backward compatibility
  const deprecatedProperties = `  
  // Deprecated properties (v1.x compatibility)
  /** @deprecated Use graphqlDelivery instead */
  graphql?: string;
  /** @deprecated Use images instead */
  imageDelivery?: string;
  /** @deprecated Use genAI instead */
  brandKitGenAI?: string;
  /** @deprecated Use personalize instead */
  personalizeManagement?: string;`;

  return `export interface ContentstackEndpoints {
${properties}
${deprecatedProperties}
}`;
}

function generateRegionEndpoints(regions) {
  // Map of v2.0 property names to v1.x aliases for backward compatibility
  const propertyAliases = {
    graphqlDelivery: "graphql",
    images: "imageDelivery",
    genAI: "brandKitGenAI",
    personalize: "personalizeManagement",
  };

  const endpointMappings = regions
    .map((region) => {
      const regionKey = region.id.toUpperCase().replace(/-/g, "_");

      // Build main endpoints
      const endpointLines = [];
      Object.entries(region.endpoints).forEach(([key, value]) => {
        endpointLines.push(`    ${key}: '${value}'`);
      });

      // Add backward compatibility aliases (with proper comma placement)
      Object.entries(region.endpoints).forEach(([key, value]) => {
        if (propertyAliases[key]) {
          endpointLines.push(
            `    ${propertyAliases[key]}: '${value}', // @deprecated: Use ${key} instead`.replace(
              ", //",
              ",\n    //"
            )
          );
        }
      });

      // Join with commas, but remove trailing comma from last line
      let allEndpoints = endpointLines.join(",\n");
      // Remove comma before the last closing comment if it ends with "instead"
      allEndpoints = allEndpoints.replace(
        /,(\s*\/\/ @deprecated[^\n]*instead)$/,
        "$1"
      );

      return `  [Region.${regionKey}]: {\n${allEndpoints}\n  }`;
    })
    .join(",\n");

  return `const regionEndpoints: Record<Region, ContentstackEndpoints> = {
${endpointMappings}
};`;
}

function generateAliasMap(regions) {
  // Create a map of all aliases to their region enum values
  const aliasMap = {};

  regions.forEach((region) => {
    const regionEnum = region.id.toUpperCase().replace(/-/g, "_");
    region.alias.forEach((alias) => {
      // Normalize the alias (replace dashes with underscores, uppercase)
      const normalizedAlias = alias.replace(/-/g, "_").toUpperCase();
      aliasMap[normalizedAlias] = `Region.${regionEnum}`;
    });
  });

  const entries = Object.entries(aliasMap)
    .map(([alias, region]) => `  '${alias}': ${region}`)
    .join(",\n");

  return `const regionAliasMap: Record<string, Region> = {
${entries}
};`;
}

function generateRegionsData(data) {
  const { regions } = data;

  // Find the default region (should be 'na')
  const defaultRegion = regions.find((r) => r.isDefault);
  const defaultRegionId = defaultRegion.id;

  const regionEndpointsMappings = generateRegionEndpoints(regions);
  const aliasMap = generateAliasMap(regions);

  return `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated from: https://artifacts.contentstack.com/regions.json
 * Last generated: ${new Date().toISOString()}
 */

import { ContentstackEndpoints, Region } from './types';

export const DEFAULT_REGION_ID = "${defaultRegionId}";

${regionEndpointsMappings}

${aliasMap}

export { regionEndpoints, regionAliasMap };
`;
}

function generateTypes(data) {
  const { regions } = data;

  const regionEnum = generateRegionEnum(regions);
  const endpointsInterface = generateEndpointsInterface(regions);

  return `${regionEnum}

/**
 * A region identifier - can be a string or Region enum.
 * Supports all official Contentstack region aliases:
 * - "na", "us", "aws-na", "aws_na" (all map to NA region)
 * - "eu", "aws-eu", "aws_eu" (all map to EU region)  
 * - "au", "aws-au", "aws_au" (all map to AU region)
 * - "azure-na", "azure_na" (Azure North America)
 * - "azure-eu", "azure_eu" (Azure Europe)
 * - "gcp-na", "gcp_na" (GCP North America)
 * - "gcp-eu", "gcp_eu" (GCP Europe)
 */
export type RegionInput = Region | string;

${endpointsInterface}
`;
}

function generateMetadata(data) {
  const { regions } = data;

  const metadata = {
    generatedAt: new Date().toISOString(),
    source: REGIONS_URL,
    regions: regions.map((r) => ({
      id: r.id,
      name: r.name,
      cloudProvider: r.cloudProvider,
      location: r.location,
      aliases: r.alias,
      isDefault: r.isDefault,
    })),
  };

  return JSON.stringify(metadata, null, 2);
}

async function main() {
  try {
    const data = await fetchRegions();

    console.log("📝 Generating TypeScript files...");

    // Generate types.ts
    const typesContent = generateTypes(data);
    const typesPath = join(__dirname, "../src/types.ts");
    writeFileSync(typesPath, typesContent);
    console.log("✅ Generated:", typesPath);

    // Generate regions-data.ts (the data file)
    const regionsDataContent = generateRegionsData(data);
    const regionsDataPath = join(__dirname, "../src/regions-data.ts");
    writeFileSync(regionsDataPath, regionsDataContent);
    console.log("✅ Generated:", regionsDataPath);

    // Generate metadata for reference
    const metadataContent = generateMetadata(data);
    const metadataPath = join(__dirname, "../src/regions-metadata.json");
    writeFileSync(metadataPath, metadataContent);
    console.log("✅ Generated:", metadataPath);

    console.log(
      "\n🎉 Successfully generated Contentstack endpoint definitions!"
    );
    console.log(
      "\n⚠️  Note: You may need to update tests to match any new endpoints."
    );
    console.log(
      "\n💡 The logic in src/index.ts remains manually maintained for safety."
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
