"use client"

import { MobileConfig } from "@/components/mobile/mobile-config"

export default function MobileAlertAdminPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mobile Alert Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure the mobile detection alert system for your application.
        </p>
      </div>
      
      <MobileConfig />
    </div>
  )
}