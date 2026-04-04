import React from 'react';

const SkeletonLoader = ({
  width = '100%',
  height = '20px',
  borderRadius = '8px',
  className = '',
  style = {}
}) => (
  <div
    className={`skeleton-loader ${className}`}
    style={{
      width,
      height,
      borderRadius,
      background: 'linear-gradient(90deg, #F0EBE3 25%, #E8E0D4 50%, #F0EBE3 75%)',
      backgroundSize: '200% 100%',
      animation: 'skeleton-loading 1.5s infinite',
      ...style
    }}
  />
);

export const ContentSkeleton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {/* Hooks skeleton */}
    <div style={{
      background: '#FAF9F6',
      borderRadius: 16,
      border: '1px solid #EAE4DC',
      padding: '22px',
      boxShadow: '0 1px 8px rgba(43,34,24,0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <SkeletonLoader width="16px" height="16px" borderRadius="50%" />
        <SkeletonLoader width="120px" height="15px" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            background: '#F5F2EE',
            borderRadius: 12,
            padding: '14px'
          }}>
            <SkeletonLoader width="80%" height="13px" />
            <SkeletonLoader width="32px" height="32px" borderRadius="8px" />
          </div>
        ))}
      </div>
    </div>

    {/* Captions skeleton */}
    <div style={{
      background: '#FAF9F6',
      borderRadius: 16,
      border: '1px solid #EAE4DC',
      padding: '22px',
      boxShadow: '0 1px 8px rgba(43,34,24,0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <SkeletonLoader width="16px" height="16px" borderRadius="50%" />
        <SkeletonLoader width="140px" height="15px" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[1, 2].map(i => (
          <div key={i} style={{
            background: '#F5F2EE',
            borderRadius: 12,
            padding: '14px',
            position: 'relative'
          }}>
            <SkeletonLoader width="90%" height="13px" style={{ marginBottom: 8 }} />
            <SkeletonLoader width="70%" height="13px" />
            <SkeletonLoader
              width="32px"
              height="32px"
              borderRadius="8px"
              style={{ position: 'absolute', top: 12, right: 12 }}
            />
          </div>
        ))}
      </div>
    </div>

    {/* Hashtags skeleton */}
    <div style={{
      background: '#FAF9F6',
      borderRadius: 16,
      border: '1px solid #EAE4DC',
      padding: '22px',
      boxShadow: '0 1px 8px rgba(43,34,24,0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <SkeletonLoader width="16px" height="16px" borderRadius="50%" />
        <SkeletonLoader width="130px" height="15px" />
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <SkeletonLoader key={i} width="80px" height="32px" borderRadius="999px" />
        ))}
      </div>
    </div>
  </div>
);

export default SkeletonLoader;