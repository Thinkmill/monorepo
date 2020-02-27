/** @jsx jsx */
import { jsx } from "@emotion/core";
import Link from "next/link";

import { H1, H2, H3, P } from "./text";

let scaleStyles = {
  transition: "ease-in-out transform 100ms",
  ":hover": {
    transform: "scale(1.04)",
    boxShadow: "0px 6px 24px rgba(0,0,0,0.1)"
  }
};

let Item = ({
  desc,
  icon,
  href,
  title,
  mode = "light",
  level = 2,
  className
}) => {
  let Tag = href ? "a" : "div";
  let Heading = level === 1 ? H1 : H3;
  let stuff = (
    <Tag
      href={href}
      css={{
        display: "block",
        borderRadius: 24,
        padding: 24,
        margin: 8,
        textDecoration: "none",
        color: "inherit",
        backgroundColor: mode === "dark" ? "#171E2F" : "#ffffff",
        ...(href && scaleStyles)
      }}
      className={className}
    >
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr"
        }}
      >
        <Heading
          css={{
            "@media (min-width: 800px)": {
              gridColumnEnd: "span 2"
            }
          }}
        >
          {title}
        </Heading>
        <div
          css={{
            fontSize: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "@media (min-width: 800px)": {
              fontSize: 128,
              gridColumnStart: "2",
              gridRowStart: "2"
            }
          }}
        >
          {icon}
        </div>
        <div
          css={{
            gridColumnEnd: "span 2",
            "@media (min-width: 800px)": {
              gridRowStart: "2",
              gridColumnEnd: "span 1"
            }
          }}
        >
          <P css={{ margin: 0 }}>{desc}</P>
        </div>
      </div>
    </Tag>
  );
  if (!href || href.startsWith("http")) {
    return stuff;
  }
  return (
    <Link href={href} passHref>
      {stuff}
    </Link>
  );
};

export default Item;
