# @timbenniks/contentstack-endpoints

Get the correct Contentstack API endpoints for any region and cloud provider. No more hardcoding URLs or guessing which endpoint to use!

## Installation

```bash
npm install @timbenniks/contentstack-endpoints
```

## Quick Start

```typescript
import { getContentstackEndpoints } from "@timbenniks/contentstack-endpoints";

const endpoints = getContentstackEndpoints("eu");

console.log(endpoints.contentDelivery); // https://eu-cdn.contentstack.com
console.log(endpoints.contentManagement); // https://eu-api.contentstack.com
console.log(endpoints.graphqlDelivery); // https://eu-graphql.contentstack.com
```

## Two Ways to Use This Package

### ✨ Approach 1: Simple Strings (Recommended)

**Just pass a region string directly** - clean and simple!

```typescript
import { getContentstackEndpoints } from "@timbenniks/contentstack-endpoints";

// Direct string usage
const endpoints = getContentstackEndpoints("eu");

// Perfect for environment variables
const endpoints = getContentstackEndpoints(
  process.env.CONTENTSTACK_REGION || "na"
);
```

**Benefits:**

- 🎯 Simpler - fewer imports, less code
- 🚀 Cleaner - no enum conversions needed
- ✅ Direct - just pass the string you have

### 🔧 Approach 2: With Region Conversion (Legacy)

**Use when you need explicit type safety or enum validation:**

```typescript
import {
  getContentstackEndpoints,
  getRegionForString,
} from "@timbenniks/contentstack-endpoints";

// Convert string to Region enum first
const region = getRegionForString(process.env.CONTENTSTACK_REGION as string);
const endpoints = getContentstackEndpoints(region, true);
```

**When to use this:**

- 🛡️ You need explicit Region enum types
- 🔍 You want to validate the region string before use
- 📦 Existing codebase already uses this pattern

**Both approaches work perfectly** - choose what fits your style!

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

## Usage Examples

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

### With Environment Variables

```typescript
const endpoints = getContentstackEndpoints(
  process.env.CONTENTSTACK_REGION || "na"
);
```

### Remove HTTPS Prefix

```typescript
const endpoints = getContentstackEndpoints("eu", true);
console.log(endpoints.contentDelivery); // eu-cdn.contentstack.com
```

### Error Handling

Returns empty object for invalid inputs (no errors thrown):

```typescript
getContentstackEndpoints("invalid"); // {}
getContentstackEndpoints(null); // {}
```

## Available Endpoints

Each region returns an object with these endpoint URLs:

| Property                  | Description                                           |
| ------------------------- | ----------------------------------------------------- |
| `contentDelivery`         | Content Delivery API (CDN)                            |
| `contentManagement`       | Content Management API                                |
| `graphqlDelivery`         | GraphQL API                                           |
| `graphqlPreview`          | GraphQL Preview API                                   |
| `images`                  | Image Delivery/Transformation API                     |
| `assets`                  | Assets API                                            |
| `preview`                 | REST Preview API                                      |
| `auth`                    | Authentication API                                    |
| `automate`                | Automate API                                          |
| `launch`                  | Launch API                                            |
| `developerHub`            | Developer Hub API                                     |
| `genAI`                   | GenAI & Knowledge Vault API                           |
| `brandKit`                | Brand Kit API                                         |
| `personalize`             | Personalize Management API                            |
| `personalizeEdge`         | Personalize Edge API                                  |
| `application`             | Contentstack Web App URL                              |
| **Deprecated Properties** | **v1.x compatibility - still work but use new names** |
| `graphql`                 | ⚠️ Use `graphqlDelivery` instead                      |
| `imageDelivery`           | ⚠️ Use `images` instead                               |
| `brandKitGenAI`           | ⚠️ Use `genAI` instead                                |
| `personalizeManagement`   | ⚠️ Use `personalize` instead                          |

## API

### `getContentstackEndpoints(region?, omitHttps?)`

```typescript
getContentstackEndpoints(region?: string | Region, omitHttps?: boolean): ContentstackEndpoints
```

**Parameters:**

- `region` - Region string (e.g., `"eu"`, `"azure-na"`) or Region enum (default: `"na"`)
- `omitHttps` - Remove `https://` prefix (default: `false`)

**Returns:** Object with endpoint URLs

### `getRegionForString(regionString)` (Optional)

```typescript
getRegionForString(regionAsString: string): Region | undefined
```

Converts a region string to a Region enum. Only needed for Approach 2 (legacy).

---

## About

**Maintained by:** [@timbenniks](https://github.com/timbenniks)  
**Data Source:** Auto-synced with [Contentstack's official regions](https://artifacts.contentstack.com/regions.json)

## License

MIT

---

<details>
<summary><strong>For Maintainers</strong></summary>

### Updating Endpoints

```bash
npm run generate-endpoints
```

This fetches the latest regions data from Contentstack and regenerates types and endpoint mappings. A GitHub Action automatically checks for updates weekly.

</details>
