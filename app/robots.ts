export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://hericlesbitencourt.com/sitemap.xml',
    host: 'https://hericlesbitencourt.com',
  };
}
