
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Pencil, Trash2, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface AgentCardProps {
  id: string;
  name: string;
  description: string;
  lastEdited: string;
  conversationCount: number;
  isPublic: boolean;
  onDelete?: () => void;
}

export function AgentCard({
  id,
  name,
  description,
  lastEdited,
  conversationCount,
  isPublic,
  onDelete
}: AgentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setIsDeleting(true);
      try {
        const { error } = await supabase
          .from("agents")
          .delete()
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Agent deleted",
          description: `${name} has been deleted successfully.`
        });
        
        if (onDelete) onDelete();
      } catch (error: any) {
        toast({
          title: "Error deleting agent",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleTogglePublic = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const { error } = await supabase
        .from("agents")
        .update({ is_public: !isPublic })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: isPublic ? "Agent is now private" : "Agent is now public",
        description: `${name} is now ${isPublic ? "private" : "public"}.`
      });
    } catch (error: any) {
      toast({
        title: "Error updating agent",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-start">
          <span className="font-bold text-lg truncate">{name}</span>
          {isPublic && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
              Public
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <span>Last edited: {lastEdited}</span>
          <span>{conversationCount} conversations</span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button asChild variant="outline" size="sm">
          <Link to={`/chat/${id}`}>
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            Chat
          </Link>
        </Button>
        <div className="flex gap-1">
          <Button asChild variant="ghost" size="icon" className="h-8 w-8">
            <Link to={`/editor/${id}`}>
              <Pencil className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={handleTogglePublic}
            title={isPublic ? "Make private" : "Make public"}
          >
            <Share2 className={`h-3.5 w-3.5 ${isPublic ? "text-green-600" : ""}`} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-destructive hover:text-destructive" 
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete agent"
          >
            {isDeleting ? (
              <div className="h-3.5 w-3.5 rounded-full border-2 border-r-transparent animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
