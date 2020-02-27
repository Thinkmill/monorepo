/** @jsx jsx */
import { jsx } from "@emotion/core";

export default () => (
  <a
    href="https://thinkmill.com.au"
    title="Thinkmill"
    css={{
      color: "white",
      textDecoration: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 64,
        marginBottom: 48,
        padding: 16,
        borderRadius: 10
      }}
    >
      <span>
        Created and maintained by{" "}
        <a
          css={{
            color: "white",
            ":hover": {
              color: "#FF3838"
            }
          }}
          href="https://thinkmill.com.au"
        >
          Thinkmill
        </a>
      </span>
    </div>
  </a>
);
