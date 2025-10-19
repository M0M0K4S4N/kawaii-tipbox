"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const HeartModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("sr-only", className)}
    {...props}
  />
));
HeartModalTitle.displayName = DialogPrimitive.Title.displayName;

const HeartModal = DialogPrimitive.Root;

const HeartModalTrigger = DialogPrimitive.Trigger;

const HeartModalPortal = DialogPrimitive.Portal;

const HeartModalClose = DialogPrimitive.Close;

const HeartModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
HeartModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

const HeartModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <HeartModalPortal>
    <HeartModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] p-6 shadow-2xl duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-xl border bg-background/95 backdrop-blur-md",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-1.5 opacity-70 transition-opacity hover:opacity-100 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </HeartModalPortal>
));
HeartModalContent.displayName = DialogPrimitive.Content.displayName;

const HeartModalContentInner = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-4 text-center",
      className
    )}
    {...props}
  />
);
HeartModalContentInner.displayName = "HeartModalContentInner";

interface HeartModalProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function HeartModalWrapper({ children, open, onOpenChange }: HeartModalProps) {
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onOpenChange?.(false);
    }
  };

  React.useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [open]);

  return (
    <HeartModal open={open} onOpenChange={onOpenChange}>
      <HeartModalContent>
        <HeartModalTitle>About Kawaii Tipbox</HeartModalTitle>
        <HeartModalContentInner>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-center">
              <span className="text-2xl">About this project</span>
            </div>
            
            <div className="space-y-3 text-sm">
              <p className="flex items-center justify-center flex-wrap gap-1.5">
                <span>Made with ❤️, source opened on</span>
                <a
                  href="https://github.com/M0M0K4S4N/kawaii-tipbox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline transition-colors"
                  aria-label="View source on GitHub"
                >
                  <Github className="h-4 w-4" />
                  <span>M0M0K4S4N/kawaii-tipbox</span>
                </a>
              </p>
              
              <p className="text-muted-foreground px-2">
                แอปพลิเคชันนี้ให้บริการปรับแต่ง CSS เท่านั้น มิได้ส่วนเกี่ยวข้องกับ tipme.in.th แต่อย่างใด
                <br/>
                ภาพที่แสดงอาจแตกต่างกับผลลัพธ์จริง กรุณาตรวจสอบอีกครั้งก่อนใช้งาน
              </p>
            </div>
          </div>
        </HeartModalContentInner>
      </HeartModalContent>
    </HeartModal>
  );
}

export {
  HeartModal,
  HeartModalPortal,
  HeartModalOverlay,
  HeartModalTrigger,
  HeartModalClose,
  HeartModalContent,
  HeartModalContentInner,
  HeartModalTitle,
};