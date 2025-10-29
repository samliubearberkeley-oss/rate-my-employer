import { createClient } from '@insforge/sdk';

// Initialize Insforge client
// Note: If anonKey is not provided or expired, the SDK will work without authentication
// for public endpoints that allow anonymous access (like reading reviews)
const baseUrl = import.meta.env.VITE_INSFORGE_URL || 'https://ih3ehavt.us-east.insforge.app';
const anonKey = import.meta.env.VITE_INSFORGE_ANON_KEY;

// Create client - if no anonKey, it will work for public/anonymous endpoints
export const insforge = createClient({
  baseUrl,
  ...(anonKey && { anonKey })
});

