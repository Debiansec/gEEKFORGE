import { PortfolioMediaItem } from '../types';

export interface UploadMediaResult {
  url: string;
  type: 'image' | 'video';
  original_name: string;
  size: number;
  mime_type: string;
}

export interface AdminUser {
  email: string;
  role: string;
}

/**
 * Public Visitor query to retrieve published portfolio media.
 * Returns strictly media uploaded by authenticated_admin, in category
 * "Android Mobile Apps & eCommerce Showcase" and marked published = true.
 */
export async function fetchVisitorPortfolio(): Promise<PortfolioMediaItem[]> {
  try {
    const res = await fetch('/api/portfolio', {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch visitor portfolio: ${res.statusText}`);
    }
    const data = await res.json();
    return Array.isArray(data.items) ? data.items : [];
  } catch (error) {
    console.error('fetchVisitorPortfolio error:', error);
    return [];
  }
}

/**
 * Admin Login
 */
export async function loginAdmin(email: string, password: string): Promise<{ token: string; admin: AdminUser }> {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Authentication failed');
  }

  return {
    token: data.token,
    admin: data.admin,
  };
}

/**
 * Verify existing token
 */
export async function verifyAdminToken(token: string): Promise<AdminUser | null> {
  try {
    const res = await fetch('/api/admin/verify', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.admin || null;
  } catch {
    return null;
  }
}

/**
 * Admin: Fetch all portfolio items (both published and draft)
 */
export async function fetchAdminPortfolio(token: string): Promise<PortfolioMediaItem[]> {
  const res = await fetch('/api/admin/portfolio', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to fetch admin portfolio');
  }

  const data = await res.json();
  return Array.isArray(data.items) ? data.items : [];
}

/**
 * Admin: Upload Media (image or video)
 */
export async function uploadMediaFile(file: File, token: string): Promise<UploadMediaResult> {
  const formData = new FormData();
  formData.append('media', file);

  const res = await fetch('/api/admin/portfolio/upload-media', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Media upload failed');
  }

  return data.media;
}

/**
 * Admin: Create Portfolio Database Record
 */
export async function createPortfolioRecord(
  token: string,
  recordData: Partial<PortfolioMediaItem> & { title: string; media_url: string }
): Promise<PortfolioMediaItem> {
  const res = await fetch('/api/admin/portfolio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(recordData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to create portfolio database record');
  }

  return data.item;
}

/**
 * Admin: Update Portfolio Record (Edit metadata, toggle published, set featured, replace media)
 */
export async function updatePortfolioRecord(
  token: string,
  id: string,
  updateData: Partial<PortfolioMediaItem>
): Promise<PortfolioMediaItem> {
  const res = await fetch(`/api/admin/portfolio/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update portfolio record');
  }

  return data.item;
}

/**
 * Admin: Reorder items
 */
export async function reorderPortfolioRecords(token: string, itemIds: string[]): Promise<PortfolioMediaItem[]> {
  const res = await fetch('/api/admin/portfolio-reorder', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ itemIds }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to reorder portfolio');
  }

  return data.items || [];
}

/**
 * Admin: Delete Portfolio Record and Media
 */
export async function deletePortfolioRecord(token: string, id: string): Promise<void> {
  const res = await fetch(`/api/admin/portfolio/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to delete portfolio record');
  }
}
