import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiReact, DiNodejs, DiPhp } from "react-icons/di";
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
  SiAngularjs,
  SiAngular,
  SiExpress,
} from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { GrMysql } from "react-icons/gr";
import ReactTooltip from "react-tooltip";

function Techstack() {
  // Data untuk setiap teknologi
  const techData = [
    { icon: <SiNextdotjs />, label: "Next.js", skillLevel: "advanced" },
    { icon: <DiReact />, label: "React.js", skillLevel: "medium" },
    { icon: <SiGraphql />, label: "GraphQL", skillLevel: "medium" },
    { icon: <DiNodejs />, label: "Node.js", skillLevel: "medium" },
    { icon: <SiExpress />, label: "Express.js", skillLevel: "medium" },
    { icon: <SiVuedotjs />, label: "Vue.js", skillLevel: "medium" },
    { icon: <SiPostgresql />, label: "PostgreSQL", skillLevel: "medium" },
    { icon: <SiTailwindcss />, label: "Tailwind", skillLevel: "medium" },
    { icon: <SiSpringboot />, label: "Springboot", skillLevel: "medium" },
    { icon: <SiFlask />, label: "Flask", skillLevel: "medium" },
    { icon: <SiAngular />, label: "Angular", skillLevel: "medium" },
    { icon: <DiPhp />, label: "PHP", skillLevel: "medium" },
    { icon: <SiLaravel />, label: "Laravel", skillLevel: "medium" },
    { icon: <SiDjango />, label: "Django", skillLevel: "medium" },
    { icon: <SiChakraui />, label: "ChakraUI", skillLevel: "medium" },
    { icon: <SiBootstrap />, label: "Bootstrap", skillLevel: "medium" },
    { icon: <SiHtml5 />, label: "HTML5", skillLevel: "medium" },
    { icon: <SiCss3 />, label: "CSS3", skillLevel: "medium" },
    { icon: <SiJquery />, label: "Jquery", skillLevel: "medium" },
    { icon: <FaPython />, label: "Python", skillLevel: "medium" },
    { icon: <GrMysql />, label: "MySQL", skillLevel: "medium" },
  ];

  return (
    <>
      {/* Tooltip Component */}
      <ReactTooltip effect="solid" delayShow={100} /> {/* Delay 100ms */}
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {techData.map((tech, index) => (
          <Col
            key={index}
            xs={4}
            md={2}
            className="tech-icons"
            data-tip={tech.label}
          >
            {tech.icon}
            <div className={`skill-scale ${tech.skillLevel}`}>
              <div className="line-with-dots">
                <span className="dot-wrapper" data-tip="Pemula">
                  <span className="dot"></span>
                </span>
                <span className="line"></span>
                <span className="dot-wrapper" data-tip="Medium">
                  <span className="dot"></span>
                </span>
                <span className="line"></span>
                <span className="dot-wrapper" data-tip="Berpengalaman">
                  <span className="dot"></span>
                </span>
                <span className="line"></span>
                <span className="dot-wrapper" data-tip="Sangat Mahir">
                  <span className="dot"></span>
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
