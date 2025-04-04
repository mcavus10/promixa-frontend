/**
 * User API service
 * Manages user profile and settings operations
 */

import { getAuthToken } from './auth';
import { AuthResponse } from './auth';

// Vercel'de tanımlanan ortam değişkenini kullan
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * Fetch current user profile data
 */
export async function fetchCurrentUser(): Promise<AuthResponse> {
  const token = getAuthToken();
  if (!token) throw new Error('Not authenticated');
  
  const response = await fetch(`${API_URL}/api/user/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication expired');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch user data');
  }

  return response.json();
}

/**
 * Update user name
 */
export async function updateUserName(newName: string): Promise<any> {
  const token = getAuthToken();
  if (!token) throw new Error('Not authenticated');
  
  const response = await fetch(`${API_URL}/api/user/me/name`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name: newName })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update name');
  }

  return response.json();
}

/**
 * Update user password
 */
export interface PasswordUpdateRequest {
  currentPassword: string;
  newPassword: string;
}

export async function updateUserPassword(data: PasswordUpdateRequest): Promise<any> {
  const token = getAuthToken();
  if (!token) throw new Error('Not authenticated');
  
  const response = await fetch(`${API_URL}/api/user/me/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update password');
  }

  return response.json();
}
