import { PageLayout } from "../components";
import { AiOutlineLeft } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { createTask } from "../config/api";
import { useStore } from "../config/store";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Loader from "../utils/Loader";

export default function NewTask() {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "new task";
  });

  const onSubmitHandler = async (data) => {
    try {
      setloading(true);
      const newTask = {
        title: data.title,
        description: data.description,
        tag: data.tag,
        user: currentUser?.user?._id,
      };
      const res = await createTask(newTask, currentUser.access_token);
      if (res.status === 201) {
        toast.success("Task created successfully");
        reset(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("there was a problem");
      setError(error);
    } finally {
      setloading(false);
      navigate("/tasks")
    }
  };

  {
    error && <p className="mt-5 fs-5">{error.message}</p>;
  }
  return (
    <PageLayout style={{ position: "relative" }}>
      {loading ? (
        <Loader title={"Creating task"}/>
      ) : (
        <form
          className="flex flex-col justify-between"
          style={{ height: "70vh", width: "100%" }}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div
            id="navigation"
            className="flex justify-start align-middle text-3xl font-medium"
            style={{ alignItems: "center", gap: "0.6rem" }}
          >
            <NavLink to={"/"}>
              <AiOutlineLeft size={"35px"} />
            </NavLink>

            <p className="">New Task</p>
          </div>
          <div>
            <Input
              name="title"
              id="title"
              placeholder="E.g Project Defense Assignments"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-400">{errors.title.message}</p>
            )}
          </div>
          <div style={{ height: "47%", marginBottom: "10px" }}>
            <Textarea
              name="description"
              id="description"
              style={{ width: "100%", height: "100%" }}
              placeholder="Briefly describe your tasks..."
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-400">{errors.description.message}</p>
            )}
          </div>
          <div className="flex justify-between" style={{ width: "100%" }}>
            <div>
              <select
                name="category"
                id="category"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("tag", {
                  required: "Select a tag",
                })}
                style={{ cursor: "pointer" }}
              >
                <option value="Urgent">Urgent</option>
                <option value="Important">Important</option>
              </select>
              {errors.tag && (
                <p className="text-danger fs-6">{errors.tag.message}</p>
              )}
            </div>

            <Button
              className="bg-purple-700 text-white hover:bg-primary/90 text-lg"
              type="submit"
            >
              Done
            </Button>
          </div>
        </form>
      )}
    </PageLayout>
  );
}
