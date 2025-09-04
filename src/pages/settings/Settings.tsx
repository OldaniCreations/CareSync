import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Eye, 
  Download, 
  Palette, 
  Globe, 
  HelpCircle, 
  Mail,
  Clock,
  FileText,
  TrendingUp,
  Calendar,
  Activity,
  Pill,
  Edit,
  Save,
  X
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Thompson',
    email: 'sarah.thompson@email.com',
    dateOfBirth: '1985-03-15',
    phone: '+1 (555) 123-4567',
    emergencyContact: {
      name: 'John Thompson',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    }
  });

  const [appPreferences, setAppPreferences] = useState({
    theme: 'light',
    language: 'en',
    fontSize: 'medium',
    syncFrequency: 'daily',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  const [healthPreferences, setHealthPreferences] = useState({
    defaultView: 'overview',
    showLabTrends: true,
    showMedicationReminders: true,
    units: 'metric',
    dateRange: '90days'
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  const renderAccountSection = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Account & Profile Settings</h3>
        <p>Manage your personal information and account security</p>
      </div>

      <div className="settings-content">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <User className="icon" />
            </div>
            <div className="profile-info">
              <h4>{profileData.firstName} {profileData.lastName}</h4>
              <p>{profileData.email}</p>
            </div>
            <button 
              className="edit-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <X className="icon" /> : <Edit className="icon" />}
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                disabled={!isEditing}
              />
            </div>

            <div className="emergency-contact">
              <h5>Emergency Contact</h5>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={profileData.emergencyContact.name}
                    onChange={(e) => setProfileData({
                      ...profileData, 
                      emergencyContact: {...profileData.emergencyContact, name: e.target.value}
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Relationship</label>
                  <input
                    type="text"
                    value={profileData.emergencyContact.relationship}
                    onChange={(e) => setProfileData({
                      ...profileData, 
                      emergencyContact: {...profileData.emergencyContact, relationship: e.target.value}
                    })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={profileData.emergencyContact.phone}
                  onChange={(e) => setProfileData({
                    ...profileData, 
                    emergencyContact: {...profileData.emergencyContact, phone: e.target.value}
                  })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <div className="form-actions">
                <button className="save-button" onClick={handleSave}>
                  <Save className="icon" />
                  Save Changes
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  <X className="icon" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderHealthSection = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Health Record Preferences</h3>
        <p>Customize how your health information is displayed and managed</p>
      </div>

      <div className="settings-content">
        <div className="preferences-grid">
          <div className="preference-card">
            <div className="preference-header">
              <TrendingUp className="icon" />
              <h4>Default View</h4>
            </div>
            <p>Choose your preferred dashboard view</p>
            <select 
              value={healthPreferences.defaultView}
              onChange={(e) => setHealthPreferences({...healthPreferences, defaultView: e.target.value})}
            >
              <option value="overview">Overview</option>
              <option value="timeline">Timeline</option>
              <option value="records">Records</option>
              <option value="sharing">Sharing</option>
            </select>
          </div>

          <div className="preference-card">
            <div className="preference-header">
              <Activity className="icon" />
              <h4>Lab Results</h4>
            </div>
            <p>Display lab trends and ranges</p>
            <label className="toggle">
              <input
                type="checkbox"
                checked={healthPreferences.showLabTrends}
                onChange={(e) => setHealthPreferences({...healthPreferences, showLabTrends: e.target.checked})}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="preference-card">
            <div className="preference-header">
              <Pill className="icon" />
              <h4>Medication Reminders</h4>
            </div>
            <p>Show medication reminders on dashboard</p>
            <label className="toggle">
              <input
                type="checkbox"
                checked={healthPreferences.showMedicationReminders}
                onChange={(e) => setHealthPreferences({...healthPreferences, showMedicationReminders: e.target.checked})}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="preference-card">
            <div className="preference-header">
              <Globe className="icon" />
              <h4>Units</h4>
            </div>
            <p>Preferred measurement units</p>
            <select 
              value={healthPreferences.units}
              onChange={(e) => setHealthPreferences({...healthPreferences, units: e.target.value})}
            >
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </select>
          </div>

          <div className="preference-card">
            <div className="preference-header">
              <Calendar className="icon" />
              <h4>Default Date Range</h4>
            </div>
            <p>Default timeline view range</p>
            <select 
              value={healthPreferences.dateRange}
              onChange={(e) => setHealthPreferences({...healthPreferences, dateRange: e.target.value})}
            >
              <option value="30days">30 Days</option>
              <option value="90days">90 Days</option>
              <option value="1year">1 Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppSection = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>App Preferences</h3>
        <p>Customize your CareSync experience</p>
      </div>

      <div className="settings-content">
        <div className="preferences-grid">
          <div className="preference-card">
            <div className="preference-header">
              <Palette className="icon" />
              <h4>Theme</h4>
            </div>
            <p>Choose your preferred appearance</p>
            <select 
              value={appPreferences.theme}
              onChange={(e) => setAppPreferences({...appPreferences, theme: e.target.value})}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="preference-card">
            <div className="preference-header">
              <Globe className="icon" />
              <h4>Language</h4>
            </div>
            <p>Select your preferred language</p>
            <select 
              value={appPreferences.language}
              onChange={(e) => setAppPreferences({...appPreferences, language: e.target.value})}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div className="preference-card">
            <div className="preference-header">
              <Eye className="icon" />
              <h4>Font Size</h4>
            </div>
            <p>Adjust text size for better readability</p>
            <select 
              value={appPreferences.fontSize}
              onChange={(e) => setAppPreferences({...appPreferences, fontSize: e.target.value})}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="preference-card">
            <div className="preference-header">
              <Clock className="icon" />
              <h4>Sync Frequency</h4>
            </div>
            <p>How often to sync with providers</p>
            <select 
              value={appPreferences.syncFrequency}
              onChange={(e) => setAppPreferences({...appPreferences, syncFrequency: e.target.value})}
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="manual">Manual Only</option>
            </select>
          </div>
        </div>

        <div className="notification-settings">
          <h4>Notification Preferences</h4>
          <div className="notification-options">
            <div className="notification-option">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={appPreferences.notifications.email}
                  onChange={(e) => setAppPreferences({
                    ...appPreferences, 
                    notifications: {...appPreferences.notifications, email: e.target.checked}
                  })}
                />
                <span className="slider"></span>
              </label>
              <div>
                <h5>Email Notifications</h5>
                <p>Receive updates via email</p>
              </div>
            </div>

            <div className="notification-option">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={appPreferences.notifications.push}
                  onChange={(e) => setAppPreferences({
                    ...appPreferences, 
                    notifications: {...appPreferences.notifications, push: e.target.checked}
                  })}
                />
                <span className="slider"></span>
              </label>
              <div>
                <h5>Push Notifications</h5>
                <p>Receive updates on your device</p>
              </div>
            </div>

            <div className="notification-option">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={appPreferences.notifications.sms}
                  onChange={(e) => setAppPreferences({
                    ...appPreferences, 
                    notifications: {...appPreferences.notifications, sms: e.target.checked}
                  })}
                />
                <span className="slider"></span>
              </label>
              <div>
                <h5>SMS Notifications</h5>
                <p>Receive updates via text message</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupportSection = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Support & Help</h3>
        <p>Get help and support for CareSync</p>
      </div>

      <div className="settings-content">
        <div className="support-grid">
          <div className="support-card">
            <div className="support-icon">
              <HelpCircle className="icon" />
            </div>
            <h4>Help Center</h4>
            <p>Find answers to common questions and learn how to use CareSync</p>
            <button className="support-button">Visit Help Center</button>
          </div>

          <div className="support-card">
            <div className="support-icon">
              <Mail className="icon" />
            </div>
            <h4>Contact Support</h4>
            <p>Get in touch with our support team for personalized help</p>
            <button className="support-button">Contact Support</button>
          </div>

          <div className="support-card">
            <div className="support-icon">
              <FileText className="icon" />
            </div>
            <h4>Privacy Policy</h4>
            <p>Read our privacy policy and data protection practices</p>
            <button className="support-button">View Privacy Policy</button>
          </div>

          <div className="support-card">
            <div className="support-icon">
              <Shield className="icon" />
            </div>
            <h4>Terms of Service</h4>
            <p>Review our terms of service and user agreement</p>
            <button className="support-button">View Terms</button>
          </div>

          <div className="support-card">
            <div className="support-icon">
              <Download className="icon" />
            </div>
            <h4>Export Data</h4>
            <p>Download your health records in various formats</p>
            <button className="support-button">Export Data</button>
          </div>

          <div className="support-card">
            <div className="support-icon">
              <User className="icon" />
            </div>
            <h4>Account Management</h4>
            <p>Manage your account settings and data</p>
            <button className="support-button">Manage Account</button>
          </div>
        </div>

        <div className="app-info">
          <h4>About CareSync</h4>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Version:</span>
              <span className="info-value">1.0.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">Build:</span>
              <span className="info-value">2024.01.15</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Updated:</span>
              <span className="info-value">January 15, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
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
            
            <button className="nav-item active">
              <SettingsIcon className="icon" />
              Settings
            </button>
            
            <Link to="/privacy" className="nav-item">
              <Shield className="icon" />
              Privacy & Security
            </Link>
          </nav>
        </aside>

        {/* Main Area */}
        <main className="dashboard-main">
          <div className="main-header">
            <h2>Settings</h2>
            <p>Manage your account, preferences, and app settings</p>
          </div>

          {/* Settings Navigation */}
          <div className="settings-nav">
            <button 
              className={`nav-tab ${activeSection === 'account' ? 'active' : ''}`}
              onClick={() => setActiveSection('account')}
            >
              <User className="icon" />
              Account & Profile
            </button>
            <button 
              className={`nav-tab ${activeSection === 'health' ? 'active' : ''}`}
              onClick={() => setActiveSection('health')}
            >
              <Activity className="icon" />
              Health Records
            </button>
            <button 
              className={`nav-tab ${activeSection === 'app' ? 'active' : ''}`}
              onClick={() => setActiveSection('app')}
            >
              <SettingsIcon className="icon" />
              App Preferences
            </button>
            <button 
              className={`nav-tab ${activeSection === 'support' ? 'active' : ''}`}
              onClick={() => setActiveSection('support')}
            >
              <HelpCircle className="icon" />
              Support & Help
            </button>
          </div>

          {/* Settings Content */}
          <div className="settings-container">
            {activeSection === 'account' && renderAccountSection()}
            {activeSection === 'health' && renderHealthSection()}
            {activeSection === 'app' && renderAppSection()}
            {activeSection === 'support' && renderSupportSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
