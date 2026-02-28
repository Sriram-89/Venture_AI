import { useParams, useLocation } from "wouter";
import { useIdea } from "@/hooks/use-ideas";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Target,
  Users,
  Lightbulb,
  Landmark,
  Map,
  CheckCircle2,
  AlertTriangle,
  Share2,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Result() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { data: idea, isLoading, error } = useIdea(Number(id));

  if (isLoading) return <ResultSkeleton />;

  if (error || !idea) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-secondary mb-2">
            Analysis Not Found
          </h1>
          <Button onClick={() => setLocation("/")}>Back to Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const analysis: any = idea.analysis;
  if (!analysis) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4">

          {/* HEADER */}
          <div className="mb-8 flex justify-between">
            <Button variant="ghost" onClick={() => setLocation("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Validate Another Idea
            </Button>
          </div>

          {/* SUCCESS + IDEA */}
          <div className="bg-orange-50 border border-orange-100 p-6 rounded-xl mb-10 relative">
            <div className="absolute top-4 right-4 bg-white border rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-bold">Success:</span>
              <span className="text-green-600 font-black">
                {analysis.successRate}%
              </span>
            </div>

            <h3 className="text-sm font-bold text-orange-800 uppercase mb-2">
              Your Idea
            </h3>
            <p className="italic text-lg">"{idea.description}"</p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-8">

              {/* Market */}
              <AnalysisCard title="Market Competition" icon={Target}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: analysis.marketCompetition,
                  }}
                />
              </AnalysisCard>

              {/* Audience */}
              <AnalysisCard title="Target Audience" icon={Users}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: analysis.targetAudience,
                  }}
                />
              </AnalysisCard>

              {/* USPs */}
              <AnalysisCard title="Your Moat (USPs)" icon={Lightbulb}>
                {analysis.uniqueDifferentiators.map((usp: string, i: number) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-yellow-600 mt-1" />
                    <span>{usp}</span>
                  </div>
                ))}
              </AnalysisCard>

              {/* ✅ MILESTONES FIXED POSITION */}
              {analysis.milestones && (
                <AnalysisCard
                  title="Startup Growth Stages"
                  icon={TrendingUp}
                >
                  {analysis.milestones.map((stage: any, i: number) => {
                    const color =
                      stage.status === "completed"
                        ? "border-green-400 bg-green-50"
                        : stage.status === "in_progress"
                        ? "border-orange-400 bg-orange-50"
                        : "border-gray-300 bg-gray-50";

                    return (
                      <div
                        key={i}
                        className={`border p-4 rounded-lg mb-4 ${color}`}
                      >
                        <div className="flex justify-between mb-2">
                          <h4 className="font-semibold">
                            Stage {stage.stageNumber}: {stage.title}
                          </h4>
                          <span className="text-xs uppercase font-bold">
                            {stage.status.replace("_", " ")}
                          </span>
                        </div>
                        <p className="text-sm">
                          <strong>Objective:</strong> {stage.objective}
                        </p>
                        <p className="text-sm italic">
                          <strong>Outcome:</strong> {stage.expectedOutcome}
                        </p>
                      </div>
                    );
                  })}
                </AnalysisCard>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-8">

              {/* Roadmap */}
              <div className="bg-card rounded-xl border shadow-sm p-6">
                <h2 className="font-bold mb-4 flex items-center gap-2">
                  <Map className="h-4 w-4 text-green-600" />
                  Launch Roadmap
                </h2>

                <Tabs defaultValue="week">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="quarter">Q1</TabsTrigger>
                  </TabsList>

                  <TabsContent value="week">
                    <RoadmapItem content={analysis.roadmap.thisWeek} />
                  </TabsContent>
                  <TabsContent value="month">
                    <RoadmapItem content={analysis.roadmap.thisMonth} />
                  </TabsContent>
                  <TabsContent value="quarter">
                    <RoadmapItem content={analysis.roadmap.thisQuarter} />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Govt */}
              <div className="bg-card rounded-xl border shadow-sm p-6">
                <h2 className="font-bold mb-4 flex items-center gap-2">
                  <Landmark className="h-4 w-4 text-orange-600" />
                  Govt Schemes
                </h2>

                {analysis.governmentSchemes.map((scheme: string, i: number) => (
                  <Badge key={i} className="block mb-2">
                    🏛️ {scheme}
                  </Badge>
                ))}
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function AnalysisCard({ title, icon: Icon, children }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function RoadmapItem({ content }: { content: string }) {
  return <p className="text-sm">{content}</p>;
}

function ResultSkeleton() {
  return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
}