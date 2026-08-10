import { Inquiry } from '../types';

const STORAGE_KEY = 'rohan_portfolio_inquiries';

const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Arun Sharma',
    email: 'arun.sharma@example.com',
    phone: '+91 98123 45678',
    service: 'Business Website',
    message: 'Hello Rohan, I run a boutique clothing brand in New Delhi and need a highly aesthetic, responsive showcase website to feature our new collection and list our contact detail links. Let me know your pricing and timelines.',
    status: 'new',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString() // 4 hours ago
  },
  {
    id: 'inq-2',
    name: 'Dr. Neha Patel',
    email: 'dr.neha.dental@example.com',
    phone: '+91 99222 33344',
    service: 'Landing Page',
    message: 'I am a specialized orthodontist looking for a modern appointment landing page with local Google Maps direction buttons and smooth mobile layouts. Fast delivery is highly preferred.',
    status: 'contacted',
    createdAt: new Date(Date.now() - 1.5 * 24 * 3600 * 1000).toISOString() // 1.5 days ago
  },
  {
    id: 'inq-3',
    name: 'Rahul Roy',
    email: 'roy.solutions@example.com',
    phone: '',
    service: 'Website Redesign',
    message: 'We have an existing corporate website built 6 years ago. It looks outdated and loads slowly on mobile devices. We would love a full modernization with cool dark mode layouts and clean code.',
    status: 'archived',
    createdAt: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString() // 6 days ago
  }
];

export function getInquiries(): Inquiry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // Seed with mock inquiries on first run
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_INQUIRIES));
      return MOCK_INQUIRIES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading inquiries from localStorage:', error);
    return [];
  }
}

export function saveInquiries(inquiries: Inquiry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  } catch (error) {
    console.error('Error writing inquiries to localStorage:', error);
  }
}

// Background sync to server helper
async function safeFetch(url: string, options: RequestInit) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const errText = await res.text();
      console.warn(`Server request failed: ${url}`, errText);
    }
    return res;
  } catch (e) {
    console.warn(`Could not connect to backend server for sync: ${url}. Operating in local storage mode.`);
  }
}

// Fetch inquiries from server and update local storage
export async function syncInquiriesWithServer(): Promise<Inquiry[]> {
  try {
    const res = await fetch('/api/inquiries');
    if (res.ok) {
      const serverInquiries = await res.json();
      if (Array.isArray(serverInquiries)) {
        saveInquiries(serverInquiries);
        return serverInquiries;
      }
    }
  } catch (e) {
    console.warn('Backend server is offline or loading. Operating on cached local storage inquiries.');
  }
  return getInquiries();
}

export function addInquiry(inquiry: Omit<Inquiry, 'id' | 'status' | 'createdAt'>): Inquiry {
  const inquiries = getInquiries();
  const newInquiry: Inquiry = {
    ...inquiry,
    id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  
  inquiries.unshift(newInquiry); // Add to the beginning of list
  saveInquiries(inquiries);

  // Sync to Server in background
  safeFetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiry)
  });

  return newInquiry;
}

export function updateInquiryStatus(id: string, status: Inquiry['status']): Inquiry[] {
  const inquiries = getInquiries();
  const inquiry = inquiries.find(item => item.id === id);
  
  if (inquiry && inquiry.status === 'cancelled' && status !== 'cancelled') {
    // If it's already cancelled, don't allow changing to anything else
    return inquiries;
  }

  const updated = inquiries.map(item => 
    item.id === id ? { ...item, status } : item
  );
  saveInquiries(updated);

  // Sync to Server in background
  safeFetch(`/api/inquiries/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });

  return updated;
}

export function deleteInquiry(id: string): Inquiry[] {
  const inquiries = getInquiries();
  const filtered = inquiries.filter(item => item.id !== id);
  saveInquiries(filtered);

  // Sync to Server in background
  safeFetch(`/api/inquiries/${id}`, {
    method: 'DELETE'
  });

  return filtered;
}

