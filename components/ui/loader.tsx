import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center space-x-4">
      {/* Circle Loader */}
      <div className="loader relative w-11 h-11">
        <div className="absolute w-1.5 h-1.5 bg-purple-600 rounded-full top-9 left-5 transform -translate-x-4 -translate-y-4 animate-dotCircle"></div>
        <svg viewBox="0 0 80 80" className="block w-full h-full">
          <circle 
            r={32} 
            cy={40} 
            cx={40} 
            fill="none" 
            stroke="#2f3545" 
            strokeWidth={10} 
            strokeLinejoin="round" 
            strokeLinecap="round"
            strokeDasharray="150 50 150 50"
            strokeDashoffset="75"
            className="animate-pathCircle"
          />
        </svg>
      </div>

      {/* Triangle Loader */}
      <div className="loader triangle relative w-12 h-11">
        <div className="absolute w-1.5 h-1.5 bg-purple-600 rounded-full top-9 left-5 transform -translate-x-2 -translate-y-4 animate-dotTriangle"></div>
        <svg viewBox="0 0 86 80" className="block w-full h-full">
          <polygon 
            points="43 8 79 72 7 72" 
            fill="none" 
            stroke="#2f3545" 
            strokeWidth={10} 
            strokeLinejoin="round" 
            strokeLinecap="round"
            strokeDasharray="145 76 145 76"
            strokeDashoffset="0"
            className="animate-pathTriangle"
          />
        </svg>
      </div>

      {/* Rectangle Loader */}
      <div className="loader relative w-11 h-11">
        <div className="absolute w-1.5 h-1.5 bg-purple-600 rounded-full top-9 left-5 transform -translate-x-4 -translate-y-4 animate-dotRect"></div>
        <svg viewBox="0 0 80 80" className="block w-full h-full">
          <rect 
            height={64} 
            width={64} 
            y={8} 
            x={8} 
            fill="none" 
            stroke="#2f3545" 
            strokeWidth={10} 
            strokeLinejoin="round" 
            strokeLinecap="round"
            strokeDasharray="192 64 192 64"
            strokeDashoffset="0"
            className="animate-pathRect"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
