import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { AppCard } from './components/AppCard';
import { ConnectionLines } from './components/ConnectionLines';
import { OMEGA_APPS, CURRENT_APP_ID } from './constants';
import type { AppInfo, Point } from './types';

const App: React.FC = () => {
  const [apps, setApps] = useState<AppInfo[]>(OMEGA_APPS);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [endPoints, setEndPoints] = useState<Record<string, Point>>({});

  const currentApp = apps.find(app => app.id === CURRENT_APP_ID)!;
  const recommendedApps = apps.filter(app => app.id !== CURRENT_APP_ID);

  const startRef = useRef<HTMLDivElement>(null);
  const endRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const calculatePositions = useCallback(() => {
    // Fix for: Property 'getBoundingClientRect' does not exist on type 'unknown'.
    // Refactored to check for the existence of the ref's current value before using it.
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    if (startRef.current) {
      const rect = startRef.current.getBoundingClientRect();
      setStartPoint({ 
        x: rect.right - containerRect.left, 
        y: rect.top + rect.height / 2 - containerRect.top
      });
    }

    const newEndPoints: Record<string, Point> = {};
    Object.entries(endRefs.current).forEach(([id, el]) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        newEndPoints[id] = { 
          x: rect.left - containerRect.left, 
          y: rect.top + rect.height / 2 - containerRect.top
        };
      }
    });
    setEndPoints(newEndPoints);
  }, []);

  useLayoutEffect(() => {
    // We run calculatePositions() here and then again in a requestAnimationFrame.
    // This addresses a race condition where positions might be calculated
    // before the browser has fully rendered the layout, especially when
    // dealing with images or custom fonts. The second calculation ensures
    // the lines are drawn correctly once the layout is stable.
    calculatePositions();
    
    const animationFrameId = requestAnimationFrame(() => {
      calculatePositions();
    });

    window.addEventListener('resize', calculatePositions);
    
    return () => {
      window.removeEventListener('resize', calculatePositions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [calculatePositions]);
  
  const handleInstallToggle = (id: string) => {
    setApps(prevApps =>
      prevApps.map(app =>
        app.id === id ? { ...app, isInstalled: !app.isInstalled } : app
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">Discover the Omega Pixels Ecosystem</h1>
          <p className="text-lg text-slate-600 mt-2">
            Enhance your Shopify store by connecting powerful apps.
          </p>
        </header>

        <div className="relative" ref={containerRef}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] lg:gap-16 items-start">
            {/* Column 1: Current App */}
            <div className="flex flex-col items-center lg:items-end z-10">
              <AppCard
                app={currentApp}
                isCurrent={true}
                ref={node => {
                  // Fix for: Untyped function calls may not accept type arguments.
                  // Replaced generic with a type assertion to ensure type compatibility.
                  if (node) startRef.current = node.querySelector('.connection-point-start') as HTMLDivElement | null;
                }}
              />
            </div>
            
            {/* Spacer column for large screens */}
            <div className="hidden lg:block w-32"></div>

            {/* Column 2: Recommended Apps */}
            <div className="flex flex-col items-center lg:items-start z-10 mt-12 lg:mt-0">
              <div className="space-y-6 w-full max-w-md">
                {recommendedApps.map(app => (
                  <AppCard
                    key={app.id}
                    app={app}
                    onInstallToggle={handleInstallToggle}
                    isCurrent={false}
                    ref={node => {
                      // Fix for: Untyped function calls may not accept type arguments.
                      // Replaced generic with a type assertion to ensure type compatibility.
                       if (node) endRefs.current[app.id] = node.querySelector('.connection-point-end') as HTMLDivElement | null;
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <ConnectionLines
            startPoint={startPoint}
            endPoints={endPoints}
            apps={recommendedApps}
            currentAppColor={currentApp.color}
          />
        </div>
      </div>
    </div>
  );
};

export default App;