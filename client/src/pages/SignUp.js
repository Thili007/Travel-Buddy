import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import LogoDark from "../assets/LogoDark.png";

const SignUp = ({ closeModal }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, isLoading, error } = useSignup();

  const handelSubmit = async (e) => {
    e.preventDefault();
    await signUp(userName, email, password);
  };

  return (
    <div className="modal">
      <form onSubmit={handelSubmit}>
        <img src={LogoDark} alt="logo-img" className="modal-logo" />
        <p className="close-modal" onClick={() => closeModal(false)}>
          x
        </p>
        <h2 className="modal-header">Create a new account</h2>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Type a Usename"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Please Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Please Enter Your Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="modal-btn" disabled={isLoading}>
            Sign Up
          </button>
        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default SignUp;
