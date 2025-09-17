import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Shield, Brain, Search, Zap } from "lucide-react";
import { AnalysisResult } from "./AnalysisResult";
import { DigitalImmunityTip } from "./DigitalImmunityTip";

interface AnalysisData {
  credibilityScore: number;
  status: 'verified' | 'suspicious' | 'misleading';
  explanation: string;
  redFlags: string[];
  sources: string[];
  immunityTip: {
    title: string;
    description: string;
    pattern: string;
  };
}

export function NewsAnalyzer() {
  const [newsContent, setNewsContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);

  const mockAnalysis = (): AnalysisData => {
    const mockResults = [
      {
        credibilityScore: 85,
        status: 'verified' as const,
        explanation: "This content shows strong journalistic standards with proper attribution, balanced reporting, and verifiable facts. The language is neutral and sources are credible.",
        redFlags: [],
        sources: ["Reuters", "Associated Press", "Government Records"],
        immunityTip: {
          title: "Look for Source Attribution",
          description: "Credible news always cites specific sources and provides context. Notice how this article mentions where information came from.",
          pattern: "Multiple independent sources + specific quotes + official records"
        }
      },
      {
        credibilityScore: 35,
        status: 'suspicious' as const,
        explanation: "This content contains several warning signs of potential misinformation including emotional language, lack of credible sources, and unverified claims.",
        redFlags: [
          "Uses highly emotional language designed to provoke anger",
          "Makes claims without citing credible sources",
          "Contains absolute statements without nuance",
          "Appeals to conspiracy theories"
        ],
        sources: ["Unverified social media posts", "Anonymous sources"],
        immunityTip: {
          title: "Emotional Manipulation Alert",
          description: "Be wary of content that tries to make you angry or scared without providing solid evidence. This often indicates bias or manipulation.",
          pattern: "Strong emotions + weak evidence = Red flag"
        }
      },
      {
        credibilityScore: 15,
        status: 'misleading' as const,
        explanation: "This content shows clear signs of misinformation with false claims, misleading statistics, and deliberate manipulation of facts.",
        redFlags: [
          "Contains factually incorrect information",
          "Misrepresents statistical data",
          "Uses outdated or irrelevant information",
          "Lacks any credible source verification"
        ],
        sources: ["No credible sources found"],
        immunityTip: {
          title: "Fact-Check Before Sharing",
          description: "Always verify claims through multiple independent sources before believing or sharing. This content failed basic fact-checking.",
          pattern: "Unverified claims + missing context = Misinformation"
        }
      }
    ];
    
    return mockResults[Math.floor(Math.random() * mockResults.length)];
  };

  const analyzeNews = async () => {
    if (!newsContent.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = mockAnalysis();
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="text-center space-y-6 relative">
        <div className="absolute inset-0 bg-gradient-glow opacity-50 blur-3xl -z-10" />
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative">
            <Shield className="h-12 w-12 text-primary animate-float drop-shadow-lg" />
            <div className="absolute inset-0 h-12 w-12 text-primary animate-pulse-slow opacity-30" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent text-glow">
            TruthLens AI
          </h1>
        </div>
        <div className="relative">
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Advanced AI-powered fact-checking that doesn't just detect misinformation—it teaches you how to spot it yourself.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 bg-verified rounded-full animate-pulse-slow" />
              <span>Real-time Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 bg-accent rounded-full animate-pulse-slow" />
              <span>Educational Insights</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 bg-warning rounded-full animate-pulse-slow" />
              <span>Pattern Recognition</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <Card className="shadow-colored bg-gradient-card border-2 border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-glow">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-hero rounded-lg shadow-medium">
              <Search className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-hero bg-clip-text text-transparent">Analyze News Content</span>
          </CardTitle>
          <CardDescription className="text-base">
            Paste any news article, tweet, headline, or social media post to analyze its credibility and learn about misinformation patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Textarea
              placeholder="Paste your news content here... (articles, tweets, headlines, social media posts)"
              value={newsContent}
              onChange={(e) => setNewsContent(e.target.value)}
              className="min-h-[140px] resize-none text-base leading-relaxed border-2 focus:border-primary/50 transition-all duration-300"
            />
            {newsContent && (
              <div className="absolute top-3 right-3">
                <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                  {newsContent.split(' ').length} words
                </Badge>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {newsContent.length} characters
              </span>
              {newsContent.length > 0 && (
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 bg-verified rounded-full animate-pulse" />
                  <span className="text-xs text-verified">Ready to analyze</span>
                </div>
              )}
            </div>
            
            <Button 
              onClick={analyzeNews}
              disabled={!newsContent.trim() || isAnalyzing}
              className="bg-gradient-hero hover:shadow-colored transition-all duration-300 text-white px-6 py-2.5 text-base font-medium hover:scale-105"
            >
              {isAnalyzing ? (
                <>
                  <Zap className="h-5 w-5 mr-2 animate-bounce" />
                  <span className="animate-pulse">Analyzing...</span>
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5 mr-2" />
                  Analyze Content
                </>
              )}
            </Button>
          </div>
          
          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                <span>Processing content...</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-hero animate-pulse rounded-full" 
                     style={{ width: '100%', animationDuration: '2s' }} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {analysisResult && (
        <div className="space-y-8 animate-slideUp">
          <AnalysisResult data={analysisResult} />
          <DigitalImmunityTip tip={analysisResult.immunityTip} />
        </div>
      )}

      {/* Quick Tips */}
      {!analysisResult && (
        <Card className="shadow-medium border-accent/20 hover:shadow-glow transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="p-2 bg-gradient-trust rounded-lg shadow-medium">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-trust bg-clip-text text-transparent">Quick Digital Immunity Tips</span>
            </CardTitle>
            <CardDescription>
              Start building your resistance to misinformation with these essential techniques
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="group p-4 rounded-lg border border-verified/20 hover:border-verified/40 transition-all duration-300 hover:shadow-medium bg-gradient-to-br from-verified/5 to-transparent">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-verified/10 rounded-lg group-hover:bg-verified/20 transition-colors">
                    <CheckCircle className="h-5 w-5 text-verified" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-verified">Check Sources</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Look for credible, named sources and official documentation</p>
                  </div>
                </div>
              </div>
              
              <div className="group p-4 rounded-lg border border-warning/20 hover:border-warning/40 transition-all duration-300 hover:shadow-medium bg-gradient-to-br from-warning/5 to-transparent">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-warning/10 rounded-lg group-hover:bg-warning/20 transition-colors">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-warning">Emotional Language</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Be wary of content designed to make you angry or scared</p>
                  </div>
                </div>
              </div>
              
              <div className="group p-4 rounded-lg border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-medium bg-gradient-to-br from-accent/5 to-transparent">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                    <Shield className="h-5 w-5 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-accent">Cross-Reference</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Verify claims through multiple independent sources</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-glow rounded-lg border border-primary/10">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="h-5 w-5 text-primary animate-pulse-slow" />
                <span className="font-medium text-primary">Pro Tip</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The more you practice these techniques, the stronger your digital immunity becomes. Start with one piece of content at a time!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}