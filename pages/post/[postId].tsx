import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Post from "../../components/Post";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { ADD_COMMENT } from "../../graphql/mutation";
import toast from "react-hot-toast";
import Avatar from "../../components/Avatar";
import ReactTimeago from "react-timeago";

type FormData = {
  comment: string;
};

const PostPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { postId } = router.query;

  const [inserComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, "getPostListByPostId"],
  });
  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: { post_id: postId },
  });

  const post: Post = data?.getPostListByPostId;

  const {
    register,
    setValue,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<FormData>();

  const onSubmitComment: SubmitHandler<FormData> = async ({ comment }) => {
    const notification = toast.loading("Posting your comment");
    try {
      await inserComment({
        variables: {
          post_id: postId,
          text: comment,
          username: session?.user?.name,
        },
      });

      setValue("comment", "");

      toast.success("Create comment successfully!!", {
        id: notification,
      });
    } catch (error) {
      console.log(error);
      toast.error("Create comment error server", {
        id: notification,
      });
    }
  };

  return (
    <div className="mx-auto max-w-5xl my-7">
      <Post post={post} />
      <div className="rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16 -mt-1">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>
        <form
          onSubmit={handleSubmit(onSubmitComment)}
          className="flex flex-col max-w-5xl space-x-2"
        >
          <textarea
            {...register("comment", { required: true })}
            disabled={!session}
            className="h-24 w-full   rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              session ? "What are your thounghts" : "Please sign in to comment"
            }
          />
          <button
            disabled={!session}
            type="submit"
            className="rounded-full bg-red-500 p-2  font-semibold text-white disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>
      </div>
      <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
        <hr className="py-2" />
        {post?.comment.map((cmt) => (
          <div
            className="flex relative items-center space-x-2 space-y-5"
            key={cmt.id}
          >
            <hr className="absolute top-10 h-16 border left-7 z-0" />
            <div className="z=50">
              <Avatar seed={cmt.username} />
            </div>
            <div className="flex flex-col">
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-600">
                  {cmt.username}
                </span>{" "}
                • <ReactTimeago date={cmt.created_at} />
              </p>
              <p>{cmt.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
