import React from "react";
import ThinkingInMonorepos from '@thinkmill/monorepo-docs/src/thinking-in-monorepos.md';
import { items } from ".";
import Article from "../components/article";

export default () => <Article item={items.thinking} page={ThinkingInMonorepos} />;
