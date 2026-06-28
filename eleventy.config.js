/* ============================================================
   Eleventy config — builds src/ into _site/
   Design stays untouched: css/, js/ and assets/ are copied
   through verbatim. Content lives in src/_data/*.json and is
   rendered by the Nunjucks templates → same HTML as before.
   ============================================================ */

module.exports = function (eleventyConfig) {
  // Static, design-critical files pass straight through (unchanged)
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("assets");

  // Rebuild when CSS/JS change during `npm run dev`
  eleventyConfig.addWatchTarget("./css/");
  eleventyConfig.addWatchTarget("./js/");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
