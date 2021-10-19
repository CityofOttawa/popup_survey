// Get gulp components and templates.
import { series, parallel, watch } from "gulp";
import { css, js, lib, sass } from "@coldfrontlabs/gulp-templates";

const paths = {
  css: {
    src: "dist/css",
    dest: "dist/css",
    selector: "**/*.css",
  },
  js: {
    src: "js",
    dest: "dist/js",
    selector: "**/*.js",
  },
  lib: {
    src: [],
    dest: "dist/lib",
  },
  sass: {
    src: "scss",
    dest: "scss",
    selector: "**/*.scss",
    // Ignore specifically for Stylelint:fix bug.
    ignore: [],
  },
  min: "**/*.min.*",
};

/**
 * Lints all Sass files.
 *
 * @return {Object} - Gulp stream.
 */
export const lintStyles = () =>
  sass.lint({ source: `${paths.sass.src}/${paths.sass.selector}` });
lintStyles.description = "Lints all Sass files.";

/**
 * Lints all JS files.
 *
 * @return {Object} - Gulp stream.
 */
export const lintScripts = () =>
  js.lint({ source: `${paths.js.src}/${paths.js.selector}` });
lintScripts.description = "Lints all JS files.";

/**
 * Lints and fixes all Sass files.
 *
 * @return {Object} - Gulp stream.
 */
export const lintStylesFix = () =>
  sass.fix({
    source: [`${paths.sass.src}/${paths.sass.selector}`, ...paths.sass.ignore],
  });
lintStylesFix.description = "Lints and fixes all Sass files.";

/**
 * Lints and fixes all JS files.
 *
 * @return {Object} - Gulp stream.
 */
export const lintScriptsFix = () =>
  js.fix({ source: `${paths.js.src}/${paths.js.selector}` });
lintScriptsFix.description = "Lints and fixes all JS files.";

/**
 * Compiles all Sass files.
 *
 * @return {Object} - Gulp stream.
 */
const compileSass = () =>
  sass.compile({
    source: `${paths.sass.src}/${paths.sass.selector}`,
    destination: paths.css.dest,
  });

/**
 * Compiles all CSS files.
 *
 * @return {Object} - Gulp stream.
 */
const compileCSS = () =>
  css.compile({
    source: [`${paths.css.src}/${paths.css.selector}`, `!${paths.min}`],
    destination: paths.css.dest,
  });

/**
 * Compiles all Sass files and CSS files afterward.
 *
 * @returns {Object} - Gulp stream.
 */
export const compileStyles = series(compileSass, compileCSS);
compileStyles.description = "Compiles all Sass files and CSS files afterward.";

/**
 * Compiles all JS files using Babel.
 *
 * @return {Object} - Gulp stream.
 */
export const compileScripts = () =>
  js.compile({
    source: `${paths.js.src}/${paths.js.selector}`,
    destination: paths.js.dest,
  });
compileScripts.description = "Compiles all JS files using Babel.";

/**
 * Minifies all CSS files.
 *
 * @return {Object} - Gulp stream.
 */
export const minifyStyles = () =>
  css.minify({
    source: [`${paths.css.src}/${paths.css.selector}`, `!${paths.min}`],
    destination: paths.css.dest,
  });
minifyStyles.description = "Minifies all CSS files.";

/**
 * Minifies all JS files.
 *
 * @return {Object} - Gulp stream.
 */
export const minifyScripts = () =>
  js.minify({
    source: [`${paths.js.dest}/${paths.js.selector}`, `!${paths.min}`],
    destination: paths.js.dest,
  });
minifyScripts.description = "Minifies all JS files.";

/**
 * Gathers all required libraries.
 *
 * @return {Object} - Gulp stream.
 */
export const fetchLibs = () =>
  lib.fetch({
    source: paths.lib.src,
    destination: paths.lib.dest,
    sourceOptions: { base: "./node_modules/" },
  });
fetchLibs.description = "Gathers all required libraries.";

/**
 * Lints, compiles, and minifies all Sass/CSS/JS files.
 *
 * @returns {Object} - Gulp stream.
 */
export const buildDev = parallel(
  // fetchLibs,
  series(lintStyles, compileStyles, minifyStyles),
  series(lintScripts, compileScripts, minifyScripts)
);
buildDev.description = "Lints, compiles, and minifies all Sass/CSS/JS files.";

/**
 * Compiles and minifies all Sass/CSS/JS files.
 *
 * @returns {Object} - Gulp stream.
 */
export const buildProd = parallel(
  // fetchLibs,
  series(compileStyles, minifyStyles),
  series(compileScripts, minifyScripts)
);
buildProd.description = "Compiles and minifies all Sass/CSS/JS files.";

/**
 * Watches all Sass/JS files and lints, compiles, and minifies them.
 */
function watchFiles() {
  watch(
    `${paths.sass.src}/${paths.sass.selector}`,
    series(lintStyles, compileStyles, minifyStyles)
  );
  watch(
    `${paths.js.src}/${paths.js.selector}`,
    series(lintScripts, compileScripts, minifyScripts)
  );
}
watchFiles.description =
  "Watches all Sass/JS files and lints, compiles, and minifies them.";
export { watchFiles as watch };

// Create default tasks
export default buildProd;
