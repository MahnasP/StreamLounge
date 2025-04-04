import React, { useEffect, useState } from "react";
import useSignup from "../../hooks/useSignup";
import useLogin from "../../hooks/useLogin";
import useGoogleLogin from "../../hooks/useGoogleLogin";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signuploading, signup } = useSignup();
  const { loginLoading, login } = useLogin();
  const { googleLoading, googleLogin } = useGoogleLogin();
  const [isdisabled, setIsdisabled] = useState(false);

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) signup(formData);
    else login({ email: formData.email, password: formData.password });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setIsdisabled(loginLoading || signuploading || googleLoading);
  }, [loginLoading, signuploading, googleLoading]);

  return (
    <dialog
      id="login_modal"
      className="modal modal-bottom sm:modal-middle"
      onClose={resetForm}
    >
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-circle btn-ghost absolute right-3 top-4 text-lg"
            onClick={resetForm}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl pl-3">
          {isSignup ? "Sign Up" : "Login"}
        </h3>
        <div className="my-3 p-3">
          {isSignup && (
            <div className="mt-2">
              <label htmlFor="username" className="label p-1">
                <span className="text-base label-text">username</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input input-bordered input-accent w-full"
                placeholder="Enter your username"
                required
              />
            </div>
          )}

          <div className="mt-2">
            <label htmlFor="email" className="label p-1">
              <span className="text-base label-text">email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered input-accent w-full"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mt-2">
            <label htmlFor="password" className="label p-1">
              <span className="text-base label-text">password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter your password"
              required
            />
          </div>

          {isSignup && (
            <div className="mt-2">
              <label htmlFor="confirmPassword" className="label p-1">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <button
            className="mt-6 w-full btn btn-primary"
            disabled={isdisabled}
            onClick={handleSubmit}
          >
            {" "}
            {isdisabled ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : isSignup ? (
              "Sign Up"
            ) : (
              "Login"
            )}
          </button>

          <div className="mt-4 text-center">
            <button
              className="text-sky-400 hover:underline"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </button>
          </div>

          <div className="divider">OR</div>

          <button
            className="btn w-full"
            disabled={isdisabled}
            onClick={googleLogin}
          >
            {isdisabled ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <>
                <img className="w-8" src="/google_icon.svg" />
                Continue with Google
              </>
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Login;
