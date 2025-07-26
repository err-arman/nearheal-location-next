"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X, Search } from "lucide-react"
import PlaceAutoComplete, { type SelectedPlace } from "@/components/search/PlaceAutoComplete"

interface FilterSidebarProps {
  initialTextValue: string
  setInitialTextValue: (value: string) => void
  filterSearchTerm: string
  setFilterSearchTerm: (value: string) => void
  selectedCategory: string[]
  setSelectedCategory: (categories: string[]) => void
  priceFilter: string[]
  setPriceFilter: (prices: string[]) => void
  selectedRegion: string | null
  setSelectedRegion: (region: string | null) => void
  onResetFilters: () => void
  fetchLocation: () => void
  showTitle?: boolean
}

const categories = [
  "Healthcare",
  "Nursing",
  "Therapy",
  "Mental Health",
  "Aged Care",
  "Disability Support",
  "Home Care",
  "Medical Equipment",
  "Pharmacy",
  "Dental",
]

const priceRanges = [
  { label: "$ - Budget Friendly", value: "$" },
  { label: "$$ - Moderate", value: "$$" },
  { label: "$$$ - Premium", value: "$$$" },
  { label: "$$$$ - Luxury", value: "$$$$" },
]

export function FilterSidebar({
  initialTextValue,
  setInitialTextValue,
  filterSearchTerm,
  setFilterSearchTerm,
  selectedCategory,
  setSelectedCategory,
  priceFilter,
  setPriceFilter,
  selectedRegion,
  setSelectedRegion,
  onResetFilters,
  fetchLocation,
  showTitle = true,
}: FilterSidebarProps) {
  const [searchInput, setSearchInput] = useState(filterSearchTerm)

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategory([...selectedCategory, category])
    } else {
      setSelectedCategory(selectedCategory.filter((c) => c !== category))
    }
  }

  const handlePriceChange = (price: string, checked: boolean) => {
    if (checked) {
      setPriceFilter([...priceFilter, price])
    } else {
      setPriceFilter(priceFilter.filter((p) => p !== price))
    }
  }

  const handlePlaceSelect = (place: SelectedPlace | null) => {
    if (place) {
      setSelectedRegion(place.description)
    } else {
      setSelectedRegion(null)
    }
  }

  const handleSearch = () => {
    setFilterSearchTerm(searchInput)
    fetchLocation()
  }

  const clearAllFilters = () => {
    setSearchInput("")
    setFilterSearchTerm("")
    setSelectedCategory([])
    setPriceFilter([])
    setSelectedRegion(null)
    onResetFilters()
  }

  const hasActiveFilters = selectedCategory.length > 0 || priceFilter.length > 0 || selectedRegion || filterSearchTerm

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
        </div>
      )}

      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Input
            id="search"
            placeholder="Search providers..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button size="sm" className="absolute right-1 top-1 h-8 w-8 p-0" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Location */}
      <div className="space-y-2">
        <Label>Location</Label>
        <PlaceAutoComplete
          setselectedplace={handlePlaceSelect}
          placeholder="Search location..."
          setInitialTextValue={setInitialTextValue}
        />
        {selectedRegion && (
          <Badge variant="secondary" className="mt-2">
            {selectedRegion}
            <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => setSelectedRegion(null)}>
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <Label>Categories</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategory.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <Label htmlFor={category} className="text-sm font-normal cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
        {selectedCategory.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {selectedCategory.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handleCategoryChange(category, false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <Label>Price Range</Label>
        <div className="space-y-2">
          {priceRanges.map((price) => (
            <div key={price.value} className="flex items-center space-x-2">
              <Checkbox
                id={price.value}
                checked={priceFilter.includes(price.value)}
                onCheckedChange={(checked) => handlePriceChange(price.value, checked as boolean)}
              />
              <Label htmlFor={price.value} className="text-sm font-normal cursor-pointer">
                {price.label}
              </Label>
            </div>
          ))}
        </div>
        {priceFilter.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {priceFilter.map((price) => (
              <Badge key={price} variant="secondary">
                {price}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handlePriceChange(price, false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Apply Filters Button */}
      <Button onClick={fetchLocation} className="w-full">
        Apply Filters
      </Button>
    </div>
  )
}
