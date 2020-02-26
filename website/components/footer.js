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
);
