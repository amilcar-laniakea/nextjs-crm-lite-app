interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string, hours: number = 1) {
  if (typeof document === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + hours * 60 * 60 * 1000);

  const isLocalhost = window.location.hostname === 'localhost';
  const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/;samesite=strict${!isLocalhost ? ';secure' : ''}`;

  document.cookie = cookieString;
}

function deleteCookie(name: string) {
  if (typeof document === 'undefined') return;
  const isLocalhost = window.location.hostname === 'localhost';
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;samesite=strict${!isLocalhost ? ';secure' : ''}`;
}

export async function signUpAPI(data: SignUpData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Registration failed');
  }

  return result;
}

export async function signInAPI(data: SignInData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Login failed');
  }

  if (typeof window !== 'undefined') {
    setCookie('auth-token', result.data.token, 1);
    setCookie(
      'user-data',
      JSON.stringify({
        id: result.data.token,
        ...parseJWT(result.data.token)
      }),
      1
    );

    return result.data;
  }
}

export async function signOutAPI() {
  if (typeof window !== 'undefined') {
    deleteCookie('auth-token');
    deleteCookie('user-data');
  }

  return { success: true };
}

export async function getSessionAPI(): Promise<{
  user: User | null;
  isAuthenticated: boolean;
}> {
  if (typeof window === 'undefined') {
    return { user: null, isAuthenticated: false };
  }

  try {
    // Leer cookies directamente desde el cliente
    const authToken = getCookie('auth-token');
    const userData = getCookie('user-data');

    if (!authToken) {
      return { user: null, isAuthenticated: false };
    }

    if (isTokenExpired(authToken)) {
      // Limpiar cookies expiradas
      deleteCookie('auth-token');
      deleteCookie('user-data');
      return { user: null, isAuthenticated: false };
    }

    if (!userData) {
      return { user: null, isAuthenticated: false };
    }

    const user = JSON.parse(userData);
    return { user, isAuthenticated: true };
  } catch {
    return { user: null, isAuthenticated: false };
  }
}

function parseJWT(token: string): User | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded = parseJWT(token) as any;
    if (!decoded?.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}
