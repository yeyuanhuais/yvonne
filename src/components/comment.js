import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Giscus, { GiscusProps } from "@giscus/react";
import { useThemeConfig, useColorMode, ThemeConfig } from "@docusaurus/theme-common";

export const Comment = () => {
  const { giscus } = useThemeConfig();
  const { colorMode, setColorMode } = useColorMode();
  const { theme = "light", darkTheme = "dark_dimmed" } = giscus;
  const giscusTheme = colorMode === "dark" ? darkTheme : theme;

  return (
    <BrowserOnly fallback={<div>Loading Comments...</div>}>
      {() => (
        <div style={{ paddingTop: 50 }}>
          <Giscus
            id="comments"
            mapping="title"
            strict="1"
            term="Welcome to @giscus/react component!"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            lang="zh-CN"
            loading="lazy"
            {...giscus}
            theme={giscusTheme}
          />
        </div>
      )}
    </BrowserOnly>
  );
};

export default Comment;
