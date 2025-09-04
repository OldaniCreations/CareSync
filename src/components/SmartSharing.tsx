import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  Link as LinkIcon, 
  QrCode, 
  Mail, 
  Copy, 
  Download,
  Eye,
  Clock,
  Users,
  Shield,
  CheckCircle,
  TrendingUp,
  FileText,
  Settings,
  Bell,
  User
} from 'lucide-react';

const SmartSharing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generatedQR, setGeneratedQR] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);

  const mockRecords = [
    { id: 'lab-1', type: 'lab', title: 'CBC Panel Results', date: 'Jan 12, 2024', status: 'Normal' },
    { id: 'lab-2', type: 'lab', title: 'Lipid Panel Results', date: 'Sep 8, 2023', status: 'Borderline High' },
    { id: 'med-1', type: 'medication', title: 'Atorvastatin 10mg', date: 'Nov 20, 2023', status: 'Active' },
    { id: 'visit-1', type: 'visit', title: 'Primary Care Visit', date: 'Jan 8, 2024', status: 'Completed' },
    { id: 'diagnosis-1', type: 'diagnosis', title: 'Hyperlipidemia', date: 'Sep 10, 2023', status: 'Active' }
  ];



  const handleRecordToggle = (recordId: string) => {
    setSelectedRecords(prev => 
      prev.includes(recordId) 
        ? prev.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  const generateSecureLink = () => {
    if (selectedRecords.length === 0) return;
    
    const randomId = Math.random().toString(36).substr(2, 9);
    const link = `https://caresync.health/share/${randomId}`;
    setGeneratedLink(link);
  };

  const generateQRCode = () => {
    if (selectedRecords.length === 0) return;
    setGeneratedQR(true);
  };

  const sendProviderInvite = () => {
    if (selectedRecords.length === 0) return;
    setInviteSent(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, you'd show a toast notification
  };

  const renderCreateTab = () => (
    <div className="create-share">
      <div className="section-header">
        <h3>Select Records to Share</h3>
        <p>Choose which health records you'd like to share with your healthcare providers</p>
      </div>

      <div className="records-selection">
        <div className="records-list">
          {mockRecords.map(record => (
            <div 
              key={record.id} 
              className={`record-item ${selectedRecords.includes(record.id) ? 'selected' : ''}`}
              onClick={() => handleRecordToggle(record.id)}
            >
              <div className="record-checkbox">
                {selectedRecords.includes(record.id) && <CheckCircle className="check-icon" />}
              </div>
              <div className="record-info">
                <h4>{record.title}</h4>
                <p>{record.date} • {record.status}</p>
              </div>
              <span className="record-type">{record.type}</span>
            </div>
          ))}
        </div>

        <div className="selection-summary">
          <h4>Selected Records: {selectedRecords.length}</h4>
          <p>Choose at least one record to continue</p>
        </div>
      </div>

      <div className="sharing-options">
        <div className="option-card">
          <div className="option-header">
            <LinkIcon className="icon" />
            <h4>Secure Link</h4>
          </div>
          <p>Generate a secure, expiring link that you can share with anyone</p>
          <button 
            className="option-button"
            onClick={generateSecureLink}
            disabled={selectedRecords.length === 0}
          >
            Generate Secure Link
          </button>
        </div>

        <div className="option-card">
          <div className="option-header">
            <QrCode className="icon" />
            <h4>QR Code</h4>
          </div>
          <p>Create a QR code for in-person sharing during appointments</p>
          <button 
            className="option-button"
            onClick={generateQRCode}
            disabled={selectedRecords.length === 0}
          >
            Generate QR Code
          </button>
        </div>

        <div className="option-card">
          <div className="option-header">
            <Mail className="icon" />
            <h4>Provider Invite</h4>
          </div>
          <p>Send an invitation to healthcare providers to view your records</p>
          <button 
            className="option-button"
            onClick={sendProviderInvite}
            disabled={selectedRecords.length === 0}
          >
            Send Provider Invite
          </button>
        </div>
      </div>
    </div>
  );

  const renderManageTab = () => (
    <div className="manage-shares">
      <div className="section-header">
        <h3>Active Shares</h3>
        <p>Manage your currently active shared records and invitations</p>
      </div>

      <div className="active-shares">
        <div className="share-item">
          <div className="share-info">
            <h4>CBC Panel Results</h4>
            <p>Shared with Dr. Patel • Jan 12, 2024</p>
            <div className="share-details">
              <span className="share-type">Secure Link</span>
              <span className="share-status active">Active</span>
            </div>
          </div>
          <div className="share-actions">
            <button className="action-button">
              <Eye className="icon" />
              View
            </button>
            <button className="action-button">
              <Copy className="icon" />
              Copy Link
            </button>
            <button className="action-button danger">
              <Clock className="icon" />
              Expire Now
            </button>
          </div>
        </div>

        <div className="share-item">
          <div className="share-info">
            <h4>Medication List</h4>
            <p>Shared with Dr. Smith • Jan 10, 2024</p>
            <div className="share-details">
              <span className="share-type">Provider Invite</span>
              <span className="share-status pending">Pending</span>
            </div>
          </div>
          <div className="share-actions">
            <button className="action-button">
              <Eye className="icon" />
              View
            </button>
            <button className="action-button">
              <Mail className="icon" />
              Resend
            </button>
            <button className="action-button danger">
              <Clock className="icon" />
              Cancel
            </button>
          </div>
        </div>

        <div className="share-item">
          <div className="share-info">
            <h4>Lab Results Package</h4>
            <p>QR Code Generated • Jan 8, 2024</p>
            <div className="share-details">
              <span className="share-type">QR Code</span>
              <span className="share-status active">Active</span>
            </div>
          </div>
          <div className="share-actions">
            <button className="action-button">
              <Eye className="icon" />
              View
            </button>
            <button className="action-button">
              <Download className="icon" />
              Download
            </button>
            <button className="action-button danger">
              <Clock className="icon" />
              Expire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="share-history">
      <div className="section-header">
        <h3>Share History</h3>
        <p>View all your past sharing activities and expired shares</p>
      </div>

      <div className="history-list">
        <div className="history-item expired">
          <div className="history-info">
            <h4>Complete Health Summary</h4>
            <p>Shared with Dr. Johnson • Dec 15, 2023</p>
            <div className="history-details">
              <span className="history-type">Secure Link</span>
              <span className="history-status expired">Expired Dec 22, 2023</span>
            </div>
          </div>
          <div className="history-actions">
            <button className="action-button">
              <Eye className="icon" />
              View Details
            </button>
            <button className="action-button">
              <Share2 className="icon" />
              Share Again
            </button>
          </div>
        </div>

        <div className="history-item expired">
          <div className="history-info">
            <h4>Prescription History</h4>
            <p>Shared with Dr. Patel • Nov 20, 2023</p>
            <div className="history-details">
              <span className="history-type">Provider Invite</span>
              <span className="history-status expired">Expired Nov 27, 2023</span>
            </div>
          </div>
          <div className="history-actions">
            <button className="action-button">
              <Eye className="icon" />
              View Details
            </button>
            <button className="action-button">
              <Share2 className="icon" />
              Share Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="smart-sharing">
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
            
            <button className="nav-item active">
              <Shield className="icon" />
              Sharing
            </button>
            
            <div className="nav-divider"></div>
            
            <Link to="/settings" className="nav-item">
              <Settings className="icon" />
              Settings
            </Link>
            
            <Link to="/privacy" className="nav-item">
              <Shield className="icon" />
              Privacy & Security
            </Link>
          </nav>
        </aside>

        {/* Main Area */}
        <main className="dashboard-main">
          <div className="main-header">
            <h2>Smart Sharing</h2>
            <p>Securely share your health information with healthcare providers</p>
          </div>
          
          <div className="sharing-container">
            <div className="sharing-header-section">
              <div className="header-left">
                <h1>Smart Sharing</h1>
                <p>Securely share your health information with healthcare providers</p>
              </div>
              
              <div className="security-badge">
                <Shield className="icon" />
                <span>HIPAA-Inspired Security</span>
              </div>
            </div>

        {/* Tabs */}
        <div className="sharing-tabs">
          <button 
            className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            <Share2 className="icon" />
            Create Share
          </button>
          <button 
            className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            <Users className="icon" />
            Manage Shares
          </button>
          <button 
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <Clock className="icon" />
            History
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'create' && renderCreateTab()}
          {activeTab === 'manage' && renderManageTab()}
          {activeTab === 'history' && renderHistoryTab()}
        </div>

        {/* Generated Results */}
        {generatedLink && (
          <div className="generated-result">
            <h3>Secure Link Generated</h3>
            <div className="link-container">
              <input 
                type="text" 
                value={generatedLink} 
                readOnly 
                className="generated-link-input"
              />
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(generatedLink)}
              >
                <Copy className="icon" />
                Copy
              </button>
            </div>
            <div className="link-info">
              <p>🔒 This link is secure and will expire in 24 hours</p>
              <p>📱 Anyone with this link can view the selected records</p>
            </div>
          </div>
        )}

        {generatedQR && (
          <div className="generated-result">
            <h3>QR Code Generated</h3>
            <div className="qr-container">
              <div className="qr-code-placeholder">
                <QrCode className="qr-icon" />
                <span>QR Code</span>
              </div>
            </div>
            <div className="qr-info">
              <p>📱 Scan this QR code during appointments</p>
              <p>🔒 Valid for 24 hours from generation</p>
            </div>
            <button className="download-qr-button">
              <Download className="icon" />
              Download QR Code
            </button>
          </div>
        )}

        {inviteSent && (
          <div className="generated-result">
            <h3>Provider Invite Sent</h3>
            <div className="invite-status">
              <CheckCircle className="check-icon" />
              <span>Invitation sent successfully</span>
            </div>
            <div className="invite-info">
              <p>📧 Invite sent to selected providers</p>
              <p>⏰ Invitation expires in 7 days</p>
              <p>📋 Providers can view selected records once accepted</p>
            </div>
          </div>
        )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SmartSharing;
