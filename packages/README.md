# TurboChat Packages

This directory contains shared packages used across the TurboChat monorepo. These packages follow the workspace pattern and can be referenced in applications using the `workspace:*` syntax.

## Purpose

The `packages` directory serves as a central location for:

- Shared UI components
- Common utilities and business logic
- Cross-application features
- Reusable modules that can be consumed by multiple applications

## Package Structure

Each package in this directory follows a consistent structure:

- Self-contained with its own `package.json` and build configuration
- Exports a clear public API
- Maintains its own documentation
- Can be built independently using Turborepo

## Usage

Packages can be added as dependencies to applications within the monorepo:

```json
{
 "dependencies": {
   "@turbochat/package-name": "workspace:*"
 }
}
```

After adding a dependency, run
```bash
pnpm install
```

## Building Packages

To build a package, run from the package directory:
```bash
pnpm run build
```
## Integration guidelines

When integrating packages into applications:
1. Add the package as a workspace dependency
2. Import and use the package's exported components/functions
3. Follow the package's README for specific integration instructions
4. Ensure proper configuration of any required environment variables

## Package Standards
All packages should:
1. Be written in TypeScript
2. Include comprehensive documentation
3. Follow the project's coding standards