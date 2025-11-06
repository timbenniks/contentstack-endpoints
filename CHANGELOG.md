# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2024-11-06

### ✨ Enhanced - Simplified String-Based API

This release makes the package significantly easier to use by accepting region strings directly, eliminating the need for enum conversions in most cases.

### Added

- **String-based API**: `getContentstackEndpoints()` now accepts region strings directly
  ```typescript
  // New way (simpler!)
  const endpoints = getContentstackEndpoints("eu");
  
  // Old way (still works!)
  const region = getRegionForString("eu");
  const endpoints = getContentstackEndpoints(region);
  ```
- **RegionInput type**: New type that accepts both `string` and `Region` enum for maximum flexibility
- **Deprecated properties in TypeScript types**: All v1.x property aliases now properly typed with `@deprecated` JSDoc tags
  - `graphql` → Use `graphqlDelivery`
  - `imageDelivery` → Use `images`
  - `brandKitGenAI` → Use `genAI`
  - `personalizeManagement` → Use `personalize`

### Changed

- Updated documentation to showcase string-based usage as the recommended approach
- Improved README clarity - now focuses on user needs rather than internal architecture
- Better comparison of both API approaches (string vs enum)

### Fixed

- Deprecated endpoint properties now appear in TypeScript definitions (previously only in runtime)
- Auto-generation script now preserves `RegionInput` type when regenerating

### Developer Experience

- 🎯 Cleaner API - fewer imports needed
- 📝 Better TypeScript autocomplete with deprecation warnings
- 🔄 100% backward compatible - all existing code continues to work

## [2.0.0] - 2024-10-28

### 🎉 Major Release - Auto-Generated from Official Source

This release introduces automatic generation of endpoint definitions from Contentstack's official regions endpoint, ensuring accuracy and up-to-date information.

**✨ Your v1.x code continues to work!** All deprecated properties are available as aliases for full backward compatibility.

### Non-Breaking Changes

- **Region.US aliased to Region.NA**: The US region is now called `Region.NA` to match Contentstack's official naming. `Region.US` remains available as a deprecated alias.
- **Endpoint property aliases** for backward compatibility - old v1.x names still work:
  - `graphql` (deprecated) → `graphqlDelivery` (new)
  - `imageDelivery` (deprecated) → `images` (new)
  - `brandKitGenAI` (deprecated) → `genAI` (new)
  - `personalizeManagement` (deprecated) → `personalize` (new)

### Added

- ✨ **Auto-sync with official source**: All endpoints are now generated from [https://artifacts.contentstack.com/regions.json](https://artifacts.contentstack.com/regions.json)
- 🏷️ **Official alias support**: `getRegionForString()` now supports all official Contentstack region aliases:
  - `"us"`, `"aws-na"`, `"aws_na"` → `Region.NA`
  - `"aws-eu"`, `"aws_eu"` → `Region.EU`
  - `"aws-au"`, `"aws_au"` → `Region.AU`
- 🆕 **New endpoint properties**:
  - `auth` - Authentication API endpoint
  - `launch` - Launch API endpoint
  - `developerHub` - Developer Hub API endpoint
  - `genAI` - GenAI and Knowledge Vault endpoint
- ✅ **GCP regions now include automate endpoints** (were previously marked as unavailable)
- 📦 **Regions metadata file**: New `regions-metadata.json` file with cloud provider and location information
- 🤖 **GitHub Action**: Automated weekly checks for endpoint updates
- 🛠️ **Generation script**: `npm run generate-endpoints` to manually sync with official source

### Changed

- All endpoint mappings now match Contentstack's official configuration
- Improved documentation with migration guide and breaking changes clearly documented
- Enhanced test coverage for all regions and endpoints

### Fixed

- GCP regions now correctly include automate endpoints
- All endpoint URLs verified against official Contentstack source

### Developer Experience

- Added automated generation script for maintainers
- Comprehensive test suite updated to match new endpoints
- GitHub Action for automatic update detection and PR creation

## [1.0.16] - 2024-09-15

### Previous Versions

Earlier versions (v1.0.0 - v1.0.16) maintained manual endpoint configurations with basic region support.

Key features in v1.x:
- Manual endpoint definitions for NA, EU, AU, Azure, and GCP regions
- Basic `getContentstackEndpoints()` function with Region enum
- `getRegionForString()` helper for string to enum conversion
- Support for omitting HTTPS prefix

See [git history](https://github.com/timbenniks/contentstack-endpoints/commits/main) for detailed v1.x changes.

---

## Migration Guides

### Migrating from v1.x to v2.x

**No breaking changes!** All v1.x code continues to work. However, consider these improvements:

#### Update property names (recommended)

```typescript
// Old (still works)
endpoints.graphql
endpoints.imageDelivery
endpoints.brandKitGenAI
endpoints.personalizeManagement

// New (recommended)
endpoints.graphqlDelivery
endpoints.graphqlPreview
endpoints.images
endpoints.genAI
endpoints.personalize
```

#### Simplify with string-based API (v2.1+)

```typescript
// v1.x and v2.0
const region = getRegionForString(process.env.REGION);
const endpoints = getContentstackEndpoints(region);

// v2.1+ (simpler)
const endpoints = getContentstackEndpoints(process.env.REGION);
```
