import React from 'react';
import type { AppInfo, Point } from '../types';

interface ConnectionLinesProps {
  startPoint: Point | null;
  endPoints: Record<string, Point>;
  apps: AppInfo[];
  currentAppColor: string;
}

export const ConnectionLines: React.FC<ConnectionLinesProps> = ({ startPoint, endPoints, apps, currentAppColor }) => {
  if (!startPoint) return null;

  const getPathData = (start: Point, end: Point) => {
    const dx = end.x - start.x;
    const controlPointX1 = start.x + dx / 2;
    const controlPointY1 = start.y;
    const controlPointX2 = end.x - dx / 2;
    const controlPointY2 = end.y;
    return `M ${start.x} ${start.y} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${end.x} ${end.y}`;
  };

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    >
      <defs>
        {apps.map(app => (
          <linearGradient key={app.id} id={`gradient-${app.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: currentAppColor, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: app.color, stopOpacity: 1 }} />
          </linearGradient>
        ))}
      </defs>
      <g>
        {apps.map(app => {
          const endPoint = endPoints[app.id];
          if (!endPoint) return null;

          const pathData = getPathData(startPoint, endPoint);
          const strokeColor = app.isInstalled ? `url(#gradient-${app.id})` : '#cbd5e1'; // slate-300
          
          return (
            <path
              key={app.id}
              d={pathData}
              fill="none"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
              className="transition-all duration-500 ease-in-out"
              strokeDasharray={app.isInstalled ? 'none' : '8 8'}
            >
              {app.isInstalled && (
                  <animate
                    attributeName="stroke-dasharray"
                    from="500"
                    to="0"
                    dur="1s"
                    fill="freeze"
                   />
              )}
            </path>
          );
        })}
      </g>
    </svg>
  );
};
