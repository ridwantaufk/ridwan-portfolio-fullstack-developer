import React, { useEffect, useState } from "react";
import { BsClockHistory, BsX } from "react-icons/bs";
import ReactTooltip from "react-tooltip";

export const FloatingBox = ({ children, setShowHeatmap }) => {
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
        data-for="close-tooltip"
        className="btn btn-lg text-dark position-absolute d-flex align-items-center border-2 rounded-0 rounded-start-1 justify-content-center top-0 px-0 py-0 end-0 mt-1 mt-md-0 me-2 fs-2"
        onClick={() => {
          localStorage.setItem("statusHeatmap", JSON.stringify(false));
          setShowHeatmap(JSON.parse(localStorage.getItem("statusHeatmap")));
        }}
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
        Close Heatmap
      </ReactTooltip>
      <h6 className="mb-2 mt-1 text-info d-flex align-items-center justify-content-center text-center">
        <BsClockHistory className="me-2 fs-5" />
        Hourly GitHub activity
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

export const FloatingBoxApp = ({ children }) => {
  const [floatingBoxAppOpen, setFloatingBoxAppOpen] = useState(() => {
    const stored = localStorage.getItem("floatingBoxApp");

    if (stored === null) {
      localStorage.setItem("floatingBoxApp", JSON.stringify(true));
      return true;
    }
    return JSON.parse(stored);
  });
  const arrowOpen = "gradient-arrow-open";
  const arrowClose = "gradient-arrow-close";

  return (
    <>
      <div
        className={`z-3 ${
          floatingBoxAppOpen
            ? "open-floating-box-app"
            : "close-floating-box-app"
        } position-fixed rounded-end-2 bg-primary top-50 start-0 bottom-0 translate-middle-y border border-primary border-4`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="position-fixed top-50 close-arrow-position translate-middle-y"
          onClick={() => {
            const updated = !floatingBoxAppOpen;
            localStorage.setItem("floatingBoxApp", JSON.stringify(updated));
            setFloatingBoxAppOpen(updated);
          }}
        >
          <defs>
            <linearGradient id={arrowOpen} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#bf36ff" />
              <stop offset="100%" stopColor="#00ffff" />
            </linearGradient>
          </defs>
          <path
            className={`${arrowOpen}`}
            d="M0 424V88c0-13.3 10.7-24 24-24h24c13.3 0 24 10.7 24 24v336c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zm280.5-66.4L214.9 292H424c13.3 0 24-10.7 24-24v-24c0-13.3-10.7-24-24-24H214.9l65.6-65.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L94.1 239c-9.4 9.4-9.4 24.6 0 33.9l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.3 9.4-24.5 0-33.8z"
          ></path>
        </svg>
        {children}
      </div>
      {!floatingBoxAppOpen && (
        <svg
          aria-hidden="true"
          data-prefix="fas"
          data-icon="arrow-alt-right"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 512"
          className="svg-inline--fa fa-arrow-to-right fa-w-14 fa-7x open-arrow-position position-fixed start-0 top-50 translate-middle-y"
          onClick={() => {
            const updated = !floatingBoxAppOpen;
            localStorage.setItem("floatingBoxApp", JSON.stringify(updated));
            setFloatingBoxAppOpen(updated);
          }}
        >
          <defs>
            <linearGradient id={arrowClose} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#bf36ff" />
              <stop offset="100%" stopColor="#00ffff" />
            </linearGradient>
          </defs>
          <path
            fill="currentColor"
            d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
            className={`${arrowClose}`}
          ></path>
        </svg>
      )}
    </>
  );
};
