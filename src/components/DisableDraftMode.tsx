"use client";

import { useIsPresentationTool } from '@sanity/visual-editing/react'

export function DisableDraftMode() {
  const environment = useIsPresentationTool()

    // If it's inside the Sanity Presentation iframe, do not render
    if (environment) return null

    return <div>Outside Studio Content</div>

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 bg-gray-50 px-4 py-2"
    >
      Disable Draft Mode
    </a>
  );
}
