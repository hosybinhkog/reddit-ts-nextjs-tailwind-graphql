import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_POSTS, GET_VOTE_LIST } from "../graphql/queries";
import Post from "./Post";

const Feed = () => {
  const { data } = useQuery(GET_ALL_POSTS);

  const posts: Post[] = data?.getPostList;

  return (
    <div className="mt-5 space-y-4">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
