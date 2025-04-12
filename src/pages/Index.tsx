import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, CheckCircle, ChevronRight, Database, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge as UIBadge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <UIBadge
                    className="inline-flex items-center rounded-full border border-purple-200 bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-900 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-950 focus:ring-offset-2"
                  >
                    Early Access
                  </UIBadge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Build AI Agents with Blocks
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Create custom AI assistants by chaining together simple blocks. No coding required.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link to="/dashboard">
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/templates">
                      Explore Templates
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl opacity-10 blur-2xl" />
                  <div className="relative bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden p-4">
                    <div className="p-2 flex flex-col space-y-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="flex-1 border rounded-lg p-4 bg-gray-50">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded p-2 bg-white">
                            <div className="flex items-center gap-2">
                              <div className="bg-primary/10 p-1 rounded">
                                <Brain className="h-4 w-4 text-primary" />
                              </div>
                              <span className="text-xs font-medium">Text Generation</span>
                            </div>
                          </div>
                          <div className="border rounded p-2 bg-white">
                            <div className="flex items-center gap-2">
                              <div className="bg-primary/10 p-1 rounded">
                                <Database className="h-4 w-4 text-primary" />
                              </div>
                              <span className="text-xs font-medium">Memory</span>
                            </div>
                          </div>
                          <div className="border rounded p-2 bg-white">
                            <div className="flex items-center gap-2">
                              <div className="bg-primary/10 p-1 rounded">
                                <Zap className="h-4 w-4 text-primary" />
                              </div>
                              <span className="text-xs font-medium">API Tool</span>
                            </div>
                          </div>
                          <div className="border rounded p-2 bg-white">
                            <div className="flex items-center gap-2">
                              <div className="bg-primary/10 p-1 rounded">
                                <Brain className="h-4 w-4 text-primary" />
                              </div>
                              <span className="text-xs font-medium">Summarization</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Build Custom AI Agents</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-center">
                  Create AI assistants tailored to your specific needs with our intuitive block-based editor.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Modular Design</h3>
                  <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                    Mix and match blocks to create powerful AI workflows tailored to your needs.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">No Code Required</h3>
                  <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                    Build sophisticated AI agents without writing a single line of code.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Powerful Integrations</h3>
                  <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                    Connect to external tools and APIs to extend your agent's capabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple as 1-2-3</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-center">
                  Creating your own AI assistant is easy with our intuitive platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Choose Blocks</h3>
                  <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                    Select from our library of pre-built blocks to create your agent's workflow.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Configure & Connect</h3>
                  <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                    Customize each block and connect them to create a powerful AI workflow.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Test & Deploy</h3>
                  <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                    Test your agent, make adjustments, and deploy it for you or your organization to use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Build?</h2>
                <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed">
                  Start creating your own AI assistants today with our powerful block-based platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/dashboard">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 BlockAgent. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="/about" className="text-xs hover:underline underline-offset-4">About</Link>
          <Link to="/terms" className="text-xs hover:underline underline-offset-4">Terms</Link>
          <Link to="/privacy" className="text-xs hover:underline underline-offset-4">Privacy</Link>
          <Link to="/contact" className="text-xs hover:underline underline-offset-4">Contact</Link>
        </nav>
      </footer>
    </div>
  );
};

// Removing the custom Badge component since we're now using the UI Badge
export default Index;
