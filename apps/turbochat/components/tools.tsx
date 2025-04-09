import { Weather } from "./weather";
import { DocumentPreview } from "./document-preview";
import { DocumentToolCall, DocumentToolResult } from "./document";
import { ToolInvocationState } from "@/types/ToolInvocationState";
import { Tools } from "@/types/Tools";
import { Tasks } from "@turbochat/tasks/client";

interface ToolProps {
  state: ToolInvocationState;
  toolName: Tools;
  isReadonly: boolean;
}

interface ToolCallProps extends ToolProps {
  args: any;
  result?: never;
}

interface ToolResultProps extends ToolProps {
  args?: never;
  result: any;
}

export const Tool = ({
  state,
  toolName,
  args,
  result,
  isReadonly,
}: ToolCallProps | ToolResultProps) => {
  if (toolName === Tools.getWeather) {
    return <Weather weatherAtLocation={result} />;
  }

  if (toolName === Tools.createDocument) {
    return (
      <DocumentPreview isReadonly={isReadonly} args={args} result={result} />
    );
  }

  if (toolName === Tools.updateDocument) {
    if (!result) {
      return (
        <DocumentToolCall type="update" args={args} isReadonly={isReadonly} />
      );
    }
    return (
      <DocumentToolResult
        type="update"
        result={result}
        isReadonly={isReadonly}
      />
    );
  }

  if (toolName === Tools.requestSuggestions) {
    if (!result) {
      return (
        <DocumentToolCall
          type="request-suggestions"
          args={args}
          isReadonly={isReadonly}
        />
      );
    }
    return (
      <DocumentToolResult
        type="request-suggestions"
        result={result}
        isReadonly={isReadonly}
      />
    );
  }

  if (toolName === Tools.createTasks) {
    if (!result) {
      return <Tasks.TaskLoaderSkeleton />;
    }
    return <Tasks.TaskList tasks={result} />;
  }

  if (state === "result") {
    return <pre>{JSON.stringify(result, null, 2)}</pre>;
  }

  return null;
};
