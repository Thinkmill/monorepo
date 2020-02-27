/** @jsx jsx */
import { jsx } from "@emotion/core";
import Link from "next/link";
import { string, oneOf } from "prop-types";

import { H1, H3 } from "./text";

const scaleStyles = {
  transition: "ease-in-out transform 100ms",
  ":hover": {
    transform: "scale(1.04)",
    boxShadow: "0px 6px 24px rgba(0,0,0,0.1)"
  }
};

const Item = ({
  desc,
  icon,
  href,
  title,
  mode = "light",
  level = 2,
  className
}) => {
  const Tag = href ? "a" : "div";
  const Heading = level === 1 ? H1 : H3;
  const stuff = (
    <Tag
      href={href}
      css={{
        display: "flex",
        borderRadius: 24,
        padding: 24,
        margin: 8,
        textDecoration: "none",
        color: "inherit",
        backgroundColor: mode === "dark" ? "#171E2F" : "#ffffff",
        ...(href && scaleStyles),
        flex: 1
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

Item.propTypes = {
  desc: string,
  href: string,
  icon: string,
  title: string,
  mode: oneOf("light", "dark"),
  level: oneOf(1, 2),
  className: string
};

export default Item;
