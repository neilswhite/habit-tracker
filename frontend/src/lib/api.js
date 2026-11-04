const API_BASE = '/api';

export async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const detail = Array.isArray(error.detail)
      ? error.detail.map((d) => d?.msg).filter(Boolean).join('; ')
      : error.detail;
    throw new Error(detail || 'An error occurred');
  }

  if (response.status === 204) return null;
  return response.json();
}
