import { CSSStylerApp } from "@/components/css-styler/css-styler-app";
import { InfoButton } from "@/components/ui/info-button";
import { previewTemplates } from "@/lib/preview-templates";
import fs from 'fs';
import path from 'path';

export default function EasyDonatePage() {
  const baseCssPath = path.join(process.cwd(), 'src/app/easydonate/base.css');
  const baseCss = fs.readFileSync(baseCssPath, 'utf-8');

  const template = {
    ...previewTemplates.easydonate,
    baseCss,
  };

  return (
    <div className="h-screen bg-background">
      <CSSStylerApp template={template} />
      <InfoButton />
    </div>
  );
}
