export type PageTab = 'home' | 'archives' | 'story' | 'inquire' | 'inbox';

export type ArchiveTab = 'motion' | 'stills';

export interface MotionItem {
  id: string;
  title: string;
  category: string;
  year: string;
  videoUrl?: string; // We can use elegant video loops or interactive playbacks
  imageUrl: string;
  duration: string;
}

export interface StillItem {
  id: string;
  imageUrl: string;
  aspectRatio: string;
  title: string;
  location: string;
  altText: string;
}

export interface Inquiry {
  id: string;
  name: string;
  date: string;
  location: string;
  message: string;
  createdAt: string;
  status: 'Pending' | 'Approved' | 'Declined' | 'Archived';
  notes?: string;
}
