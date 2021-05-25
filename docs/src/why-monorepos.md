<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Why Monorepos?](#why-monorepos)
  - [For package authors](#for-package-authors)
    - [Without a monorepo](#without-a-monorepo)
    - [When we switch to a monorepo](#when-we-switch-to-a-monorepo)
  - [But also for everyone else](#but-also-for-everyone-else)
    - [Better API contracts](#better-api-contracts)
  - [Having a well-defined structure makes it much easier to write meta-tools](#having-a-well-defined-structure-makes-it-much-easier-to-write-meta-tools)
    - [It's easier to delete code](#its-easier-to-delete-code)
  - [And that's why Monorepos](#and-thats-why-monorepos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Why Monorepos?

> A monorepo: A repository that includes multiple javascript packages

Greetings intrepid explorer! We at Thinkmill have been finding monorepos a very useful model for organising our code, and have been wanting to help others explore this space, as well as to open up learning from others doing similar things.

As part of this though, there was a most important question that came up: "Why monorepos?", or "What benefits are monorepos actually giving you?" This question gains even more importance when you appreciate that there are overheads to setting up and managing a monorepo. So here we are going to try and answer: "What benefits is a monorepo giving me".

This is, in part, going to be a story. First, I want to talk about the benefits of monorepos for package authors, then how the advantages there flow through into other projects.

## For package authors

> Package authors: People writing javascript code designed to be installed through another package's `dependencies` - most likely by publishing it to npm.

### Without a monorepo

Let's lead with an example. Emotion as a project supports several different use-cases. `@emotion/css` is designed to work in any context, while `@emotion/react` is specifically a react implementation of emotion. Both these share a huge amount of logic with each other, and want to share most of their internals. Without a monorepo there are two approaches to do this:

1. Make a single package that exports Both

This strategy means you get a good development environment for each project, but users end up with a worse experience. People only interested in the features of `@emotion/css` must install the react-specific code as well, and even dependencies. Someone not using react may have to install react to get the dependencies to work. That's not ideal.

2. Make three repositories for three packages, `@emotion/css`, `@emotion/react`, and `@emotion/common`

In this case, both our original two packages depend on common, which contains the shared logic, and users only get the bits they need. This provides a much better experience to developers using these packages, but makes developing between them awkward, to say the least. Whenever you make changes to `common`, you will need to test them in both `css` and `react` by locally linking them. When you publish new versions of `common`, you need to then also update `css` and `react` to rely on the new version.

All the problems here for the package author are solvable without a monorepo, but it create a bunch of extra overhead.

### When we switch to a monorepo

Monorepos, as I mentioned before, add some overhead, but unlike scenario 2 above, they add an overhead that is slowly being standardised and agreed upon. We put all the packages in one repository, and rely on existing tooling (such as yarn workspaces) to link the packages automatically on install. We can use tooling (such as changesets) to handle publishing multiple packages at once. And all while still being able to separate out various bits.

What's more, this separation becomes easy to do. We become empowered to not have one large `common` package, but instead split it more finely, into testable units, or spin out bits that may be useful for others into their own packages.

An example of this can be found in the [changesets monorepo](https://github.com/changesets/changesets) - in this monorepo, we took many of the internal bits of changesets and extracted them:

- [@changesets/get-release-plan](https://www.npmjs.com/package/@changesets/get-release-plan)
- [@changesets/apply-release-plan](https://www.npmjs.com/package/@changesets/apply-release-plan)
- [get-workspaces](https://www.npmjs.com/package/get-workspaces)

With these parts extracted, people can use the ideas of changesets, while having their own ideas about how to resolve parts of the process, all without needed to modify the default experience. If we were not in a monorepo, we would never have been able to extract these out. The monorepo makes it easy to extract these parts out, and still work on them in concert, which brings the best of both worlds.

## But also for everyone else

You may be thinking "this is all very well for package authors, but I run a project, we don't publish anywhere, how can I benefit"?

Well, there are advantages of working in packages which can be leveraged in any project, and a monorepos allow you to do this. These are:

- You will have better API contracts between different parts of your repository
- Having a well-defined structure makes it much easier to write meta-tools
- It is easier to delete code

### Better API contracts

Have you ever worked in a project and seen this?

```javascript
import Button from "../../../../../../components/base/button/default-button";
```

and then moved the file to a new location and all the imports break?

In a monorepo, you get to go:

```javascript
import button from "@cool-projects/button";
```

This is easier, but also helps with a different problem. Have you ever seen:

```javascript
import Button from "../../../../../../components/base/button/default-button/padding-styles";
```

where there's no reason to use the button padding styles other than that they currently match? Well, working in monorepos, we gain the ability to block this. What is exported from any package is specifically defined. All other files become inaccessible.

For small teams, the benefits here are much better understanding through structure what code is internal to a specific component or function, and what the correct way to access it is. This prevents weird dependencies across the repo, and makes documenting how to use the code easier.

This also means that things such as your `design-system` components can have clear ways to use them across multiple websites, or apps, being built in the same repository. Bits of the components aren't relevant, and won't be reused. Just the intended components become shared code.

## Having a well-defined structure makes it much easier to write meta-tools

If you have ever managed multiple repositories at once, each with their own testing testup, linting setup, babel setup, types setup, and a dozen other small but impactful configurations, you know how hard it is to make sure all of these lines up. Even when the packages are not interacting overmuch, having the ability to have a true shared config is very important.

In addition, writing rules about how your packages interrelate becomes possible. A layer of tools that help manage all your code at once is emerging (we're helping write some!). This means less time spent worrying about config, more time writing code.

### It's easier to delete code

Finally, because packages now depend on each other, and their APIs are defined, it's much easier to scan through your repository and see where something is being used, and to know that no subfiles are being used.

This means you can refactor internal code with less fear, and it also means if you can see a package is not being used, you can remove it.

## And that's why Monorepos

Hopefully this has helped you understand what you can get out of using a monorepo for your code. More importantly, hopefully you feel better equipped to make a decision about whether monorepos will be helpful for you or not.
