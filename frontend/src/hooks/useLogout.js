import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { logout as authLogout } from "../store/authSlice";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function useLogout() {
    const [logoutLoading, setlogoutLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = async () => {
        setlogoutLoading(true);
        try {
            dispatch(authLogout());
            localStorage.removeItem("userData");
            navigate("/");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setlogoutLoading(false);
        }
    }

    return {logoutLoading, logout};
}

export default useLogout