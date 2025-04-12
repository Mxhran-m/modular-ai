
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import Agents from "./pages/Agents";
import Templates from "./pages/Templates";
import TemplateDetail from "./pages/TemplateDetail";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import { AuthGuard } from "./components/ui/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
                <Route path="/editor/:id" element={<AuthGuard><Editor /></AuthGuard>} />
                <Route path="/chat/:id" element={<AuthGuard><Chat /></AuthGuard>} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/agents" element={<AuthGuard><Agents /></AuthGuard>} />
                <Route path="/templates" element={<AuthGuard><Templates /></AuthGuard>} />
                <Route path="/templates/use/:id" element={<AuthGuard><TemplateDetail /></AuthGuard>} />
                <Route path="/community" element={<AuthGuard><Community /></AuthGuard>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
