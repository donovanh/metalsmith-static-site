
# Metalsmith / Gulp static site generator

This repo brings together a Gulp-based static site generating process using [Metalsmith](http://metalsmith.io) for content processing, templating and collections.

* CSS: Sass & Autoprefixer
* JS: Concatenation using Gulp
* Metalsmith, with plugins:
  * Nunjucks templating
  * Drafts
  * Markdown
  * Permalinks
  * Watch

## Setup

First, clone this repo to your machine. Then in the command line, run the following to install dependencies (Node is required):

    npm install

Then run the project using the default Gulp task:

    gulp

This should open a browser window with the generated static site in place.

## TODO

Some things to be added:

* Collections support for pages, and automatic generation of menus
* Deploying to GH-Pages (or elsewhere within Gulp)
