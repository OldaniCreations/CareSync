import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Activity, 
  Pill, 
  User, 
  FileText, 
  Calendar,
  Filter,
  Search,
  Download,
  Share2,
  TrendingUp,
  Clock,
  Shield,
  Settings,
  Bell
} from 'lucide-react';

const Timeline: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const mockTimelineData = [
    {
      id: 1,
      date: '2024-01-12',
      type: 'lab',
      title: 'CBC Panel',
      description: 'Complete Blood Count Panel',
      details: {
        wbc: '6.2 K/µL',
        hemoglobin: '13.4 g/dL',
        platelets: '245 K/µL',
        status: 'Normal'
      },
      provider: 'Epic MyChart',
      location: 'City General Hospital'
    },
    {
      id: 2,
      date: '2024-01-10',
      type: 'prescription',
      title: 'Atorvastatin Refill',
      description: '10mg daily for high cholesterol',
      details: {
        dosage: '10mg',
        frequency: 'Daily',
        refills: '3 remaining',
        status: 'Active'
      },
      provider: 'Dr. Patel',
      location: 'Primary Care Clinic'
    },
    {
      id: 3,
      date: '2024-01-08',
      type: 'visit',
      title: 'Primary Care Visit',
      description: 'Annual checkup and cholesterol follow-up',
      details: {
        reason: 'Annual physical',
        findings: 'All normal, cholesterol improved',
        nextVisit: '6 months',
        status: 'Completed'
      },
      provider: 'Dr. Patel',
      location: 'Primary Care Clinic'
    },
    {
      id: 4,
      date: '2023-11-20',
      type: 'prescription',
      title: 'Atorvastatin Started',
      description: '10mg daily for high cholesterol',
      details: {
        dosage: '10mg',
        frequency: 'Daily',
        reason: 'High cholesterol diagnosis',
        status: 'Active'
      },
      provider: 'Dr. Patel',
      location: 'Primary Care Clinic'
    },
    {
      id: 5,
      date: '2023-09-10',
      type: 'visit',
      title: 'Cholesterol Follow-up',
      description: 'Follow-up visit for high cholesterol',
      details: {
        reason: 'Cholesterol follow-up',
        findings: 'Cholesterol still elevated, starting medication',
        nextVisit: '3 months',
        status: 'Completed'
      },
      provider: 'Dr. Patel',
      location: 'Primary Care Clinic'
    },
    {
      id: 6,
      date: '2023-09-08',
      type: 'lab',
      title: 'Lipid Panel',
      description: 'Cholesterol and triglyceride testing',
      details: {
        totalCholesterol: '215 mg/dL',
        ldl: '145 mg/dL',
        hdl: '45 mg/dL',
        triglycerides: '180 mg/dL',
        status: 'Borderline High'
      },
      provider: 'Epic MyChart',
      location: 'City General Hospital'
    },
    {
      id: 7,
      date: '2023-07-05',
      type: 'prescription',
      title: 'Amoxicillin',
      description: '500mg, 3x daily for 10 days',
      details: {
        dosage: '500mg',
        frequency: '3x daily',
        duration: '10 days',
        reason: 'Sinus infection',
        status: 'Completed'
      },
      provider: 'Dr. Smith',
      location: 'Urgent Care'
    },
    {
      id: 8,
      date: '2023-07-05',
      type: 'visit',
      title: 'Urgent Care Visit',
      description: 'Sinus infection diagnosis',
      details: {
        reason: 'Sinus pain and congestion',
        findings: 'Acute sinusitis',
        treatment: 'Antibiotics prescribed',
        status: 'Completed'
      },
      provider: 'Dr. Smith',
      location: 'Urgent Care'
    },
    {
      id: 9,
      date: '2023-03-15',
      type: 'diagnosis',
      title: 'Seasonal Allergies',
      description: 'Diagnosis of seasonal allergies',
      details: {
        symptoms: 'Sneezing, runny nose, itchy eyes',
        triggers: 'Pollen, dust',
        treatment: 'Over-the-counter antihistamines',
        status: 'Chronic'
      },
      provider: 'Dr. Patel',
      location: 'Primary Care Clinic'
    },
    {
      id: 10,
      date: '2021-01-12',
      type: 'visit',
      title: 'Annual Physical',
      description: 'Routine annual physical examination',
      details: {
        reason: 'Annual physical',
        findings: 'All normal',
        nextVisit: '1 year',
        status: 'Completed'
      },
      provider: 'Dr. Patel',
      location: 'Primary Care Clinic'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab':
        return <Activity className="icon" />;
      case 'prescription':
        return <Pill className="icon" />;
      case 'visit':
        return <User className="icon" />;
      case 'diagnosis':
        return <FileText className="icon" />;
      default:
        return <Calendar className="icon" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lab':
        return '#007C9E';
      case 'prescription':
        return '#10b981';
      case 'visit':
        return '#f59e0b';
      case 'diagnosis':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const filteredData = mockTimelineData.filter(item => {
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="timeline">
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
            
            <button className="nav-item active">
              <Clock className="icon" />
              Timeline
            </button>
            
            <Link to="/sharing" className="nav-item">
              <Shield className="icon" />
              Sharing
            </Link>
          </nav>
          
          <div className="sidebar-footer">
            <Link to="/dashboard" className="nav-item">
              <Settings className="icon" />
              Settings
            </Link>
          </div>
        </aside>

        {/* Main Area */}
        <main className="dashboard-main">
          <div className="main-header">
            <div className="header-left">
              <h2>Health Timeline</h2>
              <p>Your complete health journey in one unified view</p>
            </div>
            
            <div className="header-right">
              <button className="action-button">
                <Download className="icon" />
                Export
              </button>
              <button className="action-button">
                <Share2 className="icon" />
                Share
              </button>
            </div>
          </div>
          
          <div className="timeline-container">

        {/* Filters and Search */}
        <div className="timeline-controls">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search timeline events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-container">
            <Filter className="filter-icon" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Events</option>
              <option value="lab">Lab Results</option>
              <option value="prescription">Medications</option>
              <option value="visit">Visits</option>
              <option value="diagnosis">Diagnoses</option>
            </select>
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-content">
          {filteredData.map((event, index) => (
            <div key={event.id} className="timeline-event">
              <div className="event-marker" style={{ backgroundColor: getTypeColor(event.type) }}>
                {getTypeIcon(event.type)}
              </div>
              
              <div className="event-content">
                <div className="event-header">
                  <div className="event-title">
                    <h3>{event.title}</h3>
                    <span className="event-type" style={{ color: getTypeColor(event.type) }}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                  <div className="event-date">
                    {formatDate(event.date)}
                  </div>
                </div>
                
                <p className="event-description">{event.description}</p>
                
                <div className="event-details">
                  {Object.entries(event.details).map(([key, value]) => (
                    <div key={key} className="detail-item">
                      <span className="detail-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                      <span className="detail-value">{value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="event-footer">
                  <div className="event-provider">
                    <span className="provider-label">Provider:</span>
                    <span className="provider-name">{event.provider}</span>
                  </div>
                  <div className="event-location">
                    <span className="location-label">Location:</span>
                    <span className="location-name">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="no-results">
            <p>No events found matching your criteria.</p>
            <button 
              onClick={() => {
                setSelectedFilter('all');
                setSearchQuery('');
              }}
              className="clear-filters-button"
            >
              Clear Filters
            </button>
          </div>
        )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Timeline;
