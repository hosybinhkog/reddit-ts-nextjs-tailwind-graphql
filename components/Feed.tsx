import { useQuery } from "@apollo/client";
import React from "react";
import {
  GET_ALL_POSTS,
  GET_ALL_POST_BY_TOPIC,
  GET_VOTE_LIST,
} from "../graphql/queries";
import Post from "./Post";

interface FeedProps {
  topic?: string;
}

const Feed = ({ topic }: FeedProps) => {
  const { data, error } = !topic
    ? useQuery(GET_ALL_POSTS)
    : useQuery(GET_ALL_POST_BY_TOPIC, { variables: { topic } });

  console.log(data, error);

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
