# @timbenniks/contentstack-endpoints

Get the correct Contentstack API endpoints for any region and cloud provider.

## Installation

```bash
npm install @timbenniks/contentstack-endpoints
```

## Usage

```typescript
import { getContentstackEndpoints } from "@timbenniks/contentstack-endpoints";

// Pass a region string — defaults to "na"
const endpoints = getContentstackEndpoints("eu");

console.log(endpoints.contentDelivery); // https://eu-cdn.contentstack.com
console.log(endpoints.contentManagement); // https://eu-api.contentstack.com

// Works with environment variables
const endpoints = getContentstackEndpoints(process.env.CONTENTSTACK_REGION || "na");

// Remove https:// prefix
const endpoints = getContentstackEndpoints("eu", true);
console.log(endpoints.contentDelivery); // eu-cdn.contentstack.com
```

Returns an empty object for invalid inputs (no errors thrown):

```typescript
getContentstackEndpoints("invalid"); // {}
```

### With Contentstack SDK

```typescript
import Contentstack from "@contentstack/delivery-sdk";
import { getContentstackEndpoints } from "@timbenniks/contentstack-endpoints";

const endpoints = getContentstackEndpoints("eu");

const stack = Contentstack.stack({
  apiKey: "your-api-key",
  deliveryToken: "your-token",
  environment: "production",
  region: endpoints.contentDelivery,
});
```

### Region enum (optional)

If you need explicit type safety or enum validation:

```typescript
import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";

const region = getRegionForString(process.env.CONTENTSTACK_REGION as string);
const endpoints = getContentstackEndpoints(region);
```

## Supported Regions

All official Contentstack regions and aliases (case-insensitive):

| Region                  | Aliases                                |
| ----------------------- | -------------------------------------- |
| **AWS North America**   | `"na"`, `"us"`, `"aws-na"`, `"aws_na"` |
| **AWS Europe**          | `"eu"`, `"aws-eu"`, `"aws_eu"`         |
| **AWS Australia**       | `"au"`, `"aws-au"`, `"aws_au"`         |
| **Azure North America** | `"azure-na"`, `"azure_na"`             |
| **Azure Europe**        | `"azure-eu"`, `"azure_eu"`             |
| **GCP North America**   | `"gcp-na"`, `"gcp_na"`                 |
| **GCP Europe**          | `"gcp-eu"`, `"gcp_eu"`                 |

## Available Endpoints

| Property                | Description                 |
| ----------------------- | --------------------------- |
| `application`           | Contentstack Web App URL    |
| `assets`                | Assets API                  |
| `auth`                  | Authentication API          |
| `automate`              | Automate API                |
| `brandKit`              | Brand Kit API               |
| `composableStudio`      | Composable Studio API       |
| `contentDelivery`       | Content Delivery API (CDN)  |
| `contentManagement`     | Content Management API      |
| `developerHub`          | Developer Hub API           |
| `genAI`                 | GenAI & Knowledge Vault API |
| `graphqlDelivery`       | GraphQL API                 |
| `graphqlPreview`        | GraphQL Preview API         |
| `images`                | Image Delivery API          |
| `launch`                | Launch API                  |
| `personalizeEdge`       | Personalize Edge API        |
| `personalizeManagement` | Personalize Management API  |
| `preview`               | REST Preview API            |

Deprecated aliases (still work):

| Alias           | Use instead             |
| --------------- | ----------------------- |
| `graphql`       | `graphqlDelivery`       |
| `imageDelivery` | `images`                |
| `brandKitGenAI` | `genAI`                 |
| `personalize`   | `personalizeManagement` |

## API

### `getContentstackEndpoints(region?, omitHttps?)`

Returns an object with endpoint URLs for the given region.

- `region` — Region string or `Region` enum (default: `"na"`)
- `omitHttps` — Strip `https://` prefix (default: `false`)

### `getRegionForString(regionString)`

Converts a region string to a `Region` enum. Returns `undefined` for invalid input.

## Data Source

Endpoints are auto-generated from [Contentstack's official regions configuration](https://artifacts.contentstack.com/regions.json).

```bash
npm run generate-endpoints
```

## License

MIT
