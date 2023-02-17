import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useLogin();

  const handelSubmit = async (e) => {
    e.preventDefault();
    await login(loginName, password);
  };

  return (
    <form onSubmit={handelSubmit}>
      <h3>Login</h3>
      <input
        type="text"
        placeholder="Type Login Name..."
        onChange={(e) => setLoginName(e.target.value)}
        value={loginName}
      />
      <input
        type="password"
        placeholder="Please Enter Your Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>Login</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Login;
