// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Yvonne",
  tagline: "",
  url: "https://yyh28.top",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: {
          showReadingTime: true,
          readingTime: ({ content, frontMatter, defaultReadingTime }) => defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
          blogSidebarTitle: "全部博文",
          blogSidebarCount: "ALL",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        hideOnScroll: true,
        title: "",
        logo: {
          alt: "Yvonne Logo",
          src: "img/yvonne.png",
        },
        items: [
          {
            type: "doc",
            docId: "frontend/介绍",
            position: "left",
            label: "前端",
          },
          {
            type: "doc",
            docId: "backend/介绍",
            position: "left",
            label: "后端",
          },
          {
            type: "doc",
            docId: "devops/介绍",
            position: "left",
            label: "运维",
          },
          {
            type: "doc",
            docId: "others/介绍",
            position: "left",
            label: "其他",
          },
          { to: "/blog", label: "博客", position: "left" },
          {
            type: "search",
            position: "right",
          },
          {
            href: "https://github.com/yyh28",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © 2022-${new Date().getFullYear()} 闽ICP备2021014833号`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
