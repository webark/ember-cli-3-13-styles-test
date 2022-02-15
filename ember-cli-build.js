'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const nodeSass = require('node-sass');

const environment = process.env.EMBER_ENV;
const pluginsToBlacklist = environment === 'production' ? ['ember-freestyle'] : [];

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    addons: {
      blacklist: pluginsToBlacklist,
    },

    // SCSS source maps require a magical incantation.
    // You need both sassOptions.sourceMapEmbed = true, and
    // autoprefixer.sourcemap = true
    // see https://github.com/kimroen/ember-cli-autoprefixer/issues/18#issuecomment-281564593
    sassOptions: {
      implementation: nodeSass,
      sourceMapEmbed: true,
    },

    autoprefixer: {
      sourcemap: true,
    },

    autoImport: {
      webpack: {
        // fs, path, and urix are from importing @testing-library/jest-dom:
        node: {
          fs: 'empty',
          path: 'empty',
          urix: 'empty',
        },
      },
    },

    fingerprint: {
      exclude: [
        'images/ccicons',
        'images/brands',
        'images/icons/mobile-nav',
        'images/patient-todos', // cannot be fingerprinted because the paths are provided dynamically via the API
        'images/support_avatars',
        'fonts',
      ],

      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'svg'],
      // replaceExtensions:['html', 'css', 'js']
    },

    'ember-cli-string-helpers': {
      only: ['html-safe'],
    },
  });

  return app.toTree();
};