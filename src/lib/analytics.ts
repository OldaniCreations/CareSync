import { track as vercelTrack } from '@vercel/analytics';

// Analytics tracking for CareSync app
export const track = (event: string, properties?: Record<string, any>) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', event, properties);
  }
  
  // Send to Vercel Analytics
  vercelTrack(event, properties);
};

// Trust UI specific events
export const TRUST_EVENTS = {
  TRUST_BANNER_VIEWED: 'trust_banner_viewed',
  TRUST_BANNER_DISMISSED: 'trust_banner_dismissed',
  PRIVACY_CENTER_OPENED: 'privacy_center_opened',
  REVOKE_ACCESS_CLICKED: 'revoke_access_clicked',
  SECURE_SYNC_TOOLTIP_OPENED: 'secure_sync_tooltip_opened',
} as const;
