# I want to build a product

I am building a customer website and a corporate website. I want to share a navigation component between the two. 

## Directory structure 

/apps/customer-site         @company/customer-website
/apps/corporate-site        @company/corporate-website
/packages/navigation        @company/navigation

## Pattern

/apps/customer-site/src/index.js
import { Nav } from '@company/navigation';

export const () => (
  <div>
    <Nav />
    <div>
      <h1>Customer site</h1>
    </div>
  </div>
);

/apps/corporate-site/src/index.js
import { Nav } from '@company/navigation';

export const () => (
  <div>
    <Nav />
    <div>
      <h1>Customer site</h1>
    </div>
  </div>
);

## Tooling 

* Manypkg

## Set up

