import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useForm } from "react-hook-form";
import registerOptions from "../utils/formValidation";
import { loginUser, registerUser } from "../config/api";
import { toast } from "react-hot-toast";
import { useStore } from "../config/store";

const Account = () => {
  const [show, setShow] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser } = useStore();
  const from = location.state?.from || "/"; //redirect user to home

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const switchMode = () => {
    setIsSignup(!isSignup);
  };

  const handleClose = () => setShow(false);

  const onSubmitHandler = async ({ username, email, password }) => {
    setLoading(true);
    try {
      if (isSignup) {
        const res = await registerUser(username, email, password);
        if (res.status === 201) {
          setCurrentUser(res.data);
          toast.success("Registration successful");
          navigate(from, { replace: true });
          handleClose();
        }
      }
      const res = await loginUser(username, password);
      if (res.status === 200) {
        setCurrentUser(res.data);
        toast.success("Login successful");
        navigate(from, { replace: true });
        handleClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BiUser
        style={{ cursor: "pointer" }}
        size="24px"
        onClick={() => setShow(!show)}
      />

      {show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative lg:w-96 my-6 mx-auto lg:max-w-5xl w-11/12">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold text-center">
                    {isSignup ? "Create Account" : "Login"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShow(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-5 flex-auto">
                  <form
                    className="flex-col align-middle lg:w-80 "
                    onSubmit={handleSubmit(onSubmitHandler)}
                  >
                    <div className="mb-3 inputRegBox">
                      <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        autoFocus
                        className="lg:w-80 w-72 inputReg mb-0 bg-transparent border-2"
                        {...register("username", registerOptions.username)}
                      />
                      {errors?.username?.message && (
                        <span className="text-red-500 text-sm">
                          {errors.username.message}
                        </span>
                      )}
                    </div>

                    {isSignup && (
                      <div className="mb-2 inputRegBox">
                        <input
                          type="email"
                          placeholder="Email"
                          id="email"
                          className="lg:w-80 w-72 mb-0 inputReg bg-transparent border-2"
                          {...register("email", registerOptions.email)}
                        />
                        {errors?.email?.message && (
                          <span className="text-red-500 text-sm">
                            {errors.email.message}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mb-2 inputRegBox relative">
                      <input
                        type={passwordShown ? "text" : "password"}
                        placeholder="password"
                        className="lg:w-80 w-72 inputReg mb-0 relative border-2"
                        id="password"
                        {...register("password", registerOptions.password)}
                      />
                      {passwordShown ? (
                        <AiOutlineEye
                          onClick={togglePassword}
                          size="24px"
                          style={{
                            cursor: "pointer",
                            // top: "50%",
                            translate: "middle",
                          }}
                          className="absolute end-1 top-3 bottom-2"
                        />
                      ) : (
                        <AiFillEyeInvisible
                          onClick={togglePassword}
                          size="24px"
                          style={{
                            cursor: "pointer",
                            // top: "50%",
                            translate: "middle",
                          }}
                          className="absolute end-1 top-3 bottom-2"
                        />
                      )}
                    </div>
                    {errors?.password?.message && (
                      <span className="text-red-600 text-sm mb-1 inputRegBox">
                        {errors.password.message}
                      </span>
                    )}

                    {isSignup ? (
                      <p
                        className="text-lg text-gray-500 px-6 py-4"
                        type="button"
                        onClick={switchMode}
                      >
                        Already have an account{" "}
                        <span
                          className="text-black text-md"
                          style={{ textDecoration: "underline" }}
                        >
                          Sign in here
                        </span>
                      </p>
                    ) : (
                      <p
                        className="text-lg text-gray-500 px-6 py-4"
                        type="button"
                        style={{ textDecoration: "underline" }}
                        onClick={switchMode}
                      >
                        Create Account
                      </p>
                    )}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShow(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-purple-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                        // onClick={() => setShow(false)}
                      >
                        {loading ? (
                          <p>loading</p>
                        ) : isSignup ? (
                          "Create"
                        ) : (
                          "Sign-in"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black">jhbc</div>
        </>
      ) : null}
    </>
  );
};

export { Account };
