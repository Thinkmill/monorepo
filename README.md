# Thinkmill Multi-package Repository Style Guide

This style guide documents the standards we have developed for Multi-package Repositories (also known as monorepos) at Thinkmill.

## Reasoning behind multi-package repos

> Use a monorepo when you have a set of packages that are intended to be designed, worked on, and tested and released together.

> should we define "monorepos" vs "many-package repos"? multi-package repos can also be monorepos from a company or group perspective, but aren't necessarily. this a pragmatic approach

What kinds of things go in a monorepo?

(a) **Internal repository-level stuff**, like tooling and documentation, related to working in the repository itself.

(b) **Outputs of the monorepo** that are published or deployed, can be subcategoried into

(i) packages that are published to another repository (e.g npm) or consumed internally
(ii) applications (spa's, websites, etc) that get deployed to a service

## Concepts

- Packages
- Entrypoints
- Dependencies and Constraints
- Public and private packages, modules and APIs
- CI
- Build
- Tooling
- Documentation
- Versioning
- Publishing
- Deployment (include branch previews)

## Tooling

- [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)
- [manypkg](https://github.com/mitchellhamilton/manypkg)
- [preconstruct](https://github.com/preconstruct/preconstruct)
- [changesets](https://github.com/atlassian/changesets)

## Setup Guide

// TODO

## Dictionary

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
