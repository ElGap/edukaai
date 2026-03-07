# Publishing Guide

## Pre-Publishing Checklist

### 1. Update Version

```bash
# Edit package.json version
npm version patch  # or minor, or major
```

### 2. Test Locally

```bash
npm run build
ls -la .output/  # Verify build output exists
```

### 3. Test CLI

```bash
./bin/cli.js
# Should start server on http://localhost:3000
```

### 4. Git Commit

```bash
git add .
git commit -m "Prepare for v1.0.0 release"
git push origin main
```

## NPM Publishing

### Option A: Manual Publishing

```bash
# 1. Build
npm run build

# 2. Verify files
ls -la .output/
ls -la bin/

# 3. Test package
npm pack  # Creates tarball for inspection

# 4. Publish
npm publish --access public
```

### Option B: Automated (GitHub Actions)

```bash
# Create a version tag
git tag v1.0.0
git push origin v1.0.0

# GitHub Actions will:
# - Run tests
# - Build application
# - Publish to NPM
# - Create GitHub Release
```

## Post-Publishing Verification

### Test via npx

```bash
# Test with npx (should work immediately)
npx @elgap/edukaai
```

### Test global install

```bash
# Install globally
npm install -g @elgap/edukaai

# Run
edukaai

# Check version
edukaai --version
```

## Versioning Strategy

- **patch** (1.0.1): Bug fixes
- **minor** (1.1.0): New features
- **major** (2.0.0): Breaking changes

## Troubleshooting

### Build fails

```bash
# Clean and rebuild
rm -rf .output
rm -rf node_modules
npm install
npm run build
```

### NPM publish fails

```bash
# Check if logged in
npm whoami

# Login if needed
npm login

# Try again
npm publish --access public
```

## Files Published to NPM

These files are included (from `package.json`):

- `.output/` - Built Nuxt application
- `bin/` - CLI entry point
- `README.md` - Documentation
- `LICENSE` - MIT license

These are excluded (from `.gitignore`):

- `node_modules/`
- `.nuxt/`
- `data/`
- Source files (not needed in published package)

## First-Time Setup

### 1. Create NPM Account

https://www.npmjs.com/signup

### 2. Login locally

```bash
npm login
```

### 3. Verify package name is available

```bash
npm view edukaai
# Should return 404 (not found)
```

### 4. Set up GitHub Secrets (for automated publishing)

- Go to GitHub repo → Settings → Secrets
- Add `NPM_TOKEN` with your npm access token

## Quick Release Commands

```bash
# Full release process
npm version patch
npm run build
npm publish --access public
git push origin main --tags
```
