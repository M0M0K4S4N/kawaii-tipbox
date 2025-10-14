import { CSSStylerApp } from "@/components/css-styler/css-styler-app";
import { HeartButton } from "@/components/ui/heart-button";

export default function Home() {
  return (
    <div className="h-screen bg-background">
      <CSSStylerApp />
      <HeartButton />
    </div>
  );
}