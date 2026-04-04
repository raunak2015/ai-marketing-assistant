import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({
  message,
  type = 'success', // success, error, warning, info
  duration = 3000,
  onClose,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Allow fade out animation
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={20} />;
      case 'error': return <XCircle size={20} />;
      case 'warning': return <AlertCircle size={20} />;
      default: return <CheckCircle size={20} />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success': return { bg: '#E6F0E6', border: '#7A9A6E', text: '#2B2218', icon: '#7A9A6E' };
      case 'error': return { bg: '#FEE8DC', border: '#C05A38', text: '#2B2218', icon: '#C05A38' };
      case 'warning': return { bg: '#FEF3E6', border: '#C9A96E', text: '#2B2218', icon: '#C9A96E' };
      default: return { bg: '#E6F0E6', border: '#7A9A6E', text: '#2B2218', icon: '#7A9A6E' };
    }
  };

  const colors = getColors();

  return (
    <div
      className={`toast toast-${position} ${isVisible ? 'toast-visible' : 'toast-hidden'}`}
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        color: colors.text,
        borderRadius: 12,
        padding: '12px 16px',
        boxShadow: '0 8px 24px rgba(43,34,24,0.12)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        minWidth: 300,
        maxWidth: 500,
        fontSize: 14,
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        position: 'fixed',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
      }}
    >
      <div style={{ color: colors.icon, flexShrink: 0 }}>
        {getIcon()}
      </div>
      <div style={{ flex: 1, lineHeight: 1.4 }}>
        {message}
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: colors.text,
          opacity: 0.7,
          padding: 2,
          borderRadius: 4,
          transition: 'opacity 0.2s',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => e.target.style.opacity = 1}
        onMouseLeave={(e) => e.target.style.opacity = 0.7}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;