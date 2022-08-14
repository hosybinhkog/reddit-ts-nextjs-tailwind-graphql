import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_POSTS, GET_ALL_POST_BY_TOPIC } from "../graphql/queries";
import Post from "./Post";

interface FeedProps {
  topic?: string;
}

const Feed = ({ topic }: FeedProps) => {
  const { data, error: _ } = !topic
    ? useQuery(GET_ALL_POSTS)
    : useQuery(GET_ALL_POST_BY_TOPIC, { variables: { topic } });

  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic;

  return (
    <div className="mt-5 space-y-4">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
