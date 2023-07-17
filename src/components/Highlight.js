import React from "react";
//#2e8555   #6d8346   #45b787
export default function Highlight({ children, color = "#61ac85" }) {
  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: "2px",
        color: "#fff",
        padding: "0.2rem",
      }}
    >
      {children}
    </span>
  );
}
