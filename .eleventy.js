module.exports = function(eleventyConfig) {
  const PrismicDOM = require("prismic-dom");

  eleventyConfig.addNunjucksFilter("richText", function(value) {
    return PrismicDOM.RichText.asHtml(value);
  });

  return {
    dir: { 
      input: "src",
      output: "_site",
      data: "_data"
    }
  };
};
