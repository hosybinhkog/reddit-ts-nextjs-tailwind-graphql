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

export const GET_ALL_POST_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      body
      comment {
        created_at
        id
        post_id
        text
        username
      }
      created_at
      id
      image
      subreddit {
        id
        created_at
        topic
      }
      subreddit_id
      title
      username
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

export const GET_POST_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getPostListByPostId(post_id: $post_id) {
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

export const GET_ALL_VOTES_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      created_at
      post_id
      id
      upvote
      username
    }
  }
`;

export const GET_SUBREDDITS_WITH_LIMIT = gql`
  query MyQuery($limit: Int!) {
    getSubredditListLimit(limit: $limit) {
      created_at
      id
      topic
    }
  }
`;
