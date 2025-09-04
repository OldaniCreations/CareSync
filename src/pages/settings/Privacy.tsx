import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Eye, 
  Download, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FileText,
  Clock,
  Settings,
  Bell,
  User
} from 'lucide-react';
import { track, TRUST_EVENTS } from '../../lib/analytics';
import { FEATURE_TRUST_UI_V1 } from '../../lib/featureFlags';

// Mock data for connected providers
const mockProviders = [
  {
    id: 'epic-1',
    name: 'Epic MyChart',
    connectedOn: '2024-01-15T10:30:00Z',
    lastSync: '2024-01-20T14:22:00Z',
    status: 'connected'
  },
  {
    id: 'cerner-1',
    name: 'Cerner Patient Portal',
    connectedOn: '2024-01-10T09:15:00Z',
    lastSync: '2024-01-19T16:45:00Z',
    status: 'connected'
  }
];

// Mock data for shared items
const mockSharedItems = [
  {
    id: 'share-1',
    type: 'Lab Results',
    title: 'CBC Panel Results',
    sharedWith: 'Dr. Sarah Patel',
    sharedOn: '2024-01-18T11:00:00Z',
    expiresAt: '2024-01-25T11:00:00Z',
    status: 'active'
  },
  {
    id: 'share-2',
    type: 'Medication List',
    title: 'Current Medications',
    sharedWith: 'Dr. Michael Chen',
    sharedOn: '2024-01-15T14:30:00Z',
    expiresAt: '2024-01-22T14:30:00Z',
    status: 'expired'
  }
];

const Privacy: React.FC = () => {
  const [providers, setProviders] = useState(mockProviders);
  const [sharedItems, setSharedItems] = useState(mockSharedItems);
  const location = useLocation();
  
  // Check if we're on the dedicated privacy page or settings sub-page
  const isDedicatedPage = location.pathname === '/privacy';

  useEffect(() => {
    // Track privacy center opened
    track(TRUST_EVENTS.PRIVACY_CENTER_OPENED);
  }, []);

  // Hide if feature flag is disabled
  if (!FEATURE_TRUST_UI_V1) {
    return (
      <div className="privacy-page">
        <div className="privacy-container">
          <header className="privacy-header">
            <div className="logo">
              <div className="logo-icon">
                <img src="/CareSyncLogo.svg" alt="CareSync Logo" className="logo-image" />
              </div>
              <Link to="/" className="logo-text">CareSync</Link>
            </div>
          </header>
          <main className="privacy-content">
            <div className="privacy-hero">
              <h1>Feature Disabled</h1>
              <p>Privacy & Security features are currently disabled.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleRevokeAccess = (providerId: string) => {
    setProviders(prev => prev.filter(p => p.id !== providerId));
    track(TRUST_EVENTS.REVOKE_ACCESS_CLICKED, { providerId });
    // TODO: Call actual disconnect handler when backend is ready
    console.log('Revoking access for provider:', providerId);
  };

  const handleStopSharing = (shareId: string) => {
    setSharedItems(prev => prev.filter(s => s.id !== shareId));
    // TODO: Call actual stop sharing handler when backend is ready
    console.log('Stopping share:', shareId);
  };

  const handleExportData = () => {
    // TODO: Implement actual data export when backend is ready
    console.log('Exporting data...');
    alert('Data export feature coming soon!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };



  return (
    <div className="privacy-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">
              <img src="/CareSyncLogo.svg" alt="CareSync Logo" className="logo-image" />
            </div>
            <Link to="/" className="logo-text">CareSync</Link>
          </div>
        </div>
        
        <div className="header-right">
          <button className="notification-button">
            <Bell className="icon" />
          </button>
          <div className="user-menu">
            <div className="user-avatar">
              <User className="icon" />
            </div>
            <span>Sarah Thompson</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <Link to="/dashboard" className="nav-item">
              <TrendingUp className="icon" />
              Overview
            </Link>
            
            <Link to="/dashboard" className="nav-item">
              <FileText className="icon" />
              Records
            </Link>
            
            <Link to="/timeline" className="nav-item">
              <Clock className="icon" />
              Timeline
            </Link>
            
            <Link to="/sharing" className="nav-item">
              <Shield className="icon" />
              Sharing
            </Link>
            
            <div className="nav-divider"></div>
            
            <Link to="/settings" className="nav-item">
              <Settings className="icon" />
              Settings
            </Link>
            
            <Link to="/privacy" className="nav-item active">
              <Shield className="icon" />
              Privacy & Security
            </Link>
          </nav>
        </aside>

        {/* Main Area */}
        <main className="dashboard-main">
          <div className="privacy-hero">
            <div className="hero-icon">
              <Shield className="icon" />
            </div>
            <h1>Privacy & Security</h1>
            <p>Your health data is protected with enterprise-grade security and privacy controls.</p>
            {isDedicatedPage && (
              <div className="page-indicator">
                <span>Dedicated Privacy & Security Center</span>
              </div>
            )}
          </div>

          {/* Connected Providers */}
          <section className="privacy-section">
            <h2>Connected Providers</h2>
            <p>Manage your connected healthcare provider accounts</p>
            
            <div className="providers-list">
              {providers.map(provider => (
                <div key={provider.id} className="provider-item">
                  <div className="provider-info">
                    <div className="provider-name">
                      <Lock className="icon" />
                      <span>{provider.name}</span>
                      <span className="status-badge connected">Connected</span>
                    </div>
                    <div className="provider-details">
                      <p>Connected: {formatDate(provider.connectedOn)}</p>
                      <p>Last sync: {getTimeAgo(provider.lastSync)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRevokeAccess(provider.id)}
                    className="revoke-button"
                  >
                    Revoke Access
                  </button>
                </div>
              ))}
              
              {providers.length === 0 && (
                <div className="empty-state">
                  <AlertCircle className="icon" />
                  <p>No providers connected</p>
                  <Link to="/onboarding" className="connect-button">
                    Connect Providers
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Data Sharing */}
          <section className="privacy-section">
            <h2>Data Sharing</h2>
            <p>Manage your active data shares and access permissions</p>
            
            <div className="sharing-list">
              {sharedItems.map(item => (
                <div key={item.id} className="share-item">
                  <div className="share-info">
                    <div className="share-header">
                      <span className="share-type">{item.type}</span>
                      <span className={`share-status ${item.status}`}>
                        {item.status === 'active' ? 'Active' : 'Expired'}
                      </span>
                    </div>
                    <h4>{item.title}</h4>
                    <p>Shared with: {item.sharedWith}</p>
                    <p>Shared: {formatDate(item.sharedOn)}</p>
                    {item.status === 'active' && (
                      <p>Expires: {formatDate(item.expiresAt)}</p>
                    )}
                  </div>
                  {item.status === 'active' && (
                    <button
                      onClick={() => handleStopSharing(item.id)}
                      className="stop-sharing-button"
                    >
                      Stop Sharing
                    </button>
                  )}
                </div>
              ))}
              
              {sharedItems.length === 0 && (
                <div className="empty-state">
                  <Eye className="icon" />
                  <p>No active data shares</p>
                </div>
              )}
            </div>
          </section>

          {/* Security Practices */}
          <section className="privacy-section">
            <h2>Security Practices</h2>
            <p>How we protect your health information</p>
            
            <div className="security-practices">
              <div className="practice-item">
                <Lock className="icon" />
                <div>
                  <h4>Encryption at Rest & In Transit</h4>
                  <p>All data is encrypted using AES-256 encryption both when stored and when transmitted.</p>
                </div>
              </div>
              
              <div className="practice-item">
                <Shield className="icon" />
                <div>
                  <h4>Least-Privilege Access</h4>
                  <p>Our team members only access data necessary for support and maintenance.</p>
                </div>
              </div>
              
              <div className="practice-item">
                <Eye className="icon" />
                <div>
                  <h4>User-Controlled Sharing</h4>
                  <p>You decide exactly what data to share, with whom, and for how long.</p>
                </div>
              </div>
              
              <div className="practice-item">
                <CheckCircle className="icon" />
                <div>
                  <h4>HIPAA Compliance</h4>
                  <p>We follow HIPAA guidelines and maintain strict privacy controls.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Export */}
          <section className="privacy-section">
            <h2>Data Export</h2>
            <p>Download a copy of your health data</p>
            
            <div className="export-section">
              <button onClick={handleExportData} className="export-button">
                <Download className="icon" />
                Export My Data
              </button>
              <p className="export-note">
                This will generate a secure download containing all your health records, 
                medications, and provider connections. The file will be available for 24 hours.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Privacy;
