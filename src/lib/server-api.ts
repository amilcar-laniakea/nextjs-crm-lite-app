import { cookies } from 'next/headers';

function parseJWT(token: string): any | null {
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

export async function getServerSession(): Promise<{
  user: any | null;
  isAuthenticated: boolean;
}> {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth-token');
    const userData = cookieStore.get('user-data');

    if (!authToken?.value) {
      return { user: null, isAuthenticated: false };
    }

    if (isTokenExpired(authToken.value)) {
      return { user: null, isAuthenticated: false };
    }

    if (!userData?.value) {
      return { user: null, isAuthenticated: false };
    }

    const user = JSON.parse(userData.value);
    return { user, isAuthenticated: true };
  } catch (error) {
    return { user: null, isAuthenticated: false };
  }
}
