
import { TemplateCard } from "@/components/dashboard/template-card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AuthGuard } from "@/components/ui/AuthGuard";

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Predefined templates
  const allTemplates = [
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
    {
      id: "t4",
      name: "Research Assistant",
      description: "Helps with academic research, paper summaries, and literature reviews.",
      category: "Research",
      usersCount: 743,
      previewImageUrl: "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "t5",
      name: "Personal Coach",
      description: "Provides motivation, accountability, and guidance for personal goals.",
      category: "Coaching",
      usersCount: 621,
      previewImageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2074&auto=format&fit=crop",
    },
    {
      id: "t6",
      name: "Social Media Manager",
      description: "Creates and schedules social media posts, analyzes engagement.",
      category: "Marketing",
      usersCount: 982,
      previewImageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2074&auto=format&fit=crop",
    },
  ];

  // Filter templates based on search query
  const filteredTemplates = allTemplates.filter(
    template =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AuthGuard>
      <div className="container py-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Templates</h1>
            <p className="text-muted-foreground">Ready-to-use AI assistants for various use cases</p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search templates..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-auto py-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full" 
              onClick={() => setSearchQuery("")}
            >
              All
            </Button>
            <Button 
              variant="outline"
              size="sm" 
              className="rounded-full"
              onClick={() => setSearchQuery("Writing")}
            >
              Writing
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full"
              onClick={() => setSearchQuery("Analysis")}
            >
              Analysis
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full"
              onClick={() => setSearchQuery("Support")}
            >
              Support
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full"
              onClick={() => setSearchQuery("Research")}
            >
              Research
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full"
              onClick={() => setSearchQuery("Marketing")}
            >
              Marketing
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} {...template} />
            ))}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Templates;
