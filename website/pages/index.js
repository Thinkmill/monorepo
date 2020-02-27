/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import Link from "next/link";

import { H1, H2, P } from "../components/text";
import Item from "../components/item";
import Footer from "../components/footer";

export let items = {
  gettingStarted: {
    title: "Getting Started",
    icon: "🚀",
    href: "/getting-started",
    desc:
      "We’ve compiled a step-by-step guide for setting up your first monorepo."
  },
  why: {
    title: "Why Monorepos?",
    icon: "🔍",
    href: "/why-monorepos",
    desc:
      "Why monorepos? What are the benefits? Read on to learn why you should use a monorepo."
  },
  thinking: {
    title: "Thinking in monorepos",
    href: "/thinking-in-monorepos",
    icon: "🤔",
    desc:
      "Monorepos offer a lot of new ways to work, but when you first get started working in one, it can be daunting. Read on to learn about the monorepo mindset."
  },
  starter: {
    title: "Starter",
    icon: "🧳",
    href: "https://github.com/Thinkmill/monorepo-starter",
    desc: "Ready to jump in? Try our starter repo and get start right away."
  }
};

const tools = [
  {
    title: "Changesets",
    href: "https://github.com/changesets/changesets",
    icon: "🦋",
    desc:
      "Changesets is a tool to help with versioning monorepos, by letting contributors declare their changes and automate releases"
  },
  {
    title: "Preconstruct",
    href: "https://preconstruct.tools",
    icon: "🎁",
    desc:
      "Preconstruct is a tool to solve the problem of bundling and developing packages in a monorepo"
  },
  {
    title: "Manypkg",
    href: "https://github.com/Thinkmill/manypkg",
    icon: "☔️",
    desc:
      "Manypkg is an umbrella for your monorepo to help solve common problems like running scripts and enforcing rules on your monorepo"
  }
];

export const Index = () => (
  <div
    css={{
      display: "flex",
      alignItems: "center",
      flexDirection: "column"
    }}
  >
    <section
      css={{ maxWidth: 1200, display: "flex", flexWrap: "wrap", minWidth: 0 }}
    >
      {Object.values(items).map((props, i) => (
        <div
          css={{
            display: "flex",
            flexBasis: "50%",
            flexShrink: 1,
            flexGrow: 1,
            padding: 4
          }}
        >
          <Item key={i} {...props} />
        </div>
      ))}
    </section>
    <svg viewBox="0 0 10 1" css={{ transform: "translateY(4px)" }}>
      <path fill="#1D263B" d="M0 0.6L0 1 10 1 10 0z" />
    </svg>
    <section
      css={{
        backgroundColor: "rgb(29, 38, 59)",
        color: "white",
        paddingTop: 24,
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <div css={{ maxWidth: 780, minWidth: 0 }}>
        <div css={{ paddingLeft: 32, paddingRight: 32 }}>
          <H2>Tools 🧰</H2>
          <P>
            Thinkmill maintains a number of tools to make working in monorepos
            easier
          </P>
        </div>

        {tools.map((props, i) => (
          <Item key={i} mode="dark" css={{ marginBottom: 16 }} {...props} />
        ))}

        <Footer />
      </div>
    </section>
  </div>
);

export default () => {
  return (
    <>
      <section
        css={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          minWidth: 0
        }}
      >
        <div css={{ maxWidth: 800, padding: 32 }}>
          <H1 css={{ margin: 0 }}>Monorepo Style Guide 🚝</H1>

          <P>
            At Thinkmill, monorepos have proven to be a very useful model for
            organising our projects. We’ve written some articles and resources
            to help you explore this space.
          </P>
        </div>
      </section>

      <Index />
    </>
  );
};
