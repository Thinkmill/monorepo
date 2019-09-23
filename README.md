# Thinkmill Multi-Package Repository Style Guide

Important Note: This style guide is currently very WIP

---

This style guide documents the standards for monorepos at Thinkmill along with explaining the reasoning for our decisions and tooling. This style guide is intended to be a living representation of how we do monorepos so over time, the recommendations will change as tools and workflows evolve. While the guide is designed holistically, the tools and decisions in this guide can be used independently of each other.

## Reasoning behind multi-package repos

> Use a monorepo when you have a set of packages that are intended to be designed, worked on, and tested and released together.

What kinds of things go in a monorepo?

(a) **Internal repository-level stuff**, like tooling and documentation, related to working in the repository itself.

(b) **Outputs of the monorepo** that are published or deployed, can be subcategoried into

(i) packages that are published to another repository (e.g npm) or consumed internally
(ii) applications (spa's, websites, etc) that get deployed to a service

## Concepts

### Packages

A monorepo is made up of a set of packages which are...

### Entrypoints

An entrypoint is something that is intended to be imported outside of a package. All packages must have at least one entrypoint, this will generally be the root of the package so the entrypoint can be imported as the package name. Some packages may also have multiple entrypoints, for example how `react-dom` has `react-dom` and `react-dom/server`.

Entrypoints should exist as directories with `package.json` files rather than files so that multiple build types like CommonJS and ES Modules can exist

#### When should a package have multiple entrypoints?

There are a couple reasons you may want to have multiple entrypoints in a package.

The most common reason is if you have some client side code and some server side code and you don't want users to pay the cost of loading that server side code or the server side code depends on some modules which aren't available for the browser.

The other significant reason to use multiple entrypoints that's more applicable to client side code is if you a sizable amount of code that you want people to be able to use but most people won't need it. A way to answer the question of "Should something be in its own entrypoint?" for this case, you can ask yourself these questions.

- Is the thing rarely used in comparison to the primary part of your package?
- Is the amount of code large?
- If it's a dependency of something else exposed by the package(the dependent), will someone wnat to import it without also importing any dependents of this or is it likely that the dependent will be changed to so it doesn't depend on the thing in the future?

If your answer to these questions is mostly yes then having multiple entrypoints might make sense for your package.

### Dependencies and Constraints

A common problem that has been encountered in monorepos is that duplicated packages cause confusion in having many different copies of the same package at different and sometimes ten same version. To address this, we need to impose some constraints on the dependencies of packages.

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

In the root `package.json` of a multi-package repository, whether a dependency is in `devDependencies` or `dependencies` does not make a difference. To avoid confusion as to where a root dependency should go, all dependencies should go in `dependencies`.

###### How it's fixed

All `devDependencies` in the root `package.json` are moved to `dependencies`.

##### Multiple dependency types

A dependency shouldn't be specified in more than one of `dependencies`, `devDependencies` or `optionalDependencies`.

###### How it's fixed

The dep is removed from `devDependencies` or `optionalDependencies` if it's also in `dependencies`, if it's in `devDependencies` and `optionalDependencies`, it is removed from `dependencies`.

##### Invalid package name

There are rules from npm about what a package name can be. This is already enforced by npm on publish but in a multi-package repository, everything will be published together so some packages may depend on a package which can't be published. Checking for invalid package names prevents this kind of publish failure.

###### How it's fixed

This requires manual fixing as automatically fixing this may lead to valid but incorrect package names.

##### Unsorted dependencies

When you add a package with `yarn add` or etc. dependencies are sorted, and this can cause confusing diffs if the dependencies were not previously sorted. Dependencies should be sorted alphabetically to avoid this.

###### How it's fixed

This is fixed by sorting deps by key alphabetically.

#### Implementation

The current implementation of these constraints is Manypkg. There is a good chance that this will be replaced with the constraints feature in Yarn 2 when it is stable or a combination of the constraints feature and some helpers/small abstractions.

### Public and private packages, modules and APIs

### Building Packages

> **Note**: Building packages is only necessary if packages are being published

Working in monorepos adds some new problems to build tooling that aren't generally present in single package repos.

The first problem is that there are a significant number of packages so setting up build tooling for each package is impractical and costly. This should be solved with tooling that can be setup a single time for multiple packages. A sub-problem of this is that because there are so many, tools should therefore make allow consumers to make a single decisions for the entire repo and ideally make inconsequential decisions themselves, for example the file names of dist files are inconsequential so tools should have a pattern

#### Working in dev

...Explain working in dev problem

This should be done with `preconstruct dev`, it should be added to the postinstall script in a repo so it's run automatically.

### Tooling

Over time, Thinkmill has developed a variety of tooling to support working on monorepos based on our experiences. There is a higher level set of ideas and constraints that all of our tooling should aim to meet which is explained below. It's also important to note that our tooling's primary purpose is not to compete with other tools, our primary goal is to have a good developer experience in monorepos. This means that in some cases, we may replace our own tooling with tooling from the wider community.

The first constraint that our tooling should aim to meet is that they should not be tightly coupled to each other. There will be some slight exceptions to this where some minimal coupling allows the deduplication of configuration. For example, Changesets and Manypkg both determine what packages they should use by reading from Yarn Workspaces configuration. The aim of not having tight coupling between tools is to enable us to replace tools as better tools are developed and our needs change.

### Documentation

Use Docz probably. @Noviny should probably expand this

### Versioning

> **Note**: Versioning is only necessary if packages are being published

...Explain versioning problems in monorepos

...Explain what a solution to this should be like

...Explain Changesets

<!--
Versioning should be done with [Changesets](https://github.com/atlassian/changesets). Changesets is a tool to allow contribours to declare intents to release packages. Contributors should create changesets when they submit Pull Requests. Repos should use the [Changeset Bot](https://github.com/apps/changeset-bot) to remind contributors to add changesets.

> The Changeset bot will likely be replaced with a GitHub Action when Changesets 2 is out -->

#### How to know what semver bump type a change should have

To decide what semver bump type a change should have, we need to introduce two terms:

- **absolutely correct semver** - making semver versioning decisions to ensure nothing less than major is capable of breaking a consumer's code. Because literally any change is technically capable of breaking a user's code, absolutely correct semver requires that all changes are major changes.
- **pragmatically correct semver** - Making semver decisions that you believe to be correct, but may be technically incorrect. A pragmatic assessment is likely to change with the number of users of a project, and the API surface area of the project. Whenever we talk about 'correct semver', we are referring to 'pragmatically correct semver'

### Releasing

> **Note**: Releasing is only necessary if packages are being published

Manually doing releases is a time consuming process and can be error prone with broken releases because of human error. To address this, we want to automate releases as much as possible. In general though, the maintainers of a project should still have control over when a release happens so that multiple changes can be batched together into a single release. The exception to this is when a project has a very large number of contributors to the point that it's impractical to have explicit releases. If this is true, releases should happen automatically on every merge to master and a tool like [Landkid](https://github.com/atlassian/landkid) to manage merging.

Releases should be done with the [Changeset Release Action](https://github.com/changesets/action). The flow is that changesets are added to master and when there are changesets on master, a PR will be opened with the updates to the versions and changelogs, if more changesets are added, the PR is updated and when the PR is merged all the packages are publishing to npm. This means there is very little friction to doing a release but it is still an explicit action from a maintainer so that many changes can be batched together.

- Packages
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

## Tooling

- [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)
- [manypkg](https://github.com/mitchellhamilton/manypkg)
- [preconstruct](https://github.com/preconstruct/preconstruct)
- [changesets](https://github.com/atlassian/changesets)

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

#### Setup Changesets GitHub Actions

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
    "@manypkg/cli": "^0.1.0"
  },
  "scripts": {
    "postinstall": "manypkg check"
  }
}
```

### Setup Preconstruct

Install `preconstruct`

```bash
yarn add preconstruct --ignore-workspace-root-check
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
    "@manypkg/cli": "^0.1.0",
    "preconstruct": "^0.1.0"
  },
  "scripts": {
    "postinstall": "manypkg check && preconstruct dev"
  }
}
```

## Dictionary

- **single-package repo** - a repository which only contains a single package which is at the root of the repo
- **multi-package repo** - a repository that contains multiple packages, this is also commonly referred to as a monorepo but we use multi-package repo because it more clearly describes what it is. This is generally linked together with a tool such as [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/), [Bolt](https://github.com/boltpkg/bolt) or [Lerna](https://lerna.js.org/)
- **release** - The combination of versioning and publishing a package or packages
- **changeset** - an intent to release a set of packages at particular bump types with a summary of the changes made. Changesets are stackable, that is running `bump` will apply any number of changesets correctly. Changesets are used to generate further information, such as the `release information`, and the `release plan`.
- **workspace** - a local package in a multi-package repo
- **bump-type** - The type of change expected. Of type `major | minor | patch | none`, based on the change types of [semver](https://semver.org/)
- **range-type** - The type of range a package depends on, such as `1.0.0`, `~1.0.0`, or `^1.0.0`. This is a subset of valid semver ranges as [defined by node](https://github.com/npm/node-semver#ranges), narrowing to ranges we can update programmatically.
- **absolutely correct semver** - making semver versioning decisions to ensure nothing less than major is capable of breaking a consumer's code. Because literally any change is technically capable of breaking a user's code, absolutely correct semver requires that all changes are major changes.
- **pragmatically correct semver** - Making semver decisions that you believe to be correct, but may be in error. A pragmatic assessment is likely to change with the number of users of a project, and the API surface area of the project. Whenever we talk about 'correct semver', we are referring to 'pragmatically correct semver'
- **entrypoint** - something that is intended to be imported from outside a package with an associated source file and build types
- **entrypoint source file** - the source file for an entrypoint that defaults to `src/index` and can be configured with the source option
- **package** - a set of entrypoints with dependencies that is generally published to a package registry such as npm

## Not totally solidified thoughts on monorepo vs multi-package repo that will likely change

> should we define "monorepos" vs "many-package repos"? multi-package repos can also be monorepos from a company or group perspective, but aren't necessarily. this a pragmatic approach

There are two common ideas that a monorepo can refer to. The first is what companies like Google and Facebook do where everything is in a single repo. As monorepos developed in the JavaScript ecosystem with tools like Lerna and Yarn Workspaces, the term took on a slightly different meaning in this context though by referring to having multiple packages in a repository rather than encompassing everything from a company or even a project, for example Apollo has multiple monorepos with apollo-client and react-apollo. While the term monorepo doesn't really explain the second idea and a term such as multi-package repo would more clearly explain this idea, it is an extremely common way of explaining this across the JavaScript ecosystem so throughout this style guide, when the term monorepo is used, we are referring to the second definition. The first definition is less relevant to the projects at Thinkmill because we have a variety of client and open source projects which could not all be in the same repository.
