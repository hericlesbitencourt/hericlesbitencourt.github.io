import siteMetadata from 'data/siteMetadata';
import projectsData from 'data/projectsData';
import Card from 'components/card';
import { PageSEO } from 'components/SEO';

export default function Projects() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="">
        <div className="space-y-2 pt-6 pb-6 md:space-y-5">
          <h1 className="mb-1 text-3xl font-bold tracking-tight text-zinc-800 dark:text-white md:text-5xl">
            Projects
          </h1>
          <p className="text-lg leading-7 text-zinc-500 dark:text-zinc-400">
            A selection of projects I worked on in the past few years.
          </p>
        </div>
        <div className="container py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                date={d.date}
                tags={d.tags}
              />
            ))} 
          </div>
        </div>
      </div>
    </>
  );
}
