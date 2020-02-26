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
    - [Adding `@monorepo-starter/button`](#adding-monorepo-starterbutton)
- [Setting up building your packages](#setting-up-building-your-packages)
  - [Adding `@monorepo-starter/next-app`](#adding-monorepo-starternext-app)
  - [Adding `@monorepo-starter/graphql-api`](#adding-monorepo-startergraphql-api)
- [Modifying `next-app` to consume the `graphql-api`](#modifying-next-app-to-consume-the-graphql-api)
- [Adding Manypkg to help validate your dependencies](#adding-manypkg-to-help-validate-your-dependencies)
- [Setting up a publishing workflow](#setting-up-a-publishing-workflow)
  - [A brief explanation of changesets](#a-brief-explanation-of-changesets)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Initialising your repository

Firstly, we're going to need a repository to build our monorepo in. Running the following commands in your terminal will get you a new repository ready for work:

```shell
mkdir my-new-monorepo
cd my-new-monorepo
git init
```

Also add a `.gitignore` file with the following contents

```
node_modules/
.next
dist
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

Next, as we will be using babel in bundling some of our code. We are going to set that up now so it's ready for all our projects: Create a `babel.config.js` file at the root level with the following code

```javascript
// babel.config.js
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["@babel/plugin-transform-runtime"]
};
```

Next we install the babel plugins:

```shell
yarn add @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react -W
```

<details>
<summary>

Wondering what the `-W` flag does?

</summary>

The `-W` flag allows yarn to install packages at the root level. For more information on how this works, please refer to the [documentation](https://classic.yarnpkg.com/en/docs/cli/add#toc-yarn-add-ignore-workspace-root-check-w)

</details>

Next up, let's add some packages so we can have some dependencies!

### Your package folders

For this tutorial, we are going to be setting up 3 packages. They will be:

- `@monorepo-starter/button`
- `@monorepo-starter/next-app`
- `@monorepo-starter/graphql-api`

We are going to learn something different while setting up each of these packages. We will set up the `@monorepo-starter/button`, and `@monorepo-starter/graphql-api` now.

#### Adding `@monorepo-starter/button`

Run the following commands to create the button package directory.

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

```shell
cd packages/button
yarn add react
cd ../..
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

This will prompt you with some questions, you should answer with the following responses:

```
🎁 ? @monorepo-starter/root what packages should preconstruct build? · packages/*
🎁 ? @monorepo-starter/button preconstruct is going to change the main field in your package.json, are you okay with that? (Y/n) · true
🎁 ? @monorepo-starter/button would you like to generate module builds? this will write to the module field in your package.json (Y/n) · true
🎁 success initialised project!
```

Now that Preconstruct is set up, we should make sure it gets run. We want two scripts in our root `package.json`.

Add the following scripts to your root `package.json`:

```json
"scripts": {
  "postinstall": "preconstruct dev",
  "build": "preconstruct build"
},
```

This tells Preconstruct that it should be used for building packages in both the `packages/` and the `services/` folders. The `apps/` packages will be built with Next, so we won't worry about using Preconstruct to build those.

### Adding `@monorepo-starter/next-app`

We will now create a [Next.js](https://nextjs.org/) project that will consume the `@monorepo-starter/button` package we just created.

From the project root, create a directory as follows:

```shell
mkdir apps
mkdir apps/next-app
```

Create a package.json at `apps/next-app/package.json` with the following content:

```json
{
  "name": "@monorepo-starter/next-app",
  "version": "1.0.0"
}
```

Run the following commands to install [Next.js](https://nextjs.org):

```shell
# in apps/next-app
yarn add react react-dom next @preconstruct/next
```

Add the following scripts to the `package.json`:

```json
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
},
```

Additionally, create a configuration file called `next.config.js` with the following content:

```javascript
const withPreconstruct = require("@preconstruct/next");
module.exports = withPreconstruct();
```

Install the button package by adding

```json
"@monorepo-starter/button": "1.0.0",
```

to the dependencies of the `package.json` and the following command:

```shell
# in the project root
yarn
```

To consume this button component, add a `pages/index.js` file to reflect the following code:

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

After performing the setup, ensure the Next.js app is running by executing

```shell
yarn dev
```

and visiting `http://localhost:3000` on your browser.

If everything works well, you should see your custom button!

---

### Adding `@monorepo-starter/graphql-api`

To get started with creating a GraphQL API, at the root directory execute the following commands:

```shell
mkdir services
mkdir services/graphql-api
```

From within the `services/graphql-api` directory, create a `package.json` with the following fields.

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

Once that file is created, run the following commands:

```shell
# in the project root
yarn
cd services/graphql-api
yarn start
```

You should now have a GraphQL playground running at `http://localhost:4000/graphql`

---

## Modifying `next-app` to consume the `graphql-api`

We will be using Apollo Client to consume the `@monorepo-starter/graphql-api`. Run the following commands to install the packages we need:

```shell
cd apps/next-app
yarn add @apollo/react-hooks apollo-boost graphql isomorphic-unfetch
cd ../../
yarn
```

Create a `_app.js` file within `pages/` with the following code:

```javascript
import React from "react";
import fetch from "isomorphic-unfetch";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  fetch
});

const App = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default App;
```

To learn more about modifying the `App` component within a `Next.js` app, please follow the documentation [here](https://nextjs.org/docs/advanced-features/custom-app).

Modify the `pages/index.js` component with the code below:

```javascript
import React from "react";
import Button from "@monorepo-starter/button";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const getAuthorDetails = gql`
  query($name: String) {
    author(name: $name) {
      name
      books {
        title
      }
    }
  }
`;

const getAuthors = gql`
  query {
    authors {
      name
    }
  }
`;

const Preamble = () => (
  <>
    <h1>Welcome to Our monorepo starter!</h1>
    <p>
      This is a simple project, with three packages, an app (this!), a graphql
      server, and a button component.
    </p>
  </>
);

function HomePage() {
  const { data: authorList, initialLoading, initialError } = useQuery(
    getAuthors
  );
  const [getAuthor, { loading, error, data }] = useLazyQuery(getAuthorDetails);

  if (!authorList) {
    return null;
  }

  return (
    <div
      style={{
        textAlign: "center"
      }}
    >
      <Preamble />
      <h2>
        As a treat, we've got some cool author recs Click on an author to see
        some of their books:
      </h2>
      <div>
        {authorList.authors.map(({ name }) => (
          <Button
            key={name}
            isSelected={data && data.author.name === name}
            onClick={() => {
              getAuthor({ variables: { name } });
            }}
          >
            {name}
          </Button>
        ))}
      </div>
      <div style={{ marginTop: "24px" }}>
        {data ? (
          <div>
            <ul>
              {data.author.books.map(({ title }) => (
                <li style={{ listStyle: "none" }} key={title}>
                  {title}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HomePage;
```

Ensure the `graphql-api` is up and running by executing the following command from the project root

```shell
cd services/graphql-api
yarn start
```

Open another terminal and run the following command and visit `http://localhost:3000` to see your new graphql app!

```shell
cd apps/next-app
yarn dev
```

## Adding Manypkg to help validate your dependencies

There are [a _lot_ of subtle footguns](https://github.com/Thinkmill/manypkg#checks) to how dependencies are installed and linked in a monorepo, with the deadliest being:

- Installing a version of a package within your monorepo from npm instead of linking locally, breaking your dev loop

Run the following commands from the project root

```shell
yarn add @manypkg/cli -W
yarn manypkg check
yarn manypkg fix
```

Once you've installed `manypkg`, and fixed your project, you should add `manypkg check` to your postinstall script, which should now be:

```json
"postinstall": "preconstruct dev && manypkg check",
```

This should give you a large amount of peace-of-mind about your installs.

## Setting up a publishing workflow

> If you don't want to publish any packages to NPM, you can skip this section

While most tasks in monorepos allow you to think only in the package you are working on, versioning and publishing require thinking about the repository as a whole. You want to ensure packages in the monorepo depend on the latest versions of each other, so your local dev experience mirrors the experience of users installing your packages. We are going to use [changesets](https://github.com/changesets/changesets) to manage this workflow. Let's get set up:

```shell
yarn add @changesets/cli -W
yarn changeset init
```

This will add a `.changeset` folder with your changeset config. We want to make one change to the default changeset config: In `.changeset/config.json` change `"access": "restricted"` to `"access": "public"` (This is assuming you want to publish your packages publicly on npm, if you want them to be published privately, don't do this)

Finally, if you want to follow this tutorial all the way to publishing, you will need to change the [scope of your packages](https://docs.npmjs.com/about-scopes) to one you have publish rights to, so no packages should reference the scope `@monorepo-starter/` anymore.

### A brief explanation of changesets

Changesets works by allowing contributors to add changesets that document the individual changes, and then combine all the changesets when doing a release. We spread the load of this out over three commands. First run:

```shell
yarn changeset add
```

This prompts a series of questions allowing you to select what package is changed, the kind of ([semver](https://semver.org)) change it is, and a description of the change. For now, select `@monorepo-starter/button` and give it a `major` bump type.

Note the descriptions will end up in the CHANGELOGs of the packages.

Next we run:

```shell
yarn changeset version
```

This 'consumes' the changesets - it will consume and smartly combine all changesets that exist. Since we only have one, it will only apply one. Look at a git diff though, and you will see more than one package has changed.

```diff
diff --git a/.changeset/giant-jeans-swim.md b/.changeset/giant-jeans-swim.md
deleted file mode 100644
index a40d57e..0000000
--- a/.changeset/giant-jeans-swim.md
+++ /dev/null
@@ -1,5 +0,0 @@
----
-"@monorepo-starter/button": major
----
-
-A very important change.
diff --git a/apps/next-app/CHANGELOG.md b/apps/next-app/CHANGELOG.md
index e69de29..651819f 100644
--- a/apps/next-app/CHANGELOG.md
+++ b/apps/next-app/CHANGELOG.md
@@ -0,0 +1,8 @@
+# @monorepo-starter/next-app
+
+## 1.0.2
+
+### Patch Changes
+
+- Updated dependencies [efce5fd]
+  - @monorepo-starter/button@2.0.0
diff --git a/apps/next-app/package.json b/apps/next-app/package.json
index a2855cf..0ee3cef 100644
--- a/apps/next-app/package.json
+++ b/apps/next-app/package.json
@@ -1,6 +1,6 @@
 {
   "name": "@monorepo-starter/next-app",
-  "version": "1.0.1",
+  "version": "1.0.2",
   "scripts": {
     "dev": "next",
     "build": "next build",
@@ -8,7 +8,7 @@
   },
   "dependencies": {
     "@apollo/react-hooks": "^3.1.3",
-    "@monorepo-starter/button": "1.0.0",
+    "@monorepo-starter/button": "2.0.0",
     "@preconstruct/next": "^1.0.1",
     "apollo-boost": "^0.4.7",
     "graphql": "^14.6.0",
diff --git a/packages/button/CHANGELOG.md b/packages/button/CHANGELOG.md
index e69de29..b681845 100644
--- a/packages/button/CHANGELOG.md
+++ b/packages/button/CHANGELOG.md
@@ -0,0 +1,7 @@
+# @monorepo-starter/button
+
+## 2.0.0
+
+### Major Changes
+
+- efce5fd: A very important change.
diff --git a/packages/button/package.json b/packages/button/package.json
index d5f922a..1704fcc 100644
--- a/packages/button/package.json
+++ b/packages/button/package.json
@@ -1,6 +1,6 @@
 {
   "name": "@monorepo-starter/button",
-  "version": "1.0.0",
+  "version": "2.0.0",
   "description": "A very simple React button within a monorepo",
   "main": "dist/button.cjs.js",
   "module": "dist/button.esm.js",

```

This is because our `service` depends on our `simple-package`, so we need to update both. If we don't, we'll end up in one of the very-bad states we talked about back when discussing adding `manypkg`.

Finally, if you want to see your work on `npm`, and you changed the scope, run:

```shell
yarn preconstruct build && yarn changeset publish
```

> It's a good idea to alias this as a script: `"release": "yarn preconstruct build && yarn changeset publish"`

Finally, the link to the complete `monorepo-starter` can be found [here](https://github.com/Thinkmill/monorepo-starter)
