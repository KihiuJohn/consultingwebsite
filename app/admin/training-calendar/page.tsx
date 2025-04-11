"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Check, Clock, Edit, MapPin, Plus, Search, Trash2, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const trainingFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  startTime: z.string().min(1, {
    message: "Start time is required.",
  }),
  endTime: z.string().min(1, {
    message: "End time is required.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  capacity: z.string().min(1, {
    message: "Capacity is required.",
  }),
  trainer: z.string().min(3, {
    message: "Trainer name must be at least 3 characters.",
  }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  isOnline: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  registrationLink: z.string().url().optional().or(z.literal("")),
})

// Sample training events
const trainingEvents = [
  {
    id: 1,
    title: "Leadership Development Workshop",
    description:
      "A comprehensive workshop focusing on leadership skills, team management, and effective communication strategies.",
    date: new Date(2025, 3, 15),
    startTime: "09:00",
    endTime: "17:00",
    location: "Nairobi, Kenya",
    capacity: "30",
    trainer: "Dr. James Wilson",
    category: "Leadership",
    isOnline: false,
    isPublished: true,
    registrationLink: "https://example.com/register/leadership",
    registrations: 18,
  },
  {
    id: 2,
    title: "Data Analysis Masterclass",
    description: "Learn advanced data analysis techniques using modern tools and methodologies.",
    date: new Date(2025, 3, 22),
    startTime: "10:00",
    endTime: "16:00",
    location: "Virtual",
    capacity: "50",
    trainer: "Sarah Johnson",
    category: "Data Analytics",
    isOnline: true,
    isPublished: true,
    registrationLink: "https://example.com/register/data-analysis",
    registrations: 32,
  },
  {
    id: 3,
    title: "Strategic Management Seminar",
    description: "A seminar focused on strategic planning, business development, and organizational growth.",
    date: new Date(2025, 4, 5),
    startTime: "09:30",
    endTime: "15:30",
    location: "Kigali, Rwanda",
    capacity: "25",
    trainer: "Michael Brown",
    category: "Management",
    isOnline: false,
    isPublished: true,
    registrationLink: "https://example.com/register/strategic-management",
    registrations: 12,
  },
  {
    id: 4,
    title: "Digital Marketing Workshop",
    description:
      "Comprehensive training on digital marketing strategies, social media management, and online advertising.",
    date: new Date(2025, 4, 12),
    startTime: "10:00",
    endTime: "16:00",
    location: "Virtual",
    capacity: "40",
    trainer: "Emily Davis",
    category: "Marketing",
    isOnline: true,
    isPublished: false,
    registrationLink: "https://example.com/register/digital-marketing",
    registrations: 0,
  },
  {
    id: 5,
    title: "Project Management Professional (PMP) Preparation",
    description: "Intensive training program to prepare participants for the PMP certification exam.",
    date: new Date(2025, 4, 19),
    startTime: "09:00",
    endTime: "17:00",
    location: "Nairobi, Kenya",
    capacity: "20",
    trainer: "Robert Johnson",
    category: "Project Management",
    isOnline: false,
    isPublished: true,
    registrationLink: "https://example.com/register/pmp-prep",
    registrations: 15,
  },
]

export default function TrainingCalendarPage() {
  const [events, setEvents] = useState(trainingEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [isEditEventOpen, setIsEditEventOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<(typeof trainingEvents)[0] | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Filter events based on search term
  const filteredEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.trainer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const form = useForm<z.infer<typeof trainingFormSchema>>({
    resolver: zodResolver(trainingFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      startTime: "09:00",
      endTime: "17:00",
      location: "",
      capacity: "",
      trainer: "",
      category: "",
      isOnline: false,
      isPublished: true,
      registrationLink: "",
    },
  })

  function resetForm() {
    form.reset({
      title: "",
      description: "",
      date: new Date(),
      startTime: "09:00",
      endTime: "17:00",
      location: "",
      capacity: "",
      trainer: "",
      category: "",
      isOnline: false,
      isPublished: true,
      registrationLink: "",
    })
  }

  function setFormValuesForEdit(event: (typeof trainingEvents)[0]) {
    form.reset({
      title: event.title,
      description: event.description,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      capacity: event.capacity,
      trainer: event.trainer,
      category: event.category,
      isOnline: event.isOnline,
      isPublished: event.isPublished,
      registrationLink: event.registrationLink || "",
    })
  }

  async function onSubmit(values: z.infer<typeof trainingFormSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (selectedEvent) {
      // Update existing event
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                ...values,
                registrations: event.registrations,
              }
            : event,
        ),
      )

      toast({
        title: "Event Updated",
        description: `"${values.title}" has been updated successfully.`,
      })

      setIsEditEventOpen(false)
    } else {
      // Add new event
      const newEvent = {
        id: events.length + 1,
        ...values,
        registrations: 0,
      }

      setEvents([...events, newEvent])

      toast({
        title: "Event Added",
        description: `"${values.title}" has been added to the training calendar.`,
      })

      setIsAddEventOpen(false)
    }

    resetForm()
    setIsSubmitting(false)
  }

  function handleEditEvent(event: (typeof trainingEvents)[0]) {
    setSelectedEvent(event)
    setFormValuesForEdit(event)
    setIsEditEventOpen(true)
  }

  function handleDeleteEvent(id: number) {
    setEvents(events.filter((event) => event.id !== id))
    toast({
      title: "Event Deleted",
      description: "The training event has been deleted successfully.",
    })
  }

  function handleTogglePublish(id: number) {
    setEvents(
      events.map((event) =>
        event.id === id
          ? {
              ...event,
              isPublished: !event.isPublished,
            }
          : event,
      ),
    )

    const event = events.find((e) => e.id === id)
    if (event) {
      toast({
        title: event.isPublished ? "Event Unpublished" : "Event Published",
        description: `"${event.title}" has been ${event.isPublished ? "unpublished" : "published"}.`,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Training Calendar</h1>
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-blue hover:bg-brand-blue/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Training Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Training Event</DialogTitle>
              <DialogDescription>Create a new training event for the calendar.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Leadership Development Workshop" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A comprehensive workshop focusing on leadership skills..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="isOnline"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Online Event</FormLabel>
                          <FormDescription>Is this a virtual/online training?</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder={form.watch("isOnline") ? "Virtual" : "Nairobi, Kenya"} {...field} />
                        </FormControl>
                        <FormDescription>
                          {form.watch("isOnline")
                            ? "For online events, you can enter 'Virtual' or the platform name"
                            : "Physical location of the training"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="trainer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trainer</FormLabel>
                        <FormControl>
                          <Input placeholder="Dr. James Wilson" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Leadership">Leadership</SelectItem>
                            <SelectItem value="Management">Management</SelectItem>
                            <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                            <SelectItem value="Project Management">Project Management</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Human Resources">Human Resources</SelectItem>
                            <SelectItem value="Communication">Communication</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="registrationLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Link (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/register" {...field} />
                      </FormControl>
                      <FormDescription>
                        External registration link if you're not using the built-in registration system.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Publish Event</FormLabel>
                        <FormDescription>
                          When enabled, this event will be visible on the public training calendar.
                        </FormDescription>
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
                    onClick={() => {
                      resetForm()
                      setIsAddEventOpen(false)
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-brand-blue hover:bg-brand-blue/90" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Event"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditEventOpen} onOpenChange={setIsEditEventOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Training Event</DialogTitle>
              <DialogDescription>Update the details of this training event.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Leadership Development Workshop" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A comprehensive workshop focusing on leadership skills..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="isOnline"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Online Event</FormLabel>
                          <FormDescription>Is this a virtual/online training?</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder={form.watch("isOnline") ? "Virtual" : "Nairobi, Kenya"} {...field} />
                        </FormControl>
                        <FormDescription>
                          {form.watch("isOnline")
                            ? "For online events, you can enter 'Virtual' or the platform name"
                            : "Physical location of the training"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="trainer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trainer</FormLabel>
                        <FormControl>
                          <Input placeholder="Dr. James Wilson" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Leadership">Leadership</SelectItem>
                            <SelectItem value="Management">Management</SelectItem>
                            <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                            <SelectItem value="Project Management">Project Management</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Human Resources">Human Resources</SelectItem>
                            <SelectItem value="Communication">Communication</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="registrationLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Link (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/register" {...field} />
                      </FormControl>
                      <FormDescription>
                        External registration link if you're not using the built-in registration system.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Publish Event</FormLabel>
                        <FormDescription>
                          When enabled, this event will be visible on the public training calendar.
                        </FormDescription>
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
                    onClick={() => {
                      resetForm()
                      setSelectedEvent(null)
                      setIsEditEventOpen(false)
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-brand-blue hover:bg-brand-blue/90" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Training Events</CardTitle>
              <CardDescription>Manage upcoming training sessions and workshops</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Registrations</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No training events found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[300px]">{event.description}</div>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="text-xs">
                            {event.category}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{format(event.date, "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="mr-2 h-3 w-3" />
                          <span>
                            {event.startTime} - {event.endTime}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {event.isOnline ? "Online Event" : "In-Person"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {event.registrations} / {event.capacity}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                          <div
                            className="bg-brand-blue h-1.5 rounded-full"
                            style={{
                              width: `${Math.min(
                                (Number.parseInt(event.registrations.toString()) / Number.parseInt(event.capacity)) *
                                  100,
                                100,
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {event.isPublished ? (
                          <Badge className="bg-brand-green hover:bg-brand-green/80">Published</Badge>
                        ) : (
                          <Badge variant="outline">Draft</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleTogglePublish(event.id)}
                            title={event.isPublished ? "Unpublish" : "Publish"}
                          >
                            <Check className={`h-4 w-4 ${event.isPublished ? "text-brand-green" : ""}`} />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleEditEvent(event)} title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteEvent(event.id)}
                            title="Delete"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredEvents.length} of {events.length} events
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
