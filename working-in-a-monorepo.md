# Working In A Monorepo

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Building Packages](#building-packages)
  - [Using Preconstruct](#using-preconstruct)
    - [Babel Configuration](#babel-configuration)
      - [Configuring Babel With Various Tools](#configuring-babel-with-various-tools)
        - [Node](#node)
        - [Next.js](#nextjs)
        - [Gatsby](#gatsby)
        - [Jest](#jest)
        - [Webpack](#webpack)
- [Versioning and Publishing Packages](#versioning-and-publishing-packages)
- [Dependency Management](#dependency-management)
- [Structuring Packages](#structuring-packages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Building Packages

Packages in Thinkmill monorepos are built with [Preconstruct](https://preconstruct.tools). Preconstruct solves two major problems:

1. It builds packages when we want to distribute them to npm and supports advanced use cases like entrypoints without requiring any complex configuration of Rollup or similar tools manually
2. It lets us develop and see changes in a repo without having to rebuild packages every time we make a change

### Using Preconstruct

To initialise Preconstruct, you can run `yarn preconstruct init` and Preconstruct will ask you questions relevant to your project.

To build your project, you can run `yarn preconstruct build`. We recommend adding a script named `build` to your root package.json that runs `preconstruct build`.

```json
{
  "scripts": {
    "build": "preconstruct build"
  }
}
```

To let you develop and see changes without rebuilding, you should run `preconstruct dev` in the postinstall script in your root package.json.

```json
{
  "scripts": {
    "postinstall": "preconstruct dev"
  }
}
```

If you add a new package, add new entrypoints, change a source file or make a similar change to Preconstruct's config, you'll need to run `yarn` at the root of your repo.

For more information on Preconstruct, see the docs at [preconstruct.tools](https://preconstruct.tools).

#### Babel Configuration

It's very important that Babel is configured with a `babel.config.js` file rather than a `.babelrc` file. This is because `.babelrc` files will not be looked at outside of a package boundary whereas `babel.config.js` files will be assuming the `root` option is set at or above the directory with the `babel.config.js` file or the `rootMode` option is set to `upward` or `upward-optional`.

An example Babel config might look like this.

```jsx
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"]
};
```

##### Configuring Babel With Various Tools

Because some tools do not compile with Babel by default, do not follow Babel's standard config resolution or the compilation does not happen at the root of the repo and do not have `rootMode: "upward"` set, we've explained how to configure them to compile with Babel correctly below.

###### Node

`preconstruct dev` includes a require hook which will compile files with Babel when run with Node. Note that this doesn't apply to some tools like Jest even though they run in Node because they re-implement the `require` function. For tools like this, they will need to be configured to compile with Babel.

###### Next.js

Install `@preconstruct/next`.

```bash
yarn add @preconstruct/next
```

Add `@preconstruct/next` to your `next.config.js`.

```jsx
const withPreconstruct = require("@preconstruct/next");

module.exports = withPreconstruct({ ...yourOwnConfig });
```

###### Gatsby

Gatsby already compiles files outside of it's own directory so the `babel-loader` options do not have to be changed.

Gatsby does not do normal Babel config resolution though and it does not use `rootMode: "upward"` so to ensure that the Babel config used in your Gatsby site is identical to the config used throughout packages in the repo, you should create a `babel.config.js` file inside of the site directory

```jsx
module.exports = require("../path/to/root/babel.config");
```

###### Jest

Install `babel-jest` and Babel compilation will work assuming Jest is run from the root, see [Jest's documentation for more details](https://jestjs.io/docs/en/getting-started#using-babel) for more details.

```bash
yarn add babel-jest
```

###### Webpack

`babel-loader` should be configured like this if you're using webpack directly.

```js
module: {
  rules: [
    {
      test: /\.[jt]sx?$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          rootMode: "upward"
        }
      }
    }
  ];
}
```

## Versioning and Publishing Packages

Packages in Thinkmill monorepos are versioned and published using Changesets. Changesets solves three major problems:

- It makes contributors who have the context write change information with semver bump types
- It handles monorepo-specific versioning problems like bumping dependent packages when they go out of range
- It lowers the friction for maintainers to do a release but still allows maintainers to have control over when releases happen

The way it works is that contributors run `yarn changeset` which will prompt them with questions to create a changeset which includes the packages that will

`changeset version` will then be run either manually or by [a bot](https://github.com/changesets/action) which will

## Dependency Management

Managing dependencies in monorepos can get very confusing very quickly so to address this problem, we use [Manypkg](https://github.com/Thinkmill/manypkg) which is linter for `package.json` files in a monorepo. It solves these problems:

- It enforces certain rules
- It fixes some problems so that people don't have to do it manually

To see specific information on the rules that Manypkg enforces, [see Manypkg's documentation](https://github.com/thinkmill/manypkg#checks).

## Structuring Packages
