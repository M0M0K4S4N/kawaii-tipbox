"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeartModalWrapper } from "./heart-modal";

export function HeartButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
    setIsAnimating(true);
    setIsModalOpen(true);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .pulse-animation {
          animation: pulse 0.5s ease-in-out;
        }
        
        .pulse-every-3s {
          animation: pulse 0.5s ease-in-out;
          animation-iteration-count: infinite;
          animation-delay: 3s;
        }
        
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.6);
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        }
      `}</style>
      
      <button
        className={cn(
          "fixed bottom-5 right-5 w-12 h-12 md:w-[50px] md:h-[50px] bg-[#FF4757] hover:bg-[#C44569] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out shadow-[0_4px_15px_rgba(255,71,87,0.4)] hover:shadow-[0_6px_20px_rgba(255,71,87,0.6)] focus:outline-none focus:ring-2 focus:ring-[#FF4757] focus:ring-offset-2 z-50 min-w-[44px] min-h-[44px]",
          !isLiked && "pulse-every-3s",
          isAnimating && "pulse-animation"
        )}
        onClick={handleClick}
        aria-label={isLiked ? "Unlike" : "Like"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {isAnimating && <div className="ripple" />}
        <Heart
          className={cn(
            "text-white transition-all duration-300 ease-in-out",
            "w-[60%] h-[60%]",
            "hover:scale-110",
            isLiked ? "fill-current" : ""
          )}
          strokeWidth={isLiked ? 0 : 2}
        />
      </button>
      
      <HeartModalWrapper open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}