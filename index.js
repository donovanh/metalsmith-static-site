var Metalsmith = require('metalsmith'),
    drafts = require('metalsmith-drafts'),
    markdown = require('metalsmith-markdown'),
    permalinks = require('metalsmith-permalinks'),
    layouts = require('metalsmith-layouts'),
    watch = require('metalsmith-watch'),
    sass = require('metalsmith-sass');

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(drafts())
  .use(markdown())
  .use(permalinks('blog/:title'))
  .use(layouts('nunjucks'))
  .use(sass({
    outputStyle: "expanded",
    outputDir: "css"
  }))
  .use(
    watch({
      paths: {
        "${source}/**/*": true,
        "layouts/**/*": true,
      },
      livereload: false,
    })
  )
  .build(function(err) {
      if (err) {
          console.log(err);
      }
      else {
          console.log('Build completed');
      }
  });
