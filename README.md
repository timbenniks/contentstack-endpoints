# @timbenniks/contentstack-endpoints

A utility package that provides Contentstack API endpoints based on cloud provider and region. This package helps you easily get the correct API endpoints for different Contentstack environments and regions.

> Beware: this is open source and maintained by @timbenniks and it's not officially supported contentstack. Support questions go to @timbenniks directly.

## Installation

```bash
npm install @timbenniks/contentstack-endpoints
```

## Usage

### ESM (recommended)

```typescript
import { getContentstackEndpoints } from "@timbenniks/contentstack-endpoints";

// Get default North America endpoints
const naEndpoints = getContentstackEndpoints();
console.log(naEndpoints.contentDelivery); // https://cdn.contentstack.com/

// Get Azure Europe endpoints
const azureEuEndpoints = getContentstackEndpoints("azure", "eu");
console.log(azureEuEndpoints.contentDelivery); // https://azure-eu-cdn.contentstack.com/
```

### CommonJS

```javascript
const {
  getContentstackEndpoints,
} = require("@timbenniks/contentstack-endpoints");

// Get default North America endpoints
const naEndpoints = getContentstackEndpoints();
console.log(naEndpoints.contentDelivery); // https://cdn.contentstack.com/
```

## API

### `getContentstackEndpoints(cloud?: Cloud, region?: Region): ContentstackEndpoints`

Returns an object containing all Contentstack API endpoints for the specified cloud and region.

#### Parameters

- `cloud` (optional): 'default' | 'azure' | 'gcp' (defaults to 'default')
- `region` (optional): 'na' | 'eu' (defaults to 'na')

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

## License

MIT
