import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import yvonne from "/static/img/yvonne.png";

import styles from "./index.module.css";

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx("hero hero--primary", styles.heroBanner)}>
            <div className="container">
                <h1 className={styles["hero__title"]}>
                    <img src={yvonne} alt="" />
                </h1>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <p className="hero__subtitle">前端：js</p>
                <p className="hero__subtitle">后端：</p>
                <p className="hero__subtitle">运维：docker、git、nginx</p>
                <p className="hero__subtitle">
                    其他：信息系统项目管理师知识点总结、mermaid使用、markmap使用、docusaurus使用
                </p>
            </div>
        </header>
    );
}

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title="学习记录"
            description="Description will go into a meta tag in <head />"
        >
            <HomepageHeader />
        </Layout>
    );
}
