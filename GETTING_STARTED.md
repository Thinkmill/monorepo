# Getting Started with Monorepos

Hi! Welcome. This guide is a very quick guide to help you set up your own monorepo, a repository that includes multiple javascript packages, all managed by a unifying root config. It aligns with our [monorepo style guide](./README.md), but is designed to walk you through the basics. If you want to have a better understanding of what decisions are being made for you, we recommend reading the guie after you've followed this tutorial.

Finally, the repository we are building is based on [our monorepo starter](https://github.com/thinkmill/monorepo-starter), so if you simply want to be up and running, feel free to check that out.

We will be assuming that you have [git](https://www.atlassian.com/git/tutorials/what-is-git) set up, as well as an [npm account](http://npmjs.com/). We are also using [yarn classic](https://classic.yarnpkg.com/lang/en/) for our package installs, so expect it to be installed globally. We are also assuming you are familiar with running [terminal commands](https://jes.st/the-terminal-101/)

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

- A `/apps` folder for blah blah blah
- A `/scripts` folder for blah blah blah
- A `/packages` folder for... packages...

We only want to allow folders at the first level of each of these to be checked for being packages, so we want a workspaces field that looks like:

```json
  "workspaces": [
    "packages/*",
    "apps/*",
    "scripts/*"
  ]
```

Which should leave our root `package.json` looking like:

```json
{
  "name": "@monorepo-starter/root",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["packages/*", "apps/*", "scripts/*"]
}
```

With that set up, you can now run `yarn` as your install script, and it will install all dependencies of all packages within those folders.

Next up, let's add some packages so we can have some dependencies!

### Your package folders

For this tutorial, we are going to be setting up 5 packages. They will be:

- `@monorepo-starter/simple-package`
- `@monorepo-starter/private-package`
- `@monorepo-starter/with-multiple-entrypoints`
- `@monorepo-starter/placeholder-website`
- `@monorepo-starter/placeholder-app`

We are going to learn something different while setting up each of these packages. We will set up the `simple-package`, and `placeholder-website` now, and `with-multiple-entrypoints`, and `placeholder-app` a little later when we set up our build tooling. Finally, we will add our `private-package` when we set up publishing.

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
}
```

> TODO teach preconstruct fix also

## Adding Manypkg to help validate your packages

```shell
yarn add @manypkg/cli
yarn manypkg check
yarn manypkg fix
```

> Add check to postinstall, updating the script above
> Build in something that needs fixing
> Demonstrate manypkg exec as well
> What's the best simple example of a command we want to exec?

## Setting up a publishing workflow

```shell
yarn add @changesets/cli
yarn changeset init
yarn changeset add
yarn changeset version
```

> TODO - set up npmignore as well

In `.changeset/config.json` change `access: "restricted"` to `access: "public"`

```shell
yarn changeset publish
```

## Setting up Jest and Babel
