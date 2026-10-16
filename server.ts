import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';

export interface AdminPortfolioRecord {
  id: string;
  title: string;
  client: string;
  description: string;
  portfolio_category: "Android Mobile Apps & eCommerce Showcase";
  media_url: string;
  media_type: "image" | "video";
  media_original_name: string;
  media_size: number;
  uploaded_by: "authenticated_admin";
  uploaded_by_email: string;
  published: boolean;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  platform: string;
  year: string;
  accent_color: string;
  features: string[];
  metrics: { label: string; value: string }[];
}

// Persistent Storage Directories
const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
const DB_FILE = path.join(DATA_DIR, 'portfolio_db.json');

// Ensure storage directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Ensure database file exists with STRICTLY EMPTY portfolio by default (NO SAMPLE DATA, NO SEEDING)
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
}

function readPortfolioDb(): AdminPortfolioRecord[] {
  try {
    if (!fs.existsSync(DB_FILE)) return [];
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading portfolio database:', err);
    return [];
  }
}

function writePortfolioDb(records: AdminPortfolioRecord[]): void {
  fs.writeFileSync(DB_FILE, JSON.stringify(records, null, 2), 'utf-8');
}

// Admin tokens memory storage (or stateless HMAC verification)
const JWT_SECRET = process.env.ADMIN_SECRET_KEY || 'geekforge-super-secure-admin-secret-key-2026';
const ADMIN_EMAILS = [
  'asdsoft777@gmail.com',
  'admin@geekforge.co.za',
  (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
].filter(Boolean);

// For prototype/live admin testing, default password is provided while allowing custom override
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'GeekForgeAdmin2026!';

function createAdminToken(email: string): string {
  const payload = {
    email,
    role: 'authenticated_admin',
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
  };
  const str = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(str).digest('base64url');
  return `${str}.${signature}`;
}

function verifyAdminToken(token: string): { email: string; role: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [payloadStr, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(payloadStr).digest('base64url');
    if (signature !== expectedSig) return null;

    const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf-8'));
    if (payload.exp < Date.now()) return null;
    if (payload.role !== 'authenticated_admin') return null;
    return payload;
  } catch {
    return null;
  }
}

// Multer storage for media uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}`;
    cb(null, `portfolio-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB max for video/high-res images
  },
  fileFilter: (_req, file, cb) => {
    // Allow images and common web video formats
    const allowedMime = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/quicktime'
    ];
    if (allowedMime.includes(file.mimetype) || file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video media files are supported'));
    }
  },
});

interface AuthRequest extends Request {
  adminUser?: { email: string; role: string };
}

// Admin authorization middleware
function requireAdminAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized: Admin authentication token required to modify or publish portfolio media.'
    });
  }

  const token = authHeader.split(' ')[1];
  const verified = verifyAdminToken(token);
  if (!verified) {
    return res.status(403).json({
      error: 'Forbidden: Invalid or expired admin session token.'
    });
  }

  req.adminUser = verified;
  next();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Serve uploaded media files directly from persistent storage
  app.use('/uploads', express.static(UPLOADS_DIR));

  // ==========================================
  // PUBLIC VISITOR API ROUTES (READ-ONLY)
  // ==========================================

  /**
   * Visitor Portfolio Query:
   * STRICT REQUIREMENT: Retrieve ONLY records where:
   * portfolio_category = "Android Mobile Apps & eCommerce Showcase"
   * AND uploaded_by is an authorized administrator
   * AND published = true
   */
  app.get('/api/portfolio', (_req: Request, res: Response) => {
    const allRecords = readPortfolioDb();
    const visitorRecords = allRecords
      .filter((record) =>
        record.portfolio_category === "Android Mobile Apps & eCommerce Showcase" &&
        record.uploaded_by === "authenticated_admin" &&
        record.published === true
      )
      .sort((a, b) => a.display_order - b.display_order);

    res.json({
      category: "Android Mobile Apps & eCommerce Showcase",
      total: visitorRecords.length,
      items: visitorRecords,
    });
  });

  // Public health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      portfolioCount: readPortfolioDb().length,
    });
  });

  // ==========================================
  // ADMIN AUTHENTICATION ROUTES
  // ==========================================

  app.post('/api/admin/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const isAllowedEmail = ADMIN_EMAILS.includes(normalizedEmail);
    const isCorrectPassword = password === ADMIN_PASSWORD;

    if (!isAllowedEmail || !isCorrectPassword) {
      return res.status(401).json({
        error: 'Invalid administrator credentials. Access restricted to authorized admins.'
      });
    }

    const token = createAdminToken(normalizedEmail);
    res.json({
      success: true,
      token,
      admin: {
        email: normalizedEmail,
        role: 'authenticated_admin',
      },
    });
  });

  app.get('/api/admin/verify', requireAdminAuth, (req: AuthRequest, res: Response) => {
    res.json({
      valid: true,
      admin: req.adminUser,
    });
  });

  // ==========================================
  // ADMIN PORTFOLIO MANAGEMENT ROUTES (PROTECTED)
  // ==========================================

  /**
   * Get all portfolio items (including unpublished and draft items) for the administrator
   */
  app.get('/api/admin/portfolio', requireAdminAuth, (_req: AuthRequest, res: Response) => {
    const records = readPortfolioDb().sort((a, b) => a.display_order - b.display_order);
    res.json({
      total: records.length,
      items: records,
    });
  });

  /**
   * Upload Media Step:
   * Accepts image or video file, saves to permanent uploads directory, returns URL
   */
  app.post('/api/admin/portfolio/upload-media', requireAdminAuth, upload.single('media'), (req: AuthRequest, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No media file was uploaded.' });
    }

    const isVideo = req.file.mimetype.startsWith('video/');
    const mediaUrl = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      media: {
        url: mediaUrl,
        type: isVideo ? 'video' : 'image',
        original_name: req.file.originalname,
        size: req.file.size,
        mime_type: req.file.mimetype,
      },
    });
  });

  /**
   * Create Portfolio Database Record:
   * Creates a record linked to the uploaded media
   */
  app.post('/api/admin/portfolio', requireAdminAuth, (req: AuthRequest, res: Response) => {
    const {
      title,
      client,
      description,
      media_url,
      media_type,
      media_original_name,
      media_size,
      published = false,
      featured = false,
      platform = 'Android Mobile App',
      year = new Date().getFullYear().toString(),
      accent_color = '#0066FF',
      features = [],
      metrics = [],
    } = req.body;

    if (!title || !media_url) {
      return res.status(400).json({ error: 'Title and Media URL are required.' });
    }

    const records = readPortfolioDb();
    const newRecord: AdminPortfolioRecord = {
      id: crypto.randomUUID(),
      title: String(title).trim(),
      client: String(client || 'Customer Project').trim(),
      description: String(description || '').trim(),
      portfolio_category: "Android Mobile Apps & eCommerce Showcase",
      media_url: String(media_url),
      media_type: media_type === 'video' ? 'video' : 'image',
      media_original_name: String(media_original_name || 'uploaded_media'),
      media_size: Number(media_size) || 0,
      uploaded_by: "authenticated_admin",
      uploaded_by_email: req.adminUser?.email || 'authenticated_admin',
      published: Boolean(published),
      featured: Boolean(featured),
      display_order: records.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      platform: String(platform || 'Android Mobile App'),
      year: String(year || new Date().getFullYear()),
      accent_color: String(accent_color || '#0066FF'),
      features: Array.isArray(features) ? features : [],
      metrics: Array.isArray(metrics) ? metrics : [],
    };

    records.push(newRecord);
    writePortfolioDb(records);

    res.status(201).json({
      success: true,
      message: newRecord.published ? 'Portfolio media saved and published.' : 'Portfolio media saved as draft.',
      item: newRecord,
    });
  });

  /**
   * Update Portfolio Record (Edit metadata, toggle published, set featured, replace media)
   */
  app.put('/api/admin/portfolio/:id', requireAdminAuth, (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const records = readPortfolioDb();
    const index = records.findIndex((r) => r.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Portfolio record not found.' });
    }

    const existing = records[index];
    const updated: AdminPortfolioRecord = {
      ...existing,
      title: req.body.title !== undefined ? String(req.body.title).trim() : existing.title,
      client: req.body.client !== undefined ? String(req.body.client).trim() : existing.client,
      description: req.body.description !== undefined ? String(req.body.description).trim() : existing.description,
      platform: req.body.platform !== undefined ? String(req.body.platform) : existing.platform,
      year: req.body.year !== undefined ? String(req.body.year) : existing.year,
      accent_color: req.body.accent_color !== undefined ? String(req.body.accent_color) : existing.accent_color,
      published: req.body.published !== undefined ? Boolean(req.body.published) : existing.published,
      featured: req.body.featured !== undefined ? Boolean(req.body.featured) : existing.featured,
      features: Array.isArray(req.body.features) ? req.body.features : existing.features,
      metrics: Array.isArray(req.body.metrics) ? req.body.metrics : existing.metrics,
      // If replacing media
      media_url: req.body.media_url !== undefined ? String(req.body.media_url) : existing.media_url,
      media_type: req.body.media_type !== undefined ? req.body.media_type : existing.media_type,
      media_original_name: req.body.media_original_name !== undefined ? String(req.body.media_original_name) : existing.media_original_name,
      media_size: req.body.media_size !== undefined ? Number(req.body.media_size) : existing.media_size,
      updated_at: new Date().toISOString(),
    };

    records[index] = updated;
    writePortfolioDb(records);

    res.json({
      success: true,
      message: 'Portfolio record updated successfully.',
      item: updated,
    });
  });

  /**
   * Reorder Portfolio Records
   */
  app.put('/api/admin/portfolio-reorder', requireAdminAuth, (req: AuthRequest, res: Response) => {
    const { itemIds } = req.body;
    if (!Array.isArray(itemIds)) {
      return res.status(400).json({ error: 'itemIds array is required.' });
    }

    const records = readPortfolioDb();
    const idToOrder = new Map(itemIds.map((id, idx) => [id, idx + 1]));

    records.forEach((r) => {
      if (idToOrder.has(r.id)) {
        r.display_order = idToOrder.get(r.id)!;
        r.updated_at = new Date().toISOString();
      }
    });

    writePortfolioDb(records);
    res.json({
      success: true,
      message: 'Portfolio items reordered successfully.',
      items: records.sort((a, b) => a.display_order - b.display_order),
    });
  });

  /**
   * Delete Portfolio Record and its stored media file
   */
  app.delete('/api/admin/portfolio/:id', requireAdminAuth, (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const records = readPortfolioDb();
    const index = records.findIndex((r) => r.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Portfolio record not found.' });
    }

    const [deletedRecord] = records.splice(index, 1);
    writePortfolioDb(records);

    // Also attempt to delete the physical uploaded media file if stored locally in UPLOADS_DIR
    if (deletedRecord.media_url && deletedRecord.media_url.startsWith('/uploads/')) {
      const fileName = path.basename(deletedRecord.media_url);
      const filePath = path.join(UPLOADS_DIR, fileName);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn('Failed to delete media file from disk:', e);
        }
      }
    }

    res.json({
      success: true,
      message: 'Portfolio media record and associated storage file deleted.',
      id,
    });
  });

  // ==========================================
  // VITE & STATIC SERVING
  // ==========================================

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GeekForge Full-Stack Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup failure:', err);
});
