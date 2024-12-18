import React from "react";
import { Col, Row } from "react-bootstrap";
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
} from "react-icons/si";
import { FaGit } from "react-icons/fa";
import ReactTooltip from "react-tooltip"; // Import react-tooltip

function Toolstack() {
  return (
    <>
      {/* Tooltip Component */}
      <ReactTooltip effect="solid" delayShow={100} /> {/* Delay hanya 100ms */}
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {/* Operating Systems */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Windows">
          <SiWindows />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-tip="Linux">
          <SiLinux />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-tip="macOS">
          <SiMacos />
        </Col>
        {/* Development Tools */}
        <Col xs={4} md={2} className="tech-icons" data-tip="VS Code">
          <SiVisualstudiocode />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-tip="Git">
          <FaGit />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-tip="GitHub">
          <SiGithub />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-tip="Bitbucket">
          <SiBitbucket />
        </Col>
        {/* API Testing */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Postman">
          <SiPostman />
        </Col>
        {/* Deployment Platforms */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Vercel">
          <SiVercel />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-tip="Railway">
          <SiRailway />
        </Col>
        <Col xs={4} md={2} className="tech-icons" data-tip="Heroku">
          <SiHeroku />
        </Col>
        {/* Containerization */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Docker">
          <SiDocker />
        </Col>
        {/* Design Tools */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Figma">
          <SiFigma />
        </Col>
      </Row>
    </>
  );
}

export default Toolstack;
