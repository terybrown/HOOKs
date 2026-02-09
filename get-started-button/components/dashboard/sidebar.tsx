'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  Users,
  Building2,
  TrendingUp,
  Mail,
  Zap,
  AnalyticsIcon,
  Sparkles,
  BookOpen,
  Calendar,
  Share2,
  PieChart,
  Mails,
  Radio,
  Brain,
  Settings,
  Workflow,
  FileText,
  Users2,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const SALES_NAVIGATION = [
  { name: 'Sales Dashboard', href: '/dashboard/sales', icon: BarChart3 },
  { name: 'CRM - Contacts', href: '/dashboard/sales/contacts', icon: Users },
  { name: 'CRM - Accounts', href: '/dashboard/sales/accounts', icon: Building2 },
  { name: 'Leads & Pipeline', href: '/dashboard/sales/leads', icon: TrendingUp },
  { name: 'Outbound Campaigns', href: '/dashboard/sales/campaigns', icon: Mail },
  { name: 'Campaign Builder', href: '/dashboard/sales/campaign-builder', icon: Zap },
  { name: 'Unified Inbox', href: '/dashboard/sales/inbox', icon: Mails },
  { name: 'Sales Sequences', href: '/dashboard/sales/sequences', icon: Radio },
]

const MARKETING_NAVIGATION = [
  { name: 'Marketing Dashboard', href: '/dashboard/marketing', icon: BarChart3 },
  { name: 'Content Studio', href: '/dashboard/marketing/content', icon: BookOpen },
  { name: 'Content Calendar', href: '/dashboard/marketing/calendar', icon: Calendar },
  { name: 'Social Media Manager', href: '/dashboard/marketing/social', icon: Share2 },
  { name: 'Marketing Campaigns', href: '/dashboard/marketing/campaigns', icon: Mail },
  { name: 'Email Marketing', href: '/dashboard/marketing/email', icon: Mails },
  { name: 'Marketing Analytics', href: '/dashboard/marketing/analytics', icon: PieChart },
  { name: 'Marketing AI Agents', href: '/dashboard/marketing/ai-agents', icon: Brain },
]

const SHARED_TOOLS = [
  { name: 'Integrations', href: '/dashboard/integrations', icon: Workflow },
  { name: 'Workflows', href: '/dashboard/workflows', icon: Zap },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Team & Collaboration', href: '/dashboard/team', icon: Users2 },
]

interface NavItemProps {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  isActive: boolean
}

function NavItem({ name, href, icon: Icon, isActive }: NavItemProps) {
  return (
    <Link href={href}>
      <Button
        variant={isActive ? 'default' : 'ghost'}
        className="w-full justify-start text-sm"
        size="sm"
      >
        <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate">{name}</span>
      </Button>
    </Link>
  )
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isSalesOpen, setIsSalesOpen] = useState(true)
  const [isMarketingOpen, setIsMarketingOpen] = useState(true)
  const [isSharedOpen, setIsSharedOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const isSalesActive = pathname.startsWith('/dashboard/sales')
  const isMarketingActive = pathname.startsWith('/dashboard/marketing')

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`w-64 border-r border-border bg-background flex flex-col transition-all duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative h-screen z-40`}
      >
        {/* Header */}
        <div className="p-6 border-b border-border mt-14 md:mt-0">
          <h1 className="text-xl font-bold">HOOK</h1>
          <p className="text-sm text-muted-foreground">Sales & Marketing</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Sales Section */}
          <Collapsible open={isSalesOpen} onOpenChange={setIsSalesOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between px-2"
                size="sm"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="font-semibold">Sales</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isSalesOpen ? 'rotate-180' : ''
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              {SALES_NAVIGATION.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  isActive={pathname === item.href}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Marketing Section */}
          <Collapsible open={isMarketingOpen} onOpenChange={setIsMarketingOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between px-2"
                size="sm"
              >
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4" />
                  <span className="font-semibold">Marketing</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isMarketingOpen ? 'rotate-180' : ''
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              {MARKETING_NAVIGATION.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  isActive={pathname === item.href}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Shared Tools Section */}
          <Collapsible open={isSharedOpen} onOpenChange={setIsSharedOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between px-2"
                size="sm"
              >
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4" />
                  <span className="font-semibold">Tools</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isSharedOpen ? 'rotate-180' : ''
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              {SHARED_TOOLS.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  isActive={pathname === item.href}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <NavItem
            name="Settings"
            href="/dashboard/settings"
            icon={Settings}
            isActive={pathname === '/dashboard/settings'}
          />
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
