import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

interface PageTemplateProps {
  title: string
  description: string
  actionLabel?: string
  children?: React.ReactNode
  showPlaceholder?: boolean
}

export function PageTemplate({
  title,
  description,
  actionLabel = 'Add New',
  children,
  showPlaceholder = true,
}: PageTemplateProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      </div>

      {/* Content */}
      {children ? (
        children
      ) : showPlaceholder ? (
        <Card>
          <CardHeader>
            <CardTitle>Content Area</CardTitle>
            <CardDescription>Your content will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-96 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
              <div className="text-center">
                <p className="text-muted-foreground">Ready for your content</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add your {title.toLowerCase()} content here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
