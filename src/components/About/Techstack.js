import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiReact, DiNodejs, DiPhp } from "react-icons/di";
import {
  SiNextdotjs,
  SiVuedotjs,
  SiPostgresql,
  SiLaravel,
  SiDjango,
  SiGithub,
  SiBitbucket,
  SiSocketdotio,
  SiWebrtc,
  SiBootstrap,
  SiChakraui,
  SiJquery,
  SiHtml5,
  SiCss3,
} from "react-icons/si";
import { FaPython, FaDocker, FaGit, FaAws } from "react-icons/fa";
import { GrMysql } from "react-icons/gr";
import ReactTooltip from "react-tooltip"; // Import react-tooltip

function Techstack() {
  return (
    <>
      {/* Tooltip Component */}
      <ReactTooltip effect="solid" delayShow={100} /> {/* Delay 100ms */}
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {/* React.js */}
        <Col xs={4} md={2} className="tech-icons" data-tip="React.js">
          <DiReact />
        </Col>
        {/* Node.js */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Node.js">
          <DiNodejs />
        </Col>
        {/* Next.js */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Next.js">
          <SiNextdotjs />
        </Col>
        {/* Vue.js */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Vue.js">
          <SiVuedotjs />
        </Col>
        {/* PostgreSQL */}
        <Col xs={4} md={2} className="tech-icons" data-tip="PostgreSQL">
          <SiPostgresql />
        </Col>
        {/* PHP */}
        <Col xs={4} md={2} className="tech-icons" data-tip="PHP">
          <DiPhp />
        </Col>
        {/* Laravel */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Laravel">
          <SiLaravel />
        </Col>
        {/* Django */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Django">
          <SiDjango />
        </Col>
        {/* ChakraUI */}
        <Col xs={4} md={2} className="tech-icons" data-tip="ChakraUI">
          <SiChakraui />
        </Col>
        {/* Bootstrap */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Bootstrap">
          <SiBootstrap />
        </Col>
        {/* HTML5 */}
        <Col xs={4} md={2} className="tech-icons" data-tip="HTML5">
          <SiHtml5 />
        </Col>
        {/* CSS3 */}
        <Col xs={4} md={2} className="tech-icons" data-tip="CSS3">
          <SiCss3 />
        </Col>
        {/* Jquery */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Jquery">
          <SiJquery />
        </Col>
        {/* Python */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Python">
          <FaPython />
        </Col>
        {/* Machine Learning */}
        <Col
          xs={4}
          md={2}
          className="tech-icons"
          data-tip="Machine Learning (AWS)"
        >
          <FaAws />
        </Col>
        {/* Git */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Git">
          <FaGit />
        </Col>
        {/* GitHub */}
        <Col xs={4} md={2} className="tech-icons" data-tip="GitHub">
          <SiGithub />
        </Col>
        {/* Bitbucket */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Bitbucket">
          <SiBitbucket />
        </Col>
        {/* Socket.IO */}
        <Col xs={4} md={2} className="tech-icons" data-tip="Socket.IO">
          <SiSocketdotio />
        </Col>
        {/* WebRTC */}
        <Col xs={4} md={2} className="tech-icons" data-tip="WebRTC">
          <SiWebrtc />
        </Col>
        {/* MySQL */}
        <Col xs={4} md={2} className="tech-icons" data-tip="MySQL">
          <GrMysql />
        </Col>
      </Row>
    </>
  );
}

export default Techstack;
