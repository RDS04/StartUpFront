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
 * Membuka Popup Google Sign-In dan mengembalikan Google ID Token (credential JWT)
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

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
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
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Jika One-Tap terhalang (misal browser memblokir third-party cookies)
          console.warn('Google One Tap tidak tampil:', notification.getNotDisplayedReason?.());
        }
      });
    } catch (err: any) {
      reject(err);
    }
  });
}
