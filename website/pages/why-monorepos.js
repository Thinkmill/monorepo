import React from "react";
import { Fragment } from "react";
import Why from "../../why-monorepos.md";
import Index, { items } from ".";
import Article from "../components/article";

export default () => <Article item={items.why} page={Why} />;
