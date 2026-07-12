"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { Inquiry } from '@/types';
import { Calendar, MapPin, Clock, FileText, Archive, Trash2, Edit, Save } from 'lucide-react';
import { updateInquiry, deleteInquiry } from './actions';

interface StudioInboxProps {
  initialInquiries: Inquiry[];
}

type StatusFilter = 'All' | 'Pending' | 'Approved' | 'Archived';

export default function StudioInbox({ initialInquiries }: StudioInboxProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [selectedId, setSelectedId] = useState<string | null>(initialInquiries[0]?.id || null);
  const [filter, setFilter] = useState<StatusFilter>('All');
  const [isPending, startTransition] = useTransition();

  const [editingNotes, setEditingNotes] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const selectedInquiry = inquiries.find((inq) => inq.id === selectedId);

  useEffect(() => {
    if (selectedInquiry) {
      setEditingNotes(selectedInquiry.notes || '');
      setIsEditingNotes(false);
    }
  }, [selectedId, selectedInquiry]);

  const filteredInquiries = inquiries.filter((inq) => {
    if (filter === 'All') return true;
    return inq.status === filter;
  });

  const persistUpdate = (updated: Inquiry) => {
    // Optimistic update: reflect the change immediately in the UI
    setInquiries((prev) => prev.map((inq) => (inq.id === updated.id ? updated : inq)));

    startTransition(async () => {
      try {
        await updateInquiry(updated);
      } catch {
        // Roll back on failure
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === updated.id ? initialInquiries.find((i) => i.id === updated.id) ?? inq : inq))
        );
      }
    });
  };

  const handleUpdateStatus = (id: string, status: Inquiry['status']) => {
    const target = inquiries.find((inq) => inq.id === id);
    if (target) {
      persistUpdate({ ...target, status });
    }
  };

  const handleSaveNotes = () => {
    if (selectedInquiry) {
      persistUpdate({ ...selectedInquiry, notes: editingNotes });
      setIsEditingNotes(false);
    }
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      setSelectedId((prev) => (prev === id ? inquiries.find((inq) => inq.id !== id)?.id ?? null : prev));
    });
  };

  const getStatusColor = (status: Inquiry['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-950/40 border-emerald-500 text-emerald-400';
      case 'Declined':
        return 'bg-red-950/40 border-red-500 text-red-400';
      case 'Archived':
        return 'bg-zinc-900 border-zinc-700 text-zinc-400';
      default:
        return 'bg-amber-950/40 border-amber-500 text-amber-400';
    }
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-16 max-w-360 mx-auto min-h-screen">

      {/* Editorial Title */}
      <div className="mb-12 border-b border-outline-variant/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-1">
            Studio Backend CRM
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-on-surface uppercase tracking-tight">
            Inquiry Workspace
          </h2>
          <p className="font-sans text-xs text-on-surface-variant font-light mt-1">
            Review live storytelling briefs, schedule calls, and record project specifications.
          </p>
        </div>

        {/* Filter Toolbar tabs */}
        <div className="flex items-center space-x-2 bg-surface-dim p-1.5 border border-outline-variant/10 rounded">
          {(['All', 'Pending', 'Approved', 'Archived'] as StatusFilter[]).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-1.5 font-sans text-[10px] uppercase tracking-wider transition-all duration-300 rounded cursor-pointer ${
                filter === item
                  ? 'bg-primary text-background font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="text-center py-20 bg-surface-dim/20 border border-dashed border-outline-variant/20 rounded max-w-2xl mx-auto">
          <p className="font-display text-lg text-on-surface">No inquiries archived.</p>
          <p className="font-sans text-xs text-on-surface-variant mt-2">
            Submit an inquiry through the booking form to see it reflected in real time here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left panel: Inbox list */}
          <div className="lg:col-span-5 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            {filteredInquiries.length === 0 ? (
              <p className="text-center text-xs text-on-surface-variant py-10 font-sans">No matching entries in this state.</p>
            ) : (
              filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => setSelectedId(inq.id)}
                  className={`p-5 border transition-all duration-500 rounded cursor-pointer relative ${
                    selectedId === inq.id
                      ? 'bg-surface-dim border-primary'
                      : 'bg-surface-dim/30 border-outline-variant/10 hover:border-outline-variant/40'
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h4 className="font-display text-sm text-on-surface tracking-wider font-semibold">{inq.name}</h4>
                      <p className="font-sans text-[11px] text-on-surface-variant mt-1 font-light flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-outline" /> {inq.location}
                      </p>
                    </div>

                    <span className={`text-[9px] uppercase font-mono tracking-widest px-2.5 py-1 border rounded ${getStatusColor(inq.status)}`}>
                      {inq.status}
                    </span>
                  </div>

                  <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-outline">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {inq.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(inq.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right panel: Detailed inquiry workspace sheet */}
          <div className="lg:col-span-7">
            {selectedInquiry ? (
              <div className="border border-outline-variant/15 p-8 rounded bg-surface-dim/40 cinematic-glow space-y-8 animate-fade-in">

                {/* Meta details header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/10 pb-6">
                  <div>
                    <span className="font-sans text-[9px] uppercase tracking-widest text-primary block">Inquiry Brief Sheet</span>
                    <h3 className="font-display text-2xl text-on-surface tracking-wide mt-1">{selectedInquiry.name}</h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-sans text-[10px] uppercase tracking-wider text-outline">Status:</span>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => handleUpdateStatus(selectedInquiry.id, e.target.value as Inquiry['status'])}
                      disabled={isPending}
                      className="bg-background border border-outline-variant/30 text-on-surface font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 focus:outline-none focus:border-primary cursor-pointer disabled:opacity-50"
                    >
                      <option value="Pending">Pending Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Declined">Declined</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>

                {/* Primary properties segment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-primary uppercase tracking-widest block">Projected Date</span>
                    <p className="text-on-surface font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-outline" /> {selectedInquiry.date}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-primary uppercase tracking-widest block">Event Destination</span>
                    <p className="text-on-surface font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-outline" /> {selectedInquiry.location}
                    </p>
                  </div>
                </div>

                {/* Narrative Message */}
                <div className="space-y-2 bg-background p-6 border border-outline-variant/10 rounded">
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-primary" /> Storytelling Vision / Brief
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-light tracking-wider whitespace-pre-wrap">
                    &ldquo;{selectedInquiry.message}&rdquo;
                  </p>
                </div>

                {/* Internal Studio Production Notes */}
                <div className="space-y-4 pt-4 border-t border-outline-variant/10">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] text-primary uppercase tracking-widest block">
                      Internal Studio Notes (Private)
                    </span>
                    {!isEditingNotes && (
                      <button
                        onClick={() => setIsEditingNotes(true)}
                        className="text-[10px] font-sans uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit Notes
                      </button>
                    )}
                  </div>

                  {isEditingNotes ? (
                    <div className="space-y-3">
                      <textarea
                        rows={4}
                        value={editingNotes}
                        onChange={(e) => setEditingNotes(e.target.value)}
                        placeholder="Add key parameters, pricing variables, drone specifications, or call summaries..."
                        className="w-full bg-background border border-outline-variant/30 px-4 py-3 text-xs tracking-wider text-on-surface focus:outline-none focus:border-primary transition-colors duration-300 resize-none leading-relaxed"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setIsEditingNotes(false)}
                          className="px-4 py-1.5 border border-outline-variant/20 text-on-surface-variant font-sans text-[10px] uppercase tracking-wider rounded hover:text-on-surface cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveNotes}
                          disabled={isPending}
                          className="px-5 py-1.5 bg-primary text-background font-sans text-[10px] uppercase tracking-widest font-bold rounded cursor-pointer flex items-center gap-1 disabled:opacity-50"
                        >
                          <Save className="w-3.5 h-3.5" /> Save Note
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-surface-dim p-4 border border-outline-variant/10 rounded min-h-20">
                      {selectedInquiry.notes ? (
                        <p className="text-xs text-on-surface font-light tracking-wide whitespace-pre-wrap">
                          {selectedInquiry.notes}
                        </p>
                      ) : (
                        <p className="text-xs text-on-surface-variant font-light italic text-center py-4">
                          No internal production notes recorded. Click &lsquo;Edit Notes&rsquo; to log details.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Danger actions row */}
                <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                  <button
                    onClick={() => handleUpdateStatus(selectedInquiry.id, 'Archived')}
                    disabled={isPending}
                    className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-on-surface flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    title="Archive this brief"
                  >
                    <Archive className="w-4 h-4 text-outline" /> Archive Entry
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Delete this inquiry from memory permanently? This action is irreversible.')) {
                        handleDelete(selectedInquiry.id);
                      }
                    }}
                    disabled={isPending}
                    className="font-sans text-[10px] uppercase tracking-widest text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    title="Delete brief"
                  >
                    <Trash2 className="w-4 h-4" /> Delete entry
                  </button>
                </div>

              </div>
            ) : (
              <div className="h-full border border-dashed border-outline-variant/10 flex items-center justify-center p-20 text-center rounded">
                <p className="font-sans text-xs text-on-surface-variant">Select an active brief sheet from the sidebar to inspect parameters.</p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}