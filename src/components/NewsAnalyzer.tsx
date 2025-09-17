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
    <div className="w-full max-w-4xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            TruthLens AI
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Advanced AI-powered fact-checking that doesn't just detect misinformation—it teaches you how to spot it yourself.
        </p>
      </div>

      {/* Input Section */}
      <Card className="shadow-medium bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Analyze News Content
          </CardTitle>
          <CardDescription>
            Paste any news article, tweet, headline, or social media post to analyze its credibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your news content here... (articles, tweets, headlines, social media posts)"
            value={newsContent}
            onChange={(e) => setNewsContent(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {newsContent.length} characters
            </span>
            <Button 
              onClick={analyzeNews}
              disabled={!newsContent.trim() || isAnalyzing}
              className="bg-gradient-hero hover:opacity-90 transition-opacity"
            >
              {isAnalyzing ? (
                <>
                  <Zap className="h-4 w-4 mr-2 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze Content
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {analysisResult && (
        <div className="space-y-6">
          <AnalysisResult data={analysisResult} />
          <DigitalImmunityTip tip={analysisResult.immunityTip} />
        </div>
      )}

      {/* Quick Tips */}
      {!analysisResult && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Quick Digital Immunity Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-verified mt-0.5" />
                <div>
                  <h4 className="font-medium">Check Sources</h4>
                  <p className="text-sm text-muted-foreground">Look for credible, named sources and official documentation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <h4 className="font-medium">Emotional Language</h4>
                  <p className="text-sm text-muted-foreground">Be wary of content designed to make you angry or scared</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <h4 className="font-medium">Cross-Reference</h4>
                  <p className="text-sm text-muted-foreground">Verify claims through multiple independent sources</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}