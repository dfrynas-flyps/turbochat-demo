# Document Editor

A customizable document editing library that allows for rich text editing, templating, and API customization through adapters.

## Installation

First configure authentication so npm can download packages from GitHub Packages without needing the registry flag.

1. Create a [personal access token (classic)](https://github.com/settings/tokens?type=classic)
   with the `read:packages` and `repo` scopes.
2. Add the following to your project's `.npmrc`:

   ```
   @wildfires-org:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```

3. Export the token so npm can read it:

   ```bash
   export GITHUB_TOKEN=YOUR_TOKEN
   ```

Once configured, install the package normally:

```bash
npm install @wildfires-org/document-editor
# or
yarn add @wildfires-org/document-editor
# or
pnpm add @wildfires-org/document-editor
```


## Features

- Rich text editing with TipTap
- Customizable API adapters
- React components for document editing
- TypeScript support

## Usage

```tsx
import {
  EditorContainer,
  setApiAdapter,
  InMemoryApiAdapter
} from '@wildfires-org/document-editor';

// Customize API behavior (optional)
class CustomApiAdapter extends InMemoryApiAdapter {
  fetchTemplate = async (params) => {
    // Custom implementation
    console.log('Custom fetchTemplate implementation');
    return await super.fetchTemplate(params);
  }
}

// Set the custom adapter
setApiAdapter(new CustomApiAdapter());

// Use the editor component
const MyEditor = () => {
  return <EditorContainer />;
};
```

## API

### Components

- `EditorContainer` - The main editor component

### API Adapters

- `IApiAdapter` - Interface for API adapters
- `InMemoryApiAdapter` - Default in-memory API adapter
- `getApiAdapter()` - Get the current API adapter
- `setApiAdapter(adapter)` - Set a custom API adapter

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

## Running the example

A minimal demo application is available under `examples/basic`. This project uses Vite
and React to mount the editor with an in-memory adapter.

To run the example, you can use the following command from the root of the project:

```bash
npm run example:basic
```

This command will automatically navigate to the `examples/basic` directory, install its dependencies, and start the development server.

Alternatively, if you prefer to run the steps manually:

```bash
cd examples/basic
npm install
npm run dev
```

Once the server is running, open the URL shown in your terminal (usually `http://localhost:3000` or similar) to try the editor.

## Publishing to GitHub Packages

### Creating a Personal Access Token

1. Visit <https://github.com/settings/tokens> and generate a token (classic).
2. Enable the `read:packages`, `write:packages`, `delete:packages`, and `repo` scopes.
3. Store the token in the `GITHUB_TOKEN` environment variable.

### Publishing

This repository contains an `.npmrc` that reads the token from `GITHUB_TOKEN`.

```bash
export GITHUB_TOKEN=YOUR_TOKEN
npm run build
npm publish
```

## License

MIT
