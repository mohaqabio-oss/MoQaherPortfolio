'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface ActionResponse {
  error?: string;
  success?: boolean;
}

export async function loginAction(
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const password = formData.get('password') as string;
  const configuredPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (!password) {
    return { error: 'Please enter your administrative access key.' };
  }

  if (password !== configuredPassword) {
    return { error: 'Access denied: Invalid cryptographic key.' };
  }

  // Set secure HTTP-only session cookie
  cookies().set({
    name: 'admin_token',
    value: 'session_' + Buffer.from(Date.now().toString() + ':' + password).toString('base64'),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days expiration
    path: '/',
  });

  redirect('/admin');
}

export async function logoutAction() {
  cookies().delete('admin_token');
  redirect('/login');
}
