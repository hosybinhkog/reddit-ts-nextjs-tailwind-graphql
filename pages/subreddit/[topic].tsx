import { useRouter } from "next/router";
import React from "react";
import Avatar from "../../components/Avatar";

const SubredditTopic = () => {
  const {
    query: { topic },
  } = useRouter();

  return (
    <div>
      <div>
        <div>
          <Avatar seed={topic as string} large />
        </div>
        <div>
          <h1>Welcome to the /r{topic}</h1>
        </div>
      </div>
    </div>
  );
};

export default SubredditTopic;
