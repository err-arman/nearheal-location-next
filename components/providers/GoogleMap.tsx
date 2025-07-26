"use client"

import { useEffect, useRef } from "react"

interface MapPin {
  lat: number
  lng: number
  address: string
  title: string
  description: string
  link: string
  id: string
}

interface GoogleMapProps {
  pins: MapPin[]
  height?: string
  width?: string
  zoom?: number
  selectedLocationId?: string | null
  onClearSelection?: () => void
}

export function GoogleMap({
  pins,
  height = "400px",
  width = "100%",
  zoom = 10,
  selectedLocationId,
  onClearSelection,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mock Google Maps implementation
    // In a real app, you would initialize Google Maps here
    console.log("Google Maps would be initialized here with pins:", pins)
    console.log("Selected location:", selectedLocationId)
  }, [pins, selectedLocationId])

  return (
    <div
      ref={mapRef}
      style={{ height, width }}
      className="bg-gray-200 rounded-lg flex items-center justify-center relative"
    >
      <div className="text-center text-gray-500">
        <div className="text-lg font-medium mb-2">Interactive Map</div>
        <div className="text-sm">
          {pins.length} location{pins.length !== 1 ? "s" : ""} found
        </div>
        {selectedLocationId && (
          <div className="mt-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
            Location selected: {pins.find((p) => p.id === selectedLocationId)?.title}
          </div>
        )}
      </div>
    </div>
  )
}
