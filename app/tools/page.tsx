import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tools',
  description:
    "Here's what tech I'm currently using for coding, videos, and music.",
};

export default function ToolsPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif mb-8">Tools</h1>
      <p className="text-neutral-700 dark:text-neutral-300 mt-1 mb-8">
        Here's what tools and technologies I have experience working with.
      </p>
      <div className="prose prose-neutral dark:prose-invert">
        <h3 id="coding">Coding</h3>
        <ul>
          <li>Languages: JavaScript/TypeScript and Python</li>
          <li>Backend frameworks: Django, FastAPI, Spring Boot (including microservices) and NodeJS</li>
          <li>Frontend frameworks/libraries: React, Next.js, Vue.js and Angular.</li>
          <li>
            Editor: VSCode
          </li>
          <li>Theme: Monokai Pro</li>
          <li>Terminal: Hyper / zsh / Bash</li>
          <li>Containerization: Docker and Kubernetes (K8S)</li>
          <li>Databases: PostgreSQL, MariaDB, MySQL server and SQLServer</li>
        </ul>
        <h3 id="operational-systems">Operational Systems</h3>
        <ul>
          <li>Linux (Debian)</li>
          <li>Windows 11</li>
        </ul>
        <h3 id="pm-tools">Project Management Tools</h3>
        <ul>
          <li>Microsoft Azure DevOps (Teams, VSTS, etc)</li>
          <li>Jira Software</li>
          <li>Slack</li>
          <li>Agile Methodology - Scrum and Kanban boards</li>
        </ul>
        <h3 id="pm-tools">Design Tools</h3> 
        <ul>
          <li>Figma</li>
        </ul>
      </div>
    </section>
  );
}
