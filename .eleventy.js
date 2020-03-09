module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksFilter("richText", function(value) {
    return PrismicDOM;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data"
    }
  };
};
