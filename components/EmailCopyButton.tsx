'use client';

import { useState } from 'react';

export default function EmailCopyButton() {
  const [copied, setCopied] = useState(false);
  const email = 'hericlesbitencourt@icloud.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopyEmail}
        className="group bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-zinc-200 dark:border-zinc-700 text-left w-full relative"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </svg>
          )}
        </div>
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
          {copied ? 'Email Copied!' : 'Email'}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 break-all">
          {copied ? 'Email copied to clipboard' : email}
        </p>
      </button>
      
      {/* Flashy Cloud Indicator - Always Visible - Outside card */}
      {!copied && (
        <div className="absolute -top-4 -right-4 transform rotate-12 z-20">
          <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg animate-pulse">
            <span className="relative z-10">Click to Copy!</span>
            {/* Cloud-like glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-sm opacity-70 animate-ping"></div>
            {/* Sparkle effects */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-300 rounded-full animate-ping"></div>
          </div>
        </div>
      )}

      {/* Success celebration effect - Outside card */}
      {copied && (
        <div className="absolute -top-4 -right-4 transform z-20">
          <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg">
            <span className="relative z-10">Copied! ✨</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-sm opacity-70"></div>
          </div>
        </div>
      )}
    </div>
  );
}
