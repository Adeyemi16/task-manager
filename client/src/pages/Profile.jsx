import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/fetchData";
import { useStore } from "../config/store";
import Loader from "../utils/Loader";
import { getUser, updateUser, uploadToCloudinary } from "../config/api";
import { PageLayout } from "../components";
import { Input } from "../components/ui/input";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import registerOptions from "../utils/formValidation";

export default function Profile() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [imgPic, setImgPic] = useState("");
  const [imgLink, setImgLink] = useState("");
  //   const [showPass, setShowPass] = useState(false);
  const { username } = useParams();
  const { currentUser, setCurrentUser } = useStore();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const { error, data, loading, setLoading } = useFetchData(
    getUser,
    username,
    currentUser.access_token
  );
  useEffect(() => {
    document.title = `${username} profile`;
  }, [username]);

  useEffect(() => {
    if (imgPic !== "") {
      const handleImgUpload = async () => {
        try {
          setLoading(true);
          const upload = await uploadToCloudinary(imgPic);
          const updatedProfileImg = upload.data.secure_url;
          setImgLink(updatedProfileImg);
        } catch (error) {
          console.log(error);
          toast.error("Error uploading profile image");
        } finally {
          setLoading(false);
        }
      };
      handleImgUpload();
    }
  }, [imgPic]);

  const navigate = useNavigate();

  const onSubmitHandler = async (item) => {
    const updatedProfile = {
      _id: currentUser?.user?._id,
      username: item.username,
      email: item.email,
      password: item.password,
      profileImg: imgLink,
    };
    try {
      setLoading(true);
      const res = await updateUser(updatedProfile, currentUser.access_token);
      if (res.status === 201) {
        setCurrentUser(res.data);
        toast.success("Your Profile was updated successfully");
        navigate(`/account/${res.data?.user?.username}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating your profile");
    } finally {
      setLoading(false);
    }
    };
    // onSubmitHandler()
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: currentUser?.user?.username,
      email: currentUser?.user?.email,
    },
  });

  {
    error && <p className="mt-5 fs-5">{error.message}</p>
  }
  return (
    <PageLayout>
      {loading ? (
        <Loader title="loading profile" />
      ) : (
        <form
          className="flex flex-col items-center justify-between"
          style={{ width: "100%", height: "75vh" }}
          onSubmit={onSubmitHandler}
        >
          <img
            src={data.profileImg}
            alt=""
            className="w-32 h-32"
            style={{ borderRadius: "50%" }}
          />
          <div
            className="flex flex-col gap-4"
            style={{ width: "80%", height: "100%" }}
          >
            <div>
              <p>Username</p>
              <Input
                name="username"
                id="username"
                placeholder="John Doe"
                {...register("username", registerOptions.username)}
              />
              {errors.username && (
                <p className="text-red-400">{errors.username.message}</p>
              )}
            </div>
            <div>
              <p>email</p>
              <Input
                name="email"
                id="email"
                placeholder="johndoe@gmail.com"
                {...register("email", { required: "email is required" })}
              />
              {errors.email && (
                <p className="text-red-400">{errors.email.message}</p>
              )}
            </div>
            <div className="relative" style={{ position: "relative" }}>
              <p>password</p>
              <Input
                name="password"
                type={passwordShown ? "text" : "password"}
                id="password"
                {...register("password", { required: "Password is required" })}
              />
              {passwordShown ? (
                <AiOutlineEye
                  onClick={togglePassword}
                  size="24px"
                  style={{ cursor: "pointer", top: "50%", right: "2%" }}
                  className="absolute end-0 "
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={togglePassword}
                  size="24px"
                  style={{ cursor: "pointer", top: "50%", right: "2%" }}
                  className="absolute end-0 "
                />
              )}

              {errors.password && (
                <p className="text-red-400">{errors.password.message}</p>
              )}
            </div>
            <div>
              <p>profile pic</p>
              <Input
                name="profilePic"
                id="profilePic"
                type="file"
                placeholder="Profile pic"
                {...register("profilePic", { required: "img is required" })}
                onChange={(e) => setImgPic(e.target.files[0])}
              />
            </div>
            <Button
              className="bg-gray-950 text-white"
              //   disabled={loading}
            >
              Update
            </Button>
          </div>
        </form>
      )}
    </PageLayout>
  );
}
