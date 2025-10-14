import * as React from "react"

export interface MobileDeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isIOS: boolean
  isAndroid: boolean
  userAgent: string
  deviceType: 'desktop' | 'mobile' | 'tablet'
}

export function useMobileDetection() {
  const [deviceInfo, setDeviceInfo] = React.useState<MobileDeviceInfo | null>(null)

  React.useEffect(() => {
    const getDeviceInfo = (): MobileDeviceInfo => {
      const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : ''
      
      // Check for mobile devices
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      
      // Check for tablets specifically
      const isTablet = /iPad|Android(?!.*Mobile)|Tablet/i.test(userAgent)
      
      // Check for iOS
      const isIOS = /iPad|iPhone|iPod/.test(userAgent)
      
      // Check for Android
      const isAndroid = /Android/.test(userAgent)
      
      // Determine device type
      let deviceType: 'desktop' | 'mobile' | 'tablet' = 'desktop'
      if (isTablet) {
        deviceType = 'tablet'
      } else if (isMobile) {
        deviceType = 'mobile'
      }
      
      return {
        isMobile,
        isTablet,
        isIOS,
        isAndroid,
        userAgent,
        deviceType
      }
    }

    setDeviceInfo(getDeviceInfo())

    // Listen for orientation changes and resize events
    const handleResize = () => {
      setDeviceInfo(getDeviceInfo())
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return deviceInfo
}