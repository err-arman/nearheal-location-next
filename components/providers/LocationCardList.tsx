"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Phone, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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

interface LocationCardListProps {
  locations: Location[]
  placeholderImage: string
  onAddressClick: (locationId: string) => void
}

export function LocationCardList({ locations, placeholderImage, onAddressClick }: LocationCardListProps) {
  return (
    <div className="space-y-4">
      {locations.map((location) => (
        <Card key={location.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Image */}
              <div className="md:col-span-1">
                <div className="relative h-48 md:h-full min-h-[200px]">
                  <Image
                    src={placeholderImage || "/placeholder.svg"}
                    alt={location.title}
                    fill
                    className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                  {location.price && (
                    <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">{location.price}</Badge>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-2 p-4 md:p-6">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{location.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        {location.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{location.rating}</span>
                            {location.reviews && <span>({location.reviews} reviews)</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  {location.categories && location.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {location.categories.slice(0, 3).map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                      {location.categories.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{location.categories.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  {location.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{location.description}</p>
                  )}

                  {/* Address */}
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <button
                      onClick={() => onAddressClick(location.id)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                    >
                      {location.googleAddress}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                    <Button asChild className="flex-1">
                      <Link href={`/providers/${location.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
