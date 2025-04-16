import React, { useEffect, useRef, useState } from "react";
import HourlyHeatmap from "./HourlyHeatmap";
import FloatingBox from "../FloatingBox";
import { AiOutlineEye } from "react-icons/ai";

const GithubActivityGraphQL = () => {
  const [data, setData] = useState({});
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [hasMoved, setHasMoved] = useState(false);
  const [cursorStyle, setCursorStyle] = useState("grab");
  const holdTimer = useRef(null);
  const superHoldTimer = useRef(null);

  const margin = 20;
  const buttonSize = 50;

  const getDefaultPosition = () => {
    if (typeof window === "undefined") return { x: 0, y: 0 };

    const saved = localStorage.getItem("floating-button-position");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === "number" && typeof parsed.y === "number") {
          return parsed;
        }
      } catch (err) {
        console.error("Gagal parse posisi dari localStorage:", err);
      }
    }

    // fallback: pojok kanan bawah
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return {
      x: screenWidth - buttonSize - margin,
      y: screenHeight - buttonSize - margin,
    };
  };

  const [buttonPosition, setButtonPosition] = useState(() =>
    getDefaultPosition()
  );

  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "floating-button-position",
      JSON.stringify(buttonPosition)
    );
  }, [buttonPosition]);

  const token =
    "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";

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        {
          user(login: "ridwantaufk") {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        });

        const json = await response.json();
        const weeks =
          json.data.user.contributionsCollection.contributionCalendar.weeks;
        const days = weeks.flatMap((week) => week.contributionDays);

        const hourlyMap = {};
        days.forEach((d) => {
          const { date, contributionCount } = d;
          if (contributionCount === 0) return;

          hourlyMap[date] = {};
          let remaining = contributionCount;
          for (let i = 0; i < 24 && remaining > 0; i++) {
            const fake = Math.floor(Math.random() * Math.min(remaining + 1, 3));
            if (fake > 0) {
              hourlyMap[date][i] = fake;
              remaining -= fake;
            }
          }
        });

        setData(hourlyMap);
      } catch (err) {
        console.error("❌ Error fetching GitHub data:", err);
      }
    };

    fetchData();
  }, []);

  const offset = useRef({ x: 0, y: 0 });
  const startPoint = useRef({ x: 0, y: 0 });

  const onDrag = (e) => {
    const dx = Math.abs(e.clientX - startPoint.current.x);
    const dy = Math.abs(e.clientY - startPoint.current.y);

    if (dx > 3 || dy > 3) {
      setHasMoved(true);
      const newX = e.clientX - offset.current.x;
      const newY = e.clientY - offset.current.y;
      setButtonPosition({ x: newX, y: newY });
    }
  };

  const stopDrag = (e) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const halfScreen = screenWidth / 2;
    const releasedX = e.clientX;
    const releasedY = e.clientY;

    const finalX =
      releasedX >= halfScreen ? screenWidth - buttonSize - margin : margin;
    const minY = margin;
    const maxY = screenHeight - buttonSize - margin;
    const finalY = Math.min(Math.max(releasedY, minY), maxY);

    setButtonPosition({ x: finalX, y: finalY });
    setDragging(false);
    setCursorStyle("grab");

    // Save posisi ke localStorage
    localStorage.setItem(
      "floating-button-position",
      JSON.stringify({ x: finalX, y: finalY })
    );

    clearTimeout(holdTimer.current);
    clearTimeout(superHoldTimer.current);

    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
  };

  const startDrag = (e) => {
    setDragging(true);
    setCursorStyle("grab");
    setHasMoved(false);

    startPoint.current = { x: e.clientX, y: e.clientY };
    offset.current = {
      x: e.clientX - buttonPosition.x,
      y: e.clientY - buttonPosition.y,
    };

    holdTimer.current = setTimeout(() => {
      setCursorStyle("grabbing");

      superHoldTimer.current = setTimeout(() => {
        setCursorStyle("superGrabbing");
      }, 100);
    }, 100);

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  const handleClick = () => {
    if (!hasMoved) {
      setShowHeatmap(true);
    }
  };

  return (
    <>
      {showHeatmap && (
        <FloatingBox>
          <div>
            <HourlyHeatmap data={data} setShowHeatmap={setShowHeatmap} />
          </div>
        </FloatingBox>
      )}
      {!showHeatmap && (
        <button
          onClick={handleClick}
          onMouseDown={startDrag}
          onMouseUp={stopDrag} // penting juga buat reset timer
          style={{
            position: "fixed",
            zIndex: 9999,
            left: `${buttonPosition.x}px`,
            top: `${buttonPosition.y}px`,
            width: "60px",
            height: "60px",
            background: "linear-gradient(145deg, #2a80b9, #34b3f1)",
            color: "#fff",
            fontSize: "26px",
            borderRadius: "50%",
            border: "none",
            cursor: cursorStyle === "superGrabbing" ? "grabbing" : cursorStyle,
            boxShadow:
              dragging || cursorStyle === "superGrabbing"
                ? "inset -4px -4px 10px rgba(255,255,255,0.3), inset 4px 4px 10px rgba(0,0,0,0.3)"
                : "6px 6px 15px rgba(0,0,0,0.4), -6px -6px 15px rgba(255,255,255,0.1)",
            userSelect: "none",
            transition:
              !dragging && hasMoved
                ? "top 0.3s ease-out, left 0.3s ease-out, box-shadow 0.2s ease"
                : "box-shadow 0.2s ease",
            transform:
              cursorStyle === "grabbing" || cursorStyle === "superGrabbing"
                ? "scale(0.96)"
                : "scale(1)",
            backdropFilter: "blur(4px)",
          }}
        >
          <AiOutlineEye />
        </button>
      )}
    </>
  );
};

export default GithubActivityGraphQL;
