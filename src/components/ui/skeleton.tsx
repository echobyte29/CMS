import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/60 dark:bg-muted/30", className)}
      {...props}
    />
  )
}

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'card' | 'avatar' | 'text' | 'button' | 'input'
  count?: number
  className?: string
}

function SkeletonItem({
  variant = 'default',
  className,
  ...props
}: SkeletonProps) {
  const variants = {
    default: "h-4 w-full",
    card: "h-64 w-full rounded-xl",
    avatar: "h-12 w-12 rounded-full",
    text: "h-4 w-3/4",
    button: "h-10 w-24 rounded-lg",
    input: "h-10 w-full rounded-lg",
  }
  
  return (
    <Skeleton 
      className={cn(variants[variant], className)}
      {...props} 
    />
  )
}

function SkeletonText({ 
  className, 
  lines = 3, 
  lastLineWidth = "3/4",
  ...props 
}: SkeletonProps & { lines?: number, lastLineWidth?: string }) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
      <Skeleton className={`h-4 w-${lastLineWidth}`} />
    </div>
  )
}

function SkeletonCard({ className, ...props }: SkeletonProps) {
  return (
    <div 
      className={cn(
        "rounded-xl border border-border p-4 shadow-sm", 
        className
      )}
      {...props}
    >
      <Skeleton className="h-[180px] w-full rounded-md mb-4" />
      <div className="space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <SkeletonText lines={2} />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  )
}

function SkeletonList({ 
  count = 3,
  variant = 'default',
  gap = 'gap-4',
  className, 
  ...props 
}: SkeletonProps & { gap?: string }) {
  return (
    <div className={cn("flex flex-col", gap, className)} {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonItem key={i} variant={variant} />
      ))}
    </div>
  )
}

export { 
  Skeleton,
  SkeletonItem,
  SkeletonText,
  SkeletonCard,
  SkeletonList
}
