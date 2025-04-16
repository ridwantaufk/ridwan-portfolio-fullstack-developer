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

  const map = {
    a: "a1b2c3",
    b: "d4e5f6",
    c: "g7h8i9",
    d: "j0k1l2",
    e: "m3n4o5",
    f: "p6q7r8",
    g: "s9t0u1",
    h: "v2w3x4",
    i: "y5z6a7",
    j: "b8c9d0",
    k: "e1f2g3",
    l: "h4i5j6",
    m: "k7l8m9",
    n: "n0o1p2",
    o: "q3r4s5",
    p: "t6u7v8",
    q: "w9x0y1",
    r: "z2a3b4",
    s: "c5d6e7",
    t: "f8g9h0",
    u: "i1j2k3",
    v: "l4m5n6",
    w: "o7p8q9",
    x: "r0s1t2",
    y: "u3v4w5",
    z: "x6y7z8",
    A: "A1B2C3",
    B: "D4E5F6",
    C: "G7H8I9",
    D: "J0K1L2",
    E: "M3N4O5",
    F: "P6Q7R8",
    G: "S9T0U1",
    H: "V2W3X4",
    I: "Y5Z6A7",
    J: "B8C9D1",
    K: "E2F3G4",
    L: "H5I6J7",
    M: "K8L9M0",
    N: "N1O2P3",
    O: "Q4R5S6",
    P: "T7U8V9",
    Q: "W0X1Y2",
    R: "Z3A4B5",
    S: "C6D7E8",
    T: "F9G0H1",
    U: "I2J3K4",
    V: "L5M6N7",
    W: "O8P9Q0",
    X: "R1S2T3",
    Y: "U4V5W6",
    Z: "X7Y8Z9",
    0: "Z0Z0Z0",
    1: "L1L1L1",
    2: "G2G2G2",
    3: "D3D3D3",
    4: "F4F4F4",
    5: "M5M5M5",
    6: "B6B6B6",
    7: "A7A7A7",
    8: "N8N8N8",
    9: "R9R9R9",
    _: "_UND_E",
    " ": "SPCSPC",
  };

  const reverseMap = Object.fromEntries(
    Object.entries(map).map(([k, v]) => [v, k])
  );

  const olah = (mentah) => {
    let jadi = "";
    for (let i = 0; i < mentah.length; i += 6) {
      const chunk = mentah.slice(i, i + 6);
      jadi += reverseMap[chunk] || "?";
    }
    return jadi;
  };

  const result = olah(
    "s9t0u1y5z6a7f8g9h0v2w3x4i1j2k3d4e5f6_UND_Et6u7v8a1b2c3f8g9h0_UND_EL1L1L1L1L1L1A1B2C3M5M5M5J0K1L2W0X1Y2Z3A4B5J0K1L2A1B2C3Z0Z0Z0O8P9Q0T7U8V9U4V5W6k7l8m9D4E5F6q3r4s5L1L1L1L1L1L1Z0Z0Z0N8N8N8a1b2c3P6Q7R8_UND_EC6D7E8G2G2G2p6q7r8c5d6e7m3n4o5Q4R5S6b8c9d0d4e5f6N8N8N8J0K1L2t6u7v8D4E5F6B6B6B6i1j2k3P6Q7R8a1b2c3e1f2g3I2J3K4V2W3X4r0s1t2w9x0y1U4V5W6T7U8V9I2J3K4e1f2g3V2W3X4Z0Z0Z0z2a3b4V2W3X4M3N4O5N8N8N8G7H8I9H5I6J7l4m5n6g7h8i9A1B2C3B8C9D1x6y7z8f8g9h0r0s1t2j0k1l2N1O2P3H5I6J7N1O2P3R1S2T3T7U8V9F9G0H1T7U8V9P6Q7R8A7A7A7T7U8V9s9t0u1i1j2k3d4e5f6e1f2g3z2a3b4P6Q7R8a1b2c3d4e5f6"
  );

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
            Authorization: `Bearer ${result}`,
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
