const fs = require("fs");
const path = require("path");

// Read the existing projects data
const projectsDataPath = path.join(__dirname, "../data/projectsData.ts");
const existingProjectsData = fs.readFileSync(projectsDataPath, "utf8");

// Extract the existing projects array using a more robust approach
const existingProjects = [];
const projectRegex =
  /\{\s*title:\s*"([^"]+)",\s*description:\s*`([^`]+)`,\s*imgSrc:\s*"([^"]+)",\s*href:\s*"([^"]+)"\s*\}/g;
let match;

while ((match = projectRegex.exec(existingProjectsData)) !== null) {
  existingProjects.push({
    title: match[1],
    description: match[2],
    imgSrc: match[3],
    href: match[4],
  });
}

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
fs.writeFileSync(projectsDataPath, updatedContent);
console.log(
  `Updated projectsData.ts with ${allProjects.length} projects (${existingProjects.length} existing, ${newProjects.length} new)`
);
