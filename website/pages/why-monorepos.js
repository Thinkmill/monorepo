import React from "react";
import WhyMonorepos from "@thinkmill/monorepo-docs/src/why-monorepos.md";
import { items } from ".";
import Article from "../components/article";

export default () => <Article item={items.why} page={WhyMonorepos} />;
