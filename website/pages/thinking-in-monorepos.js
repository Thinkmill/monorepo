import React from "react";
import { Fragment } from "react";
import Thinking from "../../thinking-in-monorepos.md";
import Index, { items } from ".";
import Article from "../components/article";

export default () => <Article item={items.thinking} page={Thinking} />;
