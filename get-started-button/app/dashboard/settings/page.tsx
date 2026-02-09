import { PageTemplate } from '@/components/dashboard/page-template'

export default function SettingsPage() {
  return (
    <PageTemplate
      title="Settings & Configuration"
      description="Manage your account settings, preferences, and workspace configuration"
      actionLabel="Save Changes"
      showPlaceholder={true}
    />
  )
}
