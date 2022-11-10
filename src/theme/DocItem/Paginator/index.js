import React from "react";
import Paginator from "@theme-original/DocItem/Paginator";
import Comment from "../../../components/comment";

export default function PaginatorWrapper(props) {
  return (
    <>
      <Paginator {...props} />
      <Comment />
    </>
  );
}
