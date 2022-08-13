import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      body
      comment {
        created_at
        post_id
        text
        id
        username
      }
      created_at
      id
      image
      subreddit {
        created_at
        id
        topic
      }
      subreddit_id
      title
      username
      votes {
        created_at
        post_id
        id
        upvote
        username
      }
    }
  }
`;

export const GET_VOTE_LIST = gql`
  query MyQuery {
    getVoteList {
      created_at
      post_id
      id
      upvote
      username
    }
  }
`;
