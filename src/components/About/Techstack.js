import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { DiReact, DiNodejs, DiPhp, DiJava } from "react-icons/di";
import {
  SiNextdotjs,
  SiVuedotjs,
  SiPostgresql,
  SiLaravel,
  SiDjango,
  SiSocketdotio,
  SiWebrtc,
  SiBootstrap,
  SiChakraui,
  SiJquery,
  SiHtml5,
  SiCss3,
  SiGraphql,
  SiTailwindcss,
  SiFlask,
  SiSpringboot,
  SiAngular,
  SiExpress,
  SiCplusplus,
  SiCsharp,
  SiFlutter,
  SiReact,
  SiElectron,
  SiJavascript,
  SiTypescript,
  SiDart,
  SiPython,
} from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { GrMysql } from "react-icons/gr";
import ReactTooltip from "react-tooltip";

function Techstack() {
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const techData = [
    {
      icon: <SiNextdotjs style={{ color: "#ffffff" }} />,
      label: "Next.js",
      skillLevel: "advanced",
      category: "Framework (Frontend)",
    },
    {
      icon: <DiReact style={{ color: "#61DAFB" }} />,
      label: "React.js",
      skillLevel: "advanced",
      category: "Framework (Frontend)",
    },
    {
      icon: <SiGraphql style={{ color: "#E10098" }} />,
      label: "GraphQL",
      skillLevel: "advanced",
      category: "Query Language/API",
    },
    {
      icon: <SiPostgresql style={{ color: "#336791" }} />,
      label: "PostgreSQL",
      skillLevel: "advanced",
      category: "Database",
    },
    {
      icon: <GrMysql style={{ color: "#4479A1" }} />,
      label: "MySQL",
      skillLevel: "advanced",
      category: "Database",
    },
    {
      icon: <DiNodejs style={{ color: "#8CC84B" }} />,
      label: "Node.js",
      skillLevel: "advanced",
      category: "Runtime/Environment",
    },
    {
      icon: <SiExpress style={{ color: "#ffffff" }} />,
      label: "Express.js",
      skillLevel: "advanced",
      category: "Framework (Backend)",
    },
    {
      icon: <SiTailwindcss style={{ color: "#38B2AC" }} />,
      label: "Tailwind",
      skillLevel: "advanced",
      category: "UI Framework",
    },
    {
      icon: <SiBootstrap style={{ color: "#563D7C" }} />,
      label: "Bootstrap",
      skillLevel: "medium",
      category: "UI Framework",
    },
    {
      icon: <SiVuedotjs style={{ color: "#4FC08D" }} />,
      label: "Vue.js",
      skillLevel: "medium",
      category: "Framework (Frontend)",
    },
    {
      icon: <SiHtml5 style={{ color: "#E34F26" }} />,
      label: "HTML5",
      skillLevel: "expert",
      category: "Web Standard",
    },
    {
      icon: <SiCss3 style={{ color: "#1572B6" }} />,
      label: "CSS3",
      skillLevel: "expert",
      category: "Web Standard",
    },
    {
      icon: <SiLaravel style={{ color: "#FF2D20" }} />,
      label: "Laravel",
      skillLevel: "advanced",
      category: "Framework (Backend)",
    },
    {
      icon: <SiSpringboot style={{ color: "#6DB33F" }} />,
      label: "Springboot",
      skillLevel: "medium",
      category: "Framework (Backend)",
    },
    {
      icon: <SiAngular style={{ color: "#DD0031" }} />,
      label: "Angular",
      skillLevel: "medium",
      category: "Framework (Frontend)",
    },
    {
      icon: <SiFlask style={{ color: "#ffffff" }} />,
      label: "Flask",
      skillLevel: "beginner",
      category: "Framework (Backend)",
    },
    {
      icon: <SiDjango style={{ color: "#092E20" }} />,
      label: "Django",
      skillLevel: "medium",
      category: "Framework (Backend)",
    },
    {
      icon: <DiPhp style={{ color: "#787CB5" }} />,
      label: "PHP",
      skillLevel: "advanced",
      category: "Programming Language",
    },
    {
      icon: <SiPython style={{ color: "#306998" }} />,
      label: "Python",
      skillLevel: "medium",
      category: "Programming Language",
    },
    {
      icon: <SiChakraui style={{ color: "#319795" }} />,
      label: "ChakraUI",
      skillLevel: "medium",
      category: "UI Framework",
    },
    {
      icon: <SiJquery style={{ color: "#0769AD" }} />,
      label: "Jquery",
      skillLevel: "advanced",
      category: "Library (Utility)",
    },
    {
      icon: <DiJava style={{ color: "#007396" }} />,
      label: "Java",
      skillLevel: "medium",
      category: "Programming Language",
    },
    {
      icon: <SiCplusplus style={{ color: "#00599C" }} />,
      label: "C++",
      skillLevel: "beginner",
      category: "Programming Language",
    },
    {
      icon: <SiCsharp style={{ color: "#C8C8C8" }} />,
      label: "C#",
      skillLevel: "beginner",
      category: "Programming Language",
    },
    {
      icon: <SiFlutter style={{ color: "#02569B" }} />,
      label: "Flutter",
      skillLevel: "beginner",
      category: "Framework (Frontend)",
    },
    {
      icon: <SiReact style={{ color: "#61DAFB" }} />,
      label: "React Native",
      skillLevel: "beginner",
      category: "Framework (Frontend)",
    },
    {
      icon: <SiElectron style={{ color: "#47848F" }} />,
      label: "Electron",
      skillLevel: "medium",
      category: "Framework (Desktop)",
    },
    {
      icon: <SiJavascript style={{ color: "#F7DF1E" }} />,
      label: "JavaScript",
      skillLevel: "expert",
      category: "Programming Language",
    },
    {
      icon: <SiTypescript style={{ color: "#3178C6" }} />,
      label: "TypeScript",
      skillLevel: "advanced",
      category: "Programming Language",
    },
    {
      icon: <SiDart style={{ color: "#00B4B6" }} />,
      label: "Dart",
      skillLevel: "beginner",
      category: "Programming Language",
    },
    {
      icon: <SiSocketdotio style={{ color: "#ffffff" }} />,
      label: "Socket.io",
      skillLevel: "medium",
      category: "Library (Real-Time)",
    },
    {
      icon: <SiWebrtc style={{ color: "#33B5E5" }} />,
      label: "WebRTC",
      skillLevel: "medium",
      category: "API (Real-Time)",
    },
  ];

  const skillLevels = ["All", "beginner", "medium", "advanced", "expert"];

  const categories = [
    "All",
    ...Array.from(new Set(techData.map((t) => t.category))).sort((a, b) =>
      a.localeCompare(b)
    ),
  ];

  const filteredData = techData.filter((tech) => {
    return (
      (selectedSkill === "All" || tech.skillLevel === selectedSkill) &&
      (selectedCategory === "All" || tech.category === selectedCategory)
    );
  });

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      ReactTooltip.hide();
      ReactTooltip.show();
    });
  }, []);

  return (
    <>
      <ReactTooltip effect="solid" delayShow={100} globalEventOff="click" />
      <div className="mb-4 d-flex justify-content-center gap-3 flex-wrap">
        <Form.Group>
          <Form.Label className="fw-semibold">Skill Level</Form.Label>
          <Form.Select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="modern-select"
            style={{
              appearance: "none",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem 2rem 0.5rem 1.5rem",
              backgroundColor: "rgba(241, 243, 245, 0.5)",
              color: "#495057",
              fontSize: "0.875rem",
              fontWeight: "500",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              transition: "background-color 0.2s ease",
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'><path d='M7 10l5 5 5-5z'/></svg>")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              backgroundSize: "1rem",
            }}
          >
            {skillLevels.map((level) => (
              <option key={level} value={level}>
                {level === "All"
                  ? "All Levels"
                  : level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label className="fw-semibold">Category</Form.Label>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="modern-select"
            style={{
              appearance: "none",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem 0.5rem 1.5rem",
              backgroundColor: "rgba(241, 243, 245, 0.5)",
              color: "#495057",
              fontSize: "0.875rem",
              fontWeight: "500",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              transition: "background-color 0.2s ease",
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'><path d='M7 10l5 5 5-5z'/></svg>")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              backgroundSize: "1rem",
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All"
                  ? "All Categories"
                  : cat.replace(/([A-Z])/g, "$1")}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>

      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {filteredData.map((tech, index) => (
          <Col
            key={tech.label}
            xs={4}
            md={2}
            className="tech-icons"
            data-tip={tech.label}
          >
            {tech.icon}
            <div className={`skill-scale ${tech.skillLevel}`}>
              <div className="line-with-dots">
                <span className="dot-wrapper" data-tip="Beginner">
                  <span className="dot" />
                </span>
                <span className="line" />
                <span className="dot-wrapper" data-tip="Medium">
                  <span className="dot" />
                </span>
                <span className="line" />
                <span className="dot-wrapper" data-tip="Advanced">
                  <span className="dot" />
                </span>
                <span className="line" />
                <span className="dot-wrapper" data-tip="Expert">
                  <span className="dot" />
                </span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Techstack;
