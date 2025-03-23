import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";

function validate({ email, password }) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}

function useLogin() {
  const authapi = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
  });

  const [loginLoading, setLoginLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    const validated = validate({ email, password });
    if (!validated) return;
    setLoginLoading(true);
    try {
      const response = await authapi.post("/signin", { email, password });
      const data = response.data;
      if (data.error) throw new Error(data.error);
      if (data) {
        dispatch(authLogin(data.user));
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("streamLoungeToken", data.token);
      }
      //console.log(data.user);
      document.getElementById("login_modal").close();
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  return { loginLoading, login };
}

export default useLogin;
