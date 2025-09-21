import React from 'react'

const LoadingAnimation = () => {
    const loadingText = "Loading...";
  return (
    <div 
      className="w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 30%, #0d2236 0%, #0b1525 100%)',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto'
      }}
      role="status" 
      aria-label="Loading"
    >
      <style jsx>{`
        @keyframes cloudFloat {
          0%, 100% { transform: translateX(-50%) translateY(0) scale(1); }
          25% { transform: translateX(-48%) translateY(-3px) scale(1.01); }
          50% { transform: translateX(-50%) translateY(6px) scale(0.99); }
          75% { transform: translateX(-52%) translateY(-2px) scale(1.01); }
        }

        @keyframes realisticFall {
          0% { 
            transform: translateY(-10px) scaleY(0.8) scaleX(1.2); 
            opacity: 0; 
          }
          5% { 
            opacity: 0.3; 
          }
          15% { 
            transform: translateY(10vh) scaleY(1.1) scaleX(0.95); 
            opacity: 0.9; 
          }
          40% { 
            transform: translateY(35vh) scaleY(1.3) scaleX(0.8); 
            opacity: 1; 
          }
          70% { 
            transform: translateY(55vh) scaleY(1.5) scaleX(0.7); 
            opacity: 1; 
          }
          85% { 
            transform: translateY(68vh) scaleY(1.2) scaleX(0.9); 
            opacity: 0.8; 
          }
          100% { 
            transform: translateY(72vh) scaleY(0.5) scaleX(1.5); 
            opacity: 0; 
          }
        }

        @keyframes enhancedSplash {
          0% { 
            transform: translateX(-50%) scale(0) scaleY(1); 
            opacity: 0; 
          }
          85% { 
            opacity: 0; 
          }
          87% { 
            transform: translateX(-50%) scale(0.3) scaleY(0.8); 
            opacity: 0.9; 
          }
          92% { 
            transform: translateX(-50%) scale(1.2) scaleY(0.4); 
            opacity: 0.7; 
          }
          97% { 
            transform: translateX(-50%) scale(1.8) scaleY(0.2); 
            opacity: 0.3; 
          }
          100% { 
            transform: translateX(-50%) scale(2.2) scaleY(0.1); 
            opacity: 0; 
          }
        }

        @keyframes ripple {
          0% { 
            transform: translateX(-50%) scale(0); 
            opacity: 0; 
            border-width: 3px;
          }
          85% { 
            opacity: 0; 
          }
          88% { 
            transform: translateX(-50%) scale(0.3); 
            opacity: 0.6; 
            border-width: 2px;
          }
          94% { 
            transform: translateX(-50%) scale(0.8); 
            opacity: 0.3; 
            border-width: 1px;
          }
          100% { 
            transform: translateX(-50%) scale(1); 
            opacity: 0; 
            border-width: 1px;
          }
        }

        @keyframes puddleGlow {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.8; transform: translateX(-50%) scale(1.02); }
        }

        @keyframes labelPulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }

        .cloud {
          position: absolute;
          top: 12%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.3));
          animation: cloudFloat 6s ease-in-out infinite;
          z-index: 30;
        }

        .puff {
          background: radial-gradient(circle at 25% 25%, #ffffff, #f2f6fb);
          border-radius: 50%;
          box-shadow: 
            inset -10px -10px 20px rgba(180,200,220,0.7),
            inset 5px 5px 15px rgba(255,255,255,0.9);
        }

        .puff.small { width: 65px; height: 45px; }
        .puff.mid { width: 85px; height: 55px; }
        .puff.large { width: 105px; height: 65px; }

        .base {
          width: 150px;
          height: 55px;
          background: radial-gradient(circle at 50% 30%, #ffffff, #cdd8e4);
          border-radius: 60px;
          transform: translateY(10px);
          box-shadow: inset 0 -8px 16px rgba(180,200,220,0.6);
        }

        .rain {
          position: absolute;
          top: calc(12% + 80px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          height: 75%;
          align-items: flex-start;
          z-index: 20;
          width: 200px;
        }

        .drop {
          width: 3px;
          height: 28px;
          background: linear-gradient(to bottom, 
            rgba(255,255,255,0.9) 0%,
            rgba(224,247,255,0.95) 15%,
            #66bfff 40%,
            #4a9fcc 100%);
          border-radius: 50% 50% 70% 70%;
          opacity: 0;
          position: relative;
          box-shadow: 0 0 3px rgba(102,191,255,0.5);
          animation: realisticFall 2s cubic-bezier(0.15,0,0.25,1) infinite;
        }

        .drop::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -8px;
          transform: translateX(-50%) scale(0);
          width: 28px;
          height: 8px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, 
            rgba(102,191,255,0.8) 0%, 
            rgba(102,191,255,0.4) 40%,
            transparent 70%);
          animation: enhancedSplash 2s ease-out infinite;
          z-index: 10;
        }

        .drop::before {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -12px;
          transform: translateX(-50%) scale(0);
          width: 45px;
          height: 45px;
          border: 2px solid rgba(102,191,255,0.4);
          border-radius: 50%;
          animation: ripple 2s ease-out infinite;
          z-index: 0;
        }

        .drop:nth-child(1) { 
          animation-delay: 0s; 
          transform: translateX(-8px);
        }
        .drop:nth-child(1)::after,
        .drop:nth-child(1)::before { animation-delay: 0s; }

        .drop:nth-child(2) { 
          animation-delay: 0.3s;
          transform: translateX(4px);
          height: 32px;
        }
        .drop:nth-child(2)::after,
        .drop:nth-child(2)::before { animation-delay: 0.3s; }

        .drop:nth-child(3) { 
          animation-delay: 0.6s;
          transform: translateX(-12px);
          height: 26px;
        }
        .drop:nth-child(3)::after,
        .drop:nth-child(3)::before { animation-delay: 0.6s; }

        .drop:nth-child(4) { 
          animation-delay: 0.9s;
          transform: translateX(8px);
          height: 30px;
        }
        .drop:nth-child(4)::after,
        .drop:nth-child(4)::before { animation-delay: 0.9s; }

        .drop:nth-child(5) { 
          animation-delay: 1.2s;
          transform: translateX(-4px);
        }
        .drop:nth-child(5)::after,
        .drop:nth-child(5)::before { animation-delay: 1.2s; }

        .drop:nth-child(6) { 
          animation-delay: 1.5s;
          transform: translateX(12px);
          height: 24px;
        }
        .drop:nth-child(6)::after,
        .drop:nth-child(6)::before { animation-delay: 1.5s; }

        .drop:nth-child(7) { 
          animation-delay: 1.8s;
          transform: translateX(-6px);
          height: 29px;
        }
        .drop:nth-child(7)::after,
        .drop:nth-child(7)::before { animation-delay: 1.8s; }

        .puddle {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 5%;
          width: 85%;
          height: 18px;
          border-radius: 999px;
          background: radial-gradient(circle, 
            rgba(102,191,255,0.15) 0%,
            rgba(255,255,255,0.08) 30%,
            rgba(255,255,255,0.02) 60%,
            transparent 100%);
          filter: blur(0.8px);
          animation: puddleGlow 4s ease-in-out infinite;
        }

        .label {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 16px;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.8px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          animation: labelPulse 3s ease-in-out infinite;
        }
      `}</style>

      <div className="w-full h-full relative overflow-hidden">
        {/* Enhanced Cloud */}
        <div className="cloud">
          <div className="puff small"></div>
          <div className="puff mid"></div>
          <div className="puff large"></div>
          <div className="base"></div>
        </div>

        {/* Enhanced Rain */}
        <div className="rain">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="drop"></div>
          ))}
        </div>

        <div className="puddle"></div>
        <div className="label">{loadingText}</div>
      </div>
    </div>
  );
};

export default LoadingAnimation;