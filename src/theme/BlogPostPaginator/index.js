import React from "react";
import BlogPostPaginator from "@theme-original/BlogPostPaginator";
import Comment from "../../components/comment";

export default function BlogPostPaginatorWrapper(props) {
  return (
    <>
      <BlogPostPaginator {...props} />
      <Comment />
    </>
  );
}
