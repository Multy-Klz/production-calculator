import React, { useState, useEffect } from "react";
import "./../App.css";

function Message(props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    const visibilityTimer = setTimeout(() => {
      props.setState(false);
    }, 4000); // 5 seconds to hide the message

    return () => {
        clearTimeout(timer);
        clearTimeout(visibilityTimer);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-1/2  mb-4 p-4 rounded ${
        props.style
      } text-white text-center ${isVisible ? "" : "animate-slideDown"}`}
    >
      <p>{props.message}</p>
    </div>
  );
}

export default Message;
