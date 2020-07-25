# Flatforge

[![Dependabot badge](https://flat.badgen.net/dependabot/wbkd/webpack-starter?icon=dependabot)](https://dependabot.com/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/b7b3b054-ccc7-43f5-aa67-e7998a95be97/deploy-status)](https://app.netlify.com/sites/flatforge/deploys)
### [Click here for a Demo](https://flatforge.netlify.app/)

A simple experiment to see if flatmini's can be made with Three.js.



### Installation

```
npm install
```

### Start Dev Server

```
npm start
```

### Build Prod Version

```
npm run build
```

### Features:

* ES6 Support via [babel](https://babeljs.io/) (v7)
* SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
* Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)

When you run `npm run build` we use the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to move the css to a separate file. The css file gets included in the head of the `index.html`.
