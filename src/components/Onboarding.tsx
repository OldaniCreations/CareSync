import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Database, Clock, Share2, Loader2, Lock } from 'lucide-react';

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    }
  });
  
  // Connection modal states
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [connectedProvider, setConnectedProvider] = useState('');
  const [connectionForm, setConnectionForm] = useState({
    username: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, string>),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleConnectionInputChange = (field: string, value: string) => {
    setConnectionForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const openConnectionModal = (provider: string) => {
    setConnectedProvider(provider);
    setShowConnectionModal(true);
    setConnectionStatus('idle');
    setConnectionForm({ username: '', password: '' });
  };

  const closeConnectionModal = () => {
    setShowConnectionModal(false);
    setConnectionStatus('idle');
    setConnectedProvider('');
  };

  const handleConnect = async () => {
    if (!connectionForm.username || !connectionForm.password) return;
    
    setConnectionStatus('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      setConnectionStatus('connected');
      
      // Auto-advance after showing success
      setTimeout(() => {
        closeConnectionModal();
        nextStep();
      }, 1500);
    }, 2500);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and go to dashboard
      navigate('/dashboard');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="onboarding-step">
                    <div className="step-icon">
          <img src="/CareSyncLogo.svg" alt="CareSync Logo" className="step-logo" />
        </div>
            <h2>Welcome to CareSync</h2>
            <p>Let's get you set up with your personal health profile. This will help us create a secure, personalized experience for you.</p>
            
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter your first name"
              />
            </div>
            
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
            
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="onboarding-step">
            <div className="step-icon">
              <Database className="icon" />
            </div>
            <h2>Connect Your Health Records</h2>
            <p>Connect to your existing healthcare providers to automatically sync your medical records.</p>
            
            {/* Security Note */}
            <div className="security-note">
              <p>🔒 Your credentials are never stored. Data is encrypted in transit and at rest. You control sharing.</p>
            </div>
            
            <div className="providers-grid">
              <div className="provider-card">
                <div className="provider-logo">Epic</div>
                <p>Epic MyChart</p>
                <div className="trusted-badge" title="Uses official patient portal connection methods">
                  Trusted Integration
                </div>
                <button 
                  className="connect-button"
                  onClick={() => openConnectionModal('Epic')}
                  disabled={showConnectionModal}
                  title="Secure portal connection. We never see or store your password."
                >
                  <Lock className="icon" />
                  Connect
                </button>
              </div>
              
              <div className="provider-card">
                <div className="provider-logo">Cerner</div>
                <p>Cerner Patient Portal</p>
                <div className="trusted-badge" title="Uses official patient portal connection methods">
                  Trusted Integration
                </div>
                <button 
                  className="connect-button"
                  onClick={() => openConnectionModal('Cerner')}
                  disabled={showConnectionModal}
                  title="Secure portal connection. We never see or store your password."
                >
                  <Lock className="icon" />
                  Connect
                </button>
              </div>
              
              <div className="provider-card">
                <div className="provider-logo">MyChart</div>
                <p>MyChart</p>
                <div className="trusted-badge" title="Uses official patient portal connection methods">
                  Trusted Integration
                </div>
                <button 
                  className="connect-button"
                  onClick={() => openConnectionModal('MyChart')}
                  disabled={showConnectionModal}
                  title="Secure portal connection. We never see or store your password."
                >
                  <Lock className="icon" />
                  Connect
                </button>
              </div>
              
              <div className="provider-card">
                <div className="provider-logo">+</div>
                <p>Add More</p>
                <button className="connect-button secondary">Add</button>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="onboarding-step">
                    <div className="step-icon">
          <Clock className="icon" />
        </div>
            <h2>View Your Health Timeline</h2>
            <p>Here's a preview of how your unified health timeline will look with sample data.</p>
            
            <div className="timeline-preview">
              <div className="timeline-item">
                <div className="timeline-date">Jan 12, 2024</div>
                <div className="timeline-content">
                  <h4>Lab Results - CBC Panel</h4>
                  <p>WBC: 6.2, Hemoglobin: 13.4, Platelets: 245</p>
                  <span className="status normal">Normal</span>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-date">Nov 20, 2023</div>
                <div className="timeline-content">
                  <h4>Prescription - Atorvastatin</h4>
                  <p>10mg daily for high cholesterol</p>
                  <span className="status active">Active</span>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-date">Sep 10, 2023</div>
                <div className="timeline-content">
                  <h4>Diagnosis - Hyperlipidemia</h4>
                  <p>Cholesterol follow-up visit</p>
                  <span className="status normal">Normal</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="onboarding-step">
            <div className="step-icon">
              <Share2 className="icon" />
            </div>
            <h2>Try Smart Sharing</h2>
            <p>Experience how easy it is to share specific health information with your healthcare providers.</p>
            
            <div className="sharing-demo">
              <div className="share-option">
                <h4>Share Lab Results</h4>
                <p>Generate a secure link to share your latest CBC results</p>
                <div className="generated-link">
                  <p>https://caresync.health/share/abc123</p>
                  <span className="expires">Expires in 24 hours</span>
                </div>
              </div>
              
              <div className="share-option">
                <h4>QR Code Sharing</h4>
                <p>Create a QR code for in-person sharing</p>
                <div className="qr-placeholder">
                  <div className="qr-code">📱</div>
                  <span>QR Code Generated</span>
                </div>
              </div>
              
              <div className="share-option">
                <h4>Invite Provider</h4>
                <p>Send an invitation to your healthcare provider</p>
                <div className="invite-status">
                  <CheckCircle className="check-icon" />
                  <span>Invite sent to Dr. Patel</span>
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
    <div className="onboarding">
      <div className="onboarding-container">
        {/* Header */}
        <header className="onboarding-header">
          <Link to="/" className="back-link">
            <ArrowLeft className="arrow-icon" />
            Back to Home
          </Link>
          <div className="logo">
            <div className="logo-icon">
              <img src="/CareSyncLogo.svg" alt="CareSync Logo" className="logo-image" />
            </div>
            <Link to="/" className="logo-text">CareSync</Link>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">
            Step {currentStep} of 4
          </div>
        </div>

        {/* Step Content */}
        <div className="step-container">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="step-navigation">
          {currentStep > 1 && (
            <button onClick={prevStep} className="nav-button secondary">
              <ArrowLeft className="arrow-icon" />
              Previous
            </button>
          )}
          
          <button 
            onClick={nextStep} 
            className="nav-button primary"
            disabled={currentStep === 1 && (!formData.firstName || !formData.lastName || !formData.email)}
          >
            {currentStep === 4 ? 'Complete Setup' : 'Next Step'}
            {currentStep < 4 && <ArrowRight className="arrow-icon" />}
          </button>
        </div>
      </div>

      {/* Connection Modal */}
      {showConnectionModal && (
        <div className="connection-modal-overlay">
          <div className="connection-modal">
            {connectionStatus === 'idle' && (
              <>
                <div className="modal-header">
                  <h3>Connect to {connectedProvider}</h3>
                  <p>Enter your credentials to connect your account</p>
                </div>
                
                <div className="form-group">
                  <label>Username or Email</label>
                  <input
                    type="text"
                    value={connectionForm.username}
                    onChange={(e) => handleConnectionInputChange('username', e.target.value)}
                    placeholder="Enter your username or email"
                  />
                </div>
                
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={connectionForm.password}
                    onChange={(e) => handleConnectionInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                
                <div className="modal-actions">
                  <button 
                    onClick={closeConnectionModal} 
                    className="nav-button secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleConnect}
                    className="nav-button primary"
                    disabled={!connectionForm.username || !connectionForm.password}
                  >
                    Connect
                  </button>
                </div>
              </>
            )}
            
            {connectionStatus === 'connecting' && (
              <div className="connection-status">
                <Loader2 className="loading-icon" />
                <h3>Connecting to {connectedProvider}...</h3>
                <p>Please wait while we establish a secure connection</p>
              </div>
            )}
            
            {connectionStatus === 'connected' && (
              <div className="connection-status">
                <CheckCircle className="success-icon" />
                <h3>Successfully Connected!</h3>
                <p>Your {connectedProvider} account is now linked to CareSync</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
