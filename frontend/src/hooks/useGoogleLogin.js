import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { jwtDecode } from "jwt-decode";

function useGoogleLogin() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthMessage = (event) => {
      // Verify origin - make sure this matches exactly
      const expectedOrigin = import.meta.env.VITE_API_URL;
      if (event.origin !== expectedOrigin) {
        console.warn(
          `Origin mismatch: Expected ${expectedOrigin}, got ${event.origin}`
        );
        return;
      }

      // Check if this is our auth message
      if (event?.data?.type === "GOOGLE_AUTH_SUCCESS" && event?.data?.token) {
        console.log("Auth success message received!");
        processGoogleToken(event.data.token, event.data.userData);
      }
    };

    // Add event listener
    // console.log("Adding message event listener");
    window.addEventListener("message", handleAuthMessage);

    // Cleanup listener
    return () => {
      //console.log("Removing message event listener");
      window.removeEventListener("message", handleAuthMessage);
    };
  }, []);

  const googleLogin = () => {
    setGoogleLoading(true);
    //window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;

    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      `${import.meta.env.VITE_API_URL}/api/auth/google`,
      "Google Login",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    const popupInterval = setInterval(() => {
      if (popup && popup.closed) {
        clearInterval(popupInterval);
        setGoogleLoading(false); // Reset loading state when popup is closed
      }
    }, 500);
  };

  const processGoogleToken = (token, userData) => {
    try {
      dispatch(authLogin(userData));
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("streamLoungeToken", token);

      document.getElementById("login_modal").close();
      navigate("/");
    } catch (error) {
      console.log("Error processing Google token: ", error.message);
      toast.error("Error processing Google login");
    } finally {
      setGoogleLoading(false);
    }
  };

  return { googleLoading, googleLogin, processGoogleToken };
}

export default useGoogleLogin;
