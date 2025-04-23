# Contributing to TurboChat

Thank you for your interest in contributing to TurboChat! This document provides guidelines and instructions for contributing to this project.

## Development Environment

### Prerequisites

- Node.js version 22.0.0 or higher
- pnpm as the package manager

### Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/Wildfires-org/turbochat.git`
3. Install dependencies: `pnpm install`
4. Set up environment variables by copying the example files:
   ```bash
   cp apps/turbochat/.env.example apps/turbochat/.env
   cp apps/server/.env.example apps/server/.env
   ```

## Development Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the code style and guidelines

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Test your changes:
   ```bash
   pnpm turbo run test
   ```

5. Commit your changes following [conventional commits](https://www.conventionalcommits.org/) format:
   ```bash
   git commit -m "feat: add new feature"
   ```

6. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

7. Create a Pull Request against the main branch

## Code Style and Guidelines

- Follow TypeScript conventions throughout the codebase
- Ensure ESLint and other code quality tools pass before committing
- Write tests for all new functionality
- Respect workspace boundaries and dependencies
- Use the monorepo structure properly:
  - Place shared code in packages
  - Keep applications in the apps directory
  - Use workspace references (workspace:*) for internal dependencies

## Pull Request Process

1. Ensure your code passes all tests
2. Update documentation if necessary
3. The PR should work in all supported environments
4. Your PR will be reviewed by maintainers who may request changes

## License

By contributing to TurboChat, you agree that your contributions will be licensed under the project's Apache 2.0 license.
