import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, Brain } from "lucide-react";

interface ImmunityTip {
  title: string;
  description: string;
  pattern: string;
}

interface DigitalImmunityTipProps {
  tip: ImmunityTip;
}

export function DigitalImmunityTip({ tip }: DigitalImmunityTipProps) {
  return (
    <Card className="shadow-medium bg-gradient-trust border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Brain className="h-5 w-5" />
          Digital Immunity Tip
          <Badge className="bg-white/20 text-white border-white/30 ml-auto">
            Learn & Protect
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-white">
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            {tip.title}
          </h4>
          <p className="text-white/90 leading-relaxed">
            {tip.description}
          </p>
        </div>
        
        <div className="p-3 bg-white/10 rounded-lg border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4" />
            <span className="font-medium text-sm">Pattern to Remember</span>
          </div>
          <p className="text-sm text-white/90 font-mono bg-white/5 px-2 py-1 rounded">
            {tip.pattern}
          </p>
        </div>

        <div className="text-xs text-white/70 italic">
          💡 The more you practice spotting these patterns, the stronger your digital immunity becomes!
        </div>
      </CardContent>
    </Card>
  );
}