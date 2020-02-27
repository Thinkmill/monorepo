import React from "react";
import GettingStarted from "../../GETTING_STARTED.md";
import { items } from ".";
import Article from "../components/article";

const GettingStartedPage = () => (
  <Article item={items.gettingStarted} page={GettingStarted} />
);

export default GettingStartedPage;
