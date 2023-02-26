//import { LoginForm } from "./components/LoginPage";
import { Toolbar } from "./components/Toolbar";
import { Feed } from "./components/Feed";
import "./App.css";
import { useApi } from "./hooks/useApi";

function App() {
    const [
        loginData,
        profileData,
        feedData,
        loggedIn,
        loading,
        handleChange,
        handleSubmit,
        logout
    ] = useApi({
        profileUrl: "http://localhost:7070/private/me",
        feedUrl: "http://localhost:7070/private/news",
    });

   

    return (
        <div className="App">
            <Toolbar
                profileData={profileData}
                loginData={loginData}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                loggedIn={loggedIn}
                logout={logout}
            />
            {loggedIn ? <Feed feedData={feedData} /> : <p>Log in to see your feed</p>}
            
        </div>
    );
}

export default App;
