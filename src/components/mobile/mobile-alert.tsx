import * as React from "react"
import { X, Monitor, Smartphone, Tablet } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface MobileAlertProps {
  title: string
  message: string
  recommendBrowsers: string[]
  isVisible: boolean
  onDismiss: (permanent?: boolean) => void
  showAgainOption?: boolean
  deviceType?: 'mobile' | 'tablet' | 'desktop'
}

export function MobileAlert({
  title,
  message,
  recommendBrowsers,
  isVisible,
  onDismiss,
  showAgainOption = true,
  deviceType = 'mobile'
}: MobileAlertProps) {
  const [dontShowAgain, setDontShowAgain] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    if (isVisible) {
      // Trigger entrance animation
      const timer = setTimeout(() => setIsAnimating(true), 10)
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
    }
  }, [isVisible])

  const handleDismiss = () => {
    setIsAnimating(false)
    // Wait for exit animation before actually dismissing
    setTimeout(() => {
      onDismiss(dontShowAgain)
    }, 300)
  }

  const getDeviceIcon = () => {
    switch (deviceType) {
      case 'tablet':
        return <Tablet className="h-6 w-6 text-primary" />
      case 'mobile':
      default:
        return <Smartphone className="h-6 w-6 text-primary" />
    }
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="mobile-alert-title"
      aria-describedby="mobile-alert-description"
    >
      {/* Backdrop with blur effect */}
      <div
        className={cn(
          "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isAnimating ? "opacity-100" : "opacity-0"
        )}
        onClick={() => handleDismiss()}
        aria-hidden="true"
      />

      {/* Alert Card */}
      <Card
        className={cn(
          "relative w-full max-w-md transform transition-all duration-300 ease-out",
          isAnimating 
            ? "scale-100 opacity-100 translate-y-0" 
            : "scale-95 opacity-0 translate-y-4"
        )}
      >
        <CardContent className="p-6">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 h-8 w-8 rounded-full opacity-70 hover:opacity-100"
            onClick={handleDismiss}
            aria-label="Close alert"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Alert Content */}
          <div className="flex items-start gap-4">
            {/* Device Icon */}
            <div className="mt-1 flex-shrink-0">
              {getDeviceIcon()}
            </div>

            {/* Text Content */}
            <div className="flex-1 space-y-3">
              <h3
                id="mobile-alert-title"
                className="text-lg font-semibold leading-none tracking-tight"
              >
                {title}
              </h3>
              
              <p
                id="mobile-alert-description"
                className="text-sm text-muted-foreground leading-relaxed"
              >
                {message}
              </p>

              {/* Recommended Browsers */}
              {recommendBrowsers.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Recommended browsers:</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendBrowsers.map((browser) => (
                      <div
                        key={browser}
                        className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs"
                      >
                        <Monitor className="h-3 w-3" />
                        <span>{browser}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* "Don't show again" option */}
              {showAgainOption && (
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="dont-show-again"
                    checked={dontShowAgain}
                    onCheckedChange={(checked) => 
                      setDontShowAgain(checked === true)
                    }
                  />
                  <label
                    htmlFor="dont-show-again"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    ไม่ต้องแสดงอีก
                  </label>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleDismiss}
                  className="flex-1"
                  aria-label="Continue on mobile device"
                >
                  ตกลง
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}