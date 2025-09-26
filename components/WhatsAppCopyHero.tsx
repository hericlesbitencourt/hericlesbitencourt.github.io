'use client';

import { useState } from 'react';
import { BrazilFlagIcon } from 'components/icons';

export default function WhatsAppCopyHero() {
  const [copied, setCopied] = useState(false);
  const whatsappNumber = '+55 71 99105-1184';

  const handleCopyWhatsApp = async () => {
    try {
      await navigator.clipboard.writeText(whatsappNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy WhatsApp number:', err);
    }
  };

  const handleOpenWhatsApp = () => {
    const cleanedNumber = whatsappNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanedNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex items-center gap-4 mt-3">
      <button
        onClick={handleCopyWhatsApp}
        onDoubleClick={handleOpenWhatsApp}
        className="group text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 flex items-center gap-2"
        title="Click to copy, double-click to open WhatsApp"
      >
        <div className="flex items-center gap-2">
          <BrazilFlagIcon />
          <span className="text-xl font-medium">
            {copied ? 'Number copied!' : whatsappNumber}
          </span>
        </div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="opacity-60 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <polyline points="20,6 9,17 4,12"></polyline>
          ) : (
            <>
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
