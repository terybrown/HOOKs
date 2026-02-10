'use client';

import { Plus, Search, Trash2, Edit, Eye, Share2 } from 'lucide-react';
import { useState } from 'react';

const contentPieces = [
  { id: 1, title: 'AI in Sales - Complete Guide', status: 'published', type: 'Blog', author: 'Sarah', views: 2400, date: 'Jan 15' },
  { id: 2, title: 'Q1 Product Launch', status: 'draft', type: 'LinkedIn', author: 'John', views: 0, date: 'Jan 18' },
  { id: 3, title: 'Marketing Automation Tips', status: 'published', type: 'Email', author: 'Emma', views: 1200, date: 'Jan 10' },
  { id: 4, title: 'Sales Trends 2024', status: 'scheduled', type: 'Blog', author: 'Mike', views: 0, date: 'Jan 25' },
  { id: 5, title: 'Customer Success Stories', status: 'published', type: 'Website', author: 'Lisa', views: 3400, date: 'Jan 8' },
];

export default function ContentStudio() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = contentPieces.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Content Studio</h1>
          <p className="text-lg text-muted-foreground mt-2">Create, edit, and manage all your marketing content</p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Content
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search content by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="Blog">Blog</option>
            <option value="Email">Email</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Website">Website</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((content) => (
            <div key={content.id} className="border border-border rounded-lg p-4 hover:shadow-md transition space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground line-clamp-2">{content.title}</h3>
                  <div className="flex gap-2 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      content.type === 'Blog' ? 'bg-blue-100 text-blue-700' :
                      content.type === 'Email' ? 'bg-green-100 text-green-700' :
                      content.type === 'LinkedIn' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {content.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      content.status === 'published' ? 'bg-green-100 text-green-700' :
                      content.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {content.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{content.views}</span>
                </div>
                <span>By {content.author}</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 text-blue-600 hover:text-blue-700 text-sm font-medium py-2 border border-blue-200 rounded hover:bg-blue-50">Edit</button>
                <button className="text-red-600 hover:text-red-700 p-2 border border-red-200 rounded hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">Showing {filtered.length} of {contentPieces.length} items</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Content', value: contentPieces.length, color: 'blue' },
          { label: 'Published', value: contentPieces.filter(c => c.status === 'published').length, color: 'green' },
          { label: 'Drafts', value: contentPieces.filter(c => c.status === 'draft').length, color: 'gray' },
          { label: 'Scheduled', value: contentPieces.filter(c => c.status === 'scheduled').length, color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className={`bg-card border border-border rounded-lg p-6 space-y-2`}>
            <h3 className="font-semibold text-foreground">{stat.label}</h3>
            <p className={`text-3xl font-bold ${stat.color === 'blue' ? 'text-blue-600' : stat.color === 'green' ? 'text-green-600' : stat.color === 'gray' ? 'text-gray-600' : 'text-amber-600'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
