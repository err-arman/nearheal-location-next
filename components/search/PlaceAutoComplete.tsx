"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { MapPin } from "lucide-react"

export interface SelectedPlace {
  main_text: string | null
  secondary_text: string | null
  description: string | null
  place_id: string | null
  lat: string | null
  lng: string | null
}

interface PlaceAutoCompleteProps {
  searchType?: string[]
  setselectedplace: (place: SelectedPlace | null) => void
  placeholder?: string
  setInitialTextValue: (value: string) => void
}

// Mock places data for demonstration
const mockPlaces = [
  {
    main_text: "Sydney",
    secondary_text: "NSW, Australia",
    description: "Sydney, NSW, Australia",
    place_id: "ChIJP3Sa8ziYEmsRUKgyFmh9AQM",
    lat: "-33.8688",
    lng: "151.2093",
  },
  {
    main_text: "Melbourne",
    secondary_text: "VIC, Australia",
    description: "Melbourne, VIC, Australia",
    place_id: "ChIJ90260rVG1moRkM2MIXVWBAQ",
    lat: "-37.8136",
    lng: "144.9631",
  },
  {
    main_text: "Brisbane",
    secondary_text: "QLD, Australia",
    description: "Brisbane, QLD, Australia",
    place_id: "ChIJW7XvXlJakWsRMNVkTCbTkbg",
    lat: "-27.4698",
    lng: "153.0251",
  },
  {
    main_text: "Perth",
    secondary_text: "WA, Australia",
    description: "Perth, WA, Australia",
    place_id: "ChIJoQ8Q6NNMmisRkNgHFUkDlkI",
    lat: "-31.9505",
    lng: "115.8605",
  },
  {
    main_text: "Adelaide",
    secondary_text: "SA, Australia",
    description: "Adelaide, SA, Australia",
    place_id: "ChIJsU7_xgfKsGoRUeVpCQHlb9g",
    lat: "-34.9285",
    lng: "138.6007",
  },
]

const PlaceAutoComplete: React.FC<PlaceAutoCompleteProps> = ({
  searchType = ["(cities)"],
  setselectedplace,
  placeholder = "Search places",
  setInitialTextValue,
}) => {
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState<SelectedPlace[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = mockPlaces.filter((place) => place.description.toLowerCase().includes(inputValue.toLowerCase()))
      setSuggestions(filtered)
      setIsOpen(true)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [inputValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setInitialTextValue(value)
  }

  const handlePlaceSelect = (place: SelectedPlace) => {
    setInputValue(place.description || "")
    setselectedplace(place)
    setIsOpen(false)
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setIsOpen(true)
    }
  }

  const handleInputBlur = () => {
    // Delay closing to allow for click events on suggestions
    setTimeout(() => setIsOpen(false), 200)
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="pl-10 h-12"
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((place, index) => (
            <button
              key={`${place.place_id}-${index}`}
              onClick={() => handlePlaceSelect(place)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center space-x-3"
            >
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{place.main_text}</div>
                <div className="text-xs text-muted-foreground truncate">{place.secondary_text}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default PlaceAutoComplete
