import React, { useState, useEffect, useRef } from 'react';
import { X, TrendingUp, Info } from 'lucide-react';
import LabTrendSparkline from './LabTrendSparkline';
import { track, SINGLE_PANE_EVENTS } from '../lib/analytics';

interface LabResult {
  date: string;
  value: number;
  status: 'normal' | 'high' | 'low' | 'borderline';
  referenceRange?: { min: number; max: number };
}

interface LabTrendDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  labData: {
    name: string;
    unit: string;
    results: LabResult[];
    referenceRange?: { min: number; max: number };
    description?: string;
  };
}

const LabTrendDrawer: React.FC<LabTrendDrawerProps> = ({
  isOpen,
  onClose,
  labData
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Track when drawer opens
  useEffect(() => {
    if (isOpen) {
      track(SINGLE_PANE_EVENTS.LAB_TREND_OPENED, {
        labName: labData.name,
        resultsCount: labData.results.length
      });
    }
  }, [isOpen, labData.name, labData.results.length]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (firstElement) firstElement.focus();

      const handleTabKey = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const { name, unit, results, referenceRange, description } = labData;
  const values = results.map(r => r.value);
  const dates = results.map(r => r.date);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return '#10b981';
      case 'high': return '#ef4444';
      case 'low': return '#3b82f6';
      case 'borderline': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'normal': return 'Normal';
      case 'high': return 'High';
      case 'low': return 'Low';
      case 'borderline': return 'Borderline';
      default: return 'Unknown';
    }
  };

  return (
    <div className="lab-trend-drawer-overlay" onClick={onClose}>
      <div 
        className="lab-trend-drawer"
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title">
            <TrendingUp className="icon" />
            <h3>{name} Trend</h3>
          </div>
          <button 
            className="drawer-close"
            onClick={onClose}
            aria-label="Close trend drawer"
          >
            <X className="icon" />
          </button>
        </div>

        {/* Content */}
        <div className="drawer-content">
          {/* Chart Section */}
          <div className="chart-section">
            <div className="chart-header">
              <h4>Trend Over Time</h4>
              {referenceRange && (
                <div className="reference-info">
                  <Info className="icon" />
                  <span>Reference: {referenceRange.min} - {referenceRange.max} {unit}</span>
                </div>
              )}
            </div>
            
            <div className="chart-container">
              <LabTrendSparkline 
                data={values} 
                width={400} 
                height={120} 
                showPoints={true}
                color="#007C9E"
              />
              
              {/* X-axis labels */}
              <div className="chart-labels">
                {dates.map((date, index) => (
                  <span key={index} className="date-label">
                    {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="results-section">
            <h4>Last 5 Results</h4>
            <div className="results-table">
              <div className="table-header">
                <span>Date</span>
                <span>Value</span>
                <span>Status</span>
                <span>Trend</span>
              </div>
              {results.slice(-5).reverse().map((result, index) => (
                <div key={index} className="table-row">
                  <span>{new Date(result.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                  <span className="value-cell">
                    {result.value} {unit}
                  </span>
                  <span className={`status-badge ${result.status}`}>
                    {getStatusLabel(result.status)}
                  </span>
                  <span className="trend-cell">
                    <LabTrendSparkline 
                      data={[result.value]} 
                      width={40} 
                      height={16}
                      color={getStatusColor(result.status)}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className="description-section">
              <h4>About This Test</h4>
              <p>{description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabTrendDrawer;
