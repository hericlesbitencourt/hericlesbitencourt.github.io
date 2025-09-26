import { notFound } from 'next/navigation'
import { allProjects } from 'contentlayer2/generated'
import PageTitle from 'components/PageTitle'
import { MDXLayoutRenderer } from 'components/MDXComponents'

const DEFAULT_LAYOUT = 'PostLayout'

export async function generateStaticParams() {
  return allProjects.map((p) => ({
    slug: p.slugAsParams,
  }))
}

export default async function Projects({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = allProjects.find((p) => p.slugAsParams === slug)

  if (!project) {
    return (
      <div className="mt-24 text-center">
        <PageTitle>Project Not Found</PageTitle>
        <p className="mt-4">The project you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <>
      {project.draft !== true ? (
        <MDXLayoutRenderer
          layout={project.layout || DEFAULT_LAYOUT}
          toc={project.toc}
          mdxSource={project.body.code}
          frontMatter={project}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
