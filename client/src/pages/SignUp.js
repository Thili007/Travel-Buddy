import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, isLoading, error } = useSignup();

  console.log(userName, email, password);
  const handelSubmit = async (e) => {
    e.preventDefault();
    await signUp(userName, email, password);
  };

  return (
    <form onSubmit={handelSubmit}>
      <h3>Sign Up</h3>
      <input
        type="text"
        placeholder="Type User Name..."
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Please Enter Your Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Please Enter Your Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={isLoading}>Sign Up</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default SignUp;
