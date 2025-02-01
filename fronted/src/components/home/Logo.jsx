import React from 'react';
import { Github } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center gap-2 text-2xl font-bold text-white">
    <div className="w-8 h-8">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <path d="M12 6v6l4 2" />
      </svg>
    </div>
    Chulla-Acorde
  </div>
);

export default Logo;
