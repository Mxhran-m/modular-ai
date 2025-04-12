
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgentCard } from "@/components/dashboard/agent-card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Brain } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { AuthGuard } from "@/components/ui/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Agents = () => {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchAgents = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setAgents(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching agents",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, [user, toast]);

  const handleAgentDelete = () => {
    fetchAgents();
  };

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (agent.description && agent.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AuthGuard>
      <div className="container py-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Agents</h1>
            <p className="text-muted-foreground">Manage and create your AI assistants</p>
          </div>
          <Button onClick={() => navigate("/editor/new")}>
            <Plus className="mr-2 h-4 w-4" />
            New Agent
          </Button>
        </div>
        
        <div className="flex justify-end">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search agents..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No agents created yet</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm">
              Create your first AI assistant to help with tasks, answer questions, or generate content.
            </p>
            <Button onClick={() => navigate("/editor/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Agent
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAgents.map((agent) => (
              <AgentCard 
                key={agent.id}
                id={agent.id}
                name={agent.name}
                description={agent.description || "No description provided"}
                lastEdited={new Date(agent.updated_at).toLocaleDateString()}
                conversationCount={0} // TODO: Implement count of chat sessions
                isPublic={agent.is_public}
                onDelete={handleAgentDelete}
              />
            ))}
            <Card className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center h-full">
              <Button variant="outline" className="h-auto p-4" onClick={() => navigate("/editor/new")}>
                <div className="flex flex-col items-center gap-2">
                  <Plus className="h-8 w-8 text-primary" />
                  <span className="mt-1 font-medium">Create New Agent</span>
                </div>
              </Button>
            </Card>
          </div>
        )}
      </div>
    </AuthGuard>
  );
};

export default Agents;
