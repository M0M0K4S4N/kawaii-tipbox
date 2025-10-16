import * as React from "react"

interface MobileAlertConfig {
  enabled: boolean
  title: string
  message: string
  recommendBrowsers: string[]
  showAgainOption: boolean
}

const DEFAULT_CONFIG: MobileAlertConfig = {
  enabled: true,
  title: "Mobile Device Detected",
  message: "Some features may not function optimally on mobile browsers. For the best experience, we recommend using Firefox or Google Chrome on a desktop computer.",
  recommendBrowsers: ["Firefox", "Google Chrome"],
  showAgainOption: true
}

const STORAGE_KEY = "kawaii-tipbox-mobile-alert-dismissed"
const SESSION_KEY = "kawaii-tipbox-mobile-alert-session"

export function useMobileAlert() {
  const [config, setConfig] = React.useState<MobileAlertConfig>(DEFAULT_CONFIG)
  const [isVisible, setIsVisible] = React.useState(false)
  const [isPermanentlyDismissed, setIsPermanentlyDismissed] = React.useState(false)
  const [hasShownInSession, setHasShownInSession] = React.useState(false)

  React.useEffect(() => {
    // Check if user has permanently dismissed the alert
    const permanentlyDismissed = localStorage.getItem(STORAGE_KEY) === "true"
    setIsPermanentlyDismissed(permanentlyDismissed)

    // Check if alert has already been shown in this session
    const sessionShown = sessionStorage.getItem(SESSION_KEY) === "true"
    setHasShownInSession(sessionShown)

    // Load custom config if available (for future admin customization)
    const savedConfig = localStorage.getItem("kawaii-tipbox-mobile-alert-config")
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig)
        setConfig({ ...DEFAULT_CONFIG, ...parsedConfig })
      } catch (error) {
        console.error("Failed to parse mobile alert config:", error)
      }
    }
  }, [])

  const showAlert = React.useCallback(() => {
    if (!config.enabled || isPermanentlyDismissed || hasShownInSession) {
      return false
    }
    setIsVisible(true)
    setHasShownInSession(true)
    sessionStorage.setItem(SESSION_KEY, "true")
    return true
  }, [config.enabled, isPermanentlyDismissed, hasShownInSession])

  const dismissAlert = React.useCallback((permanent: boolean = false) => {
    setIsVisible(false)
    if (permanent) {
      setIsPermanentlyDismissed(true)
      localStorage.setItem(STORAGE_KEY, "true")
    }
  }, [])

  const resetAlert = React.useCallback(() => {
    setIsPermanentlyDismissed(false)
    setHasShownInSession(false)
    setIsVisible(false)
    localStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(SESSION_KEY)
  }, [])

  const updateConfig = React.useCallback((newConfig: Partial<MobileAlertConfig>) => {
    const updatedConfig = { ...config, ...newConfig }
    setConfig(updatedConfig)
    localStorage.setItem("kawaii-tipbox-mobile-alert-config", JSON.stringify(updatedConfig))
  }, [config])

  return {
    config,
    isVisible,
    showAlert,
    dismissAlert,
    resetAlert,
    updateConfig,
    isPermanentlyDismissed,
    hasShownInSession
  }
}