/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";
import { Fragment } from "react";
import { MDXProvider } from "@mdx-js/react";
import { CodeBlock } from "../components/code-block";
import Router from "next/router";
import withGA from "next-ga";

const components = {
  code: CodeBlock,
  h1: () => null
};

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Global
        styles={{
          body: {
            overflowX: "hidden",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, Helvetica, sans-serif",
            padding: 0,
            margin: 0,
            backgroundColor: "#f8f8f8"
          },

          "pre,code": {
            fontFamily:
              "source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace"
          },
          "*": {
            boxSizing: "border-box"
          }
        }}
      />
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </Fragment>
  );
}

export default withGA("UA-159174172-1", Router)(MyApp);
