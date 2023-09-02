// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");
/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "Yvonne",
    tagline: ``,
    url: "https://yyh28.top",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    baseUrlIssueBanner: false,

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    remarkPlugins: [math],
                    rehypePlugins: [katex],
                    path: "docs",
                    routeBasePath: "docs",
                    include: ["**/*.md", "**/*.mdx"],
                    exclude: [
                        "**/_*.{js,jsx,ts,tsx,md,mdx}",
                        "**/_*/**",
                        "**/*.test.{js,jsx,ts,tsx}",
                        "**/__tests__/**",
                    ],
                    docLayoutComponent: "@theme/DocPage",
                    docItemComponent: "@theme/DocItem",
                    beforeDefaultRemarkPlugins: [],
                    beforeDefaultRehypePlugins: [],
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                },
                blog: {
                    showReadingTime: true,
                    readingTime: ({
                        content,
                        frontMatter,
                        defaultReadingTime,
                    }) =>
                        defaultReadingTime({
                            content,
                            options: { wordsPerMinute: 300 },
                        }),
                    blogSidebarTitle: "全部博文",
                    blogSidebarCount: "ALL",
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
                gtag: {
                    trackingID: "G-2LT0QGRDB3",
                    anonymizeIP: true,
                },
                sitemap: {
                    changefreq: "weekly",
                    priority: 0.5,
                },
            }),
        ],
    ],
    stylesheets: [
        {
            href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
            type: "text/css",
            integrity:
                "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
            crossorigin: "anonymous",
        },
    ],
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            tableOfContents: {
                minHeadingLevel: 2,
                maxHeadingLevel: 5,
            },
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
                        href: "https://github.com/yyh28/yvonne",
                        position: "right",
                        // label: "GitHub",
                        className: "header-github-link",
                        "aria-label": "GitHub repository",
                    },
                ],
            },
            footer: {
                style: "dark",
                copyright: `Copyright © 2022-${new Date().getFullYear()} <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer noopener" aria-label="Deploys by Netlify" style={color:white}>闽ICP备2021014833号-1</a> <p>转载本网站内容需标注来源</p>`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
            algolia: {
                // Algolia 提供的应用 ID
                appId: "B42DC87VTC",
                //  公开 API 密钥：提交它没有危险 Search-Only API Key
                apiKey: "a741b6c62db0cdd537d63f6ac4e48251",
                indexName: "yyh28.top",
                // 可选：见下文
                contextualSearch: true,
                // 可选：声明哪些域名需要用 window.location 型的导航而不是 history.push。 适用于 Algolia 配置会爬取多个文档站点，而我们想要用 window.location.href 在它们之间跳转时。
                // externalUrlRegex: "external\\.com|domain\\.com",
                // 可选：Algolia 搜索参数
                searchParameters: {},
                // 可选：搜索页面的路径，默认启用（可以用 `false` 禁用）
                searchPagePath: "search",
                // ……其他 Algolia 参数
            },
            metadata: [
                {
                    name: "keywords",
                    content:
                        "yvonne, 信息系统项目管理师知识点总结, mermaid使用, markmap使用, 前端面试题",
                },
            ],
            giscus: {
                repo: "yyh28/yvonne",
                repoId: "R_kgDOIMlR-Q",
                category: "Announcements",
                categoryId: "DIC_kwDOIMlR-c4CSeJx",
            },
        }),
};

module.exports = config;
