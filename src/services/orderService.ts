import { getAuthToken } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export interface CreateOrderPayload {
  plan_name: string;
  template_id: string;
  template_name: string;
  plan_price: number;
  total_amount: number;
  payment_method: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  couple_names?: string;
  discount?: number;
  admin_fee?: number;
  unique_code?: number;
}

export interface OrderItem {
  id: number;
  plan_name: string;
  template_id: string;
  template_name: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  couple_names?: string;
  plan_price: number;
  admin_fee: number;
  discount: number;
  unique_code: number;
  total_amount: number;
  payment_method: string;
  status: string;
  created_at: string;
}

export interface CreateOrderResponse {
  status: boolean;
  message: string;
  order: OrderItem;
  snap_token?: string | null;
  redirect_url?: string | null;
  client_key?: string;
}

export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Gagal menyimpan pesanan.');
  }

  return data;
}

export async function markOrderPaid(orderId: number): Promise<{ status: boolean; message: string; order: OrderItem }> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/orders/${orderId}/mark-paid`, {
    method: 'POST',
    headers,
  });

  const data = await response.json();
  return data;
}

export async function getMyOrders(): Promise<OrderItem[]> {
  const token = getAuthToken();
  if (!token) return [];

  try {
    const response = await fetch(`${API_BASE_URL}/orders/my-orders`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) return [];
    const data = await response.json();
    return data.status && Array.isArray(data.orders) ? data.orders : [];
  } catch {
    return [];
  }
}
