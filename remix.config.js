/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: 'app',
  ignoredRouteFiles: ['**/.*'],
  watchPaths: ['./public', './.env'],
  server: './server.js',
  /**
   * The following settings are required to deploy Hydrogen apps to Oxygen:
   */
  publicPath: (process.env.HYDROGEN_ASSET_BASE_URL ?? '/') + 'build/',
  assetsBuildDirectory: 'dist/client/build',
  serverBuildPath: 'dist/worker/index.js',
  serverMainFields: ['browser', 'module', 'main'],
  serverConditions: ['worker', process.env.NODE_ENV],
  serverDependenciesToBundle: 'all',
  serverModuleFormat: 'esm',
  serverPlatform: 'neutral',
  serverMinify: process.env.NODE_ENV === 'production',

  // Configs compilation CSS
  // external sources
  // optimize: {
  //   bundle: {
  //     // ...other configs...
  //     external: {
  //       include: ['/public/assets/**/*'],
  //     },
  //   },
  // },

  // Add this section to mark the font file path as external
  // webpack(config, { env }) {
  //   if (env === "development") {
  //     // Add the font file path to the external array
  //     config.externals.push(
  //       // Replace "fonts/roboto-mono/Roboto_Mono__700.ttf" with the actual font file path
  //       // relative to the CSS file that imports it
  //       "/public/assets/Poppins-Regular.ttf",
  //       "/public/assets/NoticiaText-Regular.ttf",

  //     );
  //   }
  //   return config;
  // },
};
