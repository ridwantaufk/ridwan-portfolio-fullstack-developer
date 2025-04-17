import React, { useEffect, useState } from "react";
import { BsClockHistory, BsX } from "react-icons/bs";
import ReactTooltip from "react-tooltip";

const FloatingBox = ({ children, setShowHeatmap }) => {
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
      <button
        data-tip
        data-for="close-tooltip" // Menghubungkan dengan ID tooltip
        className="btn btn-lg text-dark position-absolute d-flex align-items-center border-2 rounded-0 rounded-start-1 justify-content-center top-0 px-0 py-0 end-0 mt-1 mt-md-0 me-2 fs-2"
        onClick={() => setShowHeatmap(false)}
        style={{ zIndex: 1000 }}
      >
        <BsX />
      </button>

      {/* Tooltip */}
      <ReactTooltip
        id="close-tooltip"
        effect="solid"
        delayShow={100}
        globalEventOff="click"
        place="left"
      >
        Tutup heatmap
      </ReactTooltip>
      <h6 className="mb-2 mt-1 text-info d-flex align-items-center justify-content-center text-center">
        <BsClockHistory className="me-2 fs-5" />
        Aktivitas GitHub/jam
      </h6>
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
