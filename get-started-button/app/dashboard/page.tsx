'use client';

import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Mail, Users, FileText, Activity, AlertCircle, CheckCircle, Zap, AlertTriangle } from 'lucide-react';

const pipelineData = [
  { stage: 'Lead', value: 234 },
  { stage: 'Qualified', value: 89 },
  { stage: 'Proposal', value: 34 },
  { stage: 'Negotiation', value: 18 },
  { stage: 'Closed Won', value: 12 },
];

const revenueData = [
  { month: 'Jan', revenue: 95000 },
  { month: 'Feb', revenue: 110000 },
  { month: 'Mar', revenue: 125000 },
  { month: 'Apr', revenue: 145000 },
];

const recentActivity = [
  { id: 1, type: 'deal', title: 'Deal Closed - Enterprise Plan', description: 'John Doe → $45,000', time: '2 hours ago', value: '$45K', department: 'Sales' },
  { id: 2, type: 'content', title: 'Blog Post Published', description: 'The Future of AI in Sales', time: '3 hours ago', value: '245 views', department: 'Marketing' },
  { id: 3, type: 'leads', title: '3 Leads Qualified', description: 'From "Q1 Outreach" campaign', time: '5 hours ago', value: '3 leads', department: 'Sales' },
  { id: 4, type: 'email', title: 'Email Campaign Sent', description: 'Product Launch Newsletter', time: '6 hours ago', value: '1,234 sent', department: 'Marketing' },
];

export default function DashboardPage() {
  const [filterActivity, setFilterActivity] = useState('all');

  const filteredActivity = recentActivity.filter(activity => {
    if (filterActivity === 'all') return true;
    if (filterActivity === 'sales') return activity.department === 'Sales';
    if (filterActivity === 'marketing') return activity.department === 'Marketing';
    return true;
  });

  return (
    <div className="space-y-8 p-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Welcome back, John!</h1>
        <p className="text-lg text-muted-foreground">Here's what's happening today across your sales and marketing efforts</p>
      </div>

      {/* Top Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Revenue', value: '$145,000', change: '+32%', positive: true, icon: TrendingUp },
          { label: 'Total Leads', value: '234', change: '+18%', positive: true, icon: Users },
          { label: 'Emails Sent', value: '1,234', change: '+24%', positive: true, icon: Mail },
          { label: 'Content Posts', value: '47', change: '+12%', positive: true, icon: FileText },
        ].map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">{metric.label}</p>
                  <h3 className="text-2xl font-bold text-foreground">{metric.value}</h3>
                </div>
                <Icon className="w-8 h-8 text-muted-foreground/60" />
              </div>
              <div className="flex items-center text-sm">
                {metric.positive ? (
                  <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-500 mr-1" />
                )}
                <span className={metric.positive ? 'text-green-600' : 'text-red-600'}>{metric.change}</span>
                <span className="text-muted-foreground ml-1">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dual Panel Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Pipeline Panel */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-5">
          <div>
            <h2 className="text-xl font-bold text-foreground">Sales Pipeline Health</h2>
            <p className="text-sm text-muted-foreground mt-1">Current pipeline: $234,000</p>
          </div>

          {/* Pipeline Funnel Chart */}
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={pipelineData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" stroke="var(--muted-foreground)" />
              <YAxis dataKey="stage" type="category" stroke="var(--muted-foreground)" width={80} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
              <Bar dataKey="value" fill="#3b82f6" radius={4} />
            </BarChart>
          </ResponsiveContainer>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-sm">Top Performing Campaigns</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg text-sm">
                <span>Enterprise Outreach</span>
                <span className="font-semibold">12 leads</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg text-sm">
                <span>Re-engagement</span>
                <span className="font-semibold">8 leads</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition text-sm">
            View Full Sales Dashboard
          </button>
        </div>

        {/* Marketing Performance Panel */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-5">
          <div>
            <h2 className="text-xl font-bold text-foreground">Marketing Content Performance</h2>
            <p className="text-sm text-muted-foreground mt-1">This month's activity</p>
          </div>

          {/* Revenue Trend */}
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
              <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
            </LineChart>
          </ResponsiveContainer>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Published pieces</span><span className="font-semibold">47</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total views</span><span className="font-semibold">14,234</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Engagement rate</span><span className="font-semibold">6.3%</span></div>
          </div>

          <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition text-sm">
            View Marketing Dashboard
          </button>
        </div>
      </div>

      {/* Unified Activity Feed */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
          <select
            value={filterActivity}
            onChange={(e) => setFilterActivity(e.target.value)}
            className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background text-foreground cursor-pointer"
          >
            <option value="all">All Activities</option>
            <option value="sales">Sales Only</option>
            <option value="marketing">Marketing Only</option>
          </select>
        </div>

        <div className="space-y-3">
          {filteredActivity.map((activity) => (
            <div key={activity.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm">{activity.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${activity.department === 'Sales' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                      {activity.department}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">{activity.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground text-sm">{activity.value}</p>
                  <button className="text-blue-600 text-xs mt-2 hover:underline">View →</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full text-center py-2 text-blue-600 font-medium hover:bg-muted rounded-lg transition text-sm">
          Load More Activities
        </button>
      </div>

      {/* Quick Actions Grid */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { icon: '🎯', label: 'Create Lead' },
            { icon: '📝', label: 'Create Content' },
            { icon: '📧', label: 'Send Email' },
            { icon: '📅', label: 'Schedule Post' },
            { icon: '📊', label: 'View Reports' },
            { icon: '⚙️', label: 'Setup Workflow' },
          ].map((action, i) => (
            <button
              key={i}
              className="flex flex-col items-center justify-center p-4 border border-border rounded-lg hover:bg-muted transition text-center"
            >
              <span className="text-2xl mb-1">{action.icon}</span>
              <span className="text-xs font-medium text-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* AI Insights Widget */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Zap className="w-5 h-5" /> AI Insights & Recommendations
        </h2>
        
        <div className="space-y-3">
          <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950 p-4 rounded">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-300">High Priority</h3>
                <p className="text-sm text-red-800 dark:text-red-300 mt-1">5 deals in pipeline for 30+ days</p>
                <button className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline mt-2">View Deals →</button>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950 p-4 rounded">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-300">Opportunity</h3>
                <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">Tuesday 10 AM is your best time for social posts (12% higher engagement)</p>
                <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline mt-2">Auto-Optimize →</button>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950 p-4 rounded">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-300">Success</h3>
                <p className="text-sm text-green-800 dark:text-green-300 mt-1">Your email subject lines improved +15% open rate this week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Widget */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-foreground">System Status</h2>
        
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-foreground">All Systems Operational</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {[
            { name: 'AI Engine (Groq)', status: 'operational' },
            { name: 'Email Service', status: 'operational' },
            { name: 'CRM Database', status: 'operational' },
            { name: 'LinkedIn OAuth', status: 'operational' },
            { name: 'Google OAuth', status: 'operational' },
            { name: 'n8n Workflows', status: 'operational' },
          ].map((service, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>{service.name}</span>
              <span className="text-green-600">✓</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-4">Last checked: 2 min ago</p>
      </div>
    </div>
  );
}
