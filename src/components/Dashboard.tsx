import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Activity, 
  Pill, 
  FileText, 
  User, 
  Settings, 
  Bell,
  TrendingUp,
  Shield,
  Clock,
  Plus,
  Lock
} from 'lucide-react';
import TrustBanner from './TrustBanner';
import { FEATURE_TRUST_UI_V1 } from '../lib/featureFlags';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const mockData = {
    patient: {
      name: 'Sarah Thompson',
      age: 39,
      lastSync: '2 hours ago',
      providers: 3,
      records: 45
    },
    recentActivity: [
      { type: 'lab', title: 'CBC Panel Results', date: 'Jan 12, 2024', status: 'normal' },
      { type: 'prescription', title: 'Atorvastatin Refill', date: 'Jan 10, 2024', status: 'active' },
      { type: 'visit', title: 'Primary Care Visit', date: 'Jan 8, 2024', status: 'completed' }
    ],
    upcoming: [
      { type: 'appointment', title: 'Cardiology Follow-up', date: 'Jan 25, 2024', time: '10:00 AM' },
      { type: 'lab', title: 'Annual Blood Work', date: 'Feb 1, 2024', time: '9:00 AM' }
    ],
    quickStats: [
      { label: 'Active Medications', value: '2', icon: Pill, color: '#007C9E' },
      { label: 'Recent Labs', value: '3', icon: Activity, color: '#10b981' },
      { label: 'Upcoming Visits', value: '1', icon: Calendar, color: '#f59e0b' },
      { label: 'Shared Records', value: '5', icon: FileText, color: '#8b5cf6' }
    ]
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="dashboard-overview">
            {/* Quick Stats */}
            <div className="quick-stats">
              {mockData.quickStats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: stat.color + '20' }}>
                    <stat.icon className="icon" style={{ color: stat.color }} />
                  </div>
                  <div className="stat-content">
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="activity-section">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {mockData.recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'lab' && <Activity className="icon" />}
                      {activity.type === 'prescription' && <Pill className="icon" />}
                      {activity.type === 'visit' && <User className="icon" />}
                    </div>
                    <div className="activity-content">
                      <h4>{activity.title}</h4>
                      <p>{activity.date}</p>
                    </div>
                    <span className={`status ${activity.status}`}>{activity.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming */}
            <div className="upcoming-section">
              <h3>Upcoming</h3>
              <div className="upcoming-list">
                {mockData.upcoming.map((item, index) => (
                  <div key={index} className="upcoming-item">
                    <div className="upcoming-icon">
                      {item.type === 'appointment' && <Calendar className="icon" />}
                      {item.type === 'lab' && <Activity className="icon" />}
                    </div>
                    <div className="upcoming-content">
                      <h4>{item.title}</h4>
                      <p>{item.date} at {item.time}</p>
                    </div>
                    <button className="reminder-button">Set Reminder</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'records':
        return (
          <div className="records-section">
            <div className="section-header">
              <h3>Health Records</h3>
              <button className="add-button">
                <Plus className="icon" />
                Add Record
              </button>
            </div>
            
            <div className="records-grid">
              <div className="record-category">
                <h4>Lab Results</h4>
                <div className="record-list">
                  <div className="record-item">
                    <Activity className="icon" />
                    <div className="record-info">
                      <h5>CBC Panel</h5>
                      <p>Jan 12, 2024 • Normal</p>
                    </div>
                    <button className="view-button">View</button>
                  </div>
                  <div className="record-item">
                    <Activity className="icon" />
                    <div className="record-info">
                      <h5>Lipid Panel</h5>
                      <p>Sep 8, 2023 • Borderline High</p>
                    </div>
                    <button className="view-button">View</button>
                  </div>
                </div>
              </div>
              
              <div className="record-category">
                <h4>Medications</h4>
                <div className="record-list">
                  <div className="record-item">
                    <Pill className="icon" />
                    <div className="record-info">
                      <h5>Atorvastatin 10mg</h5>
                      <p>Daily • Active</p>
                    </div>
                    <button className="view-button">View</button>
                  </div>
                </div>
              </div>
              
              <div className="record-category">
                <h4>Visits</h4>
                <div className="record-list">
                  <div className="record-item">
                    <User className="icon" />
                    <div className="record-info">
                      <h5>Primary Care Visit</h5>
                      <p>Sep 10, 2023 • Cholesterol follow-up</p>
                    </div>
                    <button className="view-button">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'sharing':
        return (
          <div className="sharing-section">
            <div className="section-header">
              <h3>Smart Sharing</h3>
              <button className="add-button">
                <Plus className="icon" />
                New Share
              </button>
            </div>
            
            <div className="sharing-options">
              <div className="share-card">
                <h4>Share Lab Results</h4>
                <p>Generate secure links to share specific lab results with providers</p>
                <button className="share-button primary">Share Lab Results</button>
              </div>
              
              <div className="share-card">
                <h4>QR Code Sharing</h4>
                <p>Create QR codes for in-person sharing during appointments</p>
                <button className="share-button primary">Generate QR Code</button>
              </div>
              
              <div className="share-card">
                <h4>Provider Invites</h4>
                <p>Invite healthcare providers to view your records</p>
                <button className="share-button primary">Invite Provider</button>
              </div>
            </div>
            
            <div className="recent-shares">
              <h4>Recent Shares</h4>
              <div className="share-list">
                <div className="share-item">
                  <div className="share-info">
                    <h5>CBC Results Shared</h5>
                    <p>Shared with Dr. Patel • Jan 12, 2024</p>
                  </div>
                  <span className="share-status active">Active</span>
                </div>
                <div className="share-item">
                  <div className="share-info">
                    <h5>Medication List</h5>
                    <p>Shared with Dr. Smith • Jan 10, 2024</p>
                  </div>
                  <span className="share-status expired">Expired</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

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
            <span>{mockData.patient.name}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <TrendingUp className="icon" />
              Overview
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'records' ? 'active' : ''}`}
              onClick={() => setActiveTab('records')}
            >
              <FileText className="icon" />
              Records
            </button>
            
            <Link to="/timeline" className="nav-item">
              <Clock className="icon" />
              Timeline
            </Link>
            
            <button 
              className={`nav-item ${activeTab === 'sharing' ? 'active' : ''}`}
              onClick={() => setActiveTab('sharing')}
            >
              <Shield className="icon" />
              Sharing
            </button>
          </nav>
          
          <div className="sidebar-footer">
            <div className="nav-item">
              <Settings className="icon" />
              Settings
            </div>
            <Link to="/privacy" className="nav-item">
              <Shield className="icon" />
              Privacy & Security
            </Link>
          </div>
        </aside>

        {/* Main Area */}
        <main className="dashboard-main">
          {/* Trust Banner */}
          {FEATURE_TRUST_UI_V1 && <TrustBanner />}
          
          <div className="main-header">
            <h2>Welcome back, {mockData.patient.name}</h2>
            <div className="sync-status">
              <p>Your health records were last updated {mockData.patient.lastSync}</p>
              {FEATURE_TRUST_UI_V1 && (
                <div className="secure-sync-status">
                  <Lock className="icon" />
                  <span>Secure Sync Active</span>
                </div>
              )}
            </div>
          </div>
          
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
