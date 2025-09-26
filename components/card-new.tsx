import Image from 'next/image';
import Link from 'next/link';

const Card = ({ title, description, imgSrc, href }) => (
  <div className="p-4 w-full md:w-1/2 lg:w-1/3">
    <div className="group bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full">
      {imgSrc && (
        <div className="relative overflow-hidden">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                width={400}
                height={200}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
              width={400}
              height={200}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      
      <div className="p-6 flex flex-col h-full">
        <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`} className="hover:no-underline">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4 flex-grow leading-relaxed">
          {description}
        </p>
        
        {href && (
          <div className="mt-auto">
            <Link
              href={href}
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all duration-300 group/link"
              aria-label={`Link to ${title}`}
            >
              <span>View Project</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover/link:translate-x-1"
              >
                <path d="M7 17L17 7"></path>
                <path d="M7 7h10v10"></path>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Card;
