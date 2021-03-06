'use strict';

var yeoman    = require('yeoman-generator'),
    prompt    = require('./actions/prompt'),
    templates = require('./actions/templates'),
    exec      = require('./actions/exec');

module.exports = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);

    // If there's already a package.json file, then read it
    this.project = this.fs.readJSON(this.destinationPath('package.json'), {});

    // Default options
    this.options = this.config.defaults({
      githubUsername: undefined,    // string
      cli: undefined,               // boolean
      tests: undefined,             // boolean
      es6: undefined,               // boolean
      env: {
        node: undefined,            // boolean
        browser: undefined,         // boolean
        yeoman: undefined,          // boolean
        cordova: undefined          // boolean
      }
    });
  },

  prompting: {
    1: prompt.forProjectInfo,
    2: prompt.forGitHubUsername,
    3: prompt.forOptions
  },

  writing: {
    1: templates.remove,
    2: templates.create,
    3: templates.overwrite,
    4: templates.json
  },

  install: {
    1: exec.installDependencies,
    2: exec.updateDependencies
  },

  end: {
    1: templates.cleanup,
    2: prompt.sayGoodbye
  }
});
