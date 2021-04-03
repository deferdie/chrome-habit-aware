let mix = require("laravel-mix");

mix
  .js("src/main.js", "dist/src/js/dist")
  .copyDirectory("src", "dist/src/")
  .copyDirectory("images", "dist/images/")
  .copy("manifest.json", "dist/manifest.json")
  .copy("background.js", "dist/background.js");
