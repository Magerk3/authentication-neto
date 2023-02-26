import { useState, useEffect } from "react";

export const useApi = (urls) => {
    const [loginData, setLoginData] = useState({
        login: "",
        password: "",
    });
    const [profileData, setProfileData] = useState(JSON.parse(localStorage.getItem("profile-data")));
    const [feedData, setFeedData] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    function doLogin(loginData) {
        fetch("http://localhost:7070/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Invalid login credentials");
                return response.json();
            })
            .then((json) => {
                localStorage.setItem("token", json.token);
                setToken(json.token);
            })
            .catch((error) => {
                setLoginError(error);
                console.error(error);
            })
            .finally(setLoggedIn(true));
    }
    const handleChange = (e) => {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        doLogin(loginData);
        
    };

    function getProfile() {
        if (loggedIn) {
            setLoading(true);
            fetch(urls.profileUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((response) => {
                    if (!response.ok) throw new Error("Error fetching profile");
                    return response.json();
                })
                .then((json) => {
                    localStorage.setItem("profile-data", JSON.stringify(json));
                    setProfileData(json);
                })
                .catch((error) => {
                    setError(error.message);
                    console.error(error);
                })
                .finally(() => setLoading(false));
        }
    }

    function getFeed() {
        if (loggedIn) {
            setLoading(true);
            fetch(urls.feedUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((response) => {
                    if (!response.ok) throw new Error("Error fetching feed");
                    return response.json();
                })
                .then((json) => setFeedData(json))
                .catch((error) => {
                    setError(error.message);
                    console.error(error);
                })
                .finally(() => setLoading(false));
        }
    }

    function logout() {
        setFeedData({});
        setProfileData({});
        setLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("profile-data");
        setToken(null);
    }

    useEffect(() => {
        if (token) {
            if (!loggedIn) {
                setLoggedIn(true)
            }
            const storedProfileData = JSON.parse(localStorage.getItem("profile-data"))
            if(storedProfileData) {
                setProfileData(storedProfileData)
            }else {
                getProfile();
            }
            
            getFeed();
        } else {
            setProfileData({});
            setFeedData({});
        }
    }, [token, loggedIn]);

    
    return [
        loginData,
        profileData,
        feedData,
        loggedIn,
        loading,
        handleChange,
        handleSubmit,
        logout,
    ];
};
