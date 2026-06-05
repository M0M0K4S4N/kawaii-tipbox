import { CSSStylerApp } from "@/components/css-styler/css-styler-app";
import { InfoButton } from "@/components/ui/info-button";
import { previewTemplates } from "@/lib/preview-templates";

export default function TipMePage() {
  return (
    <div className="h-screen bg-background">
      <CSSStylerApp template={previewTemplates.tipme} />
      <InfoButton />
    </div>
  );
}
