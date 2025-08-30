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

// Single Pane Dashboard events
export const SINGLE_PANE_EVENTS = {
  DASHBOARD_EXPAND_SECTION: 'dashboard_expand_section',
  DASHBOARD_QUICK_ACTION: 'dashboard_quick_action',
  TIMELINE_FILTER_CHANGED: 'timeline_filter_changed',
  LAB_TREND_OPENED: 'lab_trend_opened',
} as const;
