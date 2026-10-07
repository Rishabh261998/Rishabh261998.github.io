source "https://rubygems.org"

# GitHub Pages builds the site with the github-pages gem; this keeps the local
# build identical to what is deployed. Run `bundle install` then
# `bundle exec jekyll serve` to preview at http://localhost:4000.
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-redirect-from"
end

# Required for Ruby >= 3.0 (webrick was removed from the standard library).
gem "webrick", "~> 1.8"
