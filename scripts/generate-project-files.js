const fs = require("fs");
const path = require("path");

// Read the project template
const projectTemplate = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../project-template.json"), "utf8")
);

// Function to get all images in a project folder
function getAllImages(projectFolder) {
  const imagesPath = path.join(
    __dirname,
    "../public/static/images/projects",
    projectFolder
  );

  if (!fs.existsSync(imagesPath)) {
    console.warn(`Warning: Image folder not found for ${projectFolder}`);
    return [];
  }

  const files = fs.readdirSync(imagesPath);
  const imageFiles = files.filter(
    (file) =>
      file.endsWith(".png") ||
      file.endsWith(".jpg") ||
      file.endsWith(".jpeg") ||
      file.endsWith(".gif")
  );

  // Sort alphabetically and return full paths
  imageFiles.sort();
  return imageFiles.map(
    (file) => `/static/images/projects/${projectFolder}/${file}`
  );
}

// Function to generate MDX content
function generateMDXContent(projectData, images) {
  const slug = projectData.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return `---
title: ${projectData.title}
date: '${projectData.date}'
tags: ${JSON.stringify(projectData.tags)}
draft: false
images: ${JSON.stringify(images)}
summary: '${projectData.summary.replace(/'/g, "\\'")}'
description: '${projectData.description.replace(/'/g, "\\'")}'
href: '/projects/${slug}'
---

## ${projectData.title}

### Project Overview:
${projectData.description}

### Achievements:

${projectData.achievements
  .map((achievement) => `- **${achievement}**`)
  .join("\n")}

### Technologies/Tech Stack:
**${projectData.technologies.join(", ")}**

---
`;
}

// Create MDX files for each project
Object.keys(projectTemplate).forEach((projectKey) => {
  const projectData = projectTemplate[projectKey];
  const images = getAllImages(projectKey);
  const mdxContent = generateMDXContent(projectData, images);

  // Convert project key to slug format (replace spaces with hyphens)
  const slug = projectKey.toLowerCase().replace(/\s+/g, "-");

  // Write MDX file
  const mdxPath = path.join(__dirname, "../content/projects", `${slug}.mdx`);
  fs.writeFileSync(mdxPath, mdxContent);
  console.log(`Created MDX file for ${projectData.title} at ${mdxPath}`);
});

console.log("All project MDX files have been generated!");
console.log(
  "Please review and update the project-template.json file with accurate information before proceeding."
);
