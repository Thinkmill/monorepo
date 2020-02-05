# Thinkmill Monorepo Style Guide

Important Note: This style guide is currently very WIP

---

This style guide documents the standards for monorepos at Thinkmill along with explaining the reasoning for our decisions and tooling. This style guide is intended to be a living representation of how we do monorepos so over time, the recommendations will change as tools and workflows evolve. While the guide is designed holistically, the tools and decisions in this guide can be used independently of each other.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What is a monorepo](#what-is-a-monorepo)
- [Reasoning behind monorepos](#reasoning-behind-monorepos)
- [Concepts](#concepts)
  - [Packages](#packages)
  - [Entrypoints](#entrypoints)
    - [When should a package have multiple entrypoints?](#when-should-a-package-have-multiple-entrypoints)
  - [Package manifests](#package-manifests)
    - [Usage by package managers](#usage-by-package-managers)
    - [Usage by Node and bundlers](#usage-by-node-and-bundlers)
  - [Dependencies and Constraints](#dependencies-and-constraints)
    - [Constraints](#constraints)
      - [External mismatch](#external-mismatch)
        - [How it's fixed](#how-its-fixed)
      - [Internal mismatch](#internal-mismatch)
        - [How it's fixed](#how-its-fixed-1)
      - [Invalid dev and peer dependency relationship](#invalid-dev-and-peer-dependency-relationship)
        - [How it's fixed](#how-its-fixed-2)
      - [Root has devDependencies](#root-has-devdependencies)
        - [How it's fixed](#how-its-fixed-3)
      - [Multiple dependency types](#multiple-dependency-types)
        - [How it's fixed](#how-its-fixed-4)
      - [Invalid package name](#invalid-package-name)
        - [How it's fixed](#how-its-fixed-5)
      - [One scope for the monorepo, all packages are scoped](#one-scope-for-the-monorepo-all-packages-are-scoped)
        - [How it's fixed](#how-its-fixed-6)
      - [Unsorted dependencies](#unsorted-dependencies)
        - [How it's fixed](#how-its-fixed-7)
  - [Building Packages](#building-packages)
    - [Working in dev](#working-in-dev)
  - [Tooling](#tooling)
  - [Versioning](#versioning)
- [Writing a good changeset](#writing-a-good-changeset)
  - [Changesets for major changes](#changesets-for-major-changes)
    - [Releasing](#releasing)
  - [Tooling](#tooling-1)
  - [Setup Guide](#setup-guide)
    - [Setup Yarn Workspaces](#setup-yarn-workspaces)
    - [Create Initial packages](#create-initial-packages)
    - [Setup Changesets](#setup-changesets)
    - [Setup Manypkg](#setup-manypkg)
    - [Setup Preconstruct](#setup-preconstruct)
  - [Dictionary](#dictionary)
    - [monorepo disambiguation](#monorepo-disambiguation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is a monorepo

In this context, a monorepo refers to a project that contains multiple JavaScript packages. See [the definition](#monorepo-disambiguation) for more information.

## Reasoning behind monorepos

> Use a monorepo when you have a set of packages that are intended to be designed, worked on, and tested and released together.

What kinds of things go in a monorepo?

(a) **Internal repository-level stuff**, like tooling and documentation, related to working in the repository itself.

(b) **Outputs of the monorepo** that are published or deployed, can be subcategoried into

(i) packages that are published to another repository (e.g npm) or consumed internally
(ii) applications (spa's, websites, etc) that get deployed to a service

## Concepts

<!-- - Packages
- Entrypoints
- Dependencies and Constraints
- Public and private packages, modules and APIs
- CI
- Build
- Tooling
- Documentation
- Versioning
- Releasing
- Deployment (include branch previews)

Levels of granularity:

- Within a module
- Between modules
- Packages within the monorepo
- Outside the monorepo (private registry/scope)
- Outside the monorepo publicly (you're either public or open source)

How should the repo be configured depending on the above -->

<!-- ### Granularity of API something

APIs within monorepos have different levels of availability(?). Depending on the level of,

#### Within a module

The lowest level of APIs is only exposing APIs to within a module. These things will generally not be the most thought out or well documented APIs.

#### Between modules

The step up from APIs within a module is between modules. These APIs will often still not be well documented or well thought out but they will be

- Within a module
- Between modules
- Packages within the monorepo
- Outside the repo (private registry/scope)
- Outside the repo publicly (you're either public or open source) -->

### Packages

A monorepo is made up of a set of packages which are...

### Entrypoints

An entrypoint is something that is intended to be imported outside of a package. All packages must have at least one entrypoint, this will generally be the root of the package so the entrypoint can be imported as the package name. Some packages may also have multiple entrypoints, for example how `react-dom` has `react-dom` and `react-dom/server`.

Entrypoints should exist as directories with `package.json` files rather than files so that multiple build types like CommonJS and ES Modules can exist. It's important to note that every package has least one entrypoint and this will generally be the root of the package. Entrypoints are not something special that are only on some packages, they exist everywhere but they're often not configured specially.

#### When should a package have multiple entrypoints?

There are a couple reasons you may want to have multiple entrypoints in a package.

The most common reason is if you have some client side code and some server side code and you don't want users to pay the cost of loading that server side code or the server side code depends on some modules which aren't available for the browser.

The other significant reason to use multiple entrypoints that's more applicable to client side code is if you a sizable amount of code that you want people to be able to use but most people won't need it. A way to answer the question of "Should something be in its own entrypoint?" for this case, you can ask yourself these questions.

1. Is the thing rarely used in comparison to the primary part of your package?
2. Is the amount of code large?
3. If it's a dependency of something else exposed by the package(the dependent), will someone wnat to import it without also importing any dependents of this or is it likely that the dependent will be changed to so it doesn't depend on the thing in the future?

<details>

<summary>Example for the third question</summary>

Let's use an example, let's say you have a _really_ fancy select and for fun, let's call it `react-select`. It's got a `BaseSelect` component which is uncontrolled and it's got a `Select` component which is a wrapped version of `BaseSelect`. The primary component that most people will want to use is `Select` so we'll make it the entrypoint at `react-select` so it can be imported like this:

```js
import Select from "react-select";
```

People also might want to use `BaseSelect` though and importantly, people might want to use `BaseSelect` but not use `Select` and if they do that, we don't want them to have to load the load for `Select` so we'll have another entrypoint called `react-select/base` for them so it can be imported like this:

```js
import BaseSelect from "react-select/base";
```

Let's say we have a function for filtering called `createFilter`, we know we might want to change the API of it in the future though but we're not doing it now because _some reason_. We want people to be able to use `createFilter` and it's used by `BaseSelect` right now. We want to change the function that we use for filtering in the future but we don't want to do a major version when we do(let's assume the behaviour won't change)/we still want to expose that `createFilter` function for consumers so we'll expose it as `react-select/filters` so it can be imported like this:

```js
import { createFilter } from "react-select/filters";
```

This means that when we remove the usage of `createFilter` in `BaseSelect`, people won't have to load the code for createFilter unless they're using it directly by importing it themselves.

</details>

If your answer to these questions is mostly yes then having multiple entrypoints might make sense for your package.

### Package manifests

Understanding package manifests which are also known as package.jsons because of their filename are an important part to understanding monorepos. Package manifests are primarily used between two main groups of tools. It’s never important to note that these two usages of packages manifests can be completely separated even though the information is often contained in the same package manifest.

#### Usage by package managers

The usage of a package manifest by a package manager is referred to as a package in this document. Package manifests are used by package managers to ...link...publish...install deps

#### Usage by Node and bundlers

The usage of package manifests by Node and bundlers is referred to as an entrypoint in this document. The way this works is any directory with a package manifest that is imported, the path specified in the main field (or `module` and similar fields) is used to resolve the module. This is useful because it allows you to let people import something but they will get a different file depending on the environment it’s being imported in so bundlers will be using ES modules which can more easily be optimised and Node will still get CommonJS.

> [Node's documentation on Node's module resolution](https://nodejs.org/api/modules.html#modules_all_together) is very helpful to understand how this resolution algorithm works. It’s important to note though, bundlers generally use a subtly different module resolution algorithm to support fields like `module` and `browser`.

### Dependencies and Constraints

A common problem that has been encountered in monorepos is that duplicated packages cause confusion in having many different copies of the same package at different and sometimes the same version. To address this, we need to impose some constraints on the dependencies of packages. These constraints are enforced automatically and often fixed by [Manypkg](https://github.com/Thinkmill/manypkg)

#### Constraints

##### External mismatch

The ranges for all dependencies(excluding `peerDependencies`) on external packages should exactly match(`===`). This is so that only a single version of an external package will be installed because having multiple versions of the same package can cause confusion and bundle size problems especially with libraries like React that require there to only be a single copy of the library. It's important to note that this check does not enforce that only a single version of an external package is installed, only that two versions of an external package will never be installed because they're specified as dependencies of internal packages.

###### How it's fixed

The highest range of the dependency is set as the range at every non-peer dependency place it is depended on.

##### Internal mismatch

The ranges for all dependencies(excluding `peerDependencies`) on internal packages should include the version of the internal package. This is so that an internal package will never depend on another internal package but get the package from the registry because that happening is very confusing and you should always prefer a local version of any given package.

###### How it's fixed

If the range is a [caret range](https://github.com/npm/node-semver#caret-ranges-123-025-004) or a [tilde range](https://github.com/npm/node-semver#tilde-ranges-123-12-1) with no other comparators, the range is set as a caret or tilde range respectively with the version of the internal package. If it is any other range, the range is set to the exact version of the internal package.

##### Invalid dev and peer dependency relationship

All `peerDependencies` should also be specified in `devDependencies` and the range specified in `devDependencies` should be a subset of the range for that dependency in `peerDependencies`. This is so that `peerDependencies` are available in the package during development for testing and etc.

###### How it's fixed

The range for the dependency specified in `peerDependencies` is added to `devDependencies` unless the package is already a non-peer dependency elsewhere in the repo in which, that range is used instead.

##### Root has devDependencies

In the root `package.json` of a monorepo, whether a dependency is in `devDependencies` or `dependencies` does not make a difference. To avoid confusion as to where a root dependency should go, all dependencies should go in `dependencies`.

###### How it's fixed

All `devDependencies` in the root `package.json` are moved to `dependencies`.

##### Multiple dependency types

A dependency shouldn't be specified in more than one of `dependencies`, `devDependencies` or `optionalDependencies`.

###### How it's fixed

The dep is removed from `devDependencies` or `optionalDependencies` if it's also in `dependencies`, if it's in `devDependencies` and `optionalDependencies`, it is removed from `dependencies`.

##### Invalid package name

There are rules from npm about what a package name can be. This is already enforced by npm on publish but in a monorepo, everything will be published together so some packages may depend on a package which can't be published. Checking for invalid package names prevents this kind of publish failure.

###### How it's fixed

This requires manual fixing as automatically fixing this may lead to valid but incorrect package names.

##### One scope for the monorepo, all packages are scoped

> NOTE: These restrictions are not enforced

All packages in a monorepo should be owned by a single npm org that has publish rights. We recommend that there is only ever one scope to make enforcing this easier. If you add a new unscoped package, you should make sure you add it to the org on npm as well.

###### How it's fixed

This is something to manually check, as we do not wish to strictly enforce it

##### Unsorted dependencies

When you add a package with `yarn add` or etc. dependencies are sorted, and this can cause confusing diffs if the dependencies were not previously sorted. Dependencies should be sorted alphabetically to avoid this.

###### How it's fixed

This is fixed by sorting deps by key alphabetically.

<!-- ### Public and private packages, modules and APIs -->

### Building Packages

> **Note**: Building packages is only necessary if packages are being published

All files should be compiled using Babel if they are compiled, not any other tool like the TypeScript compiler. This is so that we only have to use a single tool for code transformation of all different kinds of JavaScript. We also prefer Babel because of the extensibility it provides with plugins.

> **Note**: The above is talking specifically about compilation, using TypeScript to type check code is completely fine but the code should be compiled with Babel. [There are some caveats](https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats) to do with compiling TypeScript with Babel, we think that the caveats are worth it for the consistency and extensibility of compiling with Babel.

Working in monorepos adds some new problems to build tooling that aren't generally present in single package repos.

The first problem is that there are a significant number of packages so setting up build tooling for each package is impractical and costly. This should be solved with tooling that can be setup a single time for multiple packages. A sub-problem of this is that because there are so many, tools should therefore allow consumers to make a single decision that applies to the entire repo rather than make a decision on a per-package basis. Tooling should also ideally make inconsequential decisions themselves, for example the file names of dist files are inconsequential so tools should have a set pattern for this so that users do not have to think about it.

Packages should be built with [Preconstruct](https://github.com/preconstruct/preconstruct).

#### Working in dev

A common use case in monorepos is that there are some packages which depend on each other and you want to test them. This creates a problem if you're building them with a tool like Preconstruct though. When you import packages, you'll be importing the dist files, so you have to run preconstruct watch or preconstruct build which is slow and requires running another process.

Monorepos introduces a new problem that isn't generally present in single-package repos. When running tests or working on apps/websites, you need to import packages and those packages may themselves have dependencies on other packages. If those packages are built, you will be importing built files which means you either need to run a build script on every change or start a watch script in addition to the bundler or server process which is inconvenient and can cause confusion because someone can make a change and their change won't show up. The solution is to . There are some caveats to this solution. It is moving the responsibility to compile the files correctly

This should be done with `preconstruct dev`, it should be added to the `postinstall` script in a repo so it's run automatically after installs.

<details><summary>Previous solution to this problem</summary>

Before the redirecting files solution came about, Preconstruct exported a set of aliases for different tools like webpack, Jest and Rollup that could be applied and the entrypoints would be aliased. This required every tool to be setup with the aliases which is very annoying so it was replaced with `preconstruct dev`.

</details>

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

### Tooling

Over time, Thinkmill has developed a variety of tooling to support working on monorepos based on our experiences. There is a higher level set of ideas and constraints that all of our tooling should aim to meet which is explained below. It's also important to note that our tooling's primary purpose is not to compete with other tools, our primary goal is to have a good developer experience in monorepos. This means that in some cases, we may replace our own tooling with tooling from the wider community.

The first constraint that our tooling should aim to meet is that they should not be tightly coupled to each other. There will be some slight exceptions to this where some minimal coupling allows the deduplication of configuration. For example, Changesets and Manypkg both determine what packages they should use by reading from Yarn Workspaces configuration. The aim of not having tight coupling between tools is to enable us to replace tools as better tools are developed and our needs change.

<!-- Another constraint is that tooling that exists for multiple packages should generally be run from the root of the repo rather than an individual package. For example, Preconstruct, Jest and etc. are all run from the root rather than inside of package directories. This isn't true for sites and apps like Next.js and etc. because they are targeting a particular package rather than every package or a significant number of packages. The reason for this is that running tools from the root is that decisions can be made a single tome with tooling at the root as opposed to having to make the same decision for every package and th

> I feel like this is turning into a thing - should we distinguish between repo tooling and package tooling(not sure if package tooling is the right term)
>
> - Repo Tooling - Tools that apply generally to all packages or a significant number of packages. e.g. Jest
> - Package Tooling - Tools that only really exist on a per-package level. e.g. Next.js
>
> Problem: You might have multiple Next.js sites, they should still be setup per package?(probably) if so, what's the distinction here? -->

### Versioning

> **Note**: Versioning is only necessary if packages are being published

Versioning large projects, especially monorepos presents some problems that are generally less present on single-package repos(While this approach works on single-package repos, we’ve found that by the time this versioning strategy is helpful, a repo will be changed into a monorepo so that multiple packages can be used for things like websites even if only a single package is published). The amount of effort required to do a release is multiplied by the number of packages which gets impractical even if you only have a modest number of packages. We need tools that can take the load of maintainers so it’s easy to do releases.

The first problem is that changelogs are very useful for consumers but they’re generally written by a maintainer when they’re doing a release which is time consuming a results in less than ideal changelogs because they don’t have the complete context of the person who made the change. To address this, Thinkmill monorepos require contributors to declare an intent to release, called a changeset which includes two pieces of information.

1. A change summary - this is included in changelogs
2. A set of number of packages to release at set semver bump types.

The format of this is currently a markdown file to contain the change summary with YAML front matter to describe the packages to be releases with the semver bump type. An example changeset releasing `@changesets/cli` with a major bump is shown below.

```md
---
"@changesets/cli": major
---

A really helpful list of breaking changes that make Changesets better for everyone along with how to upgrade ❤️
```

The second problem unique to monorepos is bumping dependents. This is closely related to the constraint we impose in dependencies discussed above that all dependencies on internal packages must have a range where the version of the internal dependency is within it. Having to manually bump all of the necessary ranges and versions to satisfy this rule which be extremely time consuming so changesets will automatically bump the dependents of packages that are being released automatically according to some rules.

1. If a dependency which is in `dependencies` or `optionalDependencies` is being released and the version will be out of the range that is specified as a dependency, the dependent(the package that has the dependency) should receive a patch bump. While there are some cases where this could result in a not high enough bump, this is done because it is what you want in most cases, for those other cases, you can add another changeset for the dependent with the bump it should receive
2. If a peer dependency(a dependency which is in `peerDependencies`) is being released as a major or minor(though not patch), the dependent should receive a major bump. This is done because. We do not do this on patch bumps to peer dependencies because they shouldn’t introduce new features or behaviour that the dependent could rely on.

# Writing a good changeset

What qualities does a good changeset have?

## Changesets for major changes

Changesets for major changes should be more detailed than changesets for minor and patch changes because they include breaking changes which require users to change their code to account for the changes. The three most important things to include in changesets for major changes are:

1. WHAT - what was the change made?
2. HOW - how should consumers update?
3. WHY - why was the change made?

A frequent problem especially in open source libraries is people saying that something is a breaking change but it was released as a non-major change. While semver is often treated as something that should be followed absolutely, this is impractical. If packages were versioned with what we call "absolute semver" every single change would be a major change because someone could arguably rely on any piece of behaviour, even things that could be considered bugs. This would be horrible and completely destroy the value of semver. So rather than using "absolute semver", we prefer "pragmatic semver", this is making bumping decisions based on more information that whether something is a breaking change or not. For example, the consideration might include things like the number of users and the fact that upgrading major releases will happen less often than patches and minors so a vital security fix that would technically break something if someone was relying on it in a specific way would be acceptable as a patch if it brought a greater benefit by being released as a patch as opposed to a major.

### Releasing

> **Note**: Releasing is only necessary if packages are being published

Manually doing releases is a time consuming process and can be error prone with broken releases because of human error. To address this, we want to automate releases as much as possible. In general though, the maintainers of a project should still have control over when a release happens so that multiple changes can be batched together into a single release.

Releases should be done with the [Changeset Release Action](https://github.com/changesets/action). The flow is that changesets are added to master and when there are changesets on master, a PR will be opened with the updates to the versions and changelogs, if more changesets are added, the PR is updated and when the PR is merged all the packages are publishing to npm. This means there is very little friction to doing a release but it is still an explicit action from a maintainer so that many changes can be batched together.

<!-- ### Releasing Apps/Sites

The tooling to support releasing packages with Changesets does not have to be restricted to packages. Releasing apps or sites presents slightly different problems to releasing packages though, what are the differences?

- Dependents aren't a thing
- Releasing isn't restricted to a single platform, e.g. we want to deploy things to Netlify, S3, Now, Lambda, etc.

What are the core parts of the Changesets process that aren't restricted to packages?

- A contributor creates an intent to release (a changeset)
  - For packages - we need semver and change summaries
  - For apps or sites - do we need semver and change summaries?
- A repo is versioned based on the changesets - this will generally be an explicit action from a maintainer
  - Do we need partial releases?
    - Use case: I have an app that I want to do a release for but I also have changes to my design system which is in the same repo as the app but I don't want to release my changes to the design system because X? -->

## Tooling

- [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)
- [Manypkg](https://github.com/Thinkmill/manypkg)
- [Preconstruct](https://github.com/preconstruct/preconstruct)
- [Changesets](https://github.com/atlassian/changesets)

## Setup Guide

### Setup Yarn Workspaces

Create a `package.json`

```json
{
  "name": "@scope-name/repo",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["packages/*"]
}
```

### Create Initial packages

Create at least one package with a `package.json` at `packages/PKG_NAME/package.json`. You can use `yarn init` to do this from inside a package directory.

### Setup Changesets

Install `@changesets/cli`

```bash
yarn add @changesets/cli --ignore-workspace-root-check
```

Initialise Changesets

```bash
yarn changeset init
```

<details>
<summary>Recommended flow for setting up automated publishing</summary>

1. [Create an npm account](https://www.npmjs.com/signup), you'll probably want to do this from another browser or incognito mode
2. (optional) Enable 2FA on Auth(it's important that you don't enable 2FA on publish because the bot needs to be run from a GitHub Action so you can't provide a token)
3. Invite the release bot to the org(s) it should be publishing. (If you have unscoped packages, make sure they are in the org. Add them by going to a team on the npm org and adding the unscoped packages)
4. Create a token and add it to the GitHub repo for the project as a secret named `NPM_TOKEN`(settings -> secrets)
5. Make sure that your release workflow has the content described at [the with publishing section](https://github.com/changesets/action#with-publishing)
6. It should work now!! Sometimes the publish fails on the first time though. If that happens, try creating a new npm token and replacing the old one or wait a bit and retry it.

</details>

### Setup Manypkg

Install `@manypkg/cli`

```bash
yarn add @manypkg/cli --ignore-workspace-root-check
```

Add `manypkg check` to the postinstall script. Your `package.json` should now look like this.

```json
{
  "name": "@scope-name/repo",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["packages/*"],
  "dependencies": {
    "@manypkg/cli": "^0.9.0"
  },
  "scripts": {
    "postinstall": "manypkg check"
  }
}
```

### Setup Preconstruct

Install `@preconstruct/cli`

```bash
yarn add @preconstruct/cli --ignore-workspace-root-check
```

Initialise Preconstruct.

```
yarn preconstruct init
```

Add `preconstruct dev` to the postinstall script. Your `package.json` should now look like this.

```json
{
  "name": "@scope-name/repo",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["packages/*"],
  "dependencies": {
    "@manypkg/cli": "^0.9.0",
    "@preconstruct/cli": "^1.1.4"
  },
  "scripts": {
    "postinstall": "manypkg check && preconstruct dev"
  }
}
```

## Dictionary

- **single-package repo** - a repository which only contains a single package which is at the root of the repo
- **multi-package repo** - a repository that contains multiple packages. This is generally linked together with a tool such as [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/), [Bolt](https://github.com/boltpkg/bolt) or [Lerna](https://lerna.js.org/). This is a synonym for monorepo
- **release** - The combination of versioning and publishing a package or packages
- **changeset** - an intent to release a set of packages at particular bump types with a summary of the changes made. Changesets are stackable, that is running `bump` will apply any number of changesets correctly. Changesets are used to generate further information, such as the `release information`, and the `release plan`.
- **workspace** - a local package in a monorepo
- **bump-type** - The type of change expected. Of type `major | minor | patch | none`, based on the change types of [semver](https://semver.org/)
- **range-type** - The type of range a package depends on, such as `1.0.0`, `~1.0.0`, or `^1.0.0`. This is a subset of valid semver ranges as [defined by node](https://github.com/npm/node-semver#ranges), narrowing to ranges we can update programmatically.
- **absolutely correct semver** - making semver versioning decisions to ensure nothing less than major is capable of breaking a consumer's code. Because literally any change is technically capable of breaking a user's code, absolutely correct semver requires that all changes are major changes.
- **pragmatically correct semver** - Making semver decisions that you believe to be correct, but may be in error. A pragmatic assessment is likely to change with the number of users of a project, and the API surface area of the project. Whenever we talk about 'correct semver', we are referring to 'pragmatically correct semver'
- **entrypoint** - something that is intended to be imported from outside a package with an associated source file and build types
- **entrypoint source file** - the source file for an entrypoint that defaults to `src/index` and can be configured with the source option
- **package** - a set of entrypoints with dependencies that is generally published to a package registry such as npm

### monorepo disambiguation

There are two common ideas that a monorepo can refer to. The first is what companies like Google and Facebook do where everything is in a single repo. As monorepos developed in the JavaScript ecosystem with tools like Lerna and Yarn Workspaces, the term took on a slightly different meaning in this context though by referring to having multiple packages in a repository rather than encompassing everything from a company or even a project, for example Apollo has multiple monorepos with apollo-client and react-apollo. Within this style guide, we are only talking about the second kind of monorepo.
