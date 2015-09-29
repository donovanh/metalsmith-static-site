var Metalsmith = require('metalsmith'),
    drafts = require('metalsmith-drafts'),
    markdown = require('metalsmith-markdown'),
    permalinks = require('metalsmith-permalinks'),
    layouts = require('metalsmith-layouts'),
    watch = require('metalsmith-watch'),
    sass = require('metalsmith-sass'),
    serve = require('metalsmith-serve');

Metalsmith(__dirname)
  .source('./content')
  .destination('./build')
  .use(drafts())
  .use(markdown())
  .use(permalinks('blog/:title'))
  .use(layouts('nunjucks'))
  .use(sass({
    outputStyle: "expanded",
    outputDir: "stylesheets"
  }))
  .use(
    watch({
      paths: {
        "${source}/**/*": true,
        "layouts/**/*": true,
      },
      livereload: true,
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
