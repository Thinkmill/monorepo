/** @jsx jsx */
import { jsx, Global } from "@emotion/core";

let H1 = props => (
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

let H2 = props => (
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

let scaleStyles = {
  transition: "ease-in-out transform 100ms",
  ":hover": {
    transform: "scale(1.04)"
  }
};

let Item = ({
  children,
  icon,
  href,
  title,
  mode = "dark",
  level = 2,
  className
}) => {
  let Tag = href ? "a" : "div";
  let Heading = level === 1 ? H1 : H2;
  return (
    <Tag
      href={href}
      css={{
        display: "block",
        borderRadius: 10,
        padding: 16,
        textDecoration: "none",
        color: "inherit",
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
            fontSize: 80,
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
          {children}
        </div>
      </div>
    </Tag>
  );
};

let articleItemStyles = {
  flexBasis: "50%",
  minWidth: 400,
  flexShrink: 1,
  flexGrow: 1
};

export default function Index() {
  return (
    <div
      css={{
        p: {
          fontSize: 24
        },
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <section css={{ maxWidth: 800 }}>
        <Item level={1} title="Monorepo Style Guide" icon="🚝">
          <p>
            Thinkmill has been finding monorepos a very useful model for
            organising our projects so we've written some articles and resources
            to help others explore this space and learn from others doing
            similar things.
          </p>
        </Item>
      </section>
      <section css={{ maxWidth: 1200, display: "flex", flexWrap: "wrap" }}>
        <Item
          css={articleItemStyles}
          title="Getting Started"
          href="https://github.com/Thinkmill/monorepo"
          icon="🚀"
        >
          <p>
            Thinkmill has compiled all of our knowledge about monorepos into a
            style guide to share how we build monorepos.
          </p>
        </Item>
        <Item
          css={articleItemStyles}
          title="Why Monorepos?"
          href="https://github.com/Thinkmill/monorepo"
          icon="🔍"
        >
          <p>
            Wondering why you should use a monorepo? Read this to learn why you
            might want to use a monorepo.
          </p>
        </Item>
        <Item
          css={articleItemStyles}
          title="Thinking in monorepos"
          href="https://github.com/Thinkmill/monorepo"
          icon="🤔"
        >
          <p>
            Are you often wondering how you should do a particular thing in a
            monorepo should often? This should answer these questions
          </p>
        </Item>
        <Item
          css={articleItemStyles}
          title="Starter"
          href="https://github.com/Thinkmill/monorepo-starter"
          icon="🧳"
        >
          <p>
            Want to get started in a monorepo right away? Try our starter repo!
          </p>
        </Item>
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
        <div css={{ maxWidth: 780 }}>
          <Item level={1} title="Tools" icon="🧰">
            <p>
              Thinkmill maintains a number of tools to make working in monorepos
              easier
            </p>
          </Item>
          <Item
            title="Changesets"
            href="https://github.com/changesets/changesets"
            icon="🦋"
          >
            <p>
              Changesets is a tool to help versioning monorepos by letting
              contributors declare their changes and automate releases
            </p>
          </Item>
          <Item
            title="Preconstruct"
            href="https://preconstruct.tools"
            icon="🎁"
          >
            <p>
              Preconstruct is a tool to solve the problem of bundling and
              developing packages in a monorepo
            </p>
          </Item>
          <Item
            title="Manypkg"
            href="https://github.com/Thinkmill/manypkg"
            icon="☔️"
          >
            <p>
              Manypkg is an umbrella for your monorepo to help solve common
              problems like running scripts and enforcing rules on your monorepo
            </p>
          </Item>

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
                borderRadius: 10,
                ...scaleStyles
              }}
            >
              <span css={{ paddingRight: 8 }}>Make with ❤️ by </span>
              <svg
                width="2.75rem"
                height="2.75rem"
                viewBox="0 0 300 300"
                style={{
                  width: "2.75rem",
                  height: "2.75rem",
                  display: "inline"
                }}
                title="Thinkmill"
              >
                <path
                  d="M149.801 300C67.068 300 0 232.843 0 150S67.068 0 149.801 0c82.733 0 149.801 67.157 149.801 150s-67.068 150-149.8 150zm0-20.735c71.296 0 129.093-57.874 129.093-129.265 0-71.39-57.797-129.265-129.093-129.265C78.505 20.735 20.708 78.61 20.708 150c0 71.39 57.797 129.265 129.093 129.265zm-38.43-100.172c1.65 0 3.426-.254 4.441-.635v11.308c-2.157.635-5.456 1.143-8.12 1.143-13.578 0-19.542-5.717-19.542-19.82v-34.434H77.364v-11.054H88.15v-16.136h14.466V125.6h12.562v11.054h-12.562v32.273c0 7.243 2.41 10.165 8.755 10.165zm88.823-55.017c13.704 0 22.08 8.895 22.08 26.302v39.77h-14.466v-38.373c0-11.435-4.442-16.01-11.674-16.01-8.502 0-13.578 7.243-13.578 19.568v34.814h-14.465v-39.896c0-9.149-4.06-14.485-11.547-14.485-8.629 0-13.577 7.37-13.577 19.821v34.56H128.5v-64.546h13.831v7.75h.254c4.568-6.225 10.278-9.275 17.892-9.275 8.882 0 15.734 4.066 19.033 11.69 4.695-7.37 10.913-11.69 20.683-11.69z"
                  fill="white"
                  stroke="none"
                  strokeWidth={1}
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
