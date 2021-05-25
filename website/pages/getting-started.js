import React from "react";
import GettingStarted from '@thinkmill/monorepo-docs/src/getting-started.md';
import { items } from ".";
import Article from "../components/article";

export default () => (
  <Article item={items.gettingStarted} page={GettingStarted} />
);
