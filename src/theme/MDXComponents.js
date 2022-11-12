import React from "react";
// 导入原映射
import MDXComponents from "@theme-original/MDXComponents";
import Highlight from "@site/src/components/Highlight";
import Mermaid from "@site//src/components/Mermaid";
import Markmap from "@site//src/components/Markmap";

export default {
  // 复用默认的映射
  ...MDXComponents,
  // 把 "highlight" 标签映射到我们的 <Highlight /> 组件！
  // `Highlight` 会收到在 MDX 中被传递给 `highlight` 的所有 props
  Highlight: Highlight,
  Mermaid: Mermaid,
  Markmap: Markmap,
};
