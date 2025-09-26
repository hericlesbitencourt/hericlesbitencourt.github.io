import { metadata } from 'app/layout'
import { escape } from 'lib/utils/htmlEscaper'


const generateRssItem = (post) => `
  <item>
    <guid>${metadata.openGraph?.url}/projects/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${metadata.openGraph?.url}/projects/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${metadata.openGraph?.emails} (${metadata.openGraph?.siteName})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`

const generateRss = (posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(metadata.title)}</title>
      <link>${metadata.openGraph?.url}/projects</link>
      <description>${escape(metadata.description)}</description>
      <language>${metadata.openGraph?.locale}</language>
      <managingEditor>${metadata.openGraph?.emails} (${metadata.openGraph?.siteName})</managingEditor>
      <webMaster>${metadata.openGraph?.emails} (${metadata.openGraph?.siteName})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${metadata.openGraph?.url}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`
export default generateRss
