import React, { memo, useState } from 'react'
import Logo from '../home/Logo';
import TabEditor from './TabEditor';
import YouTubePlayer from './YouTubePlayer';

const HomeNotas = memo(() => {
  const [query, setQuery] = useState(''); 
    return (
        <div className="min-h-screen bg-purple-900 relative flex flex-col">
          
          
          <div className="container mx-auto px-4 py-6 relative">
            <Logo />
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center relative text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Tus notas musicales son:
            </h1>
            

            <YouTubePlayer url={query} />
            
          </div>
        </div>
      );
})

export default HomeNotas