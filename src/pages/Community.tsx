
import { AgentCard } from "@/components/dashboard/agent-card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AuthGuard } from "@/components/ui/AuthGuard";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample community agents - in a real app, these would come from the database
  const allAgents = [
    {
      id: "c1",
      name: "Language Tutor",
      description: "Learn new languages with interactive conversations and personalized lessons.",
      lastEdited: "2 days ago",
      conversationCount: 452,
      isPublic: true,
    },
    {
      id: "c2",
      name: "Fitness Coach",
      description: "Get workout plans, nutrition advice, and motivation to reach your fitness goals.",
      lastEdited: "1 week ago",
      conversationCount: 328,
      isPublic: true,
    },
    {
      id: "c3",
      name: "Coding Assistant",
      description: "Get help with programming problems, code reviews, and learning new technologies.",
      lastEdited: "3 days ago",
      conversationCount: 587,
      isPublic: true,
    },
    {
      id: "c4",
      name: "Recipe Generator",
      description: "Generate custom recipes based on your dietary preferences and available ingredients.",
      lastEdited: "5 days ago",
      conversationCount: 215,
      isPublic: true,
    },
    {
      id: "c5",
      name: "Study Buddy",
      description: "Get help with homework, test preparation, and understanding difficult concepts.",
      lastEdited: "1 day ago",
      conversationCount: 376,
      isPublic: true,
    },
    {
      id: "c6",
      name: "Travel Planner",
      description: "Plan your trips with personalized itineraries, budget tips, and local recommendations.",
      lastEdited: "4 days ago",
      conversationCount: 189,
      isPublic: true,
    },
  ];

  // Filter agents based on search query
  const filteredAgents = allAgents.filter(
    agent =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AuthGuard>
      <div className="container py-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Community</h1>
            <p className="text-muted-foreground">Discover and use AI agents created by the community</p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search community agents..." 
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
              onClick={() => setSearchQuery("Learning")}
            >
              Learning
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full"
              onClick={() => setSearchQuery("Productivity")}
            >
              Productivity
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full"
              onClick={() => setSearchQuery("Health")}
            >
              Health
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full"
              onClick={() => setSearchQuery("Entertainment")}
            >
              Entertainment
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} {...agent} />
            ))}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Community;
