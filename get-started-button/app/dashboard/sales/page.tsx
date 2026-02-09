'use client';

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, TrendingUp, Target, DollarSign, Zap } from 'lucide-react';

const pipelineData = [
  { stage: 'Lead', count: 234, percent: 100 },
  { stage: 'Qualified', count: 89, percent: 38 },
  { stage: 'Proposal', count: 34, percent: 15 },
  { stage: 'Negotiation', count: 18, percent: 8 },
  { stage: 'Closed Won', count: 12, percent: 5 },
];

const dealsData = [
  { month: 'Week 1', deals: 2, revenue: 45000 },
  { month: 'Week 2', deals: 3, revenue: 78000 },
  { month: 'Week 3', deals: 1, revenue: 22000 },
  { month: 'Week 4', deals: 6, revenue: 145000 },
];

export default function SalesDashboard() {
  return (
    <div className="space-y-8 p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Sales Dashboard</h1>
        <p className="text-lg text-muted-foreground">Track your pipeline, deals, and revenue metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Pipeline', value: '$234,000', change: '+18%', icon: Target },
          { label: 'Deals Won', value: '12', change: '+3', icon: TrendingUp },
          { label: 'Revenue', value: '$145,000', change: '+32%', icon: DollarSign },
          { label: 'Avg Deal Size', value: '$12,083', change: '+8%', icon: Zap },
          { label: 'Win Rate', value: '45%', change: '+5%', icon: Target },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-muted-foreground uppercase">{kpi.label}</p>
                <Icon className="w-5 h-5 text-muted-foreground/60" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">{kpi.value}</h3>
              <div className="flex items-center text-sm mt-2">
                <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-600">{kpi.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Pipeline Funnel</h2>
          <div className="space-y-3">
            {pipelineData.map((stage, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-foreground">{stage.stage}</span>
                  <span className="text-muted-foreground">{stage.count} • {stage.percent}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${stage.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Deals Requiring Action</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950 p-4 rounded">
              <h3 className="font-semibold text-amber-900 dark:text-amber-300">Acme Inc</h3>
              <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">$45K • 30 days in Proposal</p>
              <button className="text-xs font-medium text-amber-600 dark:text-amber-400 hover:underline mt-2">Follow Up →</button>
            </div>
            <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950 p-4 rounded">
              <h3 className="font-semibold text-red-900 dark:text-red-300">BigCo</h3>
              <p className="text-sm text-red-800 dark:text-red-300 mt-1">$67K • 45 days in Qualified</p>
              <button className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline mt-2">Take Action →</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-foreground">Revenue Trend (This Month)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dealsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
