'use client';

import { Search, Plus, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const contacts = [
  { id: 1, name: 'John Smith', email: 'john@acmeinc.com', company: 'Acme Inc', phone: '+1 (555) 123-4567', lastContact: '2 days ago', status: 'active' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@techcorp.com', company: 'TechCorp', phone: '+1 (555) 234-5678', lastContact: '1 week ago', status: 'active' },
  { id: 3, name: 'Mike Chen', email: 'mike@bigco.com', company: 'BigCo', phone: '+1 (555) 345-6789', lastContact: '2 weeks ago', status: 'inactive' },
  { id: 4, name: 'Emily Davis', email: 'emily@startup.io', company: 'StartupXYZ', phone: '+1 (555) 456-7890', lastContact: '3 days ago', status: 'active' },
  { id: 5, name: 'Robert Wilson', email: 'robert@enterprise.com', company: 'Enterprise Ltd', phone: '+1 (555) 567-8901', lastContact: '5 days ago', status: 'active' },
];

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || contact.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">CRM - Contacts</h1>
          <p className="text-lg text-muted-foreground mt-2">Manage all your customer contacts and interactions</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Contact
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search contacts by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground cursor-pointer hover:border-foreground/50"
          >
            <option value="all">All Contacts</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Company</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Phone</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Last Contact</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((contact) => (
                <tr key={contact.id} className="hover:bg-muted/50 transition">
                  <td className="px-4 py-3 font-medium text-foreground">{contact.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{contact.company}</td>
                  <td className="px-4 py-3 flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {contact.email}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {contact.phone}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{contact.lastContact}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">Showing {filtered.length} of {contacts.length} contacts</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-border rounded-lg text-sm hover:bg-muted transition">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">1</button>
            <button className="px-3 py-1 border border-border rounded-lg text-sm hover:bg-muted">Next</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 space-y-2">
          <h3 className="font-semibold text-foreground">Total Contacts</h3>
          <p className="text-3xl font-bold text-blue-600">{contacts.length}</p>
          <p className="text-sm text-muted-foreground">Across all companies</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 space-y-2">
          <h3 className="font-semibold text-foreground">Active Contacts</h3>
          <p className="text-3xl font-bold text-green-600">{contacts.filter(c => c.status === 'active').length}</p>
          <p className="text-sm text-muted-foreground">Recently engaged</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 space-y-2">
          <h3 className="font-semibold text-foreground">Inactive</h3>
          <p className="text-3xl font-bold text-amber-600">{contacts.filter(c => c.status === 'inactive').length}</p>
          <p className="text-sm text-muted-foreground">Needs follow-up</p>
        </div>
      </div>
    </div>
  );
}
