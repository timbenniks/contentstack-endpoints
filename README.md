# @timbenniks/contentstack-endpoints

A utility package that provides Contentstack API endpoints based on cloud provider and region. This package helps you easily get the correct API endpoints for different Contentstack environments and regions.

> Beware: this is open source and maintained by @timbenniks and it's not officially supported Contentstack. Support questions go to @timbenniks directly.

## Installation

```bash
npm install @timbenniks/contentstack-endpoints
```

## Usage

### ESM (recommended)

```typescript
import {
  getRegionForString,
  getContentstackEndpoints,
} from "@timbenniks/contentstack-endpoints";

// Get region based on string ("eu", "gcp_na", "azure_eu", etc)
// Returns a Region ENUM.
const region = getRegionForString("azure_eu"); // Region.AZURE_EU

// Get endpoints based on region
const endpoints = getContentstackEndpoints(region);
console.log(endpoints.contentDelivery); // https://azure-eu-cdn.contentstack.com

// Handling unrecognized regions (for internal testing)
const invalidRegion = getRegionForString("invalid-region"); // undefined
const emptyEndpoints = getContentstackEndpoints(invalidRegion); // {}
```

### Error Handling

This package is designed to handle unrecognized regions gracefully, making it suitable for internal testing scenarios:

- `getRegionForString()` returns `undefined` for invalid, null, or undefined inputs
- `getContentstackEndpoints()` returns an empty object `{}` for unrecognized regions
- No errors are thrown, ensuring your application continues to function

```typescript
// These all return undefined safely
getRegionForString("invalid-region"); // undefined
getRegionForString(null); // undefined
getRegionForString(""); // undefined

// These all return empty object safely
getContentstackEndpoints("INVALID_REGION" as Region); // {}
getContentstackEndpoints(null as any); // {}
```

## API

### `getRegionForString(regionAsString: String)`

Returns the region enum based on a string. Returns `undefined` for invalid inputs.

**Parameters:**

- `regionAsString` - A string representing the region (e.g., "eu", "azure-na", "gcp_eu")

**Returns:**

- `Region` enum value for valid inputs
- `undefined` for invalid, null, or undefined inputs

**Examples:**

```typescript
getRegionForString("eu"); // Region.EU
getRegionForString("azure-na"); // Region.AZURE_NA
getRegionForString("invalid"); // undefined
```

### `getContentstackEndpoints(region?: Region, omitHttps?: boolean): ContentstackEndpoints`

Returns an object containing all Contentstack API endpoints for the specified cloud and region. Returns an empty object for unrecognized regions.

#### Parameters

- `region` (optional) - One of: `Region.US`, `Region.EU`, `Region.AU`, `Region.AZURE_NA`, `Region.AZURE_EU`, `Region.GCP_NA`, or `Region.GCP_EU`. Defaults to `Region.US`
- `omitHttps` (optional) - Boolean flag to remove "https://" prefix from URLs. Defaults to `false`

#### Returns

- For valid regions: An object containing Contentstack API endpoints
- For invalid regions: An empty object `{}`

#### Endpoint Properties

An object containing the following endpoints:

- `contentDelivery`: Content Delivery API endpoint
- `contentManagement`: Content Management API endpoint
- `imageDelivery`: Image Delivery API endpoint
- `assets`: Assets API endpoint
- `automate`: Automate API endpoint (not available for GCP_NA and GCP_EU)
- `graphql`: GraphQL API endpoint
- `graphqlPreview`: GraphQL Preview API endpoint
- `brandKit`: Brand Kit API endpoint
- `brandKitGenAI`: Brand Kit GenAI and Knowledge Vault endpoint
- `personalizeManagement`: Personalize Management API endpoint
- `personalizeEdge`: Personalize Edge API endpoint
- `application`: Contentstack web application
- `preview`: REST Preview API endpoint

#### Examples

```typescript
// Valid region
const endpoints = getContentstackEndpoints(Region.EU);
console.log(endpoints.contentDelivery); // "https://eu-cdn.contentstack.com"

// With omitHttps flag
const endpoints = getContentstackEndpoints(Region.EU, true);
console.log(endpoints.contentDelivery); // "eu-cdn.contentstack.com"

// Invalid region (returns empty object)
const endpoints = getContentstackEndpoints("INVALID" as Region);
console.log(endpoints); // {}
```

#### Types

```javascript
export enum Region {
  US = "us",
  EU = "eu",
  AU = "au",
  AZURE_NA = "azure-na",
  AZURE_EU = "azure-eu",
  GCP_NA = "gcp-na",
  GCP_EU = "gcp-eu"
}

export interface ContentstackEndpoints {
  contentDelivery?: string;
  contentManagement?: string;
  imageDelivery?: string;
  assets?: string;
  automate?: string;
  graphql?: string;
  graphqlPreview?: string;
  brandKit?: string;
  brandKitGenAI?: string;
  personalizeManagement?: string;
  personalizeEdge?: string;
  application?: string;
  preview?: string;
}
```

## License

MIT
