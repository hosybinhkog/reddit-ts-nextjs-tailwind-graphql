import { useMutation } from "@apollo/client";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ADD_POST } from "../graphql/mutation";
import Avatar from "./Avatar";
import client from "../apollo-client";
import { GET_SUBREDDIT_BY_TOPIC } from "../graphql/queries";

interface FormData {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
}

const PostBox = () => {
  const { data: session } = useSession();
  const [addPost] = useMutation(ADD_POST);
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmitFormSearch = handleSubmit(async (formData) => {
    console.log(formData);

    try {
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      });

      const subredditExists = getSubredditListByTopic.length > 0;

      if (!subredditExists) {
      } else {
      }
    } catch (error) {}
  });

  return (
    <form
      onSubmit={onSubmitFormSearch}
      className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register("postTitle", { required: true })}
          type="text"
          placeholder={
            session ? "Create a post by entering a title " : "Sign in a post"
          }
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
        />

        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 text-gray-300 cursor-pointer ${
            imageBoxOpen && "text-blue-300"
          }`}
        />
        <LinkIcon className="h-6 text-gray-300 cursor-pointer" />
      </div>

      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register("postBody")}
              type={"text"}
              placeholder="Text (Optinal)"
            />
          </div>
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              type={"text"}
              {...register("subreddit", { required: true, minLength: 1 })}
              placeholder="i.e reactjs"
            />
          </div>

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL</p>
              <input
                type="text"
                placeholder="Options.."
                className="m-2 flex-1 bg-blue-50 p-2 outline-none "
                {...register("postImage")}
              />
            </div>
          )}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.subreddit?.type === "required" && (
                <p>- A post title is required</p>
              )}
            </div>
          )}

          {!!watch("postTitle") && (
            <button
              type="submit"
              className="rounded-full w-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
};

export default PostBox;
