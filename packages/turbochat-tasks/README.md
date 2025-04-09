# turbochat-tasks

Module for task management functionality.

Below you can find step-by-step instruction how to integrate it with Turbochat application.

## Installation

Pull this repository and put it in `packages` directory.

Add module to Turbochat ( `apps/turbochat/package.json` ) and server ( `apps/server/package.json` ) dependencies:

```json
{
  "dependencies": {
    "@turbochat/tasks": "workspace:*"
  }
}
```

and run `pnpm install` in both directories.

## Database configuration

Add Task schema from `packages/turbochat-tasks/src/db/schema.ts` to Turbochat schema file `apps/turbochat/lib/db/schema.ts` .

Run database migration:

```bash
pnpm db:push
```

## API configuration

Add API route from `packages/turbochat-tasks/src/server/router.ts` to `apps/server/src/router.ts` as `/tasks` route.

## Chatbot configuration

Add tool definition types to `apps/turbochat/types/Tools.ts` , these are:
 - `createTasks`

Attach tool implementation to Turbochat API route in `apps/turbochat/app/(chat)/api/chat/route.ts` .

## Chatbot components

Use components from `packages/turbochat-tasks/src/components` in `apps/turbochat/components/tools.tsx` .
Loading component is `TaskLoaderSkeleton` .
Result component is `TaskList` .
