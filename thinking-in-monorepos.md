# Thinking in Monorepos

> I've assumed in this article that you are already familiar with monorepos, and are looking for help on how to get the most out of them. If you're still not sure what monorepos are, or why you might want one, check out [why monorepos](./why-monorepos.md)

"Where do I install this package?"
"Where should this script live?"
"How do I run this command?"

Monorepos offer a lot of new ways to work, but when you first get started working in one, it can be daunting to try and answer questions like the above. You can follow a monorepo that is set up for you, but eventually you will need to be able to answer these questions to get the most out of your monorepo.

Today we are going to learn about how to think in monorepos, to learn how to make these decisions. To do this, I'm introducing four key concepts to keep in mind while working in a monorepo:

- A package is a package
- Packages have strong boundaries
- Only global settings live at the root
- Splitting up packages is an art

## A package is a package

This rule reads at first as either a tautology, or counterintuitive, but misunderstanding this is one of the most common ways that people get themselves into trouble working in a monorepo: they throw out a lot of learnings they have about working in packages from other projects. So it is important to call out, and keep in mind, that each of the packages in your monorepo is still just a package.

This means that each package can be interacted with as a package. You can `cd` into them, write scripts in them, add dependencies to them, run code within them. The only exception is installs, which you always want to let the monorepo handle. At all other times, if you want to treat a package as a package on its own, you should go ahead and do so, and a well set up monorepo will make this easy.

## Packages have strong boundaries

To allow each package to behave like a package, you need them to be isolatable from each other. This leads directly to our next concept: 'packages have strong boundaries', that is, they never rely on the other parts of the monorepo existing, except as if they were external packages.

This means that there should never be relative imports reaching out of one package's directory, into another package's directory. To allow code that is meant to be shared, you should define a 'public' API for a package. This API allows each package to clearly declare how it is to be used.

## Only global settings live at the root

So far we have focused on thinking of the individual packages, but you also need ways to understand what lives at your repository root. The simplest concept to to define this is 'Only global settings live at the root'. Examples of things that you will likely want to set up at the root are: your eslint config, your babel config, your testing config - tools which affect how the repository as a whole operates, not changes the behaviour of one package.

As you add more tools, you will likely find exceptions (some packages need different babel configs, or only one package is in typescript, so you don't need to store the typescript config in the root), but if you start with this principle, it will generally guide you well.

## Splitting up packages is an art

In some ways, I think all code is an art. Art requires an incredible about of knowledge and expertise and practice to execute, but while technical knowledge counts for a lot in both, sometimes you have to give way to instinct and intuition, where you don't have clearly stated heuristics. Part of becoming better is getting at better knowing when to apply each.

You should have guidelines about how to separate apps and services (packages you run) from library packages (packages designed to be used by other packages), but whether two functions should be separate packages in your monorepo, or two exports of one package gets fuzzy very quickly.

I thoroughly encourage you to experiment, and find the abstractions that work for you.

## Now you're thinking in monorepos

With these ideas at the ready, you should be prepared to answer the questions that come up while working on, or even managing! a monorepo. If you want more information, checkout our [monorepo guide](https://monorepo.guide)
