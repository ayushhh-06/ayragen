const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3007/api';

export const apiClient = {
  async get(endpoint: string) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    const res = await fetch(`${baseURL}${endpoint}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error(await res.text());
    return { data: await res.json() };
  },

  async post(endpoint: string, body: any) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    const res = await fetch(`${baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Request failed' }));
      throw { response: { data: errorData } };
    }
    return { data: await res.json() };
  }
};
