import React, { useRef, useState, useEffect } from 'react';
import { QrCodeIcon, CopyIcon, CheckIcon } from './Icons';

interface TiltCardProps {
  title: string;
  description: string;
  qrValue: string;
  colorGradient: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ title, description, qrValue, colorGradient }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Robust mobile detection
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches || window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const mouseX = (x - centerX) / centerX;
    const mouseY = (y - centerY) / centerY;

    const tiltSensitivity = 15;

    setRotation({ 
      x: mouseY * tiltSensitivity, 
      y: -mouseX * tiltSensitivity 
    });
    
    setMousePos({ x, y });
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    let textToCopy = qrValue;
    if (qrValue.startsWith('upi://')) {
        const match = qrValue.match(/pa=([^&]+)/);
        if (match) {
            textToCopy = decodeURIComponent(match[1]);
        }
    }
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Base classes for the card container
  const cardClasses = `
    relative w-full h-full rounded-xl 
    bg-white dark:bg-black 
    border border-gray-200 dark:border-white/10
    transition-all duration-200 ease-out
    flex flex-col
    ${isMobile ? 'transform-none shadow-lg' : 'shadow-xl'}
  `;

  // Inline styles for 3D effect (only on desktop)
  const cardStyles = !isMobile ? {
    transform: isHovering 
      ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.05, 1.05, 1.05)` 
      : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transformStyle: 'preserve-3d' as const,
    boxShadow: isHovering ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : undefined
  } : {};

  // Helper to determine transform style for children
  const getChildStyle = (depth: number) => {
    return !isMobile ? { transform: `translateZ(${depth}px)` } : {};
  };

  return (
    <div className={`group relative w-full h-full select-none ${isMobile ? '' : 'perspective-1000'}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onTouchMove={handleMove}
        onTouchEnd={handleLeave}
        className={cardClasses}
        style={cardStyles}
      >
        {/* Background Gradients - Clipped */}
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
             <div className={`absolute inset-0 bg-gradient-to-br ${colorGradient} opacity-[0.05] dark:opacity-[0.08]`} />
             
             {/* Added subtle vertical gradient for depth */}
             <div className={`absolute inset-0 bg-gradient-to-b ${colorGradient} opacity-[0.03] dark:opacity-[0.06] mix-blend-overlay`} />

             <div className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${colorGradient} opacity-[0.15] blur-3xl`} />
             <div className={`absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr ${colorGradient} opacity-[0.15] blur-3xl`} />
        </div>

        {/* Spotlight Effect - Desktop Only */}
        {!isMobile && (
          <div
            className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300 z-10"
            style={{
              opacity: isHovering ? 1 : 0,
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 40%)`,
            }}
          />
        )}
        
        {/* Content */}
        <div className={`relative z-20 flex flex-1 flex-col items-center text-center ${isMobile ? 'p-6' : 'p-6 sm:p-8'}`} style={!isMobile ? { transformStyle: 'preserve-3d' } : {}}>
            
            {/* Header Icon */}
            <div 
              className={`
                mb-5 sm:mb-6 p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${colorGradient} bg-opacity-20 
                shadow-lg shadow-${colorGradient.split(' ')[1].replace('to-', '')}/20
              `}
              style={getChildStyle(50)}
            >
              <QrCodeIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white mix-blend-overlay" />
            </div>

            <h3 
              className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 tracking-tight"
              style={getChildStyle(40)}
            >
              {title}
            </h3>
            
            <p 
              className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 sm:mb-8 max-w-[95%] sm:max-w-[90%]"
              style={getChildStyle(30)}
            >
              {description}
            </p>

            {/* QR Code Container with Gradient Border */}
            <div 
              className={`
                relative mt-auto w-full max-w-[160px] sm:max-w-[200px] aspect-square 
                mx-auto rounded-xl shadow-lg 
                bg-gradient-to-br ${colorGradient} p-[2px]
              `}
              style={getChildStyle(60)}
            >
               <div className="relative w-full h-full bg-white rounded-[10px] p-2 sm:p-3 overflow-hidden border border-gray-100 dark:border-gray-200/20">
                   <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`} 
                      alt="QR Code" 
                      className="w-full h-full object-contain pointer-events-none mix-blend-multiply"
                    />
                   
                   {/* Scan Overlay - Desktop Only */}
                   <div className={`
                     absolute inset-0 
                     ${isMobile ? 'hidden' : 'opacity-0 group-hover:opacity-100'} 
                     transition-opacity duration-300 pointer-events-none
                   `}>
                      {/* Corners */}
                      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyber-green rounded-tl-sm shadow-[0_0_2px_rgba(0,255,65,0.5)]"></div>
                      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyber-green rounded-tr-sm shadow-[0_0_2px_rgba(0,255,65,0.5)]"></div>
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyber-green rounded-bl-sm shadow-[0_0_2px_rgba(0,255,65,0.5)]"></div>
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyber-green rounded-br-sm shadow-[0_0_2px_rgba(0,255,65,0.5)]"></div>
                      
                      {/* Scan Line - Variable Speed Animation */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-green to-transparent shadow-[0_0_15px_rgba(0,255,65,0.6)] animate-[scan_3s_ease-in-out_infinite] opacity-80"></div>
                      
                      {/* Label */}
                      <div className="absolute bottom-3 left-0 right-0 text-center">
                        <span className="text-[10px] bg-black/80 text-cyber-green px-2 py-0.5 rounded font-mono shadow-sm">SCAN_ME</span>
                      </div>
                   </div>
               </div>
            </div>

            {/* Copy Button - Optimized for Mobile Tapping */}
            <button 
                onClick={handleCopy}
                className={`
                    mt-6 sm:mt-8 flex items-center justify-center space-x-2 
                    w-full sm:w-auto px-6 py-3.5 sm:py-2
                    bg-gray-100 dark:bg-white/10 
                    hover:bg-gray-200 dark:hover:bg-white/20 
                    active:bg-gray-300 dark:active:bg-white/30 active:scale-95
                    rounded-full font-mono font-bold 
                    text-sm sm:text-xs
                    transition-all duration-200 z-50 cursor-pointer
                    touch-manipulation shadow-md
                    ${copied ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' : 'text-gray-700 dark:text-gray-300'}
                `}
                style={getChildStyle(30)}
                aria-label="Copy UPI ID"
            >
                {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                <span>{copied ? 'COPIED' : 'COPY UPI ID'}</span>
            </button>
            
            <div 
              className="mt-4 flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gray-400 font-mono"
              style={getChildStyle(20)}
            >
               <span className="w-1.5 h-1.5 rounded-full bg-cyber-green shadow-[0_0_8px_rgba(0,255,65,0.8)] animate-pulse"></span>
               <span>Secure Gateway</span>
            </div>
        </div>
      </div>
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { top: 5%; opacity: 1; }
          
          /* Fast scan down */
          25% { top: 40%; }
          
          /* Pause/Hover */
          35% { top: 40%; }
          
          /* Slow localized scan */
          45% { top: 45%; }
          50% { top: 42%; }
          55% { top: 48%; }
          
          /* Fast finish */
          85% { top: 90%; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default TiltCard;