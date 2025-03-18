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
import { getContentstackEndpoints } from "@timbenniks/contentstack-endpoints";

// Get default North America endpoints
const endpoints = getContentstackEndpoints();
console.log(endpoints.contentDelivery); // https://cdn.contentstack.io

// Get Azure Europe endpoints
const azureEuEndpoints = getContentstackEndpoints(Region.AZURE_EU); // see below how to import the Region enum
console.log(azureEuEndpoints.contentDelivery); // https://azure-eu-cdn.contentstack.com
```

### CommonJS

```javascript
const {
  getContentstackEndpoints,
} = require("@timbenniks/contentstack-endpoints");

// Get default North America endpoints
const endpoints = getContentstackEndpoints();
console.log(endpoints.contentDelivery); // https://cdn.contentstack.io
```

## API

### `getContentstackEndpoints(region?: Region, omitHttps: boolean): ContentstackEndpoints`

Returns an object containing all Contentstack API endpoints for the specified cloud and region.

#### Parameters

- `region` as `Region.US`, `Region.EU`, `Region.AZURE_NA`, `Region.AZURE_EU`, `Region.GCP_NA`, or `Region.GCP_EO`
- `omitHttps` as boolean

#### Returns

An object containing the following endpoints:

- `contentDelivery`: Content Delivery API endpoint
- `contentManagement`: Content Management API endpoint
- `imageDelivery`: Image Delivery API endpoint
- `assets`: Assets API endpoint
- `automate`: Automate API endpoint (not available for GCP)
- `graphql`: GraphQL API endpoint
- `graphqlPreview`: GraphQL Preview API endpoint
- `brandKit`: Brand Kit API endpoint
- `brandKitGenAI`: Brand Kit GenAI and Knowledge Vault endpoint
- `personalizeManagement`: Personalize Management API endpoint
- `personalizeEdge`: Personalize Edge API endpoint
- `application`: Contentstack web application
- `preview`: REST Preview API endpoint

#### Types

```javascript
export enum Region {
  US = "us",
  EU = "eu",
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
