import React, { useState } from "react";
import "./WellsHelper.css";

const WellsHelper = (props) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="WellsHelper-Wrapper"
      // When to show the WellsHelper
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div className={`WellsHelper-Tip ${props.direction || "top"}`}>
          {/* Content */}
          {props.content}
        </div>
      )}
    </div>
  );
};

export default WellsHelper;
