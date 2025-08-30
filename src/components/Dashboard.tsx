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
import { FEATURE_TRUST_UI_V1, FEATURE_SINGLE_PANE_V2 } from '../lib/featureFlags';
import ExpandableCard from './ExpandableCard';
import ToastContainer from './ToastContainer';
import { useToast } from '../hooks/useToast';
import { track, SINGLE_PANE_EVENTS } from '../lib/analytics';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toasts, showSuccess, showError, showInfo, removeToast } = useToast();

  // Quick Action Handlers
  const handleQuickAction = (action: string, entityId: string, entityType: string) => {
    track(SINGLE_PANE_EVENTS.DASHBOARD_QUICK_ACTION, {
      action,
      entityId,
      entityType
    });

    switch (action) {
      case 'set-reminder':
        showSuccess(`Reminder set for ${entityType}`);
        break;
      case 'request-refill':
        showInfo(`Refill request sent for ${entityType}`);
        break;
      case 'add-to-calendar':
        showSuccess(`${entityType} added to calendar`);
        break;
      case 'directions':
        showInfo(`Opening directions to ${entityType}`);
        break;
      case 'view-trend':
        showInfo(`Opening trend view for ${entityType}`);
        break;
      case 'explain':
        showInfo(`Showing explanation for ${entityType}`);
        break;
      default:
        showInfo(`Action completed for ${entityType}`);
    }
  };

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
      { type: 'appointment', title: 'Cardiology Follow-up', date: 'Jan 25, 2024', time: '10:00 AM', provider: 'Dr. Sarah Patel', location: 'Cardiology Clinic', status: 'confirmed' },
      { type: 'lab', title: 'Annual Blood Work', date: 'Feb 1, 2024', time: '9:00 AM', provider: 'LabCorp', location: 'Main Street Lab', status: 'scheduled' }
    ],
    quickStats: [
      { label: 'Upcoming Visits', value: '1', icon: Calendar, color: '#f59e0b' },
      { label: 'Recent Labs', value: '3', icon: Activity, color: '#10b981' },
      { label: 'Active Medications', value: '2', icon: Pill, color: '#007C9E' },
      { label: 'Shared Records', value: '5', icon: FileText, color: '#8b5cf6' }
    ],
    medications: [
      { id: 'med-1', name: 'Atorvastatin', dose: '10mg', schedule: 'Daily', nextRefill: 'Jan 30, 2024', status: 'active' },
      { id: 'med-2', name: 'Metformin', dose: '500mg', schedule: 'Twice daily', nextRefill: 'Jan 25, 2024', status: 'active' }
    ],
    labs: [
      { id: 'lab-1', name: 'CBC Panel', date: 'Jan 12, 2024', status: 'normal', results: { wbc: 6.2, hgb: 13.4, plt: 245 }, trend: [6.1, 6.3, 6.2, 6.0, 6.2] },
      { id: 'lab-2', name: 'Lipid Panel', date: 'Sep 8, 2023', status: 'borderline', results: { total: 220, hdl: 45, ldl: 140, trig: 180 }, trend: [225, 220, 215, 220, 220] },
      { id: 'lab-3', name: 'A1C', date: 'Sep 8, 2023', status: 'normal', results: { a1c: 5.8 }, trend: [5.9, 5.8, 5.7, 5.8, 5.8] }
    ],
    visits: [
      { id: 'visit-1', title: 'Cardiology Follow-up', date: 'Jan 25, 2024', time: '10:00 AM', provider: 'Dr. Sarah Patel', location: 'Cardiology Clinic', status: 'confirmed', type: 'appointment' },
      { id: 'visit-2', title: 'Annual Blood Work', date: 'Feb 1, 2024', time: '9:00 AM', provider: 'LabCorp', location: 'Main Street Lab', status: 'scheduled', type: 'lab' }
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



            {/* Expandable Cards */}
            <div className="expandable-cards-section">
              <ExpandableCard title="Upcoming Visits" count={mockData.visits.length} defaultExpanded={true}>
                <div className="visits-table">
                  <div className="table-header">
                    <span>Date & Time</span>
                    <span>Provider</span>
                    <span>Location</span>
                    <span>Status</span>
                    <span>Actions</span>
                  </div>
                  {mockData.visits.map((visit) => (
                    <div key={visit.id} className="table-row">
                      <span>{visit.date} at {visit.time}</span>
                      <span>{visit.provider}</span>
                      <span>{visit.location}</span>
                      <span className={`status ${visit.status}`}>{visit.status}</span>
                      <div className="action-buttons">
                        <button 
                          className="action-btn primary"
                          onClick={() => handleQuickAction('add-to-calendar', visit.id, visit.title)}
                        >
                          Add to Calendar
                        </button>
                        <button 
                          className="action-btn secondary"
                          onClick={() => handleQuickAction('directions', visit.id, visit.location)}
                        >
                          Directions
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ExpandableCard>

              <ExpandableCard title="Recent Labs" count={mockData.labs.length}>
                <div className="labs-table">
                  <div className="table-header">
                    <span>Test</span>
                    <span>Date</span>
                    <span>Status</span>
                    <span>Trend</span>
                    <span>Actions</span>
                  </div>
                  {mockData.labs.map((lab) => (
                    <div key={lab.id} className="table-row">
                      <span>{lab.name}</span>
                      <span>{lab.date}</span>
                      <span className={`status ${lab.status}`}>{lab.status}</span>
                      <span className="trend-sparkline">📈</span>
                      <div className="action-buttons">
                        <button 
                          className="action-btn primary"
                          onClick={() => handleQuickAction('view-trend', lab.id, lab.name)}
                        >
                          View Trend
                        </button>
                        <button 
                          className="action-btn secondary"
                          onClick={() => handleQuickAction('explain', lab.id, lab.name)}
                        >
                          Explain
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ExpandableCard>

              <ExpandableCard title="Active Medications" count={mockData.medications.length}>
                <div className="medications-table">
                  <div className="table-header">
                    <span>Medication</span>
                    <span>Dose</span>
                    <span>Schedule</span>
                    <span>Next Refill</span>
                    <span>Actions</span>
                  </div>
                  {mockData.medications.map((med) => (
                    <div key={med.id} className="table-row">
                      <span>{med.name}</span>
                      <span>{med.dose}</span>
                      <span>{med.schedule}</span>
                      <span>{med.nextRefill}</span>
                      <div className="action-buttons">
                        <button 
                          className="action-btn primary"
                          onClick={() => handleQuickAction('set-reminder', med.id, med.name)}
                        >
                          Set Reminder
                        </button>
                        <button 
                          className="action-btn secondary"
                          onClick={() => handleQuickAction('request-refill', med.id, med.name)}
                        >
                          Request Refill
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ExpandableCard>
            </div>

            {/* Recent Activity - Now Below */}
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
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
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
