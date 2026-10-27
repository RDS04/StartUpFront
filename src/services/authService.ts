// Base URL API Laravel
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export interface AuthUser {
  id?: number | string;
  name?: string;
  email: string;
  avatar?: string;
  google_id?: string;
  phone?: string;
  source?: 'form' | 'google';
  has_paid_orders?: boolean;
  total_orders?: number;
  created_at?: string;
}

export interface AuthResponse {
  status: boolean;
  message: string;
  user: AuthUser;
  token?: string;
  errors?: Record<string, string[]>;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Registrasi user baru ke backend Laravel
 */
export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.message || (data.errors ? Object.values(data.errors).flat().join(', ') : 'Gagal melakukan pendaftaran akun.');
    throw new Error(errorMsg);
  }

  if (data.token) {
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('auth_user', JSON.stringify(data.user));
  }

  return data;
}

/**
 * Login akun menggunakan email dan password ke backend Laravel
 */
export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let data: any = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const error: any = new Error(data.message || 'Email atau kata sandi tidak valid.');
    error.account_deleted = !!data.account_deleted;
    error.account_not_found = !!data.account_not_found;
    error.email = data.email || payload.email;
    error.status = response.status;
    error.data = data;
    throw error;
  }

  if (data.token) {
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('auth_user', JSON.stringify(data.user));
  }

  return data;
}

/**
 * Mengirim ID Token Google ke backend Laravel untuk login / register
 */
export async function authenticateWithGoogle(
  idToken: string, 
  mode: 'login' | 'register' = 'login'
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 
        id_token: idToken,
        mode: mode,
      }),
    });

    let data: any = {};
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      let msg = data.message || 'Maaf, coba ulangi lagi.';
      if (/curl|timed?\s*out|connection|failed to fetch|network|server error|tokeninfo|http/i.test(msg)) {
        msg = 'Maaf, coba ulangi lagi.';
      }
      const error: any = new Error(msg);
      error.account_deleted = !!data.account_deleted;
      error.not_registered = !!data.not_registered;
      error.already_registered = !!data.already_registered;
      error.email = data.email;
      error.name = data.name;
      error.status = response.status;
      error.data = data;
      throw error;
    }

    // Simpan token ke localStorage jika ada
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
    }

    return data;
  } catch (err: any) {
    // Jika error memiliki status khusus dari backend (account_deleted / not_registered / already_registered)
    if (err.account_deleted || err.not_registered || err.already_registered) {
      throw err;
    }

    let msg = err.message || 'Maaf, coba ulangi lagi.';
    if (/curl|timed?\s*out|connection|failed to fetch|network|load failed|server error|tokeninfo|http/i.test(msg)) {
      msg = 'Maaf, coba ulangi lagi.';
    }

    const sanitizedError: any = new Error(msg);
    sanitizedError.account_deleted = !!err.account_deleted;
    sanitizedError.not_registered = !!err.not_registered;
    sanitizedError.already_registered = !!err.already_registered;
    sanitizedError.email = err.email;
    sanitizedError.name = err.name;
    sanitizedError.status = err.status;
    sanitizedError.data = err.data;
    throw sanitizedError;
  }
}

/**
 * Cek apakah email user pernah dihapus oleh Master
 */
export async function checkAccountDeleted(email: string): Promise<{ deleted: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/check-deleted?email=${encodeURIComponent(email)}`);
    return await res.json();
  } catch {
    return { deleted: false };
  }
}

/**
 * Mendapatkan auth token dari localStorage
 */
export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

/**
 * Mendapatkan user yang tersimpan di localStorage
 */
export function getSavedAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Mengambil profil user terbaru dari API backend
 */
export async function fetchCurrentUser(): Promise<AuthUser | null> {
  const token = getAuthToken();
  if (!token) {
    localStorage.removeItem('auth_user');
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        const savedUser = getSavedAuthUser();
        const savedEmail = savedUser?.email;
        await logoutAuth();
        if (savedEmail) {
          try {
            const chk = await checkAccountDeleted(savedEmail);
            if (chk.deleted) {
              sessionStorage.setItem('ij_account_deleted_notice', JSON.stringify({
                email: savedEmail,
                message: 'Akun tidak ditemukan. Akun Anda telah dihapus oleh Master Administrator.'
              }));
            }
          } catch {
            // ignore
          }
        }
      }
      return null;
    }

    const data = await response.json();
    if (data.user) {
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      return data.user;
    }
    return null;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

/**
 * Logout dan cabut token di server & hapus dari localStorage
 */
export async function logoutAuth(): Promise<void> {
  const token = getAuthToken();
  if (token) {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch {
      // Abaikan jika network error saat logout
    }
  }

  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  localStorage.removeItem('ij_dashboard_data');
  localStorage.removeItem('ij_dashboard_data_guest');

  try {
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('ij_dashboard_data') || key.startsWith('ij_guests') || key.startsWith('ij_wishes'))) {
        toRemove.push(key);
      }
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
  } catch (e) {
    console.warn('Error clearing dashboard local storage:', e);
  }

  // Matikan auto-select akun Google agar user bisa memilih akun Google lain saat login ulang
  if (typeof window !== 'undefined' && window.google?.accounts?.id?.disableAutoSelect) {
    try {
      window.google.accounts.id.disableAutoSelect();
    } catch (e) {
      console.warn('GSI disableAutoSelect error:', e);
    }
  }
}
