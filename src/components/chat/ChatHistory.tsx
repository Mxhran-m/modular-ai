
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Plus, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function ChatHistory({ agentId }: { agentId: string }) {
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchChatSessions = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("chat_sessions")
          .select("*")
          .eq("agent_id", agentId)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setChatSessions(data || []);
      } catch (error: any) {
        toast({
          title: "Error fetching chat sessions",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchChatSessions();
  }, [agentId, user, toast]);

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-medium">Chat History</h3>
      
      <Button asChild variant="outline" className="w-full">
        <Link to={`/chat/${agentId}`} className="flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" />
          New Chat
        </Link>
      </Button>
      
      <div className="space-y-2 mt-4">
        {chatSessions.length === 0 ? (
          <Card className="p-4 text-center text-muted-foreground">
            No previous chats
          </Card>
        ) : (
          chatSessions.map((session) => (
            <Button 
              key={session.id} 
              variant="ghost" 
              className="w-full justify-start text-left" 
              asChild
            >
              <Link to={`/chat/${agentId}?session=${session.id}`}>
                <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {session.title || "Chat Session"}
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(session.created_at).toLocaleDateString()}
                </span>
              </Link>
            </Button>
          ))
        )}
      </div>
    </div>
  );
}
