

export const LoginForm = ({handleChange, handleSubmit, loginData}) => {
    
    
    return (
       
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="login"
                        placeholder="Username"
                        value={loginData.login}
                        onChange={handleChange}
                    ></input>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={handleChange}
                    ></input>
                    <button type="submit">Login</button>
                </form>
                
           
    );
};
