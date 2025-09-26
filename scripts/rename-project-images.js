const fs = require("fs");
const path = require("path");

// Project folders
const projectFolders = [
  "affinity-app",
  "cpfl",
  "eletra",
  "informativoir",
  "power meter",
  "sae",
  "sod noronha celpe",
];

// Function to rename images in a folder
function renameImagesInFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    console.warn(`Warning: Folder not found: ${folderPath}`);
    return;
  }

  const files = fs.readdirSync(folderPath);

  // Filter for image files
  const imageFiles = files.filter(
    (file) =>
      file.endsWith(".png") ||
      file.endsWith(".jpg") ||
      file.endsWith(".jpeg") ||
      file.endsWith(".gif")
  );

  if (imageFiles.length === 0) {
    console.warn(`Warning: No images found in ${folderPath}`);
    return;
  }

  // Sort files alphabetically
  imageFiles.sort();

  console.log(`Processing ${imageFiles.length} images in ${folderPath}`);

  // Rename files
  imageFiles.forEach((file, index) => {
    const oldPath = path.join(folderPath, file);

    // Get file extension
    const extension = path.extname(file);

    // New filename
    const newFileName = `${index + 1}${extension}`;
    const newPath = path.join(folderPath, newFileName);

    // Rename the file
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${file} -> ${newFileName}`);
  });
}

// Process each project folder
projectFolders.forEach((folder) => {
  const folderPath = path.join(
    __dirname,
    "../public/static/images/projects",
    folder
  );
  console.log(`\nProcessing folder: ${folder}`);
  renameImagesInFolder(folderPath);
});

console.log("\nAll images have been renamed successfully!");
