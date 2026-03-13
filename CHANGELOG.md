# Changelog

## [0.2.0-beta.0] - 2025-03-13

### Added

- TypeScript support with strict type checking
- Automatic browser opening on server start (EDUKAAI_OPEN_BROWSER)
- Dark mode theming throughout the application
- Consistent button styling across all pages
- CLI command improvements

### Changed

- Migrated from slate to gray color palette for consistency
- Removed unused storage layer (reduced bundle size)
- Updated tsconfig.json to ESNext target
- Standardized all UI components with dark mode support
- Consolidated duplicate dataset pages

### Fixed

- Resolved 103 TypeScript errors (now 0 errors)
- Fixed broken storage backend references

### Removed

- Deleted unused /server/storage/ directory
- Removed datasets/index.vue duplicate page
- Deleted old backup files (.backup, .bak)
