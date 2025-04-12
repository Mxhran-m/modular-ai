
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Brain, ArrowLeft } from "lucide-react";
import { AuthGuard } from "@/components/ui/AuthGuard";

// Predefined templates data (this would ideally come from a database)
const allTemplates = [
  {
    id: "t1",
    name: "Content Writer",
    description: "Creates blog posts, articles, and social media content.",
    category: "Writing",
    usersCount: 1204,
    previewImageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    instructions: "I am a content writer specialized in creating engaging blog posts, articles, and social media content. I can help you craft compelling narratives, research topics, and optimize for SEO. Just tell me what kind of content you need, your target audience, and any specific requirements, and I'll help you create high-quality content.",
  },
  {
    id: "t2",
    name: "Data Analyst",
    description: "Analyzes data, creates visualizations, and provides insights.",
    category: "Analysis",
    usersCount: 895,
    previewImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    instructions: "I am a data analyst assistant specialized in helping you analyze data, create visualizations, and extract meaningful insights. I can help interpret statistical results, suggest visualization approaches, and provide data-driven recommendations. Share your data challenges or questions with me, and I'll guide you through the analysis process.",
  },
  {
    id: "t3",
    name: "Customer Support",
    description: "Handles customer queries, provides solutions, and escalates issues.",
    category: "Support",
    usersCount: 1567,
    previewImageUrl: "https://images.unsplash.com/photo-1534948216015-843149f72be3?q=80&w=1974&auto=format&fit=crop",
    instructions: "I am a customer support assistant designed to help you handle customer queries, provide solutions, and identify when issues need escalation. I can help draft responses to common questions, troubleshoot problems, and maintain a friendly, professional tone. Let me know what customer support challenges you're facing.",
  },
  {
    id: "t4",
    name: "Research Assistant",
    description: "Helps with academic research, paper summaries, and literature reviews.",
    category: "Research",
    usersCount: 743,
    previewImageUrl: "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=2070&auto=format&fit=crop",
    instructions: "I am a research assistant specialized in helping with academic research, summarizing papers, and conducting literature reviews. I can help you find relevant sources, extract key information, identify research gaps, and organize your findings. Share your research topic or questions, and I'll assist you in your academic endeavors.",
  },
  {
    id: "t5",
    name: "Personal Coach",
    description: "Provides motivation, accountability, and guidance for personal goals.",
    category: "Coaching",
    usersCount: 621,
    previewImageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2074&auto=format&fit=crop",
    instructions: "I am a personal coaching assistant designed to help you achieve your personal goals through motivation, accountability, and guidance. I can help you break down large goals into manageable steps, create action plans, track progress, and overcome obstacles. Share your goals and challenges with me, and I'll support your personal development journey.",
  },
  {
    id: "t6",
    name: "Social Media Manager",
    description: "Creates and schedules social media posts, analyzes engagement.",
    category: "Marketing",
    usersCount: 982,
    previewImageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2074&auto=format&fit=crop",
    instructions: "I am a social media management assistant that helps create and schedule posts, analyze engagement metrics, and optimize your social media strategy. I can help you draft content for different platforms, suggest hashtags, identify trending topics, and interpret analytics data. Tell me about your social media goals, and I'll help enhance your online presence.",
  },
];

const TemplateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    // Find the template from our predefined list
    const foundTemplate = allTemplates.find(t => t.id === id);
    if (foundTemplate) {
      setTemplate(foundTemplate);
    }
    setLoading(false);
  }, [id]);

  const handleUseTemplate = async () => {
    if (!user || !template) return;

    setCreating(true);
    try {
      // Create a new agent based on the template
      const { data, error } = await supabase
        .from('agents')
        .insert({
          name: template.name,
          description: template.description,
          blocks: JSON.stringify([]),
          user_id: user.id,
          is_public: false,
          instructions: template.instructions
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: `Created new agent: ${template.name}`,
      });

      // Navigate to the editor for the new agent
      navigate(`/editor/${data.id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create agent from template",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-6 space-y-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="container py-6 space-y-8">
        <Button variant="ghost" onClick={() => navigate('/templates')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Templates
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Template Not Found</h2>
          <p className="text-muted-foreground mt-2">
            The template you're looking for doesn't exist or may have been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="container py-6 space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/templates')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Button>
          <Button onClick={handleUseTemplate} disabled={creating}>
            {creating ? "Creating..." : "Use This Template"}
          </Button>
        </div>

        <Card className="overflow-hidden">
          {template.previewImageUrl && (
            <div className="h-48 bg-muted overflow-hidden">
              <img
                src={template.previewImageUrl}
                alt={template.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{template.name}</h1>
                  <Badge>{template.category}</Badge>
                </div>
                <p className="text-muted-foreground mt-1">{template.description}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Instructions</h2>
              <p className="text-sm">{template.instructions}</p>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Brain className="mr-2 h-4 w-4" />
              <span>Used by {template.usersCount.toLocaleString()} users</span>
            </div>
            <Button onClick={handleUseTemplate} disabled={creating}>
              {creating ? "Creating..." : "Use Template"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AuthGuard>
  );
};

export default TemplateDetail;
