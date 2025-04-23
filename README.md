# TurboChat Monorepo

A modern chat application built with a Turborepo monorepo architecture, featuring a Next.js web application and a backend server.

![TurboChat](https://via.placeholder.com/800x400?text=TurboChat)

## 🚀 Project Structure

```
turbochat/
├── apps/
│   ├── server/          # Backend server application (Hono) that integrates routes from packages
│   └── turbochat/       # Web application (Next.js)
├── packages/            # Shared packages for code reuse
│   └── turbochat-tasks/ # Example package
└── package.json         # Root package configuration
```

## 🛠️ Tech Stack

- **Node.js**: v22.0.0+
- **Package Manager**: pnpm
- **Build System**: Turborepo
- **Frontend**: Next.js
- **Backend**: Hono
- **Database**: SQL with Drizzle ORM
- **TypeScript**: Throughout the codebase

## Getting Started

### Prerequisites

- Node.js v22.0.0 or higher
- pnpm package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/turbochat.git
   cd turbochat
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   ```bash
   # For the web app
   cp apps/turbochat/.env.example apps/turbochat/.env
   
   # For the server
   cp apps/server/.env.example apps/server/.env
   ```

4. Build all packages and applications
   ```bash
   pnpm turbo run build
   ```

## Development

### Start development servers

```bash
# Start all applications
pnpm dev

# Start specific applications
pnpm turbo run dev --filter=turbochat
pnpm turbo run dev --filter=server
```

### Build for production

```bash
# Build all applications
pnpm turbo run build

# Build specific applications
pnpm turbo run build --filter=turbochat
pnpm turbo run build --filter=server
```

## Testing

```bash
# Run all tests
pnpm turbo run test

# Run tests for specific applications
pnpm turbo run test --filter=turbochat
pnpm turbo run test --filter=server
```

## Themes

TurboChat includes multiple themes:

- **Default**: Clean, modern interface
- **Dark**: Low-light viewing experience
- **Wildfire**: Themed for wildfires.org integration with:
  - Primary: Orange-red (#e34c26)
  - Secondary: Forest green (#2a5934)
  - Background: Light cream/beige (#f8f3e9)
  - Accent: Bright orange (#f47a22)
  - Text: Dark brown (#292218)


## Project Structure Details

### Web Application (`apps/turbochat`)

- **Framework**: Next.js
- **Build Output**: `apps/turbochat/.next`
- **Key Features**:
  - Modern UI with multiple themes
  - Interactive chat components
  - Responsive design

### Server (`apps/server`)

- **Framework**: Hono
- **Build Output**: `apps/server/dist`
- **Key Features**:
  - RESTful API endpoints
  - Authentication system
  - Database integration

### Shared Packages (`packages/`)

- **UI Components**: Reusable React components
- **Common Utilities**: Shared functions and helpers
- **Types**: Shared TypeScript interfaces

## Development Guidelines

- Follow TypeScript conventions throughout the codebase
- Ensure ESLint and other code quality tools pass before committing
- Write tests for all new functionality
- Respect workspace boundaries and dependencies

## Contributing

We welcome contributions from the community! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the Apache 2.0 License - see the LICENSE file for details.

