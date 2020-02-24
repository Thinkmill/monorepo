> This getting started guide is a work in progress. Not all sections are complete, completed sections may be a bit rough.

# Getting Started with Monorepos

Hi! Welcome. This is a very quick tutorial to help you set up your own monorepo, a repository that includes multiple javascript packages, all managed by a root config. It aligns with our [monorepo style guide](./README.md), but is designed to walk you through the basics. If you want to have a better understanding of what decisions are being made for you, we recommend reading the guide after this tutorial.

The repository we are building is based on [our monorepo starter](https://github.com/thinkmill/monorepo-starter), so if you want to play around in a working monorepo, feel free to check that out.

We will be using the following tools:

- [git](https://www.atlassian.com/git/tutorials/what-is-git)
- [npm account](http://npmjs.com/) if you're publishing
- [yarn classic](https://classic.yarnpkg.com/lang/en/)
- [terminal commands](https://jes.st/the-terminal-101/)

---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Initialising your repository](#initialising-your-repository)
- [Setting up your packages](#setting-up-your-packages)
  - [Your package folders](#your-package-folders)
    - [Adding `@monorepo-starter/button`](#adding-monorepo-startersimple-package)
- [Setting up building your packages](#setting-up-building-your-packages)
  - [Adding `@monorepo-starter/graphql-api`](#adding-monorepo-startersimple-service)
  - [Adding `@monorepo-starter/next-app`](#adding-monorepo-startermultiple-entrypoints)
- [Adding Manypkg to help validate your dependencies](#adding-manypkg-to-help-validate-your-dependencies)
- [Setting up a publishing workflow](#setting-up-a-publishing-workflow)
  - [A brief concepts of changesets](#a-brief-concepts-of-changesets)
- [Setting up Jest and Babel](#setting-up-jest-and-babel)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Initialising your repository

Firstly, we're going to need a repository to build our monorepo in. Running the following commands in your terminal will get you a new repository ready for work:

```shell
mkdir my-new-monorepo
cd my-new-monorepo
git init
```

From here on out, unless otherwise stated, all terminal commands are assumed to be run from the root folder. We recommend you open this project now in an editor [such as VS Code](https://code.visualstudio.com/) so you can explore your monorepo as it comes together (we will be using screenshots from our own code editor to help demonstrate structures)

Next, we want to add the following to our `package.json`

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

Which should leave our root `package.json` looking like:

```json
{
  "name": "@monorepo-starter/root",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["packages/*", "apps/*", "services/*"]
}
```

With that set up, you can now run `yarn` as your install script, and it will install all dependencies of all packages within those folders.

Next, as we will be using babel in bundling some of our code. We are going to set that up now so it's ready for all our projects: Create `babel.config.js` file at the root level with the following code

```javascript
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["@babel/plugin-transform-runtime"]
};
```

Next we install the babel plugins:

```shell
yarn add @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react -W
```

Next up, let's add some packages so we can have some dependencies!

### Your package folders

For this tutorial, we are going to be setting up 3 packages. They will be:

- `@monorepo-starter/button`
- `@monorepo-starter/next-app`
- `@monorepo-starter/graphql-api`

We are going to learn something different while setting up each of these packages. We will set up the `@monorepo-starter/button`, and `@monorepo-starter/graphql-api` now.

#### Adding `@monorepo-starter/button`

This package is going to be our bedrock simplest package.

```shell
mkdir packages
mkdir packages/button
```

After navigating to the `button` directory, add the following `package.json`:

```json
{
  "name": "@monorepo-starter/button",
  "version": "1.0.0",
  "description": "A very simple React button within a monorepo"
}
```

Next, we want to add react as a dependency to our button.

```
cd packages/button && yarn add react
```

After installing React, within the `packages/button` directory, create a directory called `src`. Within the `src` directory, create an `index.js` file which will contain the source code for the `Button` component which we will create shortly.

Add the following code to the `index.js` file so we have something to render.

```javascript
import React from "react";

const Button = ({ onClick, children, isSelected }) => (
  <button
    style={{
      border: 0,
      backgroundColor: isSelected ? "rebeccapurple" : "hotpink",
      color: isSelected ? "white" : "black",
      padding: "12px 24px",
      margin: "12px",
      borderRadius: "3px"
    }}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
```

## Setting up building your packages

To setup a build process for the packages within your monorepo, execute the following commands from the root level of your project.

```shell
yarn add @preconstruct/cli -W
yarn preconstruct init
```

This will prompt you to add a `main` field to the button's `package.json` - accept. Now your package.json should look like:

```
TODO package.json after that
```

Now that preconstruct is set up, we should make sure it gets run. We want two scripts in our root `package.json`.

TODO: We need to add the preconstruct field before we run `init`

Add scripts to your `package.json`

Add `preconstruct` field to the root package.json

```json
  "scripts": {
    "postinstall": "preconstruct dev",
    "build": "preconstruct build"
  },
  "preconstruct": {
    "packages": [
      "packages/*",
      "services/*"
    ]
  }
```

This tells `preconstruct` that it should be used for building `packages` in both the `/packages` and the `/services` folders. `/apps` and the `/website` folder will have their own build and run scripts, so we don't worry about using preconstruct to build those.

### Adding `@monorepo-starter/next-app`

We will now create a [Next.js](https://nextjs.org/) project that will consume the `@monorepo-start/button` package we just created.

From the project root, create a directory as follows
`mkdir apps`
`mkdir apps/next-app`

To install [Next.js](https://nextjs.org), `cd apps/next-app`, run `npm init`,
and follow the installation steps from [here](https://nextjs.org/docs/getting-started#manual-setup).

Additionally, create a configuration file called `next.config.js`. After creating the file, run `yarn add @preconstruct/next`. In the `next.config.js` file, add the following lines of code

```javascript
const withPreconstruct = require("@preconstruct/next");
module.exports = withPreconstruct({});
```

Install the button package we created with the following command

```shell
yarn add @monorepo-starter/button
```

To consume this button component, modify the `pages/index.js` to reflect the following code:

```javascript
import React from "react";
import Button from "@monorepo-starter/button";

const Index = () => {
  return (
    <div>
      <Button isSelected onClick={() => alert("Hello!")}>
        Hello World!
      </Button>
    </div>
  );
};

export default Index;
```

If everything works well, you should see your custom button!

After performing the setup, ensure the Next.js app is running by executing `yarn dev` and visiting `http://localhost:3000` on your browser.

### Adding `@monorepo-starter/simple-server`

### Adding `@monorepo-starter/graphql-api`

To get started with creating a GraphQL API, at the root directory execute the following commands:

```shell
mkdir services
mkdir services/graphql-api
```

From within the `services/graphql-api` directory, create a `package.json` with the following fields and run yarn

```json
{
  "name": "@monorepo-starter/graphql-api",
  "version": "1.0.0",
  "main": "dist/graphql-api.cjs.js",
  "scripts": {
    "start": "node ."
  },
  "dependencies": {
    "apollo-server": "^2.10.0",
    "graphql": "^14.6.0",
    "graphql-tools": "^4.0.6"
  }
}
```

Create a `src/index.js` file with the following code:

```javascript
import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    authors: [Author]
    author(name: String): Author
  }
  type Book {
    title: String
    author: Author
  }
  type Author {
    name: String
    books: [Book]
  }
`;

const authors = [
  { name: "Ann Leckie" },
  { name: "N K Jemisin" },
  { name: "Melissa Caruso" }
];

const books = [
  { title: "Ancillary Justice", author: "Ann Leckie" },
  { title: "The Raven Tower", author: "Ann Leckie" },
  { author: "Melissa Caruso", title: "The Tethered Mage" },
  { author: "N K Jemisin", title: "The Fifth Season" },
  { author: "N K Jemisin", title: "The City We Became" }
];

const resolvers = {
  Query: {
    authors() {
      return authors;
    },
    author(_, { name }) {
      return authors.find(author => author.name === name);
    }
  },
  Author: {
    books(author) {
      return books.filter(book => book.author === author.name);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

From the project root, execute `yarn`. After successfully installing the dependencies, execute `yarn start` from `services/graphql-api`, and you have a GraphQL playground running on `http://localhost:4000`

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
