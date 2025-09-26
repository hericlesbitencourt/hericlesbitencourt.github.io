import { ReactNode } from 'react'
import type { Projects } from 'contentlayer2/generated'
import Link from 'components/link'
import PageTitle from 'components/PageTitle'
import Image from 'components/image'
import ImageCarousel from 'components/ImageCarousel'
import BackButton from 'components/BackButton'
import { ChevronLeftIcon } from 'components/icons'
import formatDate from 'lib/utils/formatDate'
import siteMetadata from 'data/siteMetadata'
import ScrollTopAndComment from 'components/ScrollTopAndComment'
import { BlogSEO } from 'components/SEO'

interface LayoutProps {
  frontMatter: Projects
  authorDetails?: any[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({authorDetails = [], frontMatter, prev, next, children }: LayoutProps) {
  const { date, title } = frontMatter

  const canonicalUrl = `${siteMetadata.siteUrl}/projects/${frontMatter.slugAsParams}`

  return (
    <>
      <BlogSEO 
        authorDetails={authorDetails}
        title={frontMatter.title}
        summary={frontMatter.summary || ''}
        date={frontMatter.date}
        lastmod={frontMatter.date}
        url={canonicalUrl}
        canonicalUrl={canonicalUrl}
      />
      <ScrollTopAndComment />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton href="/projects" />
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
          <header className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-800 dark:to-zinc-700 px-6 py-8 border-b border-gray-200 dark:border-zinc-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm text-gray-600 dark:text-zinc-300 font-medium">
                <time dateTime={date}>
                  {formatDate(date)}
                </time>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                <PageTitle>{title}</PageTitle>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {authorDetails && authorDetails.length > 0 && authorDetails.map((author) => (
                  <Link key={author.name} href={author.linkedin} className="group">
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/20 dark:hover:bg-zinc-600/50 transition-all duration-200">
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={32}
                          height={32}
                          alt="avatar"
                          className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-zinc-600"
                        />
                      )}
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {author.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-zinc-300">
                          Project Lead
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {frontMatter.tags && frontMatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {frontMatter.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {frontMatter.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300 text-xs font-medium rounded-full">
                      +{frontMatter.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </header>

          <div className="p-6">
            {/* Image Carousel */}
            {frontMatter.images && frontMatter.images.length > 0 && (
              <div className="mb-8">
                <ImageCarousel images={frontMatter.images} title={frontMatter.title} />
              </div>
            )}
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {children}
            </div>

          </div>

          <footer className="bg-gray-50 dark:bg-zinc-800 px-6 py-4 border-t border-gray-200 dark:border-zinc-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {prev && (
                <Link
                  href={`/projects/${prev.path}`}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
                >
                  <ChevronLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                  <span>{prev.title}</span>
                </Link>
              )}
              
              <div className="flex-1"></div>
              
              {next && (
                <Link
                  href={`/projects/${next.path}`}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
                >
                  <span>{next.title}</span>
                  <ChevronLeftIcon className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              )}
            </div>
          </footer>
        </div>
      </article>
    </>
  )
}
