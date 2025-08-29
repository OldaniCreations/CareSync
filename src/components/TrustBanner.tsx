import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Shield } from 'lucide-react';
import { track, TRUST_EVENTS } from '../lib/analytics';
import { FEATURE_TRUST_UI_V1 } from '../lib/featureFlags';

const TrustBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed in this session
    const dismissed = localStorage.getItem('cs_trust_banner_dismissed_v1');
    if (dismissed === 'true') {
      setIsDismissed(true);
    } else {
      // Track banner view
      track(TRUST_EVENTS.TRUST_BANNER_VIEWED);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('cs_trust_banner_dismissed_v1', 'true');
    track(TRUST_EVENTS.TRUST_BANNER_DISMISSED);
  };

  // Hide if feature flag is disabled or banner is dismissed
  if (!FEATURE_TRUST_UI_V1 || isDismissed) {
    return null;
  }

  return (
    <div className="trust-banner">
      <div className="trust-banner-content">
        <div className="trust-banner-icon">
          <Shield className="icon" />
        </div>
        <div className="trust-banner-text">
          <span>CareSync keeps your data private and under your control. </span>
          <Link to="/privacy" className="trust-banner-link">
            Learn more
          </Link>
        </div>
        <button
          onClick={handleDismiss}
          className="trust-banner-dismiss"
          aria-label="Dismiss trust message"
        >
          <X className="icon" />
        </button>
      </div>
    </div>
  );
};

export default TrustBanner;
