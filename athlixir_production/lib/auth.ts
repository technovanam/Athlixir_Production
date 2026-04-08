// No top-level node imports to prevent client bundle errors

const MERI_AUTH_BASE = process.env.NEXT_PUBLIC_MERIPEHCHAAN_AUTH_URL || 'https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize';


export function generateState(length = 32) {
  if (typeof window !== 'undefined' && window.crypto) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  const nodeCrypto = require('crypto');
  return nodeCrypto.randomBytes(length / 2).toString('hex');
}

export function generateCodeVerifier() {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

export async function generateCodeChallenge(verifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}


export function buildMeriPehchaanAuthUrl({ 
  clientId, 
  state, 
  codeChallenge 
}: { 
  clientId: string; 
  state: string;
  codeChallenge: string;
}) {
  const redirectUri = process.env.NEXT_PUBLIC_MERIPEHCHAAN_REDIRECT_URI || 'http://localhost:3000/auth/callback';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    scope: 'openid',
    state,
    dl_flow: 'signin',
    acr_values: 'mobile',
    amr_values: 'aadhaar'
  });
  
  return `${MERI_AUTH_BASE}?${params.toString()}`;
}


export function buildMeriPehchaanSignupUrl({
  state,
  codeChallenge
}: {
  state: string;
  codeChallenge: string;
}) {
  const clientId = "YJ4C9E9B41"; // Specific client ID for signup provided by user
  const orgId = "135466";
  const redirectUri = process.env.NEXT_PUBLIC_MERIPEHCHAAN_REDIRECT_URI || 'http://localhost:3000/auth/callback';
  
  // These seem to be specific to the partner signup flow provided
  const txn = `athlixir_${Date.now()}`; 
  const appName = btoa("ATHLIXIR");

  const consentParams = new URLSearchParams({
    ui_locales: 'en',
    acr: 'mobile',
    amr: 'aadhaar',
    response_type: 'code',
    client_id: clientId,
    state,
    redirect_uri: redirectUri,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    scope: 'openid',
    orgid: orgId,
    txn,
    app_name: appName,
    signup: 'signup'
  });

  const innerPath = `/oauth2/1/consent?${consentParams.toString()}`;
  const doubleEncodedPath = encodeURIComponent(encodeURIComponent(innerPath));

  return `https://digilocker.meripehchaan.gov.in/signinv2/oauth_partner/${doubleEncodedPath}`;
}

export function decodeJwt(token: string) {
  const [, payload] = token.split('.');
  if (!payload) throw new Error('Invalid JWT');
  
  if (typeof window !== 'undefined') {
    // Browser compatible base64 decoding
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
  
  // Node.js fallback
  return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
}

// Cookie helpers (for server-side)
export function setCookie(res: any, name: string, value: string, options: any = {}) {
  let cookie = `${name}=${value}`;
  if (options.httpOnly) cookie += '; HttpOnly';
  if (options.path) cookie += `; Path=${options.path}`;
  if (options.maxAge) cookie += `; Max-Age=${options.maxAge}`;
  if (options.sameSite) cookie += `; SameSite=${options.sameSite}`;
  if (options.secure) cookie += '; Secure';
  res.headers.append('Set-Cookie', cookie);
}

export function getCookie(req: any, name: string) {
  const cookie = req.headers.get('cookie');
  if (!cookie) return null;
  const match = cookie.match(new RegExp(`${name}=([^;]+)`));
  return match ? match[1] : null;
}

export const REDIRECT_URI_CONST = process.env.NEXT_PUBLIC_MERIPEHCHAAN_REDIRECT_URI || 'http://localhost:3000/auth/callback';
