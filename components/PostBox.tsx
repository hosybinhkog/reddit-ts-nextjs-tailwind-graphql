import { useMutation } from "@apollo/client";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ADD_POST, ADD_SUBREDDIT } from "../graphql/mutation";
import Avatar from "./Avatar";
import client from "../apollo-client";
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from "../graphql/queries";
import toast from "react-hot-toast";

interface FormData {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
}

const PostBox = () => {
  const { data: session } = useSession();
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, "getPostList"],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);
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
    const notification = toast.loading("Creating new post...");
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
        console.log("Create new subreddit");
        const image = formData.postImage || "";

        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            image,
            subreddit_id: newSubreddit.id,
            body: formData.postBody,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log("NEWPOST :====: ", { newPost });
      } else {
        console.log("SUBREDDIT EXISTING.... ");
        console.log(getSubredditListByTopic);

        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            image,
            body: formData.postBody,
            title: formData.postTitle,
            username: session?.user?.name,
            subreddit_id: getSubredditListByTopic[0].id,
          },
        });

        console.log("create new post subreddit is exsist " + { newPost });
      }

      setValue("postBody", "");
      setValue("postImage", "");
      setValue("postTitle", "");
      setValue("subreddit", "");

      toast.success("Create a new post successfully...!", {
        id: notification,
      });
    } catch (error) {
      console.log("Error to addpost " + error);
      toast.error("Error to create new post...", {
        id: notification,
      });
    }
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
