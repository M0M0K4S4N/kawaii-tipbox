"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import { useMobileAlert } from "@/hooks/use-mobile-alert"
import { Smartphone, Tablet, Monitor, AlertCircle } from "lucide-react"

export default function TestMobilePage() {
  const deviceInfo = useMobileDetection()
  const mobileAlert = useMobileAlert()

  const triggerTestAlert = () => {
    mobileAlert.resetAlert()
    setTimeout(() => {
      mobileAlert.showAlert()
    }, 100)
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mobile Detection Test</h1>
        <p className="text-muted-foreground mt-2">
          Test the mobile detection system and alert functionality.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Device Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Device Detection
            </CardTitle>
            <CardDescription>
              Information about the current device being used
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {deviceInfo ? (
              <>
                <div className="flex items-center justify-between">
                  <span>Device Type:</span>
                  <Badge variant={deviceInfo.deviceType === 'desktop' ? 'default' : 'secondary'}>
                    {deviceInfo.deviceType}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Mobile Device:</span>
                  <Badge variant={deviceInfo.isMobile ? 'destructive' : 'default'}>
                    {deviceInfo.isMobile ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tablet Device:</span>
                  <Badge variant={deviceInfo.isTablet ? 'destructive' : 'default'}>
                    {deviceInfo.isTablet ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>iOS Device:</span>
                  <Badge variant={deviceInfo.isIOS ? 'default' : 'secondary'}>
                    {deviceInfo.isIOS ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Android Device:</span>
                  <Badge variant={deviceInfo.isAndroid ? 'default' : 'secondary'}>
                    {deviceInfo.isAndroid ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">User Agent:</p>
                  <p className="text-xs text-muted-foreground break-all">
                    {deviceInfo.userAgent}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Detecting device...</p>
            )}
          </CardContent>
        </Card>

        {/* Alert Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Alert Status
            </CardTitle>
            <CardDescription>
              Current status of the mobile alert system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Alert Enabled:</span>
              <Badge variant={mobileAlert.config.enabled ? 'default' : 'secondary'}>
                {mobileAlert.config.enabled ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Currently Visible:</span>
              <Badge variant={mobileAlert.isVisible ? 'default' : 'secondary'}>
                {mobileAlert.isVisible ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Permanently Dismissed:</span>
              <Badge variant={mobileAlert.isPermanentlyDismissed ? 'destructive' : 'default'}>
                {mobileAlert.isPermanentlyDismissed ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Shown in Session:</span>
              <Badge variant={mobileAlert.hasShownInSession ? 'default' : 'secondary'}>
                {mobileAlert.hasShownInSession ? 'Yes' : 'No'}
              </Badge>
            </div>
            
            <div className="pt-4 space-y-2">
              <Button onClick={triggerTestAlert} className="w-full">
                Trigger Test Alert
              </Button>
              <Button 
                variant="outline" 
                onClick={() => mobileAlert.resetAlert()}
                className="w-full"
              >
                Reset Alert State
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Current Alert Configuration</CardTitle>
          <CardDescription>
            The current configuration for the mobile alert
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium">Title:</p>
            <p className="text-sm text-muted-foreground">{mobileAlert.config.title}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Message:</p>
            <p className="text-sm text-muted-foreground">{mobileAlert.config.message}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Recommended Browsers:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {mobileAlert.config.recommendBrowsers.map((browser) => (
                <Badge key={browser} variant="outline">
                  {browser}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Show "Don't show again" option:</span>
            <Badge variant={mobileAlert.config.showAgainOption ? 'default' : 'secondary'}>
              {mobileAlert.config.showAgainOption ? 'Yes' : 'No'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admin Links</CardTitle>
          <CardDescription>
            Quick access to administrative functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline">
            <a href="/admin/mobile-alert">Configure Mobile Alert</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}