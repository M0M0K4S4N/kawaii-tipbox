# Mobile Detection System

A comprehensive mobile detection system that displays user-friendly alerts when the website is accessed from mobile devices.

## Features

- **Cross-platform Detection**: Works across iOS, Android, and tablet devices
- **Session Management**: Alert appears only once per session
- **Persistent Dismissal**: Users can choose "Don't show again" option
- **Customizable Messages**: Administrators can customize alert content
- **Responsive Design**: Matches website branding with Tailwind CSS
- **Accessibility**: Full ARIA label support for screen readers
- **Smooth Animations**: Entrance and exit animations using CSS transitions

## Components

### Mobile Detection Hook (`useMobileDetection`)

Enhanced mobile detection that identifies:
- Mobile devices
- Tablets
- iOS devices
- Android devices
- Device type classification

```typescript
import { useMobileDetection } from "@/hooks/use-mobile-detection"

const deviceInfo = useMobileDetection()
// deviceInfo.isMobile, deviceInfo.isTablet, deviceInfo.deviceType, etc.
```

### Mobile Alert Hook (`useMobileAlert`)

Manages alert state, session storage, and configuration:

```typescript
import { useMobileAlert } from "@/hooks/use-mobile-alert"

const mobileAlert = useMobileAlert()
// mobileAlert.showAlert(), mobileAlert.dismiss(permanent), etc.
```

### Mobile Alert Component (`MobileAlert`)

The actual alert UI with animations and accessibility features:

```typescript
import { MobileAlert } from "@/components/mobile/mobile-alert"

<MobileAlert
  title="Mobile Device Detected"
  message="Some features may not function optimally..."
  recommendBrowsers={["Firefox", "Google Chrome"]}
  isVisible={isVisible}
  onDismiss={handleDismiss}
  showAgainOption={true}
  deviceType="mobile"
/>
```

### Mobile Provider (`MobileProvider`)

Wraps the application and manages the mobile detection logic:

```typescript
import { MobileProvider } from "@/components/mobile/mobile-provider"

<MobileProvider>
  <App />
</MobileProvider>
```

## Implementation

The mobile detection system is already integrated into the main layout of the application. It will automatically:

1. Detect if the user is on a mobile or tablet device
2. Check if the alert has been dismissed in the current session
3. Display the alert with smooth animations if appropriate
4. Respect the "Don't show again" preference

## Configuration

### Admin Configuration Page

Access the admin configuration at `/admin/mobile-alert` to:
- Enable/disable the mobile alert
- Customize the alert title and message
- Manage recommended browsers
- Toggle the "Don't show again" option
- Test the alert functionality

### Programmatic Configuration

You can also configure the alert programmatically:

```typescript
import { useMobileAlert } from "@/hooks/use-mobile-alert"

const mobileAlert = useMobileAlert()

// Update configuration
mobileAlert.updateConfig({
  title: "Custom Title",
  message: "Custom message",
  recommendBrowsers: ["Firefox", "Chrome", "Safari"]
})

// Test the alert
mobileAlert.showAlert()
```

## Testing

Visit `/test-mobile` to test the mobile detection system and view:
- Current device information
- Alert status
- Configuration details
- Test controls

## Styling

The alert uses Tailwind CSS classes and follows the application's design system. The animations are handled by CSS transitions with a duration of 300ms.

## Browser Support

The mobile detection works across all modern browsers:
- Chrome (mobile and desktop)
- Firefox (mobile and desktop)
- Safari (iOS and desktop)
- Edge (mobile and desktop)
- Opera (mobile and desktop)

## Storage

The system uses:
- **Session Storage**: To track if the alert has been shown in the current session
- **Local Storage**: To persist the "Don't show again" preference and custom configurations

## Accessibility

The alert includes:
- ARIA labels and roles for screen readers
- Keyboard navigation support
- Focus management
- Semantic HTML structure
- High contrast support