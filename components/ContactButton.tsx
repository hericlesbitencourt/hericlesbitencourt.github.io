'use client';

export default function ContactButton() {
  const handleContactClick = () => {
    const contactSection = document.querySelector('#contact-section');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleContactClick}
      className="focusable flex flex-none cursor-pointer items-center justify-center gap-2 rounded-xl bg-white border-2 border-zinc-300 py-3 px-6 text-base font-bold text-zinc-800 transition-all duration-200 hover:bg-zinc-50 hover:border-zinc-400 hover:scale-105 focus:ring-4 focus:ring-zinc-300/40 dark:bg-white dark:text-zinc-800 dark:border-zinc-300 dark:hover:bg-zinc-100"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
      <span className="inline">Get In Touch</span>
    </button>
  );
}
