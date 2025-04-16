import React, { useEffect, useState } from "react";

const FloatingBox = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsVisible(currentScrollY <= lastScrollY);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`floating-box ${isVisible ? "visible" : "hidden"}`}>
      <div
        style={{
          maxHeight: "28vh",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FloatingBox;
