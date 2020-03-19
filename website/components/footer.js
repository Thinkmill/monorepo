/** @jsx jsx */
import { jsx } from "@emotion/core";

export default () => (
  <a
    href="https://thinkmill.com.au"
    title="Thinkmill"
    rel="noopener"
    target="_blank"
    css={{
      color: "white",
      textDecoration: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      ":hover span": {
        color: "#FF3838"
      }
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
        <span>
          Thinkmill
        </span>
      </span>
    </div>
  </a>
);
