"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeartModalWrapper } from "./heart-modal";

export function InfoButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className={cn(
          "fixed bottom-5 right-5 w-8 h-8 md:w-9 md:h-9 bg-[#3B82F6] hover:bg-[#2563EB] rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 z-50"
        )}
        onClick={handleClick}
        aria-label="Information"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <Info
          className={cn(
            "text-white",
            "w-4 h-4 md:w-5 md:h-5"
          )}
          strokeWidth={2}
        />
      </button>
      
      <HeartModalWrapper open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
