import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-sand px-5 py-24 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyprus/10 flex items-center justify-center text-cyprus mx-auto">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold block">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-cyprus">
          Page Not Found
        </h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          The page or case study you're looking for doesn't exist or has moved. Return to the Exception IT portfolio showcase.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyprus text-sand font-semibold text-xs uppercase tracking-wider hover:bg-cyprus-soft transition-colors shadow-md"
          >
            <Home className="w-4 h-4" /> Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
