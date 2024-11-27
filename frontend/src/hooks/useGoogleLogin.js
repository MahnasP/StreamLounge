import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login as authLogin } from "../store/authSlice";

function useGoogleLogin() {
    const [googleLoading, setGoogleLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const googleLogin =async () => {
        setGoogleLoading(true);
        try {
            const response = await axios.get("/api/auth/google");
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
    }

    return {googleLoading,googleLogin}; 
}

export default useGoogleLogin