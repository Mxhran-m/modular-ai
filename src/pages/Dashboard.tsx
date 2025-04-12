
import { AgentCard } from "@/components/dashboard/agent-card";
import { TemplateCard } from "@/components/dashboard/template-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const myAgents = [
    {
      id: "1",
      name: "Research Assistant",
      description: "Helps with academic research, paper summaries, and literature reviews.",
      lastEdited: "2 days ago",
      conversationCount: 15,
      isPublic: false,
    },
    {
      id: "2",
      name: "Email Writer",
      description: "Drafts professional emails based on a few key points.",
      lastEdited: "5 days ago",
      conversationCount: 28,
      isPublic: true,
    },
    {
      id: "3",
      name: "Code Helper",
      description: "Assists with coding problems, explains errors, and suggests improvements.",
      lastEdited: "1 week ago",
      conversationCount: 42,
      isPublic: true,
    },
  ];

  const popularTemplates = [
    {
      id: "t1",
      name: "Content Writer",
      description: "Creates blog posts, articles, and social media content.",
      category: "Writing",
      usersCount: 1204,
      previewImageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "t2",
      name: "Data Analyst",
      description: "Analyzes data, creates visualizations, and provides insights.",
      category: "Analysis",
      usersCount: 895,
      previewImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "t3",
      name: "Customer Support",
      description: "Handles customer queries, provides solutions, and escalates issues.",
      category: "Support",
      usersCount: 1567,
      previewImageUrl: "https://images.unsplash.com/photo-1534948216015-843149f72be3?q=80&w=1974&auto=format&fit=crop",
    },
  ];

  return (
    <div className="container py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your AI assistants and discover templates</p>
        </div>
        <Button asChild>
          <Link to="/editor/new">
            <Plus className="mr-2 h-4 w-4" />
            New Agent
          </Link>
        </Button>
      </div>
      
      <Tabs defaultValue="my-agents">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="my-agents">My Agents</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8" />
          </div>
        </div>
        
        <TabsContent value="my-agents" className="mt-6">
          {myAgents.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No agents created yet</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm">
                Create your first AI assistant to help with tasks, answer questions, or generate content.
              </p>
              <Button asChild>
                <Link to="/editor/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Agent
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {myAgents.map((agent) => (
                <AgentCard key={agent.id} {...agent} />
              ))}
              <Card className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center h-full">
                <Button asChild variant="outline" className="h-auto p-4">
                  <Link to="/editor/new" className="flex flex-col items-center gap-2">
                    <Plus className="h-8 w-8 text-primary" />
                    <span className="mt-1 font-medium">Create New Agent</span>
                  </Link>
                </Button>
              </Card>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularTemplates.map((template) => (
              <TemplateCard key={template.id} {...template} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
