const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function scrapeLinkedInProjects() {
  console.log("Starting LinkedIn scraping...");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    // Navigate to LinkedIn profile projects section
    await page.goto(
      "https://www.linkedin.com/in/hericlesbitencourt/details/projects/",
      {
        waitUntil: "networkidle2",
        timeout: 60000,
      }
    );

    // Wait for projects to load
    await page.waitForSelector(".pvs-list__outer-container", {
      timeout: 10000,
    });

    // Extract project information
    const projects = await page.evaluate(() => {
      const projectElements = document.querySelectorAll(
        ".pvs-list__outer-container"
      );
      const projectsData = [];

      projectElements.forEach((element) => {
        const titleElement = element.querySelector('span[aria-hidden="true"]');
        const descriptionElement = element.querySelector(
          ".pvs-entity__secondary-title"
        );
        const dateElement = element.querySelector(
          ".pvs-entity__caption-wrapper"
        );

        if (titleElement) {
          const title = titleElement.textContent.trim();
          const description = descriptionElement
            ? descriptionElement.textContent.trim()
            : "";
          const date = dateElement ? dateElement.textContent.trim() : "";

          // Clean up the title to match folder names
          const cleanTitle = title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();

          projectsData.push({
            title,
            cleanTitle,
            description,
            date,
          });
        }
      });

      return projectsData;
    });

    console.log("Found projects:", projects);

    // Save the scraped data to a JSON file
    const outputPath = path.join(__dirname, "../scraped-projects.json");
    fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
    console.log(`Project data saved to ${outputPath}`);

    return projects;
  } catch (error) {
    console.error("Error scraping LinkedIn:", error);
    return [];
  } finally {
    await browser.close();
  }
}

// Run the scraper
scrapeLinkedInProjects()
  .then((projects) => {
    console.log(`Scraped ${projects.length} projects`);
  })
  .catch((error) => {
    console.error("Failed to scrape projects:", error);
  });
