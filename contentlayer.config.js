import { defineDocumentType, makeSource } from "contentlayer/source-files";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  toc: {
    type: "json",
    resolve: (doc) => {
      // This would normally be populated by a remark plugin
      // For now, we'll return an empty array
      return [];
    },
  },
  layout: {
    type: "string",
    resolve: (doc) => {
      // Default layout for projects
      return "PostLayout";
    },
  },
};

// export const Page = defineDocumentType(() => ({
//   name: "Page",
//   filePathPattern: `pages/**/*.mdx`,
//   contentType: "mdx",
//   fields: {
//     title: {
//       type: "string",
//       required: true,
//     },
//     description: {
//       type: "string",
//     },
//   },
//   computedFields,
// }));

export const Projects = defineDocumentType(() => ({
  name: "Projects",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    imgSrc: {
      type: "string",
    },
    href: {
      type: "string",
    },
    date: {
      type: "string",
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
    },
    draft: {
      type: "boolean",
    },
    images: {
      type: "list",
      of: {
        type: "string",
      },
    },
    summary: {
      type: "string",
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Projects],
});
