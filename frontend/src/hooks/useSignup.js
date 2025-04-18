import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import axios from "axios";

function validate({ username, email, password, confirmPassword }) {
  if (!username || !email || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password != confirmPassword) {
    toast.error("passwords do not match!");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be atleast 6 characters");
    return false;
  }
  return true;
}

function useSignup() {
  const authapi = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
  });

  const [signuploading, setsignupLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async ({ username, email, password, confirmPassword }) => {
    const validated = validate({ username, email, password, confirmPassword });
    if (!validated) return;

    setsignupLoading(true);
    try {
      const response = await authapi.post("/signup", {
        username,
        email,
        password,
      });
      const data = response.data;
      if (data.error) throw new Error(response.data.error);
      if (data) {
        toast.success("Signup successful!");
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("streamLoungeToken", data.token);
        dispatch(authLogin(data.user));
      }
      document.getElementById("login_modal").close();
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setsignupLoading(false);
    }
  };

  return { signuploading, signup };
}

export default useSignup;
