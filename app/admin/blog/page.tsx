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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Edit, Eye, ImageIcon, Plus, Search, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define schemas for blog management
const blogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(5, "Slug must be at least 5 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  featuredImage: z.string().url("Please enter a valid URL").optional(),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(1, "Author is required"),
  tags: z.string().optional(),
  isPublished: z.boolean().default(false),
  publishDate: z.date({
    required_error: "Publish date is required",
  }),
})

const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().optional(),
})

// Sample blog posts
const initialBlogPosts = [
  {
    id: 1,
    title: "5 Essential Leadership Skills for the Post-Pandemic Workplace",
    slug: "essential-leadership-skills-post-pandemic",
    excerpt:
      "Discover the key leadership skills that have become essential in navigating the challenges of the post-pandemic workplace environment.",
    content: "Lorem ipsum dolor sit amet...",
    featuredImage: "/placeholder.svg?height=400&width=600",
    category: "Leadership",
    author: "Dr. Sarah Johnson",
    tags: "leadership, workplace, skills, pandemic",
    isPublished: true,
    publishDate: new Date(2025, 3, 15),
    views: 1245,
  },
  {
    id: 2,
    title: "How Data Analytics is Transforming Business Decision Making",
    slug: "data-analytics-transforming-business-decisions",
    excerpt:
      "Explore how organizations are leveraging data analytics to drive informed decision-making and gain competitive advantages in today's market.",
    content: "Lorem ipsum dolor sit amet...",
    featuredImage: "/placeholder.svg?height=400&width=600",
    category: "Data Analytics",
    author: "Michael Chen",
    tags: "data analytics, business, decision making",
    isPublished: true,
    publishDate: new Date(2025, 3, 8),
    views: 982,
  },
  {
    id: 3,
    title: "The Future of Work: Trends Shaping the Modern Workplace",
    slug: "future-of-work-trends",
    excerpt:
      "An in-depth look at the emerging trends that are reshaping how we work, from remote collaboration to AI-powered productivity tools.",
    content: "Lorem ipsum dolor sit amet...",
    featuredImage: "/placeholder.svg?height=400&width=600",
    category: "Workplace Trends",
    author: "Dr. James Wilson",
    tags: "future of work, workplace, trends, remote work",
    isPublished: true,
    publishDate: new Date(2025, 2, 30),
    views: 1567,
  },
  {
    id: 4,
    title: "Building Resilient Teams in Uncertain Times",
    slug: "building-resilient-teams",
    excerpt:
      "Learn strategies for developing team resilience and adaptability to thrive amidst uncertainty and rapid change.",
    content: "Lorem ipsum dolor sit amet...",
    featuredImage: "/placeholder.svg?height=400&width=600",
    category: "Team Management",
    author: "Emily Nguyen",
    tags: "teams, resilience, management, leadership",
    isPublished: true,
    publishDate: new Date(2025, 2, 22),
    views: 876,
  },
  {
    id: 5,
    title: "Effective Communication Strategies for Remote Teams",
    slug: "communication-strategies-remote-teams",
    excerpt:
      "Discover practical communication approaches that help remote teams stay connected, aligned, and productive.",
    content: "Lorem ipsum dolor sit amet...",
    featuredImage: "/placeholder.svg?height=400&width=600",
    category: "Communication",
    author: "Robert Kiyosaki",
    tags: "communication, remote teams, productivity",
    isPublished: false,
    publishDate: new Date(2025, 2, 15),
    views: 0,
  },
]

// Sample categories
const initialCategories = [
  {
    id: 1,
    name: "Leadership",
    slug: "leadership",
    description: "Articles about leadership skills and strategies",
    postCount: 1,
  },
  {
    id: 2,
    name: "Data Analytics",
    slug: "data-analytics",
    description: "Content related to data analysis and insights",
    postCount: 1,
  },
  {
    id: 3,
    name: "Workplace Trends",
    slug: "workplace-trends",
    description: "Emerging trends in the modern workplace",
    postCount: 1,
  },
  {
    id: 4,
    name: "Team Management",
    slug: "team-management",
    description: "Strategies for effective team management",
    postCount: 1,
  },
  {
    id: 5,
    name: "Communication",
    slug: "communication",
    description: "Effective communication techniques and approaches",
    postCount: 1,
  },
]

export default function BlogManagementPage() {
  const [activeTab, setActiveTab] = useState("posts")
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts)
  const [categories, setCategories] = useState(initialCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddPostOpen, setIsAddPostOpen] = useState(false)
  const [isEditPostOpen, setIsEditPostOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Blog Post Form
  const postForm = useForm<z.infer<typeof blogPostSchema>>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      category: "",
      author: "",
      tags: "",
      isPublished: false,
      publishDate: new Date(),
    },
  })

  // Category Form
  const categoryForm = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  })

  // Filter blog posts based on search term
  const filteredPosts = blogPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.tags && post.tags.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) => {
    return (
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  const handleAddPost = () => {
    setSelectedPost(null)
    postForm.reset({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      category: "",
      author: "",
      tags: "",
      isPublished: false,
      publishDate: new Date(),
    })
    setIsAddPostOpen(true)
  }

  const handleEditPost = (post: any) => {
    setSelectedPost(post)
    postForm.reset({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      category: post.category,
      author: post.author,
      tags: post.tags,
      isPublished: post.isPublished,
      publishDate: new Date(post.publishDate),
    })
    setIsEditPostOpen(true)
  }

  const handleDeletePost = (postId: number) => {
    setBlogPosts(blogPosts.filter((post) => post.id !== postId))
    toast({
      title: "Post Deleted",
      description: "The blog post has been deleted successfully.",
    })
  }

  const handleAddCategory = () => {
    setSelectedCategory(null)
    categoryForm.reset({
      name: "",
      slug: "",
      description: "",
    })
    setIsAddCategoryOpen(true)
  }

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category)
    categoryForm.reset({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
    })
    setIsEditCategoryOpen(true)
  }

  const handleDeleteCategory = (categoryId: number) => {
    // Check if category is in use
    const isInUse = blogPosts.some((post) => post.category === categories.find((c) => c.id === categoryId)?.name)

    if (isInUse) {
      toast({
        title: "Cannot Delete Category",
        description: "This category is currently in use by one or more blog posts.",
        variant: "destructive",
      })
      return
    }

    setCategories(categories.filter((category) => category.id !== categoryId))
    toast({
      title: "Category Deleted",
      description: "The category has been deleted successfully.",
    })
  }

  const onSubmitPost = async (values: z.infer<typeof blogPostSchema>) => {
    setIsSubmitting(true)

    // Generate slug if empty
    if (!values.slug) {
      values.slug = values.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (selectedPost) {
      // Update existing post
      setBlogPosts(
        blogPosts.map((post) =>
          post.id === selectedPost.id
            ? {
                ...post,
                ...values,
                publishDate: values.publishDate,
              }
            : post,
        ),
      )
      toast({
        title: "Post Updated",
        description: "The blog post has been updated successfully.",
      })
      setIsEditPostOpen(false)
    } else {
      // Add new post
      const newPost = {
        id: blogPosts.length + 1,
        ...values,
        publishDate: values.publishDate,
        views: 0,
      }
      setBlogPosts([...blogPosts, newPost])
      toast({
        title: "Post Created",
        description: "The blog post has been created successfully.",
      })
      setIsAddPostOpen(false)
    }

    setIsSubmitting(false)
  }

  const onSubmitCategory = async (values: z.infer<typeof categorySchema>) => {
    setIsSubmitting(true)

    // Generate slug if empty
    if (!values.slug) {
      values.slug = values.name
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (selectedCategory) {
      // Update existing category
      setCategories(
        categories.map((category) =>
          category.id === selectedCategory.id
            ? {
                ...category,
                ...values,
              }
            : category,
        ),
      )
      toast({
        title: "Category Updated",
        description: "The category has been updated successfully.",
      })
      setIsEditCategoryOpen(false)
    } else {
      // Add new category
      const newCategory = {
        id: categories.length + 1,
        ...values,
        postCount: 0,
      }
      setCategories([...categories, newCategory])
      toast({
        title: "Category Created",
        description: "The category has been created successfully.",
      })
      setIsAddCategoryOpen(false)
    }

    setIsSubmitting(false)
  }

  const handleTogglePublish = (postId: number) => {
    setBlogPosts(blogPosts.map((post) => (post.id === postId ? { ...post, isPublished: !post.isPublished } : post)))

    const post = blogPosts.find((p) => p.id === postId)
    if (post) {
      toast({
        title: post.isPublished ? "Post Unpublished" : "Post Published",
        description: `"${post.title}" has been ${post.isPublished ? "unpublished" : "published"}.`,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" asChild>
            <a href="/blog" target="_blank" rel="noreferrer">
              <Eye className="h-4 w-4" />
              View Blog
            </a>
          </Button>
          <Button
            className="gap-2 bg-brand-blue hover:bg-brand-blue/90"
            onClick={activeTab === "posts" ? handleAddPost : handleAddCategory}
          >
            <Plus className="h-4 w-4" />
            {activeTab === "posts" ? "Add Post" : "Add Category"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        {/* Blog Posts Tab */}
        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Blog Posts</CardTitle>
                  <CardDescription>Manage your blog posts and articles</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
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
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No blog posts found matching your search
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>
                            <div className="font-medium">{post.title}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-[300px]">{post.excerpt}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{post.category}</Badge>
                          </TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{post.publishDate.toLocaleDateString()}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {post.isPublished ? (
                              <Badge className="bg-brand-green hover:bg-brand-green/80">Published</Badge>
                            ) : (
                              <Badge variant="outline">Draft</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
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
                                    className="h-4 w-4"
                                  >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <a
                                    href={`/blog/${post.slug}`}
                                    target="_blank"
                                    className="flex items-center"
                                    rel="noreferrer"
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditPost(post)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleTogglePublish(post.id)}>
                                  {post.isPublished ? (
                                    <>
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
                                        className="mr-2 h-4 w-4"
                                      >
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="m3 3 18 18" />
                                      </svg>
                                      Unpublish
                                    </>
                                  ) : (
                                    <>
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
                                        className="mr-2 h-4 w-4"
                                      >
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                        <circle cx="12" cy="12" r="3" />
                                      </svg>
                                      Publish
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleDeletePost(post.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
                Showing {filteredPosts.length} of {blogPosts.length} posts
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Categories</CardTitle>
                  <CardDescription>Manage blog post categories</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search categories..."
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
                      <TableHead>Name</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Posts</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No categories found matching your search
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCategories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell>
                            <div className="font-medium">{category.name}</div>
                          </TableCell>
                          <TableCell>{category.slug}</TableCell>
                          <TableCell>
                            <div className="truncate max-w-[300px]">
                              {category.description || (
                                <span className="text-muted-foreground italic">No description</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{category.postCount}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteCategory(category.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
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
                Showing {filteredCategories.length} of {categories.length} categories
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Post Dialog */}
      <Dialog open={isAddPostOpen} onOpenChange={setIsAddPostOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Blog Post</DialogTitle>
            <DialogDescription>
              Create a new blog post. Fill in the details below and click "Create Post" when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...postForm}>
            <form onSubmit={postForm.handleSubmit(onSubmitPost)} className="space-y-4">
              <FormField
                control={postForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="5 Essential Leadership Skills for 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={postForm.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="essential-leadership-skills-2025" {...field} />
                    </FormControl>
                    <FormDescription>
                      The URL-friendly version of the title. Leave blank to generate automatically.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={postForm.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A brief summary of the blog post..." className="min-h-[80px]" {...field} />
                    </FormControl>
                    <FormDescription>A short summary that appears on the blog listing page.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={postForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="The full content of your blog post..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={postForm.control}
                  name="featuredImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image URL</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="flex-shrink-0"
                          onClick={() => {
                            // This would open a media browser in a real implementation
                            postForm.setValue("featuredImage", "/placeholder.svg?height=400&width=600")
                          }}
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={postForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={postForm.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Dr. Sarah Johnson" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={postForm.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="leadership, skills, workplace" {...field} />
                      </FormControl>
                      <FormDescription>Comma-separated list of tags.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={postForm.control}
                  name="publishDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Publish Date</FormLabel>
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
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
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

                <FormField
                  control={postForm.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 mt-8">
                      <div className="space-y-0.5">
                        <FormLabel>Publish</FormLabel>
                        <FormDescription>Make this post visible on the website</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsAddPostOpen(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-brand-blue hover:bg-brand-blue/90" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Post"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={isEditPostOpen} onOpenChange={setIsEditPostOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Update the blog post details and click "Save Changes" when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...postForm}>
            <form onSubmit={postForm.handleSubmit(onSubmitPost)} className="space-y-4">
              <FormField
                control={postForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="5 Essential Leadership Skills for 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={postForm.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="essential-leadership-skills-2025" {...field} />
                    </FormControl>
                    <FormDescription>
                      The URL-friendly version of the title. Leave blank to generate automatically.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={postForm.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A brief summary of the blog post..." className="min-h-[80px]" {...field} />
                    </FormControl>
                    <FormDescription>A short summary that appears on the blog listing page.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={postForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="The full content of your blog post..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={postForm.control}
                  name="featuredImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image URL</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="flex-shrink-0"
                          onClick={() => {
                            // This would open a media browser in a real implementation
                            postForm.setValue("featuredImage", "/placeholder.svg?height=400&width=600")
                          }}
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={postForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={postForm.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Dr. Sarah Johnson" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={postForm.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="leadership, skills, workplace" {...field} />
                      </FormControl>
                      <FormDescription>Comma-separated list of tags.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={postForm.control}
                  name="publishDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Publish Date</FormLabel>
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
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
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

                <FormField
                  control={postForm.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 mt-8">
                      <div className="space-y-0.5">
                        <FormLabel>Publish</FormLabel>
                        <FormDescription>Make this post visible on the website</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditPostOpen(false)}
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

      {/* Add Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>Create a new blog post category.</DialogDescription>
          </DialogHeader>
          <Form {...categoryForm}>
            <form onSubmit={categoryForm.handleSubmit(onSubmitCategory)} className="space-y-4">
              <FormField
                control={categoryForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Leadership" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={categoryForm.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="leadership" {...field} />
                    </FormControl>
                    <FormDescription>
                      The URL-friendly version of the name. Leave blank to generate automatically.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={categoryForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Articles about leadership skills and strategies"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddCategoryOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-brand-blue hover:bg-brand-blue/90" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Category"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the category details.</DialogDescription>
          </DialogHeader>
          <Form {...categoryForm}>
            <form onSubmit={categoryForm.handleSubmit(onSubmitCategory)} className="space-y-4">
              <FormField
                control={categoryForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Leadership" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={categoryForm.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="leadership" {...field} />
                    </FormControl>
                    <FormDescription>
                      The URL-friendly version of the name. Leave blank to generate automatically.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={categoryForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Articles about leadership skills and strategies"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditCategoryOpen(false)}
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

interface PopoverProps {
  children: React.ReactNode
}

function Popover({ children }: PopoverProps) {
  return <div>{children}</div>
}

function PopoverTrigger({ asChild, children }: { asChild: boolean; children: React.ReactNode }) {
  return <>{children}</>
}

function PopoverContent({
  className,
  align,
  children,
}: { className?: string; align?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>
}

function format(date: Date, format: string) {
  return date.toLocaleDateString()
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
