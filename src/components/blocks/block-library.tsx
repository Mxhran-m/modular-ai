
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlockCard } from "./block-card";
import { Input } from "@/components/ui/input";
import { Brain, Database, Globe, MessageSquare, Search, Zap } from "lucide-react";

export function BlockLibrary() {
  const llmBlocks = [
    {
      title: "Text Completion",
      description: "Generate text based on the provided prompt",
      icon: MessageSquare,
      category: "LLM"
    },
    {
      title: "Text Summarization",
      description: "Summarize long texts into key points",
      icon: MessageSquare,
      category: "LLM"
    },
    {
      title: "Question Answering",
      description: "Answer questions based on provided context",
      icon: MessageSquare,
      category: "LLM"
    },
  ];

  const memoryBlocks = [
    {
      title: "Conversation History",
      description: "Store and retrieve conversation history",
      icon: Database,
      category: "Memory"
    },
    {
      title: "Vector Store",
      description: "Store and retrieve vector embeddings",
      icon: Database,
      category: "Memory"
    },
    {
      title: "Short-term Memory",
      description: "Temporary storage for current session",
      icon: Database,
      category: "Memory"
    },
  ];

  const toolBlocks = [
    {
      title: "Web Search",
      description: "Search the web for information",
      icon: Globe,
      category: "Tool"
    },
    {
      title: "Calculator",
      description: "Perform mathematical calculations",
      icon: Zap,
      category: "Tool"
    },
    {
      title: "Weather API",
      description: "Get current weather information",
      icon: Globe,
      category: "Tool"
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Block Library</h2>
        <p className="text-sm text-muted-foreground">Drag blocks to the canvas</p>
        <div className="mt-2 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search blocks..." className="pl-8" />
        </div>
      </div>
      <Tabs defaultValue="llm" className="flex-1">
        <TabsList className="w-full justify-start px-4 pt-2">
          <TabsTrigger value="llm" className="text-xs">
            <Brain className="mr-1 h-3.5 w-3.5" />
            LLM
          </TabsTrigger>
          <TabsTrigger value="memory" className="text-xs">
            <Database className="mr-1 h-3.5 w-3.5" />
            Memory
          </TabsTrigger>
          <TabsTrigger value="tools" className="text-xs">
            <Zap className="mr-1 h-3.5 w-3.5" />
            Tools
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="flex-1">
          <TabsContent value="llm" className="m-0 p-4 space-y-3">
            {llmBlocks.map((block) => (
              <BlockCard key={block.title} {...block} />
            ))}
          </TabsContent>
          <TabsContent value="memory" className="m-0 p-4 space-y-3">
            {memoryBlocks.map((block) => (
              <BlockCard key={block.title} {...block} />
            ))}
          </TabsContent>
          <TabsContent value="tools" className="m-0 p-4 space-y-3">
            {toolBlocks.map((block) => (
              <BlockCard key={block.title} {...block} />
            ))}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
