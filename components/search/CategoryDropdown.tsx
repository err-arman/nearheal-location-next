"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, X } from "lucide-react"

interface CategoryDropdownProps {
  selectedItems: string[]
  setSelectedItems: (items: string[]) => void
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

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ selectedItems, setSelectedItems }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCategoryToggle = (category: string) => {
    if (selectedItems.includes(category)) {
      setSelectedItems(selectedItems.filter((item) => item !== category))
    } else {
      setSelectedItems([...selectedItems, category])
    }
  }

  const removeCategory = (category: string) => {
    setSelectedItems(selectedItems.filter((item) => item !== category))
  }

  return (
    <div className="w-full">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between h-12 px-4 bg-transparent">
            <div className="flex flex-wrap gap-1 flex-1 mr-2">
              {selectedItems.length === 0 ? (
                <span className="text-muted-foreground">Select categories</span>
              ) : (
                selectedItems.slice(0, 2).map((item) => (
                  <Badge key={item} variant="secondary" className="text-xs">
                    {item}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeCategory(item)
                      }}
                      className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
              {selectedItems.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{selectedItems.length - 2} more
                </Badge>
              )}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[200px]" align="start">
          {categories.map((category) => (
            <DropdownMenuItem key={category} onClick={() => handleCategoryToggle(category)} className="cursor-pointer">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(category)}
                  onChange={() => {}}
                  className="rounded"
                />
                <span>{category}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default CategoryDropdown
