"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Copy, Download, Eye, Search, Trash2, Upload } from "lucide-react"
import Image from "next/image"

// Sample media items
const mediaItems = [
  {
    id: 1,
    name: "hero-image-1.jpg",
    url: "/placeholder.svg?height=600&width=1200",
    type: "image",
    size: "245 KB",
    dimensions: "1200 x 600",
    uploadedAt: "April 15, 2025",
  },
  {
    id: 2,
    name: "about-team.jpg",
    url: "/placeholder.svg?height=800&width=1200",
    type: "image",
    size: "320 KB",
    dimensions: "1200 x 800",
    uploadedAt: "April 10, 2025",
  },
  {
    id: 3,
    name: "training-workshop.jpg",
    url: "/placeholder.svg?height=600&width=900",
    type: "image",
    size: "180 KB",
    dimensions: "900 x 600",
    uploadedAt: "April 5, 2025",
  },
  {
    id: 4,
    name: "consulting-session.jpg",
    url: "/placeholder.svg?height=600&width=900",
    type: "image",
    size: "210 KB",
    dimensions: "900 x 600",
    uploadedAt: "March 28, 2025",
  },
  {
    id: 5,
    name: "company-profile.pdf",
    url: "/company-profile.pdf",
    type: "document",
    size: "1.2 MB",
    dimensions: "-",
    uploadedAt: "March 20, 2025",
  },
  {
    id: 6,
    name: "leadership-ebook.pdf",
    url: "/leadership-ebook.pdf",
    type: "document",
    size: "3.5 MB",
    dimensions: "-",
    uploadedAt: "March 15, 2025",
  },
  {
    id: 7,
    name: "logo.png",
    url: "/placeholder.svg?height=200&width=200",
    type: "image",
    size: "45 KB",
    dimensions: "200 x 200",
    uploadedAt: "March 10, 2025",
  },
  {
    id: 8,
    name: "training-certificate.pdf",
    url: "/training-certificate.pdf",
    type: "document",
    size: "420 KB",
    dimensions: "-",
    uploadedAt: "March 5, 2025",
  },
]

export default function MediaPage() {
  const [media, setMedia] = useState(mediaItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  // Filter media based on search term and active tab
  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || item.type === activeTab
    return matchesSearch && matchesTab
  })

  const handleDeleteMedia = (id: number) => {
    setMedia(media.filter((item) => item.id !== id))
    if (selectedMedia === id) {
      setSelectedMedia(null)
    }
    toast({
      title: "Media Deleted",
      description: "The media item has been deleted successfully.",
    })
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "URL Copied",
      description: "The media URL has been copied to clipboard.",
    })
  }

  const selectedItem = selectedMedia ? media.find((item) => item.id === selectedMedia) : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
        <Button className="bg-brand-blue hover:bg-brand-blue/90">
          <Upload className="mr-2 h-4 w-4" />
          Upload New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Media Files</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search media..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <CardDescription>Manage your images, documents, and other media files</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Media</TabsTrigger>
                  <TabsTrigger value="image">Images</TabsTrigger>
                  <TabsTrigger value="document">Documents</TabsTrigger>
                </TabsList>

                {filteredMedia.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                      <Search className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No media found</h3>
                    <p>Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filteredMedia.map((item) => (
                      <div
                        key={item.id}
                        className={`group relative rounded-md border overflow-hidden cursor-pointer transition-all ${
                          selectedMedia === item.id ? "ring-2 ring-brand-blue" : ""
                        }`}
                        onClick={() => setSelectedMedia(item.id)}
                      >
                        {item.type === "image" ? (
                          <div className="aspect-square relative">
                            <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="aspect-square bg-muted flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-10 w-10 text-muted-foreground"
                            >
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                          </div>
                        )}
                        <div className="p-2 text-xs truncate">{item.name}</div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCopyUrl(item.url)
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteMedia(item.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredMedia.length} of {media.length} items
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Media Details</CardTitle>
              <CardDescription>
                {selectedItem ? "View and edit media information" : "Select a media item to view details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedItem ? (
                <div className="space-y-6">
                  {selectedItem.type === "image" ? (
                    <div className="aspect-video relative rounded-md overflow-hidden border">
                      <Image
                        src={selectedItem.url || "/placeholder.svg"}
                        alt={selectedItem.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center border">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-16 w-16 text-muted-foreground"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">File Name</label>
                      <Input value={selectedItem.name} className="mt-1" />
                    </div>

                    <div>
                      <label className="text-sm font-medium">URL</label>
                      <div className="flex mt-1">
                        <Input value={selectedItem.url} readOnly className="rounded-r-none" />
                        <Button
                          variant="secondary"
                          className="rounded-l-none"
                          onClick={() => handleCopyUrl(selectedItem.url)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Type</label>
                        <div className="mt-1 text-sm">{selectedItem.type}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Size</label>
                        <div className="mt-1 text-sm">{selectedItem.size}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Dimensions</label>
                        <div className="mt-1 text-sm">{selectedItem.dimensions}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Uploaded</label>
                        <div className="mt-1 text-sm">{selectedItem.uploadedAt}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No media selected</h3>
                  <p>Select a media item to view its details</p>
                </div>
              )}
            </CardContent>
            {selectedItem && (
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="w-full" asChild>
                  <a href={selectedItem.url} download target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
                <Button
                  variant="destructive"
                  className="w-full ml-2"
                  onClick={() => handleDeleteMedia(selectedItem.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
