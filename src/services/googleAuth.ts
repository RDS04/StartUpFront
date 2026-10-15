declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          prompt: (notification?: (notification: any) => void) => void;
          disableAutoSelect: () => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              type?: 'standard' | 'icon';
              text?: 'signin_with' | 'signup_with' | 'continue_with';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              logo_alignment?: 'left' | 'center';
              width?: number;
            }
          ) => void;
        };
      };
    };
  }
}

let scriptLoadingPromise: Promise<void> | null = null;

/**
 * Memuat SDK resmi Google Identity Services (GSI) secara otomatis
 */
export function loadGoogleScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (scriptLoadingPromise) {
    return scriptLoadingPromise;
  }

  scriptLoadingPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Gagal memuat Google Sign-In SDK')));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Gagal memuat Google Identity Services script'));
    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
}

/**
 * Merender tombol resmi Google Identity Services langsung ke dalam kontainer DOM
 * Memastikan interaksi klik membuka popup resmi pemilih akun Google (Account Chooser)
 */
export async function renderGoogleIdentityButton(
  container: HTMLElement,
  callback: (credential: string) => void,
  text: 'signin_with' | 'signup_with' | 'continue_with' = 'signin_with'
): Promise<void> {
  await loadGoogleScript();

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId || !window.google?.accounts?.id) return;

  try {
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (res) => {
        if (res.credential) callback(res.credential);
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    // Kosongkan kontainer sebelum me-render ulang
    container.innerHTML = '';

    window.google.accounts.id.renderButton(container, {
      theme: 'outline',
      size: 'large',
      type: 'standard',
      text: text,
      shape: 'rectangular',
      width: container.clientWidth || 360,
    });
  } catch (err) {
    console.warn('Gagal merender tombol GIS:', err);
  }
}

/**
 * Mematikan auto-selection akun Google dari browser
 */
export function disableGoogleAutoSelect(): void {
  if (typeof window !== 'undefined' && window.google?.accounts?.id?.disableAutoSelect) {
    try {
      window.google.accounts.id.disableAutoSelect();
    } catch (e) {
      console.warn('GSI disableAutoSelect error:', e);
    }
  }
}

/**
 * Membuka Google One Tap prompt jika diperlukan secara manual
 */
export async function triggerGoogleSignInPrompt(): Promise<string> {
  await loadGoogleScript();

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    throw new Error(
      'VITE_GOOGLE_CLIENT_ID belum diatur di file .env frontend. Silakan masukkan Client ID dari Google Cloud Console.'
    );
  }

  return new Promise((resolve, reject) => {
    if (!window.google?.accounts?.id) {
      reject(new Error('Google Identity Services belum siap. Coba muat ulang halaman.'));
      return;
    }

    let settled = false;

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (settled) return;
          settled = true;
          if (response.credential) {
            resolve(response.credential);
          } else {
            reject(new Error('Tidak menerima kredensial dari Google.'));
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      window.google.accounts.id.prompt((notification) => {
        if (settled) return;
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.warn('Google One Tap tidak tampil:', notification.getNotDisplayedReason?.());
          settled = true;
          reject(new Error('Google One-Tap tidak dapat ditampilkan. Silakan klik tombol Masuk dengan Google secara langsung.'));
        }
      });

      // Safety timeout jika prompt tidak merespons dalam 15 detik
      setTimeout(() => {
        if (!settled) {
          settled = true;
          reject(new Error('Waktu permintaan Google Sign-In habis. Silakan coba klik tombol Google kembali.'));
        }
      }, 15000);
    } catch (err: any) {
      if (!settled) {
        settled = true;
        reject(err);
      }
    }
  });
}
