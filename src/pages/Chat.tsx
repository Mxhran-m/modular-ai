
import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, RefreshCw, Send, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useChatWithGemini } from "@/hooks/useChatWithGemini";
import { supabase } from "@/integrations/supabase/client";
import { AuthGuard } from "@/components/ui/AuthGuard";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ChatHistory } from "@/components/chat/ChatHistory";

const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const sessionParam = searchParams.get("session");
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [agent, setAgent] = useState<any>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const { messages, isLoading, sendMessage, resetChat, loadSession } = useChatWithGemini(id || "");
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch agent details and load existing session if provided
  useEffect(() => {
    const fetchAgent = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("agents")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setAgent(data);
      } catch (error: any) {
        toast({
          title: "Error fetching agent",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    fetchAgent();

    // Load existing chat session if session ID is provided
    if (sessionParam) {
      loadSession(sessionParam);
    }
  }, [id, sessionParam, toast, loadSession]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    sendMessage(input);
    setInput("");
  };

  const handleResetChat = () => {
    resetChat();
  };

  // Default welcome message if no messages yet
  const welcomeMessage = {
    role: "assistant" as const,
    content: agent 
      ? `Hello! I'm ${agent.name}. ${agent.description || "How can I help you today?"}`
      : "Hello! I'm your AI assistant. How can I help you today?",
  };

  const displayMessages = messages.length > 0 ? messages : [welcomeMessage];

  return (
    <AuthGuard>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Chat History Sidebar */}
        <div 
          className={`border-r bg-background transition-all duration-300 ${
            showSidebar ? "w-64" : "w-0 -ml-64"
          }`}
        >
          {id && <ChatHistory agentId={id} />}
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {agent && (
            <div className="border-b p-4 flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-1" 
                onClick={() => setShowSidebar(!showSidebar)}
              >
                {showSidebar ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
              
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="h-4 w-4 text-primary" />
              </div>
              
              <div className="flex-1">
                <h1 className="text-lg font-semibold">{agent.name}</h1>
                <p className="text-xs text-muted-foreground">{agent.description || "AI Assistant"}</p>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleResetChat}
                title="New conversation"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          )}

          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {displayMessages.map((message, i) => (
                <div
                  key={i}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex gap-3 max-w-[80%]">
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
                      </Avatar>
                    )}
                    <Card className={`p-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : ""}`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </Card>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
                    </Avatar>
                    <Card className="p-3">
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <p className="text-sm">Thinking...</p>
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Chat;
