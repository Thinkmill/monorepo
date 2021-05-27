# Monorepo Style Guide 

## Directory naming conventions

```
- package.json
- packages/* - where packages designed to be consumed by other packages (published OR internal) live
- apps/* - where user-facing apps and websites should live
- services/* - where back-end services should live
- tools/* - where you should put packages intended to be used only within dev loops for your repository
- website/ - the location of the documentation website
```

For a design system being built alongside an app, you should put the design system packages inside a folder design-system that mirrors the above structure (as needed) except without a package.json in the design-system folder.


## Getting started checklist 

[ ] what do I want my monorepo to do?
[ ] will this be greenfield project or do I need to bring across existing apps?
 

## Thinking 




What is your use case? 

- I want to build a product
- I want to build a product with a design system
- I want to use packages outside of the monorepo
- I want to build an open source library
- I want to bring existing packages in to a monorepo


## I want to build a product

Let's build a blog that has an Express API, a server-side rendered frontend app and a CMS.  

/services/api
/apps/site
/apps/cms
 
## I want to build a product with a design system

/design-system/packages/*
/design-system/website
/apps/site


