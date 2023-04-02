import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import LogoDark from "../assets/LogoDark.png";

const Login = ({ closeModal }) => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useLogin();

  const handelSubmit = async (e) => {
    e.preventDefault();
    await login(loginName, password);
  };

  return (
    <div className="modal">
      <form onSubmit={handelSubmit}>
        <img src={LogoDark} alt="logo-img" className="modal-logo" />
        <p className="close-modal" onClick={() => closeModal(false)}>
          x
        </p>
        <h2 className="modal-header">ENTER YOUR EMAIL OR USERNAME </h2>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Enter Your Username..."
            onChange={(e) => setLoginName(e.target.value)}
            value={loginName}
          />{" "}
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder=" Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>{" "}
        <div className="form-group">
          <button className="modal-btn" disabled={isLoading}>
            Login
          </button>{" "}
        </div>
        {error && <div>{error}</div>}
        <p className="forgot-pass">
          Forgotten password? <em> click here</em>
        </p>
      </form>
    </div>
  );
};

export default Login;
