var Metalsmith = require('metalsmith'),
    drafts = require('metalsmith-drafts'),
    markdown = require('metalsmith-markdown'),
    permalinks = require('metalsmith-permalinks'),
    layouts = require('metalsmith-layouts'),
    watch = require('metalsmith-watch');

Metalsmith(__dirname)
  .use(drafts())
  .use(markdown())
  .use(permalinks('blog/:title'))
  .use(layouts('nunjucks'))
  .source('./src/pages')
  .destination('./build')
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
