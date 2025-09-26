const fs = require("fs");
const path = require("path");

// Read the project template
const projectTemplate = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../project-template.json"), "utf8")
);

// Function to get the first image alphabetically from a project folder
function getFirstImage(projectFolder) {
  const imagesPath = path.join(
    __dirname,
    "../public/static/images/projects",
    projectFolder
  );

  if (!fs.existsSync(imagesPath)) {
    console.warn(`Warning: Image folder not found for ${projectFolder}`);
    return `/static/images/projects/default.png`;
  }

  const files = fs.readdirSync(imagesPath);
  const imageFiles = files.filter(
    (file) =>
      file.endsWith(".png") ||
      file.endsWith(".jpg") ||
      file.endsWith(".jpeg") ||
      file.endsWith(".gif")
  );

  if (imageFiles.length === 0) {
    console.warn(`Warning: No images found in ${projectFolder}`);
    return `/static/images/projects/default.png`;
  }

  // Sort alphabetically and return the first one
  imageFiles.sort();
  return `/static/images/projects/${projectFolder}/${imageFiles[0]}`;
}

// Create new project entries
const newProjects = Object.keys(projectTemplate).map((projectKey) => {
  const projectData = projectTemplate[projectKey];
  const mainImage = getFirstImage(projectKey);

  // Convert project key to slug format (replace spaces with hyphens)
  const slug = projectKey.toLowerCase().replace(/\s+/g, "-");

  return {
    title: projectData.title,
    description: projectData.summary,
    imgSrc: mainImage,
    href: `/projects/${slug}`,
  };
});

// Existing projects that were in the original file
const existingProjects = [
  {
    title: "Texas Seguros",
    description: `CRM solution for a major insurance provider, integrating Django, React, and Postgres.`,
    imgSrc: "/static/images/projects/fabrilab.png",
    href: "/projects/texas-seguros",
  },
  {
    title: "Toy Surfboards",
    description: `Creation & developpement of a e-commerce website.`,
    imgSrc: "/static/images/projects/browser_toy.png",
    href: "/projects/toy-surfboards",
  },
  {
    title: "TotalEnergies",
    description: `Creation of Guidelines for Small & Big Packaging.`,
    imgSrc: "/static/images/projects/TE-Project-2022.png",
    href: "/projects/total-energies",
  },
  {
    title: "Havana Club x VALD",
    description: `Operational launch of the Havana Club x VALD collaboration.`,
    imgSrc: "/static/images/projects/havanaclub-vald.jpg",
    href: "/projects/havana-club-x-vald",
  },
];

// Combine existing and new projects
const allProjects = [...existingProjects, ...newProjects];

// Generate the updated projectsData.ts content
const updatedContent = `const projectsData = [
  ${allProjects
    .map(
      (project) => `  {
    title: "${project.title}",
    description: \`${project.description}\`,
    imgSrc: "${project.imgSrc}",
    href: "${project.href}",
  }`
    )
    .join(",\n")}
];

export default projectsData;
`;

// Write the updated content to the file
const projectsDataPath = path.join(__dirname, "../data/projectsData.ts");
fs.writeFileSync(projectsDataPath, updatedContent);
console.log(
  `Fixed projectsData.ts with ${allProjects.length} projects (${existingProjects.length} existing, ${newProjects.length} new)`
);
