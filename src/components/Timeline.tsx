import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
import { track, SINGLE_PANE_EVENTS } from '../lib/analytics';
import LabTrendSparkline from './LabTrendSparkline';
import LabTrendDrawer from './LabTrendDrawer';

interface TimelineEvent {
  id: number;
  date: string;
  type: string;
  title: string;
  description: string;
  details: Record<string, any>;
  provider: string;
  location: string;
  status: string;
  trend?: number[];
}

const Timeline: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState(() => searchParams.get('filter') || 'all');
  const [selectedDateRange, setSelectedDateRange] = useState(() => searchParams.get('range') || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(() => searchParams.get('search') || '');
  const [selectedLab, setSelectedLab] = useState<TimelineEvent | null>(null);
  const [isLabDrawerOpen, setIsLabDrawerOpen] = useState(false);



  const dateRangePresets = [
    { value: '30d', label: '30 Days', days: 30 },
    { value: '90d', label: '90 Days', days: 90 },
    { value: '1y', label: '1 Year', days: 365 },
    { value: 'all', label: 'All Time', days: 0 }
  ];

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
      location: 'City General Hospital',
      status: 'normal',
      trend: [6.1, 6.3, 6.2, 6.0, 6.2]
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
      location: 'Primary Care Clinic',
      status: 'active'
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
      location: 'Primary Care Clinic',
      status: 'completed'
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
      location: 'Primary Care Clinic',
      status: 'active'
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
      location: 'Primary Care Clinic',
      status: 'completed'
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
      location: 'City General Hospital',
      status: 'borderline',
      trend: [225, 220, 215, 220, 220]
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
      location: 'Urgent Care',
      status: 'completed'
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
      location: 'Urgent Care',
      status: 'completed'
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
      location: 'Primary Care Clinic',
      status: 'chronic'
    },
    {
      id: 10,
      date: '2021-01-12',
      type: 'lab',
      title: 'A1C Test',
      description: 'Hemoglobin A1C for diabetes monitoring',
      details: {
        a1c: '5.8%',
        status: 'Normal'
      },
      provider: 'Epic MyChart',
      location: 'City General Hospital',
      status: 'normal',
      trend: [5.9, 5.8, 5.7, 5.8, 5.8]
    },
    {
      id: 11,
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
      location: 'Primary Care Clinic',
      status: 'completed'
    }
  ];

  // Clear all filters function
  const clearAllFilters = () => {
    setSelectedFilter('all');
    setSelectedDateRange('all');
    setSearchQuery('');
    setSearchParams(new URLSearchParams());
  };

  // Handle lab trend drawer
  const openLabTrend = (lab: TimelineEvent) => {
    setSelectedLab(lab);
    setIsLabDrawerOpen(true);
  };

  const closeLabTrend = () => {
    setIsLabDrawerOpen(false);
    setSelectedLab(null);
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
      case 'completed':
        return '#10b981'; // Green
      case 'active':
      case 'scheduled':
        return '#f59e0b'; // Yellow
      case 'borderline':
      case 'overdue':
      case 'abnormal':
        return '#ef4444'; // Red
      case 'chronic':
        return '#8b5cf6'; // Purple
      default:
        return '#6b7280'; // Gray
    }
  };

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedFilter !== 'all') params.set('filter', selectedFilter);
    if (selectedDateRange !== 'all') params.set('range', selectedDateRange);
    if (searchQuery) params.set('search', searchQuery);
    
    setSearchParams(params);
    
    // Track filter changes
    track(SINGLE_PANE_EVENTS.TIMELINE_FILTER_CHANGED, {
      filter: selectedFilter,
      dateRange: selectedDateRange,
      hasSearch: !!searchQuery
    });
  }, [selectedFilter, selectedDateRange, searchQuery, setSearchParams]);

  const filteredData = mockTimelineData.filter(item => {
    // Type filtering
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    
    // Search filtering
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Date range filtering
    let matchesDateRange = true;
    if (selectedDateRange !== 'all') {
      const itemDate = new Date(item.date);
      const cutoffDate = new Date();
      const preset = dateRangePresets.find(p => p.value === selectedDateRange);
      
      if (preset && preset.days > 0) {
        cutoffDate.setDate(cutoffDate.getDate() - preset.days);
        matchesDateRange = itemDate >= cutoffDate;
      }
    }
    
    return matchesFilter && matchesSearch && matchesDateRange;
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



        {/* Enhanced Filters and Search */}
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
          
          <div className="filter-section">
            <div className="filter-pills">
              <button
                className={`filter-pill ${selectedFilter === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-pill ${selectedFilter === 'lab' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('lab')}
              >
                Labs
              </button>
              <button
                className={`filter-pill ${selectedFilter === 'prescription' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('prescription')}
              >
                Medications
              </button>
              <button
                className={`filter-pill ${selectedFilter === 'visit' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('visit')}
              >
                Visits
              </button>
              <button
                className={`filter-pill ${selectedFilter === 'diagnosis' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('diagnosis')}
              >
                Diagnoses
              </button>
            </div>
            
            <div className="date-range-presets">
              {dateRangePresets.map((preset) => (
                <button
                  key={preset.value}
                  className={`date-preset ${selectedDateRange === preset.value ? 'active' : ''}`}
                  onClick={() => setSelectedDateRange(preset.value)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-content">
          {filteredData.map((event, index) => (
            <div key={event.id} className="timeline-event">
              <div className="event-marker" style={{ backgroundColor: getTypeColor(event.type) }}>
                {getTypeIcon(event.type)}
              </div>
              <div className="event-status-indicator" style={{ backgroundColor: getStatusColor(event.status) }}></div>
              
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
                  {event.type === 'lab' && event.trend && (
                    <button 
                      className="view-trend-button"
                      onClick={() => openLabTrend(event)}
                      aria-label={`View trend for ${event.title}`}
                    >
                      <TrendingUp className="icon" />
                      View Trend
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="no-results">
            <p>No events found matching your criteria.</p>
            <button 
              onClick={clearAllFilters}
              className="clear-filters-button"
            >
              Clear Filters
            </button>
          </div>
        )}
          </div>
        </main>
      </div>

      {/* Lab Trend Drawer */}
      {selectedLab && (
        <LabTrendDrawer
          isOpen={isLabDrawerOpen}
          onClose={closeLabTrend}
                  labData={(() => {
          if (!selectedLab.trend) {
            return {
              name: selectedLab.title,
              unit: 'mg/dL',
              results: [],
              referenceRange: { min: 100, max: 200 },
              description: selectedLab.description
            };
          }
          
          const trendLength = selectedLab.trend.length;
          return {
            name: selectedLab.title,
            unit: 'mg/dL',
            results: selectedLab.trend.map((value: number, index: number) => ({
              date: new Date(Date.now() - (trendLength - 1 - index) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              value: value,
              status: value > 200 ? 'high' : value < 100 ? 'low' : 'normal'
            })),
            referenceRange: { min: 100, max: 200 },
            description: selectedLab.description
          };
        })()}
        />
      )}
    </div>
  );
};

export default Timeline;
