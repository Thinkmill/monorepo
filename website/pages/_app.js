/** @jsx jsx */
import { Global, jsx } from "@emotion/core";
import { Fragment } from "react";
import { MDXProvider } from "@mdx-js/react";
import { CodeBlock } from "../components/code-block";

let components = {
  code: CodeBlock
};

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Global
        styles={{
          body: {
            fontFamily:
              "-apple-system, BlinkMacSystemFont, Helvetica, sans-serif",
            padding: 0,
            margin: 0
          },

          "pre,code": {
            fontFamily:
              "source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace"
          }
        }}
      />
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </Fragment>
  );
}

export default MyApp;
