import { LoginForm } from "./LoginForm";

export const Toolbar = ({
    profileData,
    loginData,
    loggedIn,
    handleSubmit,
    handleChange,
    logout,
}) => {
    return (
        <div>
            <header>
                <h1>Neto Social</h1>
                {!loggedIn ? (
                    <LoginForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        loginData={loginData}
                    />
                ) : (
                    <div className="user-data"> 
                        <h2>{ profileData ? profileData.name : null}</h2>
                        <img src={profileData ? profileData.avatar : null} alt="avatar"></img>
                        <button onClick={logout}>logout</button>
                    </div>
                )}
            </header>
            <img
                src={require("./img/neto.png")}
                alt="Neto Social"
                style={{ width: "70%" }}
            ></img>
        </div>
    );
};
