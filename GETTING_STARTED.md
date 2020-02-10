> This getting started guide is a work in progress. Not all sections are complete, completed sections may be a bit rough.

# Getting Started with Monorepos

Hi! Welcome. This guide is a very quick guide to help you set up your own monorepo, a repository that includes multiple javascript packages, all managed by a unifying root config. It aligns with our [monorepo style guide](./README.md), but is designed to walk you through the basics. If you want to have a better understanding of what decisions are being made for you, we recommend reading the guie after you've followed this tutorial.

Finally, the repository we are building is based on [our monorepo starter](https://github.com/thinkmill/monorepo-starter), so if you simply want to be up and running, feel free to check that out.

We will be assuming that you have [git](https://www.atlassian.com/git/tutorials/what-is-git) set up, as well as an [npm account](http://npmjs.com/). We are also using [yarn classic](https://classic.yarnpkg.com/lang/en/) for our package installs, so expect it to be installed globally. We are also assuming you are familiar with running [terminal commands](https://jes.st/the-terminal-101/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Initialising your repository](#initialising-your-repository)
- [Setting up your packages](#setting-up-your-packages)
  - [Your package folders](#your-package-folders)
    - [Adding `@monorepo-starter/simple-package`](#adding-monorepo-startersimple-package)
- [Setting up building your packages](#setting-up-building-your-packages)
- [Adding Manypkg to help validate your packages](#adding-manypkg-to-help-validate-your-packages)
- [Setting up a publishing workflow](#setting-up-a-publishing-workflow)
- [Setting up Jest and Babel](#setting-up-jest-and-babel)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Initialising your repository

Firstly, we're going to need a repository to build our monorepo in. Running the following commands in your terminal will get you a new repository ready for work:

```shell
mkdir my-new-monorepo
cd my-new-monorepo
git init
git add .
git commit -m "look, our new monorepo!"
```

From here on out, unless otherwise stated, all terminal commands are assumed to be run from this root folder. We recommend you open this project now in an editory [such as VS Code](https://code.visualstudio.com/) so you can explore your monorepo as it comes together (we will be using screenshots from our own code editor to help demonstrate structures)

Next, we want to add our `package.json`. Create the file, then copy the following into it:

```json
{
  "name": "@monorepo-starter/root",
  "version": "1.0.0",
  "private": true
}
```

The root `package.json` of your monorepo should always be private, to avoid accidentally publishing it.

## Setting up your packages

The next thing we want to do is define where our packages live. We do this by adding a `workspaces` field to our root `package.json`. For our project, we are going to say that packages can live in three locations:

- A `/apps` a folder where user-facing apps and websites should live
- A `/services` a folder where back-end services should live
- A `/packages` a folder where packages designed to be consumed by other packages (published OR internal) live

We only want to allow folders at the first level of each of these to be checked for being packages, so we want a workspaces field that looks like:

```json
  "workspaces": [
    "packages/*",
    "apps/*",
    "services/*"
  ]
```

We also want a documentation website for our monorepo's packages, which we are going to put in `/website`. We will update workpsaces to be:

```json
  "workspaces": [
    "packages/*",
    "apps/*",
    "services/*",
    "website"
  ]
```

Which should leave our root `package.json` looking like:

```json
{
  "name": "@monorepo-starter/root",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["packages/*", "apps/*", "scripts/*", "website"]
}
```

With that set up, you can now run `yarn` as your install script, and it will install all dependencies of all packages within those folders.

Next up, let's add some packages so we can have some dependencies!

### Your package folders

For this tutorial, we are going to be setting up 5 packages. They will be:

- `@monorepo-starter/simple-package`
- `@monorepo-starter/private-package`
- `@monorepo-starter/with-multiple-entrypoints`
- `@monorepo-starter/internal-website`
- `@monorepo-starter/simple-service`

We are going to learn something different while setting up each of these packages. We will set up the `simple-package`, and `simple-service` now, and `with-multiple-entrypoints`, and `internal-website` a little later when we set up our build tooling. Finally, we will add our `private-package` when we set up publishing.

#### Adding `@monorepo-starter/simple-package`

This package is going to be our bedrock simplest package.

```shell
mkdir packages
mkdir packages/simple-package
```

In our newly created `simple-package` directory, add the following `package.json`:

```json
{
  "name": "@monorepo-starter/simple-package",
  "version": "1.0.0",
  "description": "A very simple package within a monorepo"
}
```

We want our package to do something, so we are going to add a simple function that the package exports, which takes in a string, and outputs nice colourful letters using [cfonts](https://www.npmjs.com/package/cfonts)

The first thing we will want to do is install `cfonts`.

To do this, we will want to run:

```
cd packages/simple-package
yarn add cfonts
```

This adds `cfonts` as a dependency to the `simple-package`, and installs it. Note the folder structure here:

> TODO images of the install of this

## Setting up building your packages

```shell
yarn add @preconstruct/cli
yarn preconstruct init
```

Add scripts to your `package.json`

Add `preconstruct` field to the root package.json

```json
"scripts": {
  "postinstall": "preconstruct dev",
  "build": "preconstruct build",
  "preconstruct": {
    "packages": [
      "packages/*",
      "services/*",
    ]
  }
}
```

This tells `preconstruct` that it should be used for building `packages` in both the `/packages` and the `/services` folders. `/apps` and the `/website` folder will have their own build and run scripts, so we don't worry about using preconstruct to build those.

We are now going to add contents to our first package. Create `packages/simple-package/src/index.js` and copy the following code into it:

```js
// packages/simple-package/src/index.js
import cfonts from "cfonts";

function sayHi(text) {
  cfonts.say(text, {
    font: "chrome",
    colors: ["#fff433", "#ffffff", "#9b59d0"]
  });
}

sayHi("monorepos are cool");
```

Quickly, we can try running this using:

```shell
node packages/simple-package/src/index.js
```

Which gives us the following error.

> TODO add error screenshots

This is because our code needs to be compiled. Run your `postinstall` script, and then try:

```shell
node packages/simple-package
```

This should print out:

> TODO: Add success screenshot

Excellent, our function is now working. Let's change the last line of our file so we export the function, so our file is now

> TODO teach preconstruct fix also

### Adding `@monorepo-starter/simple-service`

Now that we have our package set up, we're going to set up a service that uses it. The first thing we are going to do is make our `simple-package` export the `sayHi` function instead of running it:

```js
// packages/simple-package/src/index.js
import cfonts from "cfonts";

function sayHi(text) {
  cfonts.say(text, {
    font: "chrome",
    colors: ["#fff433", "#ffffff", "#9b59d0"]
  });
}

export default sayHi;
```

Next, we are going to add a new package into `services`. Make the file `services/simple-service/package.json` and copy over the following:

```json
{
  "name": "@monorepo-starter/simple-service",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@monorepo-starter/simple-package": "^1.0.0"
  }
}
```

Next run: `yarn` - this will link your `simple-package` into the service.

Now create `services/simple-service/src/index.js` and add the following:

```js
// services/simple-service/src/index.js
import sayHi from "@monorepo-starter/simple-package";

sayHi(process.argv[2]);
```

Now we have a very simple command line utility! We can now run:

```shell
node services/simple-service "Hello colors"
```

and it should print:

> TODO add screenshot

### Adding `@monorepo-starter/multiple-entrypoints`

One of the advantages of a monorepo is that we can isolate our concerns into packages, which have a public API for use elsewhere in the monorepo, and other internal code which is not designed for use outside the package. Sometimes though, we want to export multiple things from a package. There are two ways of doing it.

1. Named exports:

If you want to be able to write:

```js
// importing at
import { sayHi, sayBi } from "@monorepo-starter/simple-package";
```

You are using named exports:

```js
// simple-package/src/index.js
export { sayHi } from "./sayHi";
export { sayBi } from "./sayBi";
```

Sometimes however, for reasons of code splitting, we instead want multiple entrypoints so we can import functions as:

```js
// importing as

import sayBi from "@monorepo-starter/with-multiple-entrypoints/sayBi";
import sayChange from "@monorepo-starter/with-multiple-entrypoints/sayChange";
```

The most commmon reason to do this is to make code splitting easier, and you can find more detailed docs about all things multiple entrypoints in the [preconstruct docs](https://preconstruct.tools/tutorials/multiple-entrypoints), for now, we are going to set up two entrypoints in a package in the simplest way.

We are going to modify our `simple-service` package so that it has three commands.

We want to be able to run:

> TODO screenshot of it running sayHi, sayBi, sayChange functions

```js
import sayHi from "@monorepo-starter/simple-package";
import sayBi from "@monorepo-starter/with-multi-entrypoints/sayBi";
import sayChange from "@monorepo-starter/with-multi-entrypoints/sayChange";

let words = process.argv[2];
let emphasis = process.argv[3];

if (emphasis === "bi") {
  sayBi(words);
} else if (emphasis === "change") {
  sayChange(words);
} else {
  sayHi(words);
}
```

Now we need to write our `sayBi` and `sayChange` functions. Firstly, we will need to create our new package. It should be at `packages/with-multiple-entrypoints` and should have the `package.json`

```json
{
  "name": "@monorepo-starter/with-multi-entrypoints",
  "version": "1.0.0",
  "license": "MIT",
  "dependencies": {
    "cfonts": "^2.5.2"
  }
}
```

We are then going to quickly make a `sayBi` and `sayHi` function of the following:

```js
// packages/with-multiple-entrypoints/src/sayBi.js
import cfonts from "cfonts";

function sayBi(text) {
  cfonts.say(text, {
    font: "chrome",
    colors: ["#ff0080", "#a349a4", "#0000ff"]
  });
}

export default sayBi;
```

and

```js
// packages/with-multiple-entrypoints/src/sayChange.js
import cfonts from "cfonts";

function sayChange(text) {
  cfonts.say(text, {
    font: "chrome",
    colors: ["#B77FDD", "#FFFFFF", "#48821E"]
  });
}

export default sayChange;
```

These files are now accessible, but nothing will build them. We can tell preconstruct for each package what the entrypoints are:

```json
{
  "name": "@monorepo-starter/with-multi-entrypoints",
  "version": "1.0.0",
  "main": "dist/with-multi-entrypoints.cjs.js",
  "module": "dist/with-multi-entrypoints.esm.js",
  "dependencies": {
    "cfonts": "^2.5.2"
  },
  "preconstruct": {
    "entrypoints": ["sayBi", "sayChange"]
  }
}
```

> TODO set up entrypoints so they don't error

> TODO add npm ignores now

## Adding Manypkg to help validate your dependencies

There are a _lot_ of subtle footguns to how dependencies are downloaded and installed and linked in a monorepo, with the deadliest being:

- Installing a version of a package within your monorepo from npm instead of linking locally, breaking your dev loop
-

```shell
yarn add @manypkg/cli
yarn manypkg check
yarn manypkg fix
```

Once you've installed `manypkg`, and fixed your project, you should add `manypkg check` to your postinstall script, which should now be:

```json
"postinstall": "preconstruct dev && manypkg check"
```

This should give you a large amount of peace-of-mind about your installs. Just make sure after running `manypkg fix` you run `yarn` to install based off any changes that occurred.

> Build in something that needs fixing
> Demonstrate manypkg exec as well
> What's the best simple example of a command we want to exec?

## Setting up a publishing workflow

> If you don't want to publish any packages to NPM, you can skip this section

While most tasks in monorepos allow you to think only in the package you are working on, versioning and publishing require thinking about the repository as a whole. You want to ensure packages in the monorepo depend on the latest versions of each other, so your local dev experience mirrors the experience of users installing your packages. We are going to use [changesets](https://github.com/changesets/changesets) to manage this workflow. Let's get set up:

```shell
yarn add @changesets/cli
yarn changeset init
```

This will add a `.changeset` folder with your changeset config. We want to make one change to the default changeset config: In `.changeset/config.json` change `"access": "restricted"` to `"access": "public"`

Finally, if you want to follow this tutorial all the way to publishing, you will need to change the [scope of your packages](https://docs.npmjs.com/about-scopes) to one you have publish rights to, so no packages should reference the scope `@monorepo-starter/` anymore.

### A brief concepts of changesets

Changesets works by allowing contributors to add changesets that document the individual changes, and then combine all the changesets when doing a release. We spread the load of this out over three commands. First run:

```shell
yarn changeset add
```

This prompts a series of questions allowing you to select what package is changed, the kind of (semver) change it is, and a description of the change. For now, select `simple-package` and give it a `major` bump type.

Note the descriptions will end up in the READMEs of the packages.

Next we run:

```shell
yarn changeset version
```

This 'consumes' the changesets - it will consume and smartly combine all changesets that exist. Since we only have one, it will only apply one. Look at a git diff though, and you will see more than one package has changed.

> TODO: Photo of changed package.

This is because our `service` depends on our `simple-package`, so we need to update both. If we don't, we'll end up in one of the very-bad states we talked about back when discussing adding `manypkg`.

Finally, if you want to see your work on `npm`, and you changed the scope, run:

```shell
yarn preconstruct build && yarn changeset publish
```

> It's a good idea to alias this as a node script: `"release": "yarn preconstruct build && yarn changeset publish"`

## Setting up Jest and Babel

Now that we've got a bit of code, we should add some tests
