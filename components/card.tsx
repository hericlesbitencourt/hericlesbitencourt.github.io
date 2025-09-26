"use client";

import Image from 'components/image';
import Link from 'next/link';
import { useState } from 'react';

// Helper function to extract technologies from title
const extractTechnologies = (title) => {
  const match = title.match(/^\[([^\]]+)\]/);
  if (match) {
    return match[1].split('/').map(tech => tech.trim());
  }
  return [];
};

// Helper function to clean title (remove technology prefix)
const cleanTitle = (title) => {
  return title.replace(/^\[[^\]]+\]\s*/, '');
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });
};

interface CardProps {
  key?: string;
  title: string;
  description: string;
  imgSrc: string;
  href: string;
  date?: string;
  tags?: string[];
}

const Card = ({ title, description, imgSrc, href, date, tags = [] }: CardProps) => {
  const technologies = extractTechnologies(title);
  const cleanedTitle = cleanTitle(title);
  const formattedDate = formatDate(date);
  const [imgLoaded, setImgLoaded] = useState(false);
  
  return (
    <div className="h-full">
      <div className="group bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        {imgSrc && (
          <div className="relative overflow-hidden">
            {/* Custom placeholder shown while image is loading */}
            {!imgLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-gray-400 dark:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            )}
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                <Image
                  alt={title}
                  src={imgSrc}
                  className={`object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                  width={400}
                  height={200}
                  onLoad={() => setImgLoaded(true)}
                />
              </Link>
            ) : (
              <Image
                alt={title}
                src={imgSrc}
                className={`object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                width={400}
                height={200}
                onLoad={() => setImgLoaded(true)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
        
        <div className="p-5 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`} className="hover:no-underline">
                {cleanedTitle}
              </Link>
            ) : (
              cleanedTitle
            )}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 flex-grow leading-relaxed line-clamp-3">
            {description}
          </p>
          
          {/* Technology Tags */}
          {technologies.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded"
                  >
                    {tech}
                  </span>
                ))}
                {technologies.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300 text-xs font-medium rounded">
                    +{technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Date and View Link */}
          <div className="mt-auto pt-2 border-t border-gray-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              {formattedDate && (
                <span className="text-xs text-gray-500 dark:text-zinc-400">
                  {formattedDate}
                </span>
              )}
              
              {href && (
                <Link
                  href={href}
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium hover:gap-2 transition-all duration-300 group/link"
                  aria-label={`Link to ${title}`}
                >
                  <span>View</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                  >
                    <path d="M7 17L17 7"></path>
                    <path d="M7 7h10v10"></path>
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
