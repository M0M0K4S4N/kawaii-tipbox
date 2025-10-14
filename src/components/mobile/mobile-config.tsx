"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useMobileAlert } from "@/hooks/use-mobile-alert"
import { Smartphone as MobileDetectionIcon } from "lucide-react"

export function MobileConfig() {
  const mobileAlert = useMobileAlert()
  const [localConfig, setLocalConfig] = React.useState(mobileAlert.config)
  const [newBrowser, setNewBrowser] = React.useState("")

  const handleConfigChange = (key: string, value: any) => {
    const updatedConfig = { ...localConfig, [key]: value }
    setLocalConfig(updatedConfig)
  }

  const saveConfig = () => {
    mobileAlert.updateConfig(localConfig)
  }

  const resetConfig = () => {
    mobileAlert.resetAlert()
    setLocalConfig(mobileAlert.config)
  }

  const addBrowser = () => {
    if (newBrowser.trim() && !localConfig.recommendBrowsers.includes(newBrowser.trim())) {
      handleConfigChange("recommendBrowsers", [...localConfig.recommendBrowsers, newBrowser.trim()])
      setNewBrowser("")
    }
  }

  const removeBrowser = (browser: string) => {
    handleConfigChange(
      "recommendBrowsers",
      localConfig.recommendBrowsers.filter(b => b !== browser)
    )
  }

  const testAlert = () => {
    mobileAlert.resetAlert()
    setTimeout(() => {
      mobileAlert.showAlert()
    }, 100)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MobileDetectionIcon className="h-5 w-5" />
          Mobile Alert Configuration
        </CardTitle>
        <CardDescription>
          Configure the mobile detection alert settings for your application.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enable-alert">Enable Mobile Alert</Label>
            <p className="text-sm text-muted-foreground">
              Show alerts to users accessing from mobile devices
            </p>
          </div>
          <Switch
            id="enable-alert"
            checked={localConfig.enabled}
            onCheckedChange={(checked) => handleConfigChange("enabled", checked)}
          />
        </div>

        <Separator />

        {/* Alert Title */}
        <div className="space-y-2">
          <Label htmlFor="alert-title">Alert Title</Label>
          <Input
            id="alert-title"
            value={localConfig.title}
            onChange={(e) => handleConfigChange("title", e.target.value)}
            placeholder="Mobile Device Detected"
          />
        </div>

        {/* Alert Message */}
        <div className="space-y-2">
          <Label htmlFor="alert-message">Alert Message</Label>
          <Textarea
            id="alert-message"
            value={localConfig.message}
            onChange={(e) => handleConfigChange("message", e.target.value)}
            placeholder="Some features may not function optimally on mobile browsers..."
            rows={3}
          />
        </div>

        {/* Recommended Browsers */}
        <div className="space-y-2">
          <Label>Recommended Browsers</Label>
          <div className="flex gap-2">
            <Input
              value={newBrowser}
              onChange={(e) => setNewBrowser(e.target.value)}
              placeholder="Add browser name"
              onKeyDown={(e) => e.key === "Enter" && addBrowser()}
            />
            <Button type="button" onClick={addBrowser}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {localConfig.recommendBrowsers.map((browser) => (
              <Badge key={browser} variant="secondary" className="flex items-center gap-1">
                {browser}
                <button
                  onClick={() => removeBrowser(browser)}
                  className="ml-1 text-xs hover:text-destructive"
                  aria-label={`Remove ${browser}`}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Show Again Option */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="show-again">Show "Don't show again" option</Label>
            <p className="text-sm text-muted-foreground">
              Allow users to permanently dismiss the alert
            </p>
          </div>
          <Switch
            id="show-again"
            checked={localConfig.showAgainOption}
            onCheckedChange={(checked) => handleConfigChange("showAgainOption", checked)}
          />
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={saveConfig}>Save Configuration</Button>
          <Button variant="outline" onClick={testAlert}>Test Alert</Button>
          <Button variant="outline" onClick={resetConfig}>Reset Alert State</Button>
        </div>

        {/* Status Information */}
        <div className="rounded-md bg-muted p-4">
          <h4 className="font-medium mb-2">Status Information</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Alert enabled: {localConfig.enabled ? "Yes" : "No"}</p>
            <p>Permanently dismissed: {mobileAlert.isPermanentlyDismissed ? "Yes" : "No"}</p>
            <p>Shown in current session: {mobileAlert.hasShownInSession ? "Yes" : "No"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}