"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Edit, Eye, Grip, Plus, Save, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Define the schema for a navigation item
const navItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  href: z.string().optional(),
  isExternal: z.boolean().default(false),
  openInNewTab: z.boolean().default(false),
  parentId: z.string().optional(),
  order: z.number().default(0),
  isVisible: z.boolean().default(true),
})

// Sample navigation data
const initialNavItems = [
  {
    id: "home",
    title: "Home",
    href: "/",
    parentId: null,
    order: 0,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "about",
    title: "About Us",
    href: "/about",
    parentId: null,
    order: 1,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "about-story",
    title: "Our Story",
    href: "/about#story",
    parentId: "about",
    order: 0,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "about-team",
    title: "Our Team",
    href: "/about#team",
    parentId: "about",
    order: 1,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "about-values",
    title: "Our Values",
    href: "/about#values",
    parentId: "about",
    order: 2,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "training",
    title: "Training",
    href: "/training",
    parentId: null,
    order: 2,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "training-leadership",
    title: "Leadership Development",
    href: "/training/leadership",
    parentId: "training",
    order: 0,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "training-capacity",
    title: "Capacity Building Programs",
    href: "/training#capacity-building",
    parentId: "training",
    order: 1,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "training-customized",
    title: "Customized Training",
    href: "/training#customized",
    parentId: "training",
    order: 2,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "training-women-youth",
    title: "Women and Youth Programs",
    href: "/training#women-youth",
    parentId: "training",
    order: 3,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "executive-training",
    title: "Executive Training",
    href: "/executive-training",
    parentId: null,
    order: 3,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "executive-ceo",
    title: "CEO Professional Development",
    href: "/executive-training/ceo-development",
    parentId: "executive-training",
    order: 0,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "executive-ceo-strategic",
    title: "Strategic Leadership",
    href: "/executive-training/ceo-development/strategic-leadership",
    parentId: "executive-ceo",
    order: 0,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "executive-ceo-decision",
    title: "Executive Decision Making",
    href: "/executive-training/ceo-development/decision-making",
    parentId: "executive-ceo",
    order: 1,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "consulting",
    title: "Consulting",
    href: "/consulting",
    parentId: null,
    order: 4,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "consulting-strategic",
    title: "Strategic Planning",
    href: "/consulting/strategic-planning",
    parentId: "consulting",
    order: 0,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "consulting-org",
    title: "Organizational Development",
    href: "/consulting#organizational-development",
    parentId: "consulting",
    order: 1,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "consulting-performance",
    title: "Performance Improvement",
    href: "/consulting#performance-improvement",
    parentId: "consulting",
    order: 2,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "consulting-data",
    title: "Data Analytics",
    href: "/consulting#data-analytics",
    parentId: "consulting",
    order: 3,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "calendar",
    title: "Training Calendar",
    href: "/training-calendar",
    parentId: null,
    order: 5,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "blog",
    title: "Blog",
    href: "/blog",
    parentId: null,
    order: 6,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
  {
    id: "contact",
    title: "Contact",
    href: "/contact",
    parentId: null,
    order: 7,
    isVisible: true,
    isExternal: false,
    openInNewTab: false,
  },
]

export default function NavigationPage() {
  const [navItems, setNavItems] = useState(initialNavItems)
  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof navItemSchema>>({
    resolver: zodResolver(navItemSchema),
    defaultValues: {
      title: "",
      href: "",
      isExternal: false,
      openInNewTab: false,
      parentId: undefined,
      order: 0,
      isVisible: true,
    },
  })

  // Get top-level items
  const topLevelItems = navItems.filter((item) => !item.parentId).sort((a, b) => a.order - b.order)

  // Get children for a parent
  const getChildren = (parentId: string) => {
    return navItems.filter((item) => item.parentId === parentId).sort((a, b) => a.order - b.order)
  }

  // Handle drag and drop
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // Handle reordering within the same parent
    if (destination.droppableId === source.droppableId) {
      const parentId = destination.droppableId === "main" ? null : destination.droppableId
      const itemsToReorder = navItems.filter((item) => item.parentId === parentId).sort((a, b) => a.order - b.order)

      const newItems = [...navItems]
      const movedItem = newItems.find((item) => item.id === draggableId)

      if (movedItem) {
        // Remove the item from its current position
        const newItemsToReorder = itemsToReorder.filter((item) => item.id !== draggableId)

        // Insert the item at the new position
        newItemsToReorder.splice(destination.index, 0, movedItem)

        // Update the order of all items
        newItemsToReorder.forEach((item, index) => {
          const itemIndex = newItems.findIndex((i) => i.id === item.id)
          if (itemIndex !== -1) {
            newItems[itemIndex] = { ...newItems[itemIndex], order: index }
          }
        })

        setNavItems(newItems)
      }
    } else {
      // Handle moving between different parents
      const newItems = [...navItems]
      const movedItem = newItems.find((item) => item.id === draggableId)

      if (movedItem) {
        const newParentId = destination.droppableId === "main" ? null : destination.droppableId
        const sourceItems = navItems
          .filter((item) => item.parentId === (source.droppableId === "main" ? null : source.droppableId))
          .sort((a, b) => a.order - b.order)
        const destItems = navItems.filter((item) => item.parentId === newParentId).sort((a, b) => a.order - b.order)

        // Remove from source
        const newSourceItems = sourceItems.filter((item) => item.id !== draggableId)

        // Add to destination
        const newDestItems = [...destItems]
        newDestItems.splice(destination.index, 0, { ...movedItem, parentId: newParentId })

        // Update orders
        newSourceItems.forEach((item, index) => {
          const itemIndex = newItems.findIndex((i) => i.id === item.id)
          if (itemIndex !== -1) {
            newItems[itemIndex] = { ...newItems[itemIndex], order: index }
          }
        })

        newDestItems.forEach((item, index) => {
          const itemIndex = newItems.findIndex((i) => i.id === item.id)
          if (itemIndex !== -1) {
            newItems[itemIndex] = { ...newItems[itemIndex], order: index, parentId: newParentId }
          }
        })

        setNavItems(newItems)
      }
    }
  }

  const handleAddItem = () => {
    setEditingItem(null)
    form.reset({
      title: "",
      href: "",
      isExternal: false,
      openInNewTab: false,
      parentId: undefined,
      order: 0,
      isVisible: true,
    })
    setIsAddDialogOpen(true)
  }

  const handleEditItem = (item: any) => {
    setEditingItem(item)
    form.reset({
      title: item.title,
      href: item.href || "",
      isExternal: item.isExternal,
      openInNewTab: item.openInNewTab,
      parentId: item.parentId,
      order: item.order,
      isVisible: item.isVisible,
    })
    setIsEditDialogOpen(true)
  }

  const handleDeleteItem = (itemId: string) => {
    // Check if item has children
    const hasChildren = navItems.some((item) => item.parentId === itemId)

    if (hasChildren) {
      toast({
        title: "Cannot Delete Item",
        description: "This item has child items. Please delete or move the children first.",
        variant: "destructive",
      })
      return
    }

    setNavItems(navItems.filter((item) => item.id !== itemId))
    toast({
      title: "Item Deleted",
      description: "The navigation item has been deleted successfully.",
    })
  }

  const onSubmit = async (values: z.infer<typeof navItemSchema>) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (editingItem) {
      // Update existing item
      setNavItems(navItems.map((item) => (item.id === editingItem.id ? { ...item, ...values } : item)))
      toast({
        title: "Item Updated",
        description: "The navigation item has been updated successfully.",
      })
      setIsEditDialogOpen(false)
    } else {
      // Add new item
      const newId = `nav-${Date.now()}`
      const parentItems = values.parentId
        ? navItems.filter((item) => item.parentId === values.parentId)
        : navItems.filter((item) => !item.parentId)

      setNavItems([
        ...navItems,
        {
          id: newId,
          title: values.title,
          href: values.href || "#",
          isExternal: values.isExternal,
          openInNewTab: values.openInNewTab,
          parentId: values.parentId || null,
          order: parentItems.length,
          isVisible: values.isVisible,
        },
      ])
      toast({
        title: "Item Added",
        description: "The navigation item has been added successfully.",
      })
      setIsAddDialogOpen(false)
    }

    setIsSubmitting(false)
  }

  const saveNavigation = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Navigation Saved",
      description: "The navigation structure has been saved successfully.",
    })

    setIsSubmitting(false)
  }

  // Render a navigation item
  const renderNavItem = (item: any, level = 0) => {
    const children = getChildren(item.id)
    const hasChildren = children.length > 0

    return (
      <div key={item.id} className="mb-2">
        <div className={`flex items-center gap-2 p-2 rounded-md border ${!item.isVisible ? "opacity-50" : ""}`}>
          <Grip className="h-4 w-4 text-muted-foreground cursor-move" />
          <div className="ml-2 flex-1">
            <div className="font-medium">{item.title}</div>
            <div className="text-xs text-muted-foreground">{item.href}</div>
          </div>
          <div className="flex items-center gap-1">
            {item.isExternal && <span className="text-xs bg-muted px-1.5 py-0.5 rounded">External</span>}
            {!item.isVisible && <span className="text-xs bg-muted px-1.5 py-0.5 rounded">Hidden</span>}
            <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>

        {hasChildren && (
          <div className="ml-6 mt-2 pl-2 border-l">{children.map((child) => renderNavItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  // Render a draggable navigation item
  const renderDraggableNavItem = (item: any, index: number) => {
    const children = getChildren(item.id)
    const hasChildren = children.length > 0

    return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-2">
            <div className={`flex items-center gap-2 p-2 rounded-md border ${!item.isVisible ? "opacity-50" : ""}`}>
              <Grip className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="ml-2 flex-1 min-w-0">
                <div className="font-medium truncate">{item.title}</div>
                <div className="text-xs text-muted-foreground truncate">{item.href}</div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {item.isExternal && <span className="text-xs bg-muted px-1.5 py-0.5 rounded">External</span>}
                {!item.isVisible && <span className="text-xs bg-muted px-1.5 py-0.5 rounded">Hidden</span>}
                <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>

            {hasChildren && (
              <Droppable droppableId={item.id} type="nav-item">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="ml-6 mt-2 pl-2 border-l">
                    {children.map((child, childIndex) => renderDraggableNavItem(child, childIndex))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </div>
        )}
      </Draggable>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Navigation Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/" target="_blank">
              <Eye className="h-4 w-4" />
              Preview Site
            </Link>
          </Button>
          <Button
            className="gap-2 bg-brand-blue hover:bg-brand-blue/90"
            onClick={saveNavigation}
            disabled={isSubmitting}
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Navigation"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Navigation Structure</CardTitle>
              <CardDescription>Manage your website's navigation menu structure</CardDescription>
            </div>
            <Button className="gap-2" onClick={handleAddItem}>
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="main" type="nav-item">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                  {topLevelItems.map((item, index) => renderDraggableNavItem(item, index))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Drag and drop items to reorder or change their hierarchy. Click the edit icon to modify item properties.
          </p>
        </CardFooter>
      </Card>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Navigation Item</DialogTitle>
            <DialogDescription>
              Create a new navigation menu item. You can add it as a top-level item or as a child of an existing item.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="About Us" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="href"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="/about" {...field} />
                    </FormControl>
                    <FormDescription>Leave empty for items that only serve as dropdown parents.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Item</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="None (Top Level)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None (Top Level)</SelectItem>
                        {navItems
                          .filter((item) => !item.parentId)
                          .map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select a parent item to create a dropdown menu item.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isExternal"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>External Link</FormLabel>
                        <FormDescription>Link to an external website</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="openInNewTab"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Open in New Tab</FormLabel>
                        <FormDescription>Open link in a new browser tab</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isVisible"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Visible</FormLabel>
                      <FormDescription>Show this item in the navigation menu</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Item"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Navigation Item</DialogTitle>
            <DialogDescription>Modify the properties of this navigation menu item.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="About Us" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="href"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="/about" {...field} />
                    </FormControl>
                    <FormDescription>Leave empty for items that only serve as dropdown parents.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Item</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || "none"}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="None (Top Level)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None (Top Level)</SelectItem>
                        {navItems
                          .filter((item) => !item.parentId && item.id !== editingItem?.id)
                          .map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select a parent item to create a dropdown menu item.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isExternal"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>External Link</FormLabel>
                        <FormDescription>Link to an external website</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="openInNewTab"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Open in New Tab</FormLabel>
                        <FormDescription>Open link in a new browser tab</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isVisible"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Visible</FormLabel>
                      <FormDescription>Show this item in the navigation menu</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

function Link({ href, children, ...props }: LinkProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}
