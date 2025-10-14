"use client"

import * as React from "react"
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import { useMobileAlert } from "@/hooks/use-mobile-alert"
import { MobileAlert } from "./mobile-alert"

interface MobileProviderProps {
  children: React.ReactNode
  customConfig?: {
    enabled?: boolean
    title?: string
    message?: string
    recommendBrowsers?: string[]
    showAgainOption?: boolean
  }
}

export function MobileProvider({ children, customConfig }: MobileProviderProps) {
  const deviceInfo = useMobileDetection()
  const mobileAlert = useMobileAlert()
  
  // Apply custom config if provided
  React.useEffect(() => {
    if (customConfig) {
      mobileAlert.updateConfig(customConfig)
    }
  }, [customConfig, mobileAlert])

  // Show alert when mobile device is detected
  React.useEffect(() => {
    if (deviceInfo && (deviceInfo.isMobile || deviceInfo.isTablet)) {
      // Add a small delay to ensure the page has loaded
      const timer = setTimeout(() => {
        mobileAlert.showAlert()
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [deviceInfo, mobileAlert])

  return (
    <>
      {children}
      <MobileAlert
        title={mobileAlert.config.title}
        message={mobileAlert.config.message}
        recommendBrowsers={mobileAlert.config.recommendBrowsers}
        isVisible={mobileAlert.isVisible}
        onDismiss={mobileAlert.dismissAlert}
        showAgainOption={mobileAlert.config.showAgainOption}
        deviceType={deviceInfo?.deviceType}
      />
    </>
  )
}