import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Inquiry } from '../types';

const STORAGE_KEY = 'rohan_portfolio_inquiries';
const COLLECTION_NAME = 'inquiries';

const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Arun Sharma',
    email: 'arun.sharma@example.com',
    phone: '+91 98123 45678',
    service: 'Business Website',
    message: 'Hello Rohan, I run a boutique clothing brand in New Delhi and need a highly aesthetic, responsive showcase website to feature our new collection and list our contact detail links. Let me know your pricing and timelines.',
    status: 'new',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
  },
  {
    id: 'inq-2',
    name: 'Dr. Neha Patel',
    email: 'dr.neha.dental@example.com',
    phone: '+91 99222 33344',
    service: 'Landing Page',
    message: 'I am a specialized orthodontist looking for a modern appointment landing page with local Google Maps direction buttons and smooth mobile layouts. Fast delivery is highly preferred.',
    status: 'contacted',
    createdAt: new Date(Date.now() - 1.5 * 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'inq-3',
    name: 'Rahul Roy',
    email: 'roy.solutions@example.com',
    phone: '',
    service: 'Website Redesign',
    message: 'We have an existing corporate website built 6 years ago. It looks outdated and loads slowly on mobile devices. We would love a full modernization with cool dark mode layouts and clean code.',
    status: 'archived',
    createdAt: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString()
  }
];

export function getInquiries(): Inquiry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
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

// Subscribe to real-time updates from Firebase Firestore
export function subscribeInquiries(callback: (inquiries: Inquiry[]) => void) {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const items: Inquiry[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as Omit<Inquiry, 'id'>;
        items.push({
          ...data,
          id: docSnap.id
        });
      });
      saveInquiries(items);
      callback(items);
    }, (error) => {
      console.warn('Firestore snapshot listener error:', error);
      callback(getInquiries());
    });
  } catch (e) {
    console.warn('Could not initialize Firestore snapshot subscription:', e);
    callback(getInquiries());
    return () => {};
  }
}

// Fetch inquiries from Firebase Firestore and update local storage
export async function syncInquiriesWithServer(): Promise<Inquiry[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const items: Inquiry[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as Omit<Inquiry, 'id'>;
      items.push({
        ...data,
        id: docSnap.id
      });
    });
    if (items.length > 0) {
      saveInquiries(items);
      return items;
    }
  } catch (e) {
    console.warn('Firestore fetch failed or offline:', e);
  }
  return getInquiries();
}

export function addInquiry(inquiry: Omit<Inquiry, 'id' | 'status' | 'createdAt'>): Inquiry {
  const newId = `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const newInquiry: Inquiry = {
    ...inquiry,
    id: newId,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  
  const inquiries = getInquiries();
  inquiries.unshift(newInquiry);
  saveInquiries(inquiries);

  // Write directly to Firestore
  try {
    const docRef = doc(db, COLLECTION_NAME, newId);
    setDoc(docRef, newInquiry).catch(err => console.warn('Firestore write error:', err));
  } catch (e) {
    console.warn('Firestore save error:', e);
  }

  return newInquiry;
}

export function updateInquiryStatus(id: string, status: Inquiry['status']): Inquiry[] {
  const inquiries = getInquiries();
  const inquiry = inquiries.find(item => item.id === id);
  
  if (inquiry && inquiry.status === 'cancelled' && status !== 'cancelled') {
    return inquiries;
  }

  const updated = inquiries.map(item => 
    item.id === id ? { ...item, status } : item
  );
  saveInquiries(updated);

  // Update in Firestore
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    updateDoc(docRef, { status }).catch(err => console.warn('Firestore status update error:', err));
  } catch (e) {
    console.warn('Firestore update error:', e);
  }

  return updated;
}

export function deleteInquiry(id: string): Inquiry[] {
  const inquiries = getInquiries();
  const filtered = inquiries.filter(item => item.id !== id);
  saveInquiries(filtered);

  // Delete from Firestore
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    deleteDoc(docRef).catch(err => console.warn('Firestore delete error:', err));
  } catch (e) {
    console.warn('Firestore delete error:', e);
  }

  return filtered;
}

export async function clearAllInquiriesFromFirestore(): Promise<void> {
  saveInquiries([]);
  try {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, COLLECTION_NAME, d.id)));
    await Promise.all(deletePromises);
  } catch (e) {
    console.warn('Error clearing Firestore collection:', e);
  }
}
