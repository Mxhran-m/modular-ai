
import { useState } from "react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentCanvasProps {
  className?: string;
}

export function AgentCanvas({ className }: AgentCanvasProps) {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  return (
    <div
      className={cn(
        "h-full rounded-md border-2 border-dashed agent-canvas relative p-4 overflow-auto",
        isDraggingOver ? "border-primary/50 bg-primary/5" : "border-border",
        className
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDraggingOver(false);
        // In a real implementation, we would handle the dropped block here
      }}
    >
      {blocks.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-float">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium">Design Your Agent</h3>
          <p className="text-sm text-muted-foreground max-w-md mt-2">
            Drag blocks from the library and connect them to create your custom AI assistant.
          </p>
        </div>
      )}
    </div>
  );
}
