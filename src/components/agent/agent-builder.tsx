
import { BlockLibrary } from "@/components/blocks/block-library";
import { AgentCanvas } from "@/components/agent/agent-canvas";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Play, ExternalLink, Info } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface AgentBuilderProps {
  initialData?: any;
  isNew?: boolean;
}

export function AgentBuilder({ initialData, isNew = false }: AgentBuilderProps) {
  const [name, setName] = useState(initialData?.name || "My Custom Assistant");
  const [description, setDescription] = useState(initialData?.description || "");
  const [instructions, setInstructions] = useState(initialData?.instructions || "");
  const [visibility, setVisibility] = useState(initialData?.visibility || "private");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleSave = async () => {
    try {
      if (!user) {
        toast({
          title: "Authentication error",
          description: "You must be logged in to save an agent",
          variant: "destructive",
        });
        return;
      }
      
      const agentData = {
        name,
        description,
        instructions,
        visibility,
        user_id: user.id,
        updated_at: new Date().toISOString(), // Convert Date to ISO string
      };
      
      let result;
      
      if (isNew) {
        // Create new agent
        result = await supabase
          .from("agents")
          .insert({
            ...agentData,
            created_at: new Date().toISOString(), // Convert Date to ISO string
            is_public: visibility === "public"
          })
          .select()
          .single();
      } else {
        // Update existing agent
        result = await supabase
          .from("agents")
          .update({
            ...agentData,
            is_public: visibility === "public"
          })
          .eq("id", initialData.id)
          .select()
          .single();
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: isNew ? "Agent created" : "Agent updated",
        description: `${name} has been ${isNew ? "created" : "updated"} successfully`,
      });
      
      // Redirect to agents page after successful save
      navigate("/agents");
    } catch (error: any) {
      toast({
        title: "Error saving agent",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  const handleTest = () => {
    toast({
      title: "Test Mode",
      description: "Test functionality is coming soon",
    });
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h1 className="text-xl font-semibold">Agent Builder</h1>
          <p className="text-sm text-muted-foreground">Create and customize your AI assistant</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleTest}>
            <Play className="h-4 w-4 mr-2" />
            Test
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            {isNew ? "Create Agent" : "Save Changes"}
          </Button>
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <BlockLibrary />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>
          <div className="h-full flex flex-col">
            <div className="p-2 border-b">
              <Input 
                placeholder="Agent Name" 
                className="text-lg font-medium" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <AgentCanvas className="flex-1" />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={20}>
          <div className="h-full">
            <Tabs defaultValue="properties" className="h-full flex flex-col">
              <TabsList className="w-full justify-start px-4 pt-2">
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>
              <TabsContent value="properties" className="flex-1 p-4 overflow-auto">
                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what your agent does..."
                        className="resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instructions">Instructions</Label>
                      <Textarea
                        id="instructions"
                        placeholder="Add special instructions for your agent..."
                        className="resize-none"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="visibility">Visibility</Label>
                      <select
                        id="visibility"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                      >
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                      </select>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="info" className="flex-1 p-4 overflow-auto">
                <Card className="p-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Block Information</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Select a block on the canvas to view and edit its properties.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Button variant="link" className="h-auto p-0 text-sm" asChild>
                      <a href="#" className="flex items-center">
                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                        View documentation
                      </a>
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
