
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-9xl font-extrabold text-primary">404</h1>
      <h2 className="text-2xl font-bold mt-4 mb-6">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Button asChild>
        <Link to="/" className="flex items-center">
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
