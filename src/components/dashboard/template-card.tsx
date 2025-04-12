
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  usersCount: number;
  previewImageUrl?: string;
}

export function TemplateCard({
  id,
  name,
  description,
  category,
  usersCount,
  previewImageUrl,
}: TemplateCardProps) {
  return (
    <Card className="overflow-hidden">
      {previewImageUrl && (
        <div className="h-32 bg-muted overflow-hidden">
          <img
            src={previewImageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base">{name}</h3>
              <Badge variant="secondary" className="text-xs">{category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <div className="flex items-center text-xs text-muted-foreground">
          <Users className="mr-1 h-3 w-3" />
          <span>{usersCount} users</span>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t bg-muted/50">
        <Button asChild className="w-full">
          <Link to={`/templates/use/${id}`}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Use Template
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
