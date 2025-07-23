"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CategoryDropdown from "@/components/search/CategoryDropdown";
import PlaceAutoComplete from "@/components/search/PlaceAutoComplete";
import './globals.css'
// Mock location data
interface Location {
  id: string;
  title: string;
  description: string;
  location: string;
  categories: string[];
  claimStatus: string;
  gallery: string[];
}

export interface SelectedPlace {
  main_text: string | null;
  secondary_text: string | null;
  description: string | null;
  place_id: string | null;
  lat: string | null;
  lng: string | null;
}

const mockLocations: Location[] = [
  {
    id: "1",
    title: "Sydney Healthcare Center",
    description:
      "Comprehensive healthcare services with experienced professionals providing quality medical care for all ages.",
    location: "Sydney, NSW",
    categories: ["Healthcare", "General Practice"],
    claimStatus: "4.8",
    gallery: [
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=800",
    ],
  },
  {
    id: "2",
    title: "Melbourne Nursing Services",
    description:
      "Professional nursing care and support services for patients in their homes and healthcare facilities.",
    location: "Melbourne, VIC",
    categories: ["Nursing", "Home Care"],
    claimStatus: "4.9",
    gallery: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800",
    ],
  },
  {
    id: "3",
    title: "Brisbane Therapy Center",
    description:
      "Specialized therapy services including physiotherapy, occupational therapy, and rehabilitation programs.",
    location: "Brisbane, QLD",
    categories: ["Therapy", "Rehabilitation"],
    claimStatus: "4.7",
    gallery: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800",
    ],
  },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [featuredLocations, setFeaturedLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(
    null
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [initialTextValue, setInitialTextValue] = useState("");

  const placeholderImage =
    "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=800";

  // Simulate fetching featured locations
  useEffect(() => {
    const fetchFeaturedLocations = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setFeaturedLocations(mockLocations);
      } catch (error) {
        console.error("Error fetching featured locations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedLocations();
  }, []);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    if (selectedPlace?.description?.length) {
      console.log("selectedPlace", selectedPlace);
      searchParams.append("search", selectedPlace.description);
    }

    if (selectedCategories?.length) {
      searchParams.set("categories", selectedCategories.join(","));
    }

    if (selectedRegion) {
      searchParams.append("region", selectedRegion);
    }

    const queryString = searchParams.toString();
    const url = queryString ? `/providers?${queryString}` : "/providers";

    // For now, just log the URL since we don't have a providers page
    console.log("Navigating to:", url);
  };

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Support Services with Location Search */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 space-y-16 sm:space-y-32">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="relative bg-[#FDE1D3]/80 p-4 sm:p-8 lg:p-16">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                  <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
                    Find Your Ideal Support Services
                  </h3>
                  <p className="text-lg sm:text-xl text-primary-foreground/85 mb-6">
                    Discover prime locations with comprehensive data to help you
                    make informed decisions.
                  </p>

                  {/* Search Box */}
                  <div className="bg-white p-3 rounded-lg shadow-lg flex flex-col md:flex-row gap-2 mt-8">
                    <div className="relative flex-grow">
                      <CategoryDropdown
                        selectedItems={selectedCategories}
                        setSelectedItems={setSelectedCategories}
                      />
                    </div>
                    <div className="relative flex-grow">
                      <PlaceAutoComplete
                        searchType={["(cities)"]}
                        setselectedplace={setSelectedPlace}
                        placeholder="Search places"
                        setInitialTextValue={setInitialTextValue}
                      />
                    </div>

                    <Button
                      className="py-3 px-6"
                      onClick={() => {
                        let searchParams = new URLSearchParams();

                        if (selectedPlace?.description?.length) {
                          console.log("selectedPlace", selectedPlace);
                          searchParams.append(
                            "search",
                            selectedPlace.description
                          );
                        }

                        selectedCategories?.length &&
                          searchParams.set(
                            "categories",
                            selectedCategories.join(",")
                          );

                        if (selectedRegion) {
                          searchParams.append("region", selectedRegion);
                        }

                        const queryString = searchParams.toString();
                        if (queryString) {
                          // navigate(`/providers?${queryString}`);
                        } else {
                          // navigate("/providers");
                        }
                      }}
                    >
                      Search
                    </Button>
                  </div>
                </div>

                {/* Featured Locations */}
                <div className="mt-12 sm:mt-16">
                  <h4 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-6 text-center">
                    Featured Providers
                  </h4>

                  {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {featuredLocations && featuredLocations.length > 0 ? (
                        featuredLocations.map((location) => (
                          <div
                            key={location.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                          >
                            <div className="h-40 overflow-hidden">
                              <Image
                                src={
                                  location.gallery &&
                                  location.gallery.length > 0
                                    ? location.gallery[0]
                                    : placeholderImage
                                }
                                alt={location.title}
                                width={400}
                                height={160}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-4">
                              <div className="flex items-center justify-between space-x-1 mb-2">
                                {location.categories &&
                                  location.categories.length > 0 && (
                                    <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                                      {location.categories[0]}
                                    </span>
                                  )}
                                <div className="flex items-center ml-2">
                                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                                  <span className="text-xs ml-1">
                                    {location.claimStatus}
                                  </span>
                                </div>
                              </div>
                              <h3 className="text-lg font-bold mb-2">
                                {location.title}
                              </h3>
                              <div className="flex items-center text-muted-foreground mb-2">
                                <MapPin className="h-4 w-4 flex-shrink-0 mr-1" />
                                <span className="text-sm truncate">
                                  {location.location}
                                </span>
                              </div>
                              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                                {location.description &&
                                location.description.length > 80
                                  ? `${location.description.substring(
                                      0,
                                      80
                                    )}...`
                                  : location.description}
                              </p>
                              <Link
                                href={`/providers/${location.id}`}
                                className="text-primary hover:text-primary/80 font-medium flex items-center text-sm mt-2"
                              >
                                View Details
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-3 text-center py-8">
                          <p>No featured locations available at the moment.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Show all button */}
                  <div className="flex justify-center mt-8">
                    <Button asChild>
                      <Link
                        href="/providers"
                        className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-base sm:text-lg"
                      >
                        View All Providers
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services section */}
      <ServicesSection />
    </div>
  );
}
