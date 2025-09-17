import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle, Shield, ExternalLink } from "lucide-react";

interface AnalysisData {
  credibilityScore: number;
  status: 'verified' | 'suspicious' | 'misleading';
  explanation: string;
  redFlags: string[];
  sources: string[];
}

interface AnalysisResultProps {
  data: AnalysisData;
}

export function AnalysisResult({ data }: AnalysisResultProps) {
  const getStatusIcon = () => {
    switch (data.status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-verified" />;
      case 'suspicious':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'misleading':
        return <XCircle className="h-5 w-5 text-destructive" />;
    }
  };

  const getStatusBadge = () => {
    switch (data.status) {
      case 'verified':
        return <Badge className="bg-verified text-verified-foreground">Verified Content</Badge>;
      case 'suspicious':
        return <Badge className="bg-warning text-warning-foreground">Suspicious Content</Badge>;
      case 'misleading':
        return <Badge className="bg-destructive text-destructive-foreground">Misleading Content</Badge>;
    }
  };

  const getScoreColor = () => {
    if (data.credibilityScore >= 70) return "text-verified";
    if (data.credibilityScore >= 40) return "text-warning";
    return "text-destructive";
  };

  const getProgressColor = () => {
    if (data.credibilityScore >= 70) return "bg-verified";
    if (data.credibilityScore >= 40) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {getStatusIcon()}
            Analysis Results
          </CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Credibility Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Credibility Score</span>
            <span className={`text-2xl font-bold ${getScoreColor()}`}>
              {data.credibilityScore}/100
            </span>
          </div>
          <Progress 
            value={data.credibilityScore} 
            className="h-3"
            style={{
              '--progress-foreground': `hsl(var(--${data.credibilityScore >= 70 ? 'verified' : data.credibilityScore >= 40 ? 'warning' : 'destructive'}))`
            } as React.CSSProperties}
          />
        </div>

        {/* Explanation */}
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" />
            AI Analysis Explanation
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            {data.explanation}
          </p>
        </div>

        {/* Red Flags */}
        {data.redFlags.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-destructive flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Warning Signs Detected
            </h4>
            <ul className="space-y-2">
              {data.redFlags.map((flag, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sources */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Sources Referenced
          </h4>
          {data.sources.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.sources.map((source, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {source}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No credible sources identified in this content.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}