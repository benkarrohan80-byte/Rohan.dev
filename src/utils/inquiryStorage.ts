import { Inquiry } from '../types';
import { db } from '../firebase';
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

export async function syncInquiriesWithServer(): Promise<Inquiry[]> {
  try {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry));
  } catch (error) {
    console.error('Error fetching inquiries from Firestore:', error);
    return [];
  }
}

export function subscribeToInquiries(callback: (inquiries: Inquiry[]) => void): () => void {
  const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const inquiries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry));
    callback(inquiries);
  }, (error) => {
    console.error('Error listening to inquiries:', error);
  });
}

export async function addInquiry(inquiry: Omit<Inquiry, 'id' | 'status' | 'createdAt'>): Promise<Inquiry> {
  const newInquiryId = `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const newInquiry: Inquiry = {
    ...inquiry,
    id: newInquiryId,
    status: 'new',
    createdAt: new Date().toISOString()
  };

  try {
    await setDoc(doc(db, 'inquiries', newInquiryId), newInquiry);
    return newInquiry;
  } catch (error) {
    console.error('Error adding inquiry to Firestore:', error);
    throw error;
  }
}

export async function updateInquiryStatus(id: string, status: Inquiry['status']): Promise<void> {
  try {
    await updateDoc(doc(db, 'inquiries', id), { status });
  } catch (error) {
    console.error('Error updating inquiry status in Firestore:', error);
    throw error;
  }
}

export async function deleteInquiry(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'inquiries', id));
  } catch (error) {
    console.error('Error deleting inquiry from Firestore:', error);
    throw error;
  }
}


