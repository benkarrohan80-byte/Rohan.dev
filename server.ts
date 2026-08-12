import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

// Enable JSON and CORS middleware
app.use(express.json());
app.use(cors());

// Local Database File Path (for fallback storage when MongoDB is not connected)
const JSON_FILE_PATH = path.join(process.cwd(), 'inquiries.json');

// Types definition matching the application types
interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'archived' | 'rejected' | 'cancelled';
  createdAt: string;
}

// Mock seed data
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

// JSON File Database Helpers
function readJsonDb(): Inquiry[] {
  try {
    if (!fs.existsSync(JSON_FILE_PATH)) {
      fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(MOCK_INQUIRIES, null, 2));
      return MOCK_INQUIRIES;
    }
    const data = fs.readFileSync(JSON_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON database:', error);
    return MOCK_INQUIRIES;
  }
}

function writeJsonDb(inquiries: Inquiry[]): void {
  try {
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(inquiries, null, 2));
  } catch (error) {
    console.error('Error writing JSON database:', error);
  }
}

// MongoDB Setup & Models
let isUsingMongo = false;
const InquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  service: { type: String, default: 'Business Website' },
  message: { type: String, default: '' },
  status: { type: String, default: 'new' },
  createdAt: { type: String, required: true }
});

const InquiryModel = mongoose.models.Inquiry || mongoose.model<any>('Inquiry', InquirySchema);

// Async MongoDB Connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Successfully connected to MongoDB Database.');
      isUsingMongo = true;
    })
    .catch((err) => {
      console.warn('MongoDB connection failed. Falling back to local inquiries.json file storage. Error:', err.message);
    });
} else {
  console.log('No MONGODB_URI found. Using persistent inquiries.json file storage.');
}

// Mail Transporter Helper
function getMailTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: user,
      pass: pass
    }
  });
}

// Send Mail Notification helper
async function sendInquiryNotification(inquiry: Inquiry) {
  const recipient = process.env.NOTIFICATION_EMAIL || 'rohantraders8421@gmail.com';
  const transporter = getMailTransporter();

  const emailSubject = `🚀 New Project Inquiry from ${inquiry.name} (${inquiry.service})`;
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #4f46e5; color: #ffffff; padding: 24px; text-align: center;">
        <h2 style="margin: 0; font-size: 24px; font-weight: bold;">New Inquiry Received!</h2>
        <p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 14px;">Portfolio Website Form Submission</p>
      </div>
      <div style="padding: 24px; background-color: #ffffff;">
        <p style="font-size: 16px; margin-top: 0;">Hello Rohan,</p>
        <p style="font-size: 15px;">You have received a new website project request. Here are the submission details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px; font-weight: bold; width: 130px; border-bottom: 1px solid #f1f5f9; color: #475569;">Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${inquiry.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Email Address:</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="mailto:${inquiry.email}" style="color: #4f46e5; text-decoration: none;">${inquiry.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Phone Number:</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${inquiry.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Service Required:</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><span style="background-color: #e0e7ff; color: #4338ca; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: bold;">${inquiry.service}</span></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Submitted At:</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 13px;">${new Date(inquiry.createdAt).toLocaleString()}</td>
          </tr>
        </table>
        
        <div style="margin-top: 24px;">
          <h3 style="font-size: 16px; margin-bottom: 8px; color: #334155; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px;">Project Description:</h3>
          <p style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #4f46e5; font-style: italic; color: #334155; margin: 0;">
            ${inquiry.message || 'No project description provided.'}
          </p>
        </div>
        
        <div style="margin-top: 32px; text-align: center;">
          <a href="mailto:${inquiry.email}" style="background-color: #4f46e5; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">Reply to Client</a>
        </div>
      </div>
      <div style="background-color: #f1f5f9; text-align: center; padding: 16px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
        This email was automatically dispatched by your Rohan.dev Portfolio Backend API.
      </div>
    </div>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Rohan Portfolio" <${process.env.SMTP_USER}>`,
        to: recipient,
        subject: emailSubject,
        html: emailHtml
      });
      console.log(`[Nodemailer] Successfully sent notification email to ${recipient} for inquiry: ${inquiry.id}`);
    } catch (err: any) {
      console.error('[Nodemailer] Failed to send email:', err.message);
    }
  } else {
    console.log(`[Nodemailer Simulation] SMTP not configured. Notification details for ${recipient}:\nSubject: ${emailSubject}\nInquiry Name: ${inquiry.name}\nEmail: ${inquiry.email}\nService: ${inquiry.service}`);
  }
}

// API ROUTE: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: isUsingMongo ? 'MongoDB' : 'Local File JSON', timestamp: new Date() });
});

// API ROUTE: Get all inquiries
app.get('/api/inquiries', async (req, res) => {
  try {
    if (isUsingMongo) {
      const dbInquiries = await InquiryModel.find().sort({ createdAt: -1 });
      return res.json(dbInquiries);
    } else {
      const localInquiries = readJsonDb();
      return res.json(localInquiries);
    }
  } catch (error: any) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: 'Failed to retrieve inquiries', details: error.message });
  }
});

// API ROUTE: Create inquiry
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required fields.' });
    }

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      email,
      phone: phone || '',
      service: service || 'Business Website',
      message: message || '',
      status: 'new',
      createdAt: new Date().toISOString()
    };

    if (isUsingMongo) {
      const mongoInquiry = new InquiryModel(newInquiry);
      await mongoInquiry.save();
    } else {
      const localInquiries = readJsonDb();
      localInquiries.unshift(newInquiry);
      writeJsonDb(localInquiries);
    }

    // Trigger async email notification
    sendInquiryNotification(newInquiry);

    res.status(201).json({ success: true, inquiry: newInquiry });
  } catch (error: any) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ error: 'Failed to store inquiry', details: error.message });
  }
});

// API ROUTE: Update inquiry status
app.patch('/api/inquiries/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'contacted', 'archived', 'rejected', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value. Must be one of ' + validStatuses.join(', ') });
    }

    if (isUsingMongo) {
      const inquiry = await InquiryModel.findOne({ id });
      if (!inquiry) {
        return res.status(404).json({ error: 'Inquiry not found.' });
      }
      if (inquiry.status === 'cancelled' && status !== 'cancelled') {
        return res.status(400).json({ error: 'Cannot change status of a cancelled inquiry.' });
      }
      inquiry.status = status;
      await inquiry.save();
      return res.json({ success: true, inquiry });
    } else {
      const localInquiries = readJsonDb();
      const index = localInquiries.findIndex(inq => inq.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Inquiry not found.' });
      }
      if (localInquiries[index].status === 'cancelled' && status !== 'cancelled') {
        return res.status(400).json({ error: 'Cannot change status of a cancelled inquiry.' });
      }
      localInquiries[index].status = status;
      writeJsonDb(localInquiries);
      return res.json({ success: true, inquiry: localInquiries[index] });
    }
  } catch (error: any) {
    console.error('Error updating inquiry status:', error);
    res.status(500).json({ error: 'Failed to update inquiry status', details: error.message });
  }
});

// API ROUTE: Delete inquiry
app.delete('/api/inquiries/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingMongo) {
      const deleted = await InquiryModel.findOneAndDelete({ id });
      if (!deleted) {
        return res.status(404).json({ error: 'Inquiry not found.' });
      }
      return res.json({ success: true, message: 'Inquiry deleted successfully' });
    } else {
      const localInquiries = readJsonDb();
      const filtered = localInquiries.filter(inq => inq.id !== id);
      if (filtered.length === localInquiries.length) {
        return res.status(404).json({ error: 'Inquiry not found.' });
      }
      writeJsonDb(filtered);
      return res.json({ success: true, message: 'Inquiry deleted successfully' });
    }
  } catch (error: any) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ error: 'Failed to delete inquiry', details: error.message });
  }
});

// Create full-stack dev/production integration
async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
    console.log('Vite development server mounted as middleware.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production-built static files from /dist.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express Server booting up on port ${PORT}`);
    console.log(`Backend services are available at /api/*`);
  });
}

startServer();
