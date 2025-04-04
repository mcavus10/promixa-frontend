/**
 * Authentication API service
 * Manages user authentication operations including login, registration, and session management
 */

// Ortam değişkeninden API URL'sini al, geliştirme ortamı için varsayılan değer kullan
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  name: string;
  email: string;
  roles: string[];
  isTrialActive: boolean;
  trialStartDate: string;
  isTrialExpired: boolean;
  transcriptionMinutesUsed: number;
  imageGenerationCount: number;
  authProvider: string; // Contains values like 'LOCAL' or 'GOOGLE'
}

/**
 * Login with email and password
 */
export async function loginWithEmail(data: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
}

/**
 * Register a new user
 */
export async function registerUser(data: SignupRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Registration failed');
  }

  return response.json();
}

/**
 * Get Google OAuth2 login URL
 */
export function getGoogleLoginUrl(): string {
  return `${API_URL}/oauth2/authorize/google?redirect_uri=${encodeURIComponent(
    typeof window !== 'undefined' ? `${window.location.origin}/oauth2/callback/google` : ''
  )}`;
}

/**
 * Store authentication token in localStorage
 */
export function storeAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}

/**
 * Get authentication token from localStorage
 */
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
}

/**
 * Remove authentication token from localStorage
 */
export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}

/**
 * Store user data in localStorage
 */
export function storeUserData(userData: Partial<AuthResponse>): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_data', JSON.stringify(userData));
  }
}

/**
 * Get user data from localStorage
 */
export function getUserData(): Partial<AuthResponse> | null {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }
  return null;
}

/**
 * Remove user data from localStorage
 */
export function removeUserData(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_data');
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

/**
 * Logout user
 */
export function logout(): void {
  removeAuthToken();
  removeUserData();
}
