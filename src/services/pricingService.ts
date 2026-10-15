const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export interface PricingPlanData {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  price: number;
  originalPrice: number | null;
  formattedPrice: string;
  formattedOriginalPrice: string | null;
  guaranteeText: string;
  ctaText: string;
  isPopular: boolean;
  features: string[];
}

/**
 * Fetch dynamic pricing plans from backend Laravel API
 */
export async function getPricingPlans(): Promise<PricingPlanData[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/pricing-plans`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
  } catch (err) {
    console.warn('Backend pricing plans fetch failed, falling back to local plans:', err);
  }
  return null;
}
