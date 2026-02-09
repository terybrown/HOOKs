'use client';

import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Mail, Share2, Eye } from 'lucide-react';

const contentData = [
  { platform: 'LinkedIn', posts: 18, engagement: 892, views: 12400 },
  { platform: 'Twitter', posts: 12, engagement: 456, views: 8900 },
  { platform: 'Blog', posts: 8, engagement: 2341, views: 34500 },
  { platform: 'Email', posts: 9, engagement: 1234, views: 15600 },
];

const engagementTrend = [
  { week: 'Week 1', engagement: 2400 },
  { week: 'Week 2', engagement: 2210 },
  { week: 'Week 3', engagement: 2290 },
  { week: 'Week 4', engagement: 2000 },
];

const leadsByChannel = [
  { name: 'Content', value: 89 },
  { name: 'Social', value: 45 },
  { name: 'Email', value: 23 },
  { name: 'Referral', value: 18 },
];

const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export default function MarketingDashboard() {
  return (
    <div className="space-y-8 p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Marketing Dashboard</h1>
        <p className="text-lg text-muted-foreground">Track campaign performance, engagement, and lead generation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Views', value: '71,400', change: '+24%', icon: Eye },
          { label: 'Engagement', value: '4,923', change: '+18%', icon: Share2 },
          { label: 'Email Opens', value: '1,234', change: '+12%', icon: Mail },
          { label: 'Lead Generation', value: '175', change: '+32%', icon: TrendingUp },
        ].map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-muted-foreground uppercase">{metric.label}</p>
                <Icon className="w-5 h-5 text-muted-foreground/60" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">{metric.value}</h3>
              <p className="text-sm text-green-600 mt-2">{metric.change} vs last month</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Engagement by Platform</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="platform" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
              <Bar dataKey="engagement" fill="#8b5cf6" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Lead Generation by Source</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={leadsByChannel} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {leadsByChannel.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {leadsByChannel.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }} />
                <span>{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-foreground">Content Performance Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={engagementTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="week" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
            <Line type="monotone" dataKey="engagement" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-foreground">Top Performing Content</h2>
        <div className="space-y-3">
          {[
            { title: 'AI in Sales - Complete Guide', views: 2400, engagement: 245, platform: 'Blog' },
            { title: 'Q1 Product Launch', views: 1800, engagement: 189, platform: 'LinkedIn' },
            { title: 'Marketing Automation Tips', views: 1200, engagement: 134, platform: 'Email' },
          ].map((content, i) => (
            <div key={i} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{content.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{content.platform}</p>
                </div>
                <span className="text-2xl font-bold text-purple-600">{content.views}</span>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>Engagement: {content.engagement}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
