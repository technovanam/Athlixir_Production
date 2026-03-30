import { NextRequest, NextResponse } from 'next/server';
import { REDIRECT_URI_CONST } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { code, code_verifier, client_id: inputClientId } = await req.json();
  
  // Decide which client credentials to use
  let client_id = inputClientId || process.env.MERIPEHCHAAN_CLIENT_ID;
  let client_secret = process.env.MERIPEHCHAAN_CLIENT_SECRET;

  // If the client_id matches the signup ID, try to use the signup secret
  // but only if it's not a placeholder and the main secret is a placeholder
  if (client_id === process.env.MERIPEHCHAAN_SIGNUP_CLIENT_ID || client_id === 'YJ4C9E9B41') {
    if (process.env.MERIPEHCHAAN_SIGNUP_CLIENT_SECRET && process.env.MERIPEHCHAAN_SIGNUP_CLIENT_SECRET !== 'your_signup_secret_here') {
      client_secret = process.env.MERIPEHCHAAN_SIGNUP_CLIENT_SECRET;
    }
    client_id = 'YJ4C9E9B41';
  }

  const token_url = process.env.NEXT_PUBLIC_MERIPEHCHAAN_TOKEN_URL || 'https://digilocker.meripehchaan.gov.in/public/oauth2/1/token';
  const userinfo_url = process.env.NEXT_PUBLIC_MERIPEHCHAAN_USERINFO_URL || 'https://digilocker.meripehchaan.gov.in/public/oauth2/1/userinfo';

  // Check if we have a valid secret. If it's a placeholder or missing, we assume Public Client flow (PKCE)
  const isPlaceholderSecret = !client_secret || client_secret === 'your_secret_here' || client_secret === 'your_signup_secret_here';
  const final_client_secret = isPlaceholderSecret ? null : String(client_secret);

  const params: Record<string, string> = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI_CONST,
    client_id: String(client_id),
    code_verifier: String(code_verifier),
  };

  if (final_client_secret) {
    params.client_secret = final_client_secret;
  }

  const headers: Record<string, string> = { 
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  };

  // Only add Basic Auth if we have a real secret
  if (final_client_secret) {
    const authHeader = Buffer.from(`${client_id}:${final_client_secret}`).toString('base64');
    headers['Authorization'] = `Basic ${authHeader}`;
  }

  console.log('Sending Token Exchange Request to:', token_url);
  console.log('Client ID:', client_id);
  console.log('Is Public Flow (No Secret):', isPlaceholderSecret);

  try {
    const tokenRes = await fetch(token_url, {
      method: 'POST',
      headers,
      body: new URLSearchParams(params).toString(),
    });
    
    const responseText = await tokenRes.text();
    console.log('Token Response Status:', tokenRes.status);
    console.log('Token Response Text:', responseText);

    let tokenData;
    try {
      tokenData = JSON.parse(responseText);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid response from token endpoint' }, { status: 502 });
    }

    if (!tokenRes.ok) {
      return NextResponse.json({ 
        error: tokenData.error_description || tokenData.error || responseText || 'Token exchange failed',
        details: tokenData
      }, { status: 400 });
    }

    // Now fetch user info using the access token
    console.log('Fetching User Info from:', userinfo_url);
    const userInfoRes = await fetch(userinfo_url, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Accept': 'application/json'
      }
    });

    const userInfoData = await userInfoRes.json();
    console.log('User Info Response:', userInfoData);

    return NextResponse.json({
      ...tokenData,
      user_profile: userInfoData
    });
  } catch (err: any) {
    console.error('Auth API Error:', err);
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}
