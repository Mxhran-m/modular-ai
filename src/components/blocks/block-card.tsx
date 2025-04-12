
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface BlockCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  className?: string;
}

export function BlockCard({ title, description, icon: Icon, category, className }: BlockCardProps) {
  return (
    <Card className={cn("block-shadow cursor-grab active:cursor-grabbing", className)}>
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-sm">{title}</h3>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            {category}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
