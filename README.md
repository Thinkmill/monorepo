# Thinkmill Multi-package Repository Style Guide

This style guide Thinkmill Monorepo style guide documents the standards for how monorepos should be setup at Thinkmill along with explaining the reasoning for our tooling and setup. This style guide is intended to be a living representation of how we do monorepos so over time, the recommendations will change as tools and workflows evolve. While the guide is designed holistically, the tools and decisions in this guide can be used independently of each other.

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

#### When should a package have multiple entrypoints?

There are a couple reasons you may want to have multiple entrypoints in a package.

The most common reason is if you have some client side code and some server side code and you don't want users to pay the cost of loading that server side code or the server side code depends on some modules which aren't available for the browser.

The other significant reason to use multiple entrypoints that's more applicable to client side code is if you a sizable amount of code that you want people to be able to use but most people won't need it. A way to answer the question of "Should something be in its own entrypoint?" for this case, you can ask yourself these questions.

- Is the thing rarely used in comparison to the primary part of your package?
- Is the amount of code large?
- If it's a dependency of something else exposed by the package(the dependent), will someone wnat to import it without also importing any dependents of this or is it likely that the dependent will be changed to so it doesn't depend on the thing in the future?

If your answer to these questions is mostly yes then having multiple entrypoints might make sense for your package.

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

The second constraint is that our tooling should

### Versioning

> **Note**: Versioning is only necessary if packages are being published

...Explain versioning problems in monorepos

...Explain what a solution to this should be like

...Explain Changesets

<!--
Versioning should be done with [Changesets](https://github.com/atlassian/changesets). Changesets is a tool to allow contribours to declare intents to release packages. Contributors should create changesets when they submit Pull Requests. Repos should use the [Changeset Bot](https://github.com/apps/changeset-bot) to remind contributors to add changesets.

> The Changeset bot will likely be replaced with a GitHub Action when Changesets 2 is out -->

#### Why?

#### How to know what semver bump type a change should have

To decide what semver bump type a change should have, we need to introduce two terms:

- **absolutely correct semver** - making semver versioning decisions to ensure nothing less than major is capable of breaking a consumer's code. Because literally any change is technically capable of breaking a user's code, absolutely correct semver requires that all changes are major changes.
- **pragmatically correct semver** - Making semver decisions that you believe to be correct, but may be technically incorrect. A pragmatic assessment is likely to change with the number of users of a project, and the API surface area of the project. Whenever we talk about 'correct semver', we are referring to 'pragmatically correct semver'

### Releasing

> **Note**: Releasing is only necessary if packages are being published

...Explaining why manually releasing is not the best

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

// TODO

## Dictionary

- **release** - The combination of versioning and publishing a package or packages

### From changesets:

- **changeset** - an intent to release a set of packages at particular bump types with a summary of the changes made. Changesets are stackable, that is running `bump` will apply any number of changesets correctly. Changesets are used to generate further information, such as the `release information`, and the `release plan`.
- **workspace** - a local package in a multi-package repo
- **bump-type** - The type of change expected. Of type `major | minor | patch | none`, based on the change types of [semver](https://semver.org/)
- **range-type** - The type of range a package depends on, such as `1.0.0`, `~1.0.0`, or `^1.0.0`. This is a subset of valid semver ranges as [defined by node](https://github.com/npm/node-semver#ranges), narrowing to ranges we can update programmatically.
- **absolutely correct semver** - making semver versioning decisions to ensure nothing less than major is capable of breaking a consumer's code. Because literally any change is technically capable of breaking a user's code, absolutely correct semver requires that all changes are major changes.
- **pragmatically correct semver** - Making semver decisions that you believe to be correct, but may be in error. A pragmatic assessment is likely to change with the number of users of a project, and the API surface area of the project. Whenever we talk about 'correct semver', we are referring to 'pragmatically correct semver'

### from preconstruct:

- **single-package repo** - a repository which only contains a single package which is at the root of the repo

- **multi-package repo** - a repository that contains multiple packages, this is also commonly referred to as a monorepo but we use multi-package repo because it more clearly describes what it is. This is generally linked together with a tool such as [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/), [Bolt](https://github.com/boltpkg/bolt) or [Lerna](https://lerna.js.org/)

- **entrypoint** - something that is intended to be imported from outside a package with an associated source file and build types

- **entrypoint source file** - the source file for an entrypoint that defaults to `src/index` and can be configured with the source option

- **package** - a set of entrypoints with dependencies that is generally published to a package registry such as npm

- **project** - the overarching structure where all Preconstruct commands are run with a set of packages and global config

- **build type** - a file or group of files that Preconstruct outputs that is differentiated by its module type, whether it is intended for the browser or etc.

- **externals** - modules that shouldn't be bundled and should instead be left as imports

## Not totally solidified thoughts on monorepo vs multi-package repo that will likely change

> should we define "monorepos" vs "many-package repos"? multi-package repos can also be monorepos from a company or group perspective, but aren't necessarily. this a pragmatic approach

There are two common ideas that a monorepo can refer to. The first is what companies like Google and Facebook do where everything is in a single repo. As monorepos developed in the JavaScript ecosystem with tools like Lerna and Yarn Workspaces, the term took on a slightly different meaning in this context though by referring to having multiple packages in a repository rather than encompassing everything from a company or even a project, for example Apollo has multiple monorepos with apollo-client and react-apollo. While the term monorepo doesn't really explain the second idea and a term such as multi-package repo would more clearly explain this idea, it is an extremely common way of explaining this across the JavaScript ecosystem so throughout this style guide, when the term monorepo is used, we are referring to the second definition. The first definition is less relevant to the projects at Thinkmill because we have a variety of client and open source projects which could not all be in the same repository.
