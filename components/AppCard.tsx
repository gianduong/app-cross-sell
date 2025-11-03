import React, { forwardRef, useState, useCallback } from 'react';
import type { AppInfo } from '../types';

interface AppCardProps {
  app: AppInfo;
  isCurrent: boolean;
  onInstallToggle?: (id: string) => void;
}

export const AppCard = forwardRef<HTMLDivElement, AppCardProps>(
  ({ app, isCurrent, onInstallToggle }, ref) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyCode = useCallback(() => {
      if (!app.discountCode || isCopied) return;

      navigator.clipboard.writeText(app.discountCode).then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy code: ', err);
      });
    }, [app.discountCode, isCopied]);

    const renderButton = () => {
      if (isCurrent) {
        return (
          <div className="flex items-center space-x-1.5 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0">
            <CheckCircleIcon className="w-4 h-4" />
            <span>Active App</span>
          </div>
        );
      }
      
      if (app.isInstalled) {
        return (
          <div
            className="flex items-center space-x-1.5 bg-slate-200 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0"
          >
            <CheckCircleIcon className="w-4 h-4 text-green-600" />
            <span>Installed</span>
          </div>
        );
      }

      return (
        <button
          onClick={() => onInstallToggle?.(app.id)}
          className="flex items-center space-x-1.5 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-transform hover:scale-105 hover:bg-gray-800 shadow-md flex-shrink-0"
        >
          <PlusCircleIcon className="w-4 h-4" />
          <span>Install</span>
        </button>
      );
    };

    return (
      <div 
        ref={ref}
        className="relative bg-white p-4 rounded-2xl shadow-lg border border-slate-200/80 w-full max-w-md"
      >
        <div className="flex items-start space-x-3">
          <img src={app.logo} alt={`${app.name} logo`} className="w-14 h-14 rounded-lg shadow-md" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-base text-slate-900 pr-4">{app.name}</h3>
              {renderButton()}
            </div>
            <p className="text-xs text-slate-500 mt-1">{app.description}</p>
            
            {!isCurrent && !app.isInstalled && app.discountCode && (
              <button
                onClick={handleCopyCode}
                aria-label={`Copy discount code ${app.discountCode}`}
                className="mt-2 inline-flex items-center gap-1.5 border border-dashed border-amber-500 bg-amber-50 text-amber-800 rounded-md px-2 py-1 transition-colors hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                {isCopied ? (
                  <>
                    <CheckCircleIcon className="w-3.5 h-3.5 text-green-600" />
                    <p className="text-[10px] font-medium text-green-700">Copied!</p>
                  </>
                ) : (
                  <>
                    <TagIcon className="w-3.5 h-3.5" />
                    <p className="text-[10px] font-medium">
                      Use code: <span className="font-bold">{app.discountCode}</span>
                    </p>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {isCurrent ? (
            <div className="connection-point-start absolute top-1/2 -right-0.5 h-2.5 w-2.5 -translate-y-1/2 bg-slate-300 rounded-full" />
        ) : (
            <div className="connection-point-end absolute top-1/2 -left-0.5 h-2.5 w-2.5 -translate-y-1/2 bg-slate-300 rounded-full" />
        )}
      </div>
    );
  }
);

AppCard.displayName = "AppCard";

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const PlusCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const TagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.75a4.5 4.5 0 1 1-6.364 6.364l-4.546 4.546-1.06-1.06 4.546-4.546a4.5 4.5 0 0 1 6.364-6.364m2.25 2.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
  </svg>
);
