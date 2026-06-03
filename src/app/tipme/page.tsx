import { CSSStylerApp } from "@/components/css-styler/css-styler-app";
import { HeartButton } from "@/components/ui/heart-button";
import { previewTemplates } from "@/lib/preview-templates";

export default function TipMePage() {
  return (
    <div className="h-screen bg-background">
      <CSSStylerApp template={previewTemplates.tipme} />
      <HeartButton />
    </div>
  );
}
