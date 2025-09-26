// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
  },
  toc: {
    type: "json",
    resolve: (doc) => {
      return [];
    }
  },
  layout: {
    type: "string",
    resolve: (doc) => {
      return "PostLayout";
    }
  }
};
var Projects = defineDocumentType(() => ({
  name: "Projects",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string"
    },
    imgSrc: {
      type: "string"
    },
    href: {
      type: "string"
    },
    date: {
      type: "string"
    },
    tags: {
      type: "list",
      of: {
        type: "string"
      }
    },
    draft: {
      type: "boolean"
    },
    images: {
      type: "list",
      of: {
        type: "string"
      }
    },
    summary: {
      type: "string"
    }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./content",
  documentTypes: [Projects]
});
export {
  Projects,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-MGY3I75G.mjs.map
