"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerHeader } from "@/components/ui/drawer"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { FilterSidebar } from "@/components/providers/FilterSidebar"
import { LocationCardList } from "@/components/providers/LocationCardList"
import { PaginationControls } from "@/components/providers/PaginationControls"
import { GoogleMap } from "@/components/providers/GoogleMap"

// Mock types
interface Location {
  id: string
  title: string
  description?: string
  googleAddress: string
  latitude: number
  longitude: number
  categories?: string[]
  rating?: number
  reviews?: number
  price?: string
}

interface LocationsResponse {
  data: Location[]
  totalPages: number
  total: number
}

// Mock API functions
const getLocations = async (params: any): Promise<LocationsResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data
  const mockLocations: Location[] = [
    {
      id: "1",
      title: "Sydney Healthcare Center",
      description: "Comprehensive healthcare services with experienced professionals",
      googleAddress: "123 George Street, Sydney NSW 2000",
      latitude: -33.8688,
      longitude: 151.2093,
      categories: ["Healthcare", "General Practice"],
      rating: 4.8,
      reviews: 124,
      price: "$$",
    },
    {
      id: "2",
      title: "Melbourne Nursing Services",
      description: "Professional nursing care and support services",
      googleAddress: "456 Collins Street, Melbourne VIC 3000",
      latitude: -37.8136,
      longitude: 144.9631,
      categories: ["Nursing", "Home Care"],
      rating: 4.9,
      reviews: 89,
      price: "$$$",
    },
    {
      id: "3",
      title: "Brisbane Therapy Center",
      description: "Specialized therapy services and rehabilitation",
      googleAddress: "789 Queen Street, Brisbane QLD 4000",
      latitude: -27.4698,
      longitude: 153.0251,
      categories: ["Therapy", "Rehabilitation"],
      rating: 4.7,
      reviews: 156,
      price: "$$",
    },
  ]

  // Filter based on search params
  let filteredLocations = mockLocations

  if (params.search) {
    filteredLocations = filteredLocations.filter(
      (loc) =>
        loc.title.toLowerCase().includes(params.search.toLowerCase()) ||
        loc.description?.toLowerCase().includes(params.search.toLowerCase()),
    )
  }

  if (params.categories && params.categories.length > 0) {
    filteredLocations = filteredLocations.filter((loc) =>
      loc.categories?.some((cat) => params.categories.includes(cat)),
    )
  }

  if (params.city) {
    filteredLocations = filteredLocations.filter((loc) =>
      loc.googleAddress.toLowerCase().includes(params.city.toLowerCase()),
    )
  }

  return {
    data: filteredLocations,
    totalPages: Math.ceil(filteredLocations.length / (params.limit || 10)),
    total: filteredLocations.length,
  }
}

const getLocationPlaceholderImage = () => "/placeholder.svg?height=200&width=300&text=Location"

export default function ProvidersPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state from URL params
  const getInitialSearchTerm = () => searchParams.get("search") || ""
  const getInitialRegion = () => searchParams.get("region") || null

  const [initialTextValue, setInitialTextValue] = useState("")
  const [searchTerm, setSearchTerm] = useState(getInitialSearchTerm())
  const [initialTextValueForSearchTerm, setInitialTextValueForSearchTerm] = useState("")
  const [filterSearchTerm, setFilterSearchTerm] = useState(getInitialSearchTerm())
  const [clickedReset, setClickedReset] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [priceFilter, setPriceFilter] = useState<string[]>([])
  const [selectedRegion, setSelectedRegion] = useState<string | null>(getInitialRegion())
  const [sortBy, setSortBy] = useState("featured")

  // State for API data
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination state
  const currentPage = Number(searchParams.get("page") || 1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)

  // View state for mobile (list vs map)
  const [activeView, setActiveView] = useState<"list" | "map">("list")

  // State for selected location on map
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null)

  // State for mobile search input
  const [mobileSearchInput, setMobileSearchInput] = useState("")

  // State for filter drawer
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

  // Ref for search input
  const searchInputRef = useRef<HTMLInputElement>(null)

  const setCurrentPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page <= 1) {
      params.delete("page")
    } else {
      params.set("page", String(page))
    }
    router.push(`/providers?${params.toString()}`)
  }

  // Reset filters function
  const resetFilters = () => {
    router.push("/providers")
  }

  // Function to fetch locations from the API
  const fetchLocations = async () => {
    setIsLoading(true)
    setError(null)

    const newSearchTerm = searchParams.get("search") || ""
    const newRegion = searchParams.get("region") || null
    const rawCategories = searchParams.get("categories") || null
    const newCategories = rawCategories ? rawCategories.split(",") : []

    try {
      let priceFrom: number | undefined
      let priceTo: number | undefined

      const response = await getLocations({
        page: currentPage,
        limit,
        search: newSearchTerm || undefined,
        city: newRegion || undefined,
        categories: newCategories.length > 0 ? newCategories : undefined,
        priceFrom,
        priceTo,
      })

      setLocations(response.data || [])
      setTotalPages(response.totalPages || 0)
      setTotalItems(response.total || 0)
    } catch (err) {
      setError("Failed to fetch locations. Please try again later.")
      console.error("Error fetching locations:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLocations()
  }, [searchParams, currentPage])

  useEffect(() => {
    const categories = searchParams.get("categories")
    const search = searchParams.get("search")
    const region = searchParams.get("region")

    if (categories || search || region) {
      setSelectedCategory(categories ? categories.split(",") : [])
      setInitialTextValue(search || "")
      setInitialTextValueForSearchTerm(search || "")
      setSelectedRegion(region || null)
    } else {
      setSelectedCategory([])
      setInitialTextValue("")
      setInitialTextValueForSearchTerm("")
      setSelectedRegion(null)
    }
  }, [searchParams])

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  // Handle sort change
  useEffect(() => {
    if (sortBy === "rating") {
      setLocations((prev) => [...prev].sort((a, b) => (b.rating || 0) - (a.rating || 0)))
    } else if (sortBy === "reviews") {
      setLocations((prev) => [...prev].sort((a, b) => (b.reviews || 0) - (a.reviews || 0)))
    }
  }, [sortBy])

  // Convert locations to map pins
  const mapPins = useMemo(() => {
    return locations.map((loc) => ({
      lat: loc.latitude,
      lng: loc.longitude,
      address: loc.googleAddress,
      title: loc.title,
      description: loc.description || loc.categories?.join(", ") || "Service provider",
      link: `/providers/${loc.id}`,
      id: loc.id,
    }))
  }, [locations])

  // Handle address click to focus on map
  const handleAddressClick = (locationId: string) => {
    setSelectedLocationId(locationId)
    if (window.innerWidth < 768) {
      setActiveView("map")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  // Clear selected location
  const handleClearSelection = () => {
    setSelectedLocationId(null)
  }

  // On page load scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Handle mobile search
  const handleMobileSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (mobileSearchInput.trim()) {
      params.set("search", mobileSearchInput.trim())
    } else {
      params.delete("search")
    }
    router.push(`/providers?${params.toString()}`)
  }

  // Update mobile search input when URL search param changes
  useEffect(() => {
    const searchParam = searchParams.get("search")
    if (searchParam) {
      setMobileSearchInput(searchParam)
    } else {
      setMobileSearchInput("")
    }
  }, [searchParams])

  // Content component to be used in both mobile and desktop views
  const LocationContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
          <Button onClick={fetchLocations} variant="outline" className="mt-4 bg-transparent">
            Try Again
          </Button>
        </div>
      )
    }

    if (locations.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No locations found matching your criteria.</p>
          <Button onClick={resetFilters} variant="outline" className="mt-4 bg-transparent">
            Clear Filters
          </Button>
        </div>
      )
    }

    return (
      <>
        <LocationCardList
          locations={locations}
          placeholderImage={getLocationPlaceholderImage()}
          onAddressClick={handleAddressClick}
        />
        <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container pb-10 px-3 pt-2 relative">
        {/* Fixed Mobile Search and Tabs */}
        <div className="lg:hidden sticky top-[64px] z-50 bg-background pt-2 pb-3 mb-4 space-y-3">
          <Drawer open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
            <DrawerTrigger asChild>
              <div className="relative w-full cursor-pointer">
                <Input
                  type="text"
                  placeholder="Search & Filter"
                  value={mobileSearchInput}
                  readOnly
                  className="pr-10 bg-muted/40 cursor-pointer"
                  ref={searchInputRef}
                  onClick={(e) => {
                    e.preventDefault()
                    setIsFilterDrawerOpen(true)
                  }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="p-0">
                <VisuallyHidden>
                  <DrawerTitle>Search & Filters</DrawerTitle>
                </VisuallyHidden>
              </DrawerHeader>
              <div className="px-4 pb-4 max-h-[80vh] overflow-y-auto">
                <FilterSidebar
                  initialTextValue={initialTextValue}
                  setInitialTextValue={setInitialTextValue}
                  filterSearchTerm={filterSearchTerm}
                  setFilterSearchTerm={setFilterSearchTerm}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  priceFilter={priceFilter}
                  setPriceFilter={setPriceFilter}
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                  onResetFilters={() => {
                    resetFilters()
                    setIsFilterDrawerOpen(false)
                  }}
                  fetchLocation={() => {
                    fetchLocations()
                  }}
                  showTitle={false}
                />
              </div>
            </DrawerContent>
          </Drawer>

          {/* Mobile View Toggle */}
          <Tabs
            defaultValue="list"
            className="w-full md:hidden"
            value={activeView}
            onValueChange={(value) => {
              setActiveView(value as "list" | "map")
              if (value === "list") {
                setSelectedLocationId(null)
              }
            }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Mobile Views */}
          <div className="lg:hidden">
            {activeView === "list" ? (
              <div className="space-y-4 pb-4 mt-4">
                <LocationContent />
              </div>
            ) : (
              <div className="h-[calc(100vh-200px)] min-h-[500px] rounded-lg overflow-hidden border mt-4">
                <div className="relative h-full">
                  <GoogleMap
                    pins={mapPins}
                    height="100%"
                    width="100%"
                    selectedLocationId={selectedLocationId}
                    onClearSelection={handleClearSelection}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6 min-h-[calc(100vh-320px)]">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-3">
              <div className="sticky top-24 bg-card rounded-lg p-4 border">
                <FilterSidebar
                  initialTextValue={initialTextValue}
                  setInitialTextValue={setInitialTextValue}
                  filterSearchTerm={filterSearchTerm}
                  setFilterSearchTerm={setFilterSearchTerm}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  priceFilter={priceFilter}
                  setPriceFilter={setPriceFilter}
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                  onResetFilters={resetFilters}
                  fetchLocation={fetchLocations}
                  showTitle={false}
                />
              </div>
            </div>

            {/* Main Content - List */}
            <div className="lg:col-span-5 mt-4">
              <div className="space-y-4">
                <LocationContent />
              </div>
            </div>

            {/* Right Sidebar - Map */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <div className="bg-card rounded-lg border overflow-hidden">
                  <div className="h-[calc(100vh-200px)] min-h-[500px] relative">
                    <GoogleMap
                      pins={mapPins}
                      height="100%"
                      width="100%"
                      zoom={12}
                      selectedLocationId={selectedLocationId}
                      onClearSelection={handleClearSelection}
                    />
                    {selectedLocationId && (
                      <div className="absolute w-[calc(100%-110px)] bottom-4 left-4 right-4 bg-primary p-3 rounded-md shadow-md border border-muted/30 max-w-md mx-auto">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-sm text-white font-medium">
                              {locations.find((loc) => loc.id === selectedLocationId)?.title || "Selected Location"}
                            </h3>
                            <span className="text-xs text-white/90">
                              {locations.find((loc) => loc.id === selectedLocationId)?.googleAddress ||
                                "Address not available"}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearSelection}
                            className="h-8 w-8 p-0 text-white hover:bg-white/20"
                          >
                            <span className="sr-only">Clear selection</span>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
