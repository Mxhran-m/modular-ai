
import { AgentBuilder } from "@/components/agent/agent-builder";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [agent, setAgent] = useState<any>(null);

  useEffect(() => {
    const fetchAgentData = async () => {
      if (id === "new") {
        // Creating a new agent
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("agents")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        
        // Check if agent belongs to current user
        if (data.user_id !== user?.id) {
          toast({
            title: "Access denied",
            description: "You don't have permission to edit this agent",
            variant: "destructive",
          });
          navigate("/agents");
          return;
        }
        
        setAgent(data);
      } catch (error: any) {
        toast({
          title: "Error loading agent",
          description: error.message,
          variant: "destructive",
        });
        navigate("/agents");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAgentData();
    }
  }, [id, user, toast, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <AgentBuilder initialData={agent} isNew={id === "new"} />;
};

export default Editor;
