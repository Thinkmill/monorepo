import React from "react";
import Why from "../../why-monorepos.md";
import { items } from ".";
import Article from "../components/article";

const WhyPage = () => <Article item={items.why} page={Why} />;

export default WhyPage;
