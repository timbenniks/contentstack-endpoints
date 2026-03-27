# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-03-27

### Breaking Changes

- **`personalize` renamed to `personalizeManagement`**: The upstream API now uses `personalizeManagement` as the primary field. `personalize` is now a deprecated alias pointing to `personalizeManagement` (previously it was the other way around).
- **`genAI` URL changed**: Updated from `https://ai.contentstack.com` to `https://ai.contentstack.com/brand-kits` across all regions, matching the upstream source.
- **Dist output extensions changed**: ESM output is now `.mjs`/`.d.mts`, CJS is `.cjs`/`.d.cts`. The `exports` field in `package.json` handles resolution for all modern bundlers. Fallback fields (`main`, `module`, `types`) cover legacy tools.

### Added

- **`composableStudio` endpoint**: New endpoint available across all regions.
- **Vite+ toolchain**: Migrated from tsdown/vitest/oxlint to the unified Vite+ toolchain (`vp check`, `vp test`, `vp pack`).
- **Auto-formatting in generator**: `generate-endpoints` script now runs `vp fmt` on output files.

### Changed

- Deprecated alias direction reversed: `personalize` is now deprecated in favor of `personalizeManagement`.
- All endpoint data synced with latest [regions.json](https://artifacts.contentstack.com/regions.json).
- Removed unused `oxlint.json` and `.cursorrules` config files.
- Cleaned up README.

### Migration from v2.x

```typescript
// v2.x
endpoints.personalize; // primary
endpoints.personalizeManagement; // deprecated alias

// v3.0
endpoints.personalizeManagement; // primary
endpoints.personalize; // deprecated alias
```

If you reference `genAI` URLs directly, note the path change:

```
// v2.x: https://ai.contentstack.com
// v3.0: https://ai.contentstack.com/brand-kits
```

## [2.1.0] - 2024-11-06

### Added

- **String-based API**: `getContentstackEndpoints()` now accepts region strings directly.
- **RegionInput type**: Accepts both `string` and `Region` enum.
- Deprecated properties now have `@deprecated` JSDoc tags in TypeScript types.

### Changed

- Documentation updated to recommend string-based usage.

## [2.0.0] - 2024-10-28

### Added

- Auto-generated endpoints from [Contentstack's official regions](https://artifacts.contentstack.com/regions.json).
- Official alias support in `getRegionForString()` (`"us"`, `"aws-na"`, `"aws_eu"`, etc.).
- New endpoints: `auth`, `launch`, `developerHub`, `genAI`.
- Regions metadata file and GitHub Action for automated updates.

### Changed

- `Region.US` renamed to `Region.NA` (matching Contentstack's naming).
- Endpoint property names updated with v1.x aliases for backward compatibility.

## [1.0.16] - 2024-09-15

Earlier versions (v1.0.0–v1.0.16) maintained manual endpoint configurations. See [git history](https://github.com/timbenniks/contentstack-endpoints/commits/main) for details.
