/** @jsx jsx */
import { jsx } from "@emotion/core";

export const H1 = props => (
  <h1
    css={{
      fontSize: 52,
      "@media (mid-width: 800px)": {
        fontSize: 80
      }
    }}
    {...props}
  />
);

export const P = props => {
  return (
    <p
      {...props}
      css={{
        fontSize: 24
      }}
    />
  );
};

export const H2 = props => (
  <h2
    css={{
      fontSize: 48,
      "@media (mid-width: 800px)": {
        fontSize: 64
      }
    }}
    {...props}
  />
);

export const H3 = props => (
  <h2
    css={{
      fontSize: 32,
      "@media (mid-width: 800px)": {
        fontSize: 48
      }
    }}
    {...props}
  />
);
