import React from 'react';

const Fondo = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg viewBox="0 0 1000 1000" className="w-full h-full opacity-50">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4B0082" />
          <stop offset="100%" stopColor="#800080" />
        </linearGradient>
      </defs>
      {[...Array(20)].map((_, i) => (
        <path
          key={i}
          d={`M ${-200 + (i * 100)} 0 Q ${-100 + (i * 100)} ${500 + Math.sin(i) * 50} ${-200 + (i * 100)} 1000`}
          stroke="url(#gradient)"
          strokeWidth="50"
          fill="none"
          className="animate-wave"
          style={{
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
    </svg>
  </div>
);

export default Fondo;
