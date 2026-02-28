"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Result;
var wouter_1 = require("wouter");
var use_ideas_1 = require("@/hooks/use-ideas");
var Navbar_1 = require("@/components/Navbar");
var Footer_1 = require("@/components/Footer");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
function Result() {
    var id = (0, wouter_1.useParams)().id;
    var _a = (0, wouter_1.useLocation)(), setLocation = _a[1];
    var _b = (0, use_ideas_1.useIdea)(Number(id)), idea = _b.data, isLoading = _b.isLoading, error = _b.error;
    if (isLoading)
        return <ResultSkeleton />;
    if (error || !idea) {
        return (<div className="min-h-screen flex flex-col bg-background">
        <Navbar_1.Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <lucide_react_1.AlertTriangle className="h-16 w-16 text-red-500 mb-4"/>
          <h1 className="text-2xl font-bold text-secondary mb-2">
            Analysis Not Found
          </h1>
          <button_1.Button onClick={function () { return setLocation("/"); }}>Back to Home</button_1.Button>
        </div>
        <Footer_1.Footer />
      </div>);
    }
    var analysis = idea.analysis;
    if (!analysis)
        return null;
    return (<div className="min-h-screen flex flex-col bg-background">
      <Navbar_1.Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4">

          {/* HEADER */}
          <div className="mb-8 flex justify-between">
            <button_1.Button variant="ghost" onClick={function () { return setLocation("/"); }}>
              <lucide_react_1.ArrowLeft className="mr-2 h-4 w-4"/>
              Validate Another Idea
            </button_1.Button>
          </div>

          {/* SUCCESS + IDEA */}
          <div className="bg-orange-50 border border-orange-100 p-6 rounded-xl mb-10 relative">
            <div className="absolute top-4 right-4 bg-white border rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
              <lucide_react_1.TrendingUp className="h-4 w-4 text-green-600"/>
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
              <AnalysisCard title="Market Competition" icon={lucide_react_1.Target}>
                <p dangerouslySetInnerHTML={{
            __html: analysis.marketCompetition,
        }}/>
              </AnalysisCard>

              {/* Audience */}
              <AnalysisCard title="Target Audience" icon={lucide_react_1.Users}>
                <p dangerouslySetInnerHTML={{
            __html: analysis.targetAudience,
        }}/>
              </AnalysisCard>

              {/* USPs */}
              <AnalysisCard title="Your Moat (USPs)" icon={lucide_react_1.Lightbulb}>
                {analysis.uniqueDifferentiators.map(function (usp, i) { return (<div key={i} className="flex gap-2 mb-2">
                    <lucide_react_1.CheckCircle2 className="h-4 w-4 text-yellow-600 mt-1"/>
                    <span>{usp}</span>
                  </div>); })}
              </AnalysisCard>

              {/* ✅ MILESTONES FIXED POSITION */}
              {analysis.milestones && (<AnalysisCard title="Startup Growth Stages" icon={lucide_react_1.TrendingUp}>
                  {analysis.milestones.map(function (stage, i) {
                var color = stage.status === "completed"
                    ? "border-green-400 bg-green-50"
                    : stage.status === "in_progress"
                        ? "border-orange-400 bg-orange-50"
                        : "border-gray-300 bg-gray-50";
                return (<div key={i} className={"border p-4 rounded-lg mb-4 ".concat(color)}>
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
                      </div>);
            })}
                </AnalysisCard>)}
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-8">

              {/* Roadmap */}
              <div className="bg-card rounded-xl border shadow-sm p-6">
                <h2 className="font-bold mb-4 flex items-center gap-2">
                  <lucide_react_1.Map className="h-4 w-4 text-green-600"/>
                  Launch Roadmap
                </h2>

                <tabs_1.Tabs defaultValue="week">
                  <tabs_1.TabsList className="grid grid-cols-3 mb-4">
                    <tabs_1.TabsTrigger value="week">Week</tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="month">Month</tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="quarter">Q1</tabs_1.TabsTrigger>
                  </tabs_1.TabsList>

                  <tabs_1.TabsContent value="week">
                    <RoadmapItem content={analysis.roadmap.thisWeek}/>
                  </tabs_1.TabsContent>
                  <tabs_1.TabsContent value="month">
                    <RoadmapItem content={analysis.roadmap.thisMonth}/>
                  </tabs_1.TabsContent>
                  <tabs_1.TabsContent value="quarter">
                    <RoadmapItem content={analysis.roadmap.thisQuarter}/>
                  </tabs_1.TabsContent>
                </tabs_1.Tabs>
              </div>

              {/* Govt */}
              <div className="bg-card rounded-xl border shadow-sm p-6">
                <h2 className="font-bold mb-4 flex items-center gap-2">
                  <lucide_react_1.Landmark className="h-4 w-4 text-orange-600"/>
                  Govt Schemes
                </h2>

                {analysis.governmentSchemes.map(function (scheme, i) { return (<badge_1.Badge key={i} className="block mb-2">
                    🏛️ {scheme}
                  </badge_1.Badge>); })}
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer_1.Footer />
    </div>);
}
function AnalysisCard(_a) {
    var title = _a.title, Icon = _a.icon, children = _a.children;
    return (<card_1.Card>
      <card_1.CardHeader className="flex flex-row items-center gap-2">
        <Icon className="h-5 w-5 text-primary"/>
        <card_1.CardTitle>{title}</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>{children}</card_1.CardContent>
    </card_1.Card>);
}
function RoadmapItem(_a) {
    var content = _a.content;
    return <p className="text-sm">{content}</p>;
}
function ResultSkeleton() {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
}
