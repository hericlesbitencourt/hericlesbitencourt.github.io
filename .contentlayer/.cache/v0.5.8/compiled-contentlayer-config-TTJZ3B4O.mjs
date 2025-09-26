// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
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
var Authors = defineDocumentType(() => ({
  name: "Authors",
  filePathPattern: `authors/**/*.md`,
  contentType: "markdown",
  fields: {
    name: {
      type: "string",
      required: true
    },
    avatar: {
      type: "string"
    },
    occupation: {
      type: "string"
    },
    company: {
      type: "string"
    },
    email: {
      type: "string"
    },
    linkedin: {
      type: "string"
    },
    github: {
      type: "string"
    },
    twitter: {
      type: "string"
    },
    bluesky: {
      type: "string"
    }
  },
  computedFields
}));
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
  documentTypes: [Projects, Authors]
});
export {
  Authors,
  Projects,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-TTJZ3B4O.mjs.map
