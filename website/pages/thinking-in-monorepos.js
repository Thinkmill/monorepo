import React from "react";
import Thinking from "../../thinking-in-monorepos.md";
import { items } from ".";
import Article from "../components/article";

const ThinkingPage = () => <Article item={items.thinking} page={Thinking} />;

export default ThinkingPage;
