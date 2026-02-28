import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertIdeaSchema, type InsertIdea } from "@shared/schema";
import { useAnalyzeIdea } from "@/hooks/use-ideas";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StepCard } from "@/components/StepCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Loader2, Lightbulb, Target, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { mutate, isPending } = useAnalyzeIdea();
  
  const form = useForm<InsertIdea>({
    resolver: zodResolver(insertIdeaSchema),
    defaultValues: {
      description: "",
    },
  });

  function onSubmit(data: InsertIdea) {
    mutate(data);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-india opacity-50 z-0" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-secondary tracking-tight mb-6">
                Validate Your <span className="text-gradient-saffron">Indian Startup</span> Idea
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                Get instant, AI-powered feedback on your business concept. Market analysis, government schemes, and a launch roadmap—tailored for India.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-2xl mx-auto bg-card rounded-2xl shadow-xl shadow-orange-500/10 border border-border p-6 sm:p-8"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Textarea
                              placeholder="Describe your startup idea in detail... (e.g., A quick-commerce delivery app for local kirana stores in Tier-2 cities)"
                              className="min-h-[160px] resize-none text-base p-4 rounded-xl bg-muted/30 border-2 focus:border-orange-500 transition-all placeholder:text-muted-foreground/60"
                              {...field}
                            />
                            <div className="absolute bottom-3 right-3">
                              <Sparkles className="h-5 w-5 text-orange-400 opacity-50" />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25 rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Analyzing Market...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Validate My Idea <ArrowRight className="h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
              <p className="mt-4 text-xs text-muted-foreground font-medium">
                100% Free • AI-Powered Analysis • Instant Results
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl font-bold text-secondary mb-4">Why use IdeaValidator?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We combine global startup frameworks with deep knowledge of the Indian market ecosystem.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard 
                number="01"
                title="Market Intelligence"
                description="Understand your competition and saturation levels in the Indian market specifically."
                icon={Target}
                color="orange"
                delay={0}
              />
              <StepCard 
                number="02"
                title="Govt. Schemes"
                description="Discover Startup India benefits and Pradhan Mantri schemes applicable to your niche."
                icon={Lightbulb}
                color="white"
                delay={100}
              />
              <StepCard 
                number="03"
                title="Actionable Roadmap"
                description="Get a week-by-week plan to validate your MVP and get your first 100 users."
                icon={TrendingUp}
                color="green"
                delay={200}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
