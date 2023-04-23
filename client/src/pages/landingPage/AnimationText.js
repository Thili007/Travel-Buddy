import "./landingPage.css";

export const AnimationText = () => {
  return (
    <div className="wrapper">
      <div className="static-txt">Hello </div>
      <ul className="dynamic-txts">
        <li>
          <span>Welcome To Travel Buddy</span>
        </li>
        <li>
          <span>Plan Trips</span>
        </li>
        <li>
          <span>Make New Friends</span>
        </li>
        <li>
          <span>Discover The World</span>
        </li>
      </ul>
    </div>
  );
};
