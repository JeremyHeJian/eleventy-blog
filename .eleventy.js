const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  // Filters
  eleventyConfig.addFilter("formatDate", (date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  });

  eleventyConfig.addFilter("isoDate", (date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toISOString();
  });

  eleventyConfig.addFilter("slugify", (str) =>
    str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
  );

  eleventyConfig.addFilter("filterByTag", (posts, tag) =>
    (posts || []).filter((post) => (post.data.tags || []).includes(tag))
  );

  // Globals
  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());
  eleventyConfig.addGlobalData("site", { url: "https://example.com" });

  // Collections
  eleventyConfig.addCollection("blogpost", (collectionApi) => {
    const posts = collectionApi.getFilteredByGlob("src/posts/*.md");

    for (const post of posts) {
      const { title, description, pubDate, tags } = post.data;
      const path = post.inputPath;
      if (!title || typeof title !== "string") throw new Error(`Missing 'title' in ${path}`);
      if (!description || typeof description !== "string") throw new Error(`Missing 'description' in ${path}`);
      if (!(pubDate instanceof Date)) throw new Error(`Invalid 'pubDate' in ${path}`);
      if (!Array.isArray(tags)) throw new Error(`Missing 'tags' in ${path}`);
    }

    return posts.sort((a, b) => b.data.pubDate - a.data.pubDate);
  });

  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const tags = new Set();
    collectionApi.getFilteredByGlob("src/posts/*.md")
      .forEach((post) => (post.data.tags || []).forEach((tag) => tags.add(tag)));
    return [...tags];
  });

  // Passthrough
  eleventyConfig.addPassthroughCopy({ public: "/" });

  // Dev server
  eleventyConfig.setServerOptions({
    host: process.env.EDUCATIVE_LIVE_VM_URL ? "0.0.0.0" : "localhost",
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
};
