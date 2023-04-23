import { useState } from "react";

import BgVideo from "../../assets/TrHiking.mp4";
import "./landingPage.css";
import Login from "../Login";
import SignUp from "../SignUp";
import { AnimationText } from "./AnimationText";

const CoverBg = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  return (
    <div className="bg-video">
      <div className="bgLayer">
        <video src={BgVideo} autoPlay loop muted className="video" />
        <div className="contain background-btn">
          {loginModal || signupModal ? null : (
            <div>
              <AnimationText />
            </div>
          )}

          <button className="button-53" onClick={() => setLoginModal(true)}>
            Login
          </button>

          <button className="button-53" onClick={() => setSignupModal(true)}>
            Signup
          </button>

          {loginModal && <Login closeModal={setLoginModal} />}
          {signupModal && <SignUp closeModal={setSignupModal} />}
        </div>
      </div>
    </div>
  );
};

export default CoverBg;
