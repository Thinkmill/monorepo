import Highlight, { defaultProps } from "prism-react-renderer";
import { theme } from "./prism-theme";

export const CodeBlock = ({ children, className, ...props }) => {
  const language = className ? className.replace(/language-/, "") : undefined;
  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            borderRadius: 8,
            padding: 10,
            maxWidth: "100%",
            overflow: "auto"
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
