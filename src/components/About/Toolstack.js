import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiVercel,
  SiMacos,
  SiWindows,
  SiRailway,
  SiDocker,
  SiHeroku,
  SiGithub,
  SiBitbucket,
  SiFigma,
  SiLinux,
  SiChakraui,
} from "react-icons/si";
import { FaGit } from "react-icons/fa";
import ReactTooltip from "react-tooltip";

const toolCategories = {
  OS: [
    { icon: <SiWindows color="#00ADEF" />, tip: "Windows" },
    { icon: <SiLinux color="#FCC624" />, tip: "Linux" },
    { icon: <SiMacos color="#fff" />, tip: "macOS" },
  ],
  Development: [
    { icon: <SiVisualstudiocode color="#007ACC" />, tip: "VS Code" },
    { icon: <FaGit color="#F05032" />, tip: "Git" },
    { icon: <SiGithub color="#fff" />, tip: "GitHub" },
    { icon: <SiBitbucket color="#205081" />, tip: "Bitbucket" },
  ],
  API: [
    { icon: <SiPostman color="#FF6C37" />, tip: "Postman" },
    { icon: <SiChakraui color="#6A1B9A" />, tip: "Thunderbolt" },
  ],
  Deployment: [
    { icon: <SiVercel color="#fff" />, tip: "Vercel" },
    { icon: <SiRailway color="#8B5CF6" />, tip: "Railway" },
    { icon: <SiHeroku color="#fff" />, tip: "Heroku" },
    { icon: <SiDocker color="#2496ED" />, tip: "Docker" },
  ],
  Design: [{ icon: <SiFigma color="#F24E1E" />, tip: "Figma" }],
};

const allTools = Object.values(toolCategories).flat();

function Toolstack() {
  const [selected, setSelected] = useState("All");
  const toolsToShow =
    selected === "All" ? allTools : toolCategories[selected] || [];

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      ReactTooltip.hide();
      ReactTooltip.show();
    });
  }, []);

  return (
    <>
      <ReactTooltip effect="solid" delayShow={100} />
      <div className="text-center mb-4">
        <Button
          variant={selected === "All" ? "dark" : "outline-dark"}
          onClick={() => setSelected("All")}
          className="mx-1"
        >
          All
        </Button>
        {Object.keys(toolCategories).map((cat) => (
          <Button
            key={cat}
            variant={selected === cat ? "dark" : "outline-dark"}
            onClick={() => setSelected(cat)}
            className="mx-1"
          >
            {cat}
          </Button>
        ))}
      </div>

      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {toolsToShow.map((tool, idx) => (
          <Col
            key={idx}
            xs={4}
            md={2}
            className="tech-icons"
            data-tip={tool.tip}
          >
            {tool.icon}
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Toolstack;
