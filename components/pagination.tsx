import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Button variant="outline" size="icon" disabled={currentPage <= 1} asChild={currentPage > 1}>
        {currentPage > 1 ? (
          <Link href={`${baseUrl}${currentPage > 2 ? `?page=${currentPage - 1}` : ""}`}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Link>
        ) : (
          <span>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </span>
        )}
      </Button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNumber = i + 1
        const isCurrentPage = pageNumber === currentPage

        return (
          <Button
            key={pageNumber}
            variant={isCurrentPage ? "default" : "outline"}
            size="sm"
            className={isCurrentPage ? "bg-brand-blue hover:bg-brand-blue/90" : ""}
            asChild={!isCurrentPage}
          >
            {!isCurrentPage ? (
              <Link href={`${baseUrl}${pageNumber > 1 ? `?page=${pageNumber}` : ""}`}>{pageNumber}</Link>
            ) : (
              <span>{pageNumber}</span>
            )}
          </Button>
        )
      })}

      <Button variant="outline" size="icon" disabled={currentPage >= totalPages} asChild={currentPage < totalPages}>
        {currentPage < totalPages ? (
          <Link href={`${baseUrl}?page=${currentPage + 1}`}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Link>
        ) : (
          <span>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </span>
        )}
      </Button>
    </div>
  )
}
