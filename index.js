var Metalsmith = require('metalsmith'),
    drafts = require('metalsmith-drafts'),
    markdown = require('metalsmith-markdown'),
    layouts = require('metalsmith-layouts'),
    watch = require('metalsmith-watch'),
    sass = require('metalsmith-sass'),
    serve = require('metalsmith-serve');

Metalsmith(__dirname)
  .source('./content')
  .destination('./build')
  .use(drafts())
  .use(markdown())
  .use(layouts('nunjucks'))
  .use(sass({
    outputDir: function(originalPath) {
      // this will change scss/some/path to css/some/path
      return originalPath.replace("scss", "stylesheets");
    }
  }))
  .use(
    watch({
      paths: {
        "${source}/**/*": true,
        "layouts/**/*": "**/*"
      },
      livereload: false,
    })
  )
  .use(serve({}))
  .build(function(err) {
      if (err) {
          console.log(err);
      }
      else {
          console.log('Build completed');
      }
  });
