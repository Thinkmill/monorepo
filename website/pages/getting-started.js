import React from "react";
import { Fragment } from "react";
import GettingStarted from "../../GETTING_STARTED.md";
import Index, { items } from ".";
import Article from "../components/article";

export default () => (
  <Article item={items.gettingStarted} page={GettingStarted} />
);
