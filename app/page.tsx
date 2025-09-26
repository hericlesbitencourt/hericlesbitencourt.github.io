import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowIcon,
  GitHubIcon,
  LinkedinIcon,
} from 'components/icons';
import { name, avatar } from 'lib/info';
import Card from 'components/card';
import projectsData from 'data/projectsData';
import ContactButton from 'components/ContactButton';
import EmailCopyButton from 'components/EmailCopyButton';
import EmailCopyHero from 'components/EmailCopyHero';
import WhatsAppCopyHero from 'components/WhatsAppCopyHero';

export const revalidate = 60;

export default async function HomePage() {

  return (
    <section>
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left mt-8 mb-12">
        <h1
          className="mt-2 mb-1 text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white drop-shadow"
          style={{
            textShadow: '0 2px 8px rgba(0,0,0,0.10)',
            letterSpacing: '-0.02em',
          }}
        >
          {name}
        </h1>
          <h2 className="mb-3 text-lg font-bold tracking-tight text-zinc-600 dark:text-white md:text-xl">
            Software Engineer
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <a
              className="focusable flex flex-none cursor-pointer items-center justify-center gap-3 rounded-xl bg-black py-3 px-7 text-base font-bold text-white shadow-xl shadow-black/20 transition-all duration-200 hover:bg-zinc-800 hover:scale-105 hover:shadow-black/40 focus:ring-4 focus:ring-zinc-700/40 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-100"
              href="/Hericles Resume.pdf"
              rel="noreferrer"
              style={{ boxShadow: '0 6px 24px 0 rgba(0,0,0,0.13)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <polyline points="9 15 12 18 15 15" />
              </svg>
              <span className="inline">Download CV</span>
            </a>
            <div className="flex gap-2 ml-2">
              <a
                href="https://www.linkedin.com/in/hericlesbitencourt"
                target="_blank"
                rel="noopener noreferrer"
                className="focusable flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500 text-white shadow-lg transition-all duration-200 hover:bg-blue-600 hover:scale-105 focus:ring-4 focus:ring-blue-500/40"
                title="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://github.com/hericlesbitencourt"
                target="_blank"
                rel="noopener noreferrer"
                className="focusable flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 text-white shadow-lg transition-all duration-200 hover:bg-gray-900 hover:scale-105 focus:ring-4 focus:ring-gray-700/40 dark:bg-gray-700 dark:hover:bg-gray-600"
                title="GitHub"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-3">
            <EmailCopyHero />
            <span className="text-zinc-400 dark:text-zinc-500 hidden sm:block">•</span>
            <WhatsAppCopyHero />
          </div>
        </div>

        {/* Projects Section */}
        <div className="content my-8">
        <h2 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-white">Projects</h2>
        <p className="max-w-2xl leading-relaxed text-zinc-600 dark:text-zinc-400 text-lg">
          A selection of projects I worked on in the past few years.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {projectsData.map((d) => (
          <Card
            key={d.title}
            title={d.title}
            description={d.description}
            imgSrc={d.imgSrc}
            href={d.href}
          />
        ))}
      </div>

      {/* Contact Section */}
      <section id="contact-section" className="mt-20 mb-16">
        <div className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 rounded-2xl p-8 shadow-xl border border-zinc-200 dark:border-zinc-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">Get In Touch</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://www.linkedin.com/in/hericlesbitencourt"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-zinc-200 dark:border-zinc-700"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <LinkedinIcon />
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">LinkedIn</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Connect with me professionally</p>
            </a>

            <a
              href="https://github.com/hericlesbitencourt"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-zinc-200 dark:border-zinc-700"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-900/30 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <GitHubIcon />
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">GitHub</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Check out my code repositories</p>
            </a>

            <EmailCopyButton />
          </div>
        </div>
      </section>
    </section>
  );
}
