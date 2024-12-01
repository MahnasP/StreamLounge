import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useGoogleLogin as reactGoogleOauthlogin } from "@react-oauth/google";

function useGoogleLogin() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLogin = reactGoogleOauthlogin({
    onSuccess: async (googleResponse) => {
      setGoogleLoading(true);
      try {
        const googleToken = googleResponse.credential;
        const response = await axios.post("/api/auth/google", { googleToken });
        const data = response.data;
        if (data.error) throw new Error(data.error);
        if (data) {
          dispatch(authLogin(data.user));
          localStorage.setItem("userData", JSON.stringify(data.user));
          localStorage.setItem("streamLoungeToken", JSON.stringify(data.token));
        }
        document.getElementById("login_modal").close();
        navigate("/");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setGoogleLoading(false);
      }
    },

    onError: () => toast.error("google login failed"),
  });

  return { googleLoading, googleLogin };
}

export default useGoogleLogin;
