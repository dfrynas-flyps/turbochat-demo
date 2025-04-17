# turbochat-tasks

Module for task management functionality.

Below you can find step-by-step instruction how to integrate it with Turbochat application.

## Integration Guide for AI Agents

This guide provides detailed instructions for AI agents responsible for integrating the `@turbochat/tasks` package into Turbochat applications.

### Prerequisites

- Node.js version 22.0.0 or higher
- pnpm package manager
- Turborepo monorepo structure
- Existing Turbochat applications (apps/turbochat and apps/server)

### 1. Package Structure Overview

The `@turbochat/tasks` package consists of:

- **Client-side components**: React components for task visualization
- **Server-side API**: Hono-based REST API for task management
- **Database schema**: Drizzle ORM schema for task storage
- **AI tools**: Integration with AI SDK for task creation and management

### 2. Installation Process

1. **Add to workspace dependencies**:
   
   Update both application package.json files:

   ```json
   // In apps/turbochat/package.json and apps/server/package.json
   {
     "dependencies": {
       "@turbochat/tasks": "workspace:*"
     }
   }
   ```

2. **Install dependencies**:

   ```bash
   cd /path/to/turbochat
   pnpm install
   ```

### 3. Database Integration

1. **Schema integration**:
   
   Import and add the Task schema to your application's schema file:

   ```typescript
   // In apps/turbochat/lib/db/schema.ts
   import { task } from "@turbochat/tasks/src/db/schema";
   
   // Add to your exports
   export { task };
   ```

2. **Run database migration**:

   ```bash
   pnpm db:push
   ```

### 4. Server API Integration

1. **Add tasks router to server application**:

   ```typescript
   // In apps/server/src/router.ts
   import { tasksRouter } from "@turbochat/tasks/server";
   
   // Add to your Hono app
   app.route("/tasks", tasksRouter);
   ```

### 5. Web Application Integration

1. **Add AI tools to chat route**:

   ```typescript
   // In apps/turbochat/app/(chat)/api/chat/route.ts
   import { createTasks, listTasks, updateTask } from "@turbochat/tasks/server";
   
   // Add to your tools configuration
   const tools = [
     createTasks({ session }),
     listTasks({ session }),
     updateTask({ session }),
     // ... other tools
   ];
   ```

2. **Add UI components**:

   ```typescript
   // In apps/turbochat/components/tools.tsx
   import { Tasks, TaskLoaderSkeleton, TaskList } from "@turbochat/tasks/client";
   
   // Use in your component rendering
   export function ToolRenderer({ tool, status }) {
     if (tool.type === "createTasks") {
       return status === "loading" 
         ? <TaskLoaderSkeleton /> 
         : <TaskList tasks={tool.result} />;
     }
     // ... other tool renderers
   }
   ```

### 6. Environment Configuration

1. **Configure environment variables**:

   ```
   # Required in apps/turbochat/.env.local
   SERVER_URL=http://localhost:3001
   
   # Required in apps/server/.env.local
   DATABASE_URL=postgresql://user:password@localhost:5432/turbochat
   ```

### 7. Testing the Integration

1. **Build the package**:

   ```bash
   pnpm turbo run build --filter=@turbochat/tasks
   ```

2. **Run the applications**:

   ```bash
   # Start the server
   pnpm turbo run dev --filter=server
   
   # Start the web app
   pnpm turbo run dev --filter=turbochat
   ```

3. **Verify functionality**:
   - Navigate to the chat interface
   - Use the task creation tool in a conversation
   - Verify tasks are created and displayed correctly

### 8. Troubleshooting

- **Database connection issues**: Ensure the DATABASE_URL is correctly configured
- **Component rendering errors**: Check that all required components are properly imported
- **API errors**: Verify the server is running and accessible at the configured URL

### 9. Advanced Usage

- **Custom task components**: Extend the TaskList component for custom UI
- **Additional task operations**: Use the TaskManager class for custom operations
- **Artifact integration**: Use the tasksArtifactConfig for document processing

For more detailed information, refer to the source code documentation in the respective files.