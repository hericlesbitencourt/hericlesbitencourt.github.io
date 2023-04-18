import {
  ArrowIcon,
  GitHubIcon,
  LinkedinIcon,
} from "components/icons";

export default function AboutPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">About Me</h1>
      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        Hey there! My name is Hericles, and I'm a software developer based in the beautiful city of Salvador, Brazil. 
      </p>
      <div className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200">
        <p>
          I'm currently <b>Software Developer at Lactec</b>. I have
          gained extensive experience in developing software solutions for a
          wide range of clients and industries. From building custom web and
          mobile applications to implementing complex data management systems, I
          have a proven track record of delivering high-quality solutions that
          meet the needs of the clients.
        </p>
        <hr />
        <p>
          As someone who has faced numerous challenges and struggles in life, I
          am incredibly passionate about personal and professional growth. I
          believe that <b>no matter what obstacles</b> we face, there is always
          an opportunity to learn, grow, and become a better version of
          ourselves.
        </p>
        <p>
          I enjoy pursuing personal growth through activities such as
          meditation, listen some music, and reading religious books.
        </p>
        <p className="mb-8">
          If you liked me, feel free to contact me. I'm always open to new
          opportunities.
        </p>
        <div className="flex flex-col gap-2 md:flex-row md:gap-2">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://linkedin.com/in/hericlesbitencourt"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <LinkedinIcon />
              <div className="ml-3">Linkedin</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/hericlesbitencourt"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <GitHubIcon />
              <div className="ml-3">GitHub</div>
            </div>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
