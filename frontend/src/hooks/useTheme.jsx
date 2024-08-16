import { useState, useEffect } from 'react';

const useTheme = () => {
    // Retrieve the saved theme from localStorage or default to 'light'
    const getSavedTheme = () => {
        return localStorage.getItem('theme') || 'forest';
    };

    // State to hold the current theme
    const [theme, setTheme] = useState(getSavedTheme());

    // Save the theme to localStorage and apply it
    const saveTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    // Apply the saved theme on initial load
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return [theme, saveTheme];
};

export default useTheme;