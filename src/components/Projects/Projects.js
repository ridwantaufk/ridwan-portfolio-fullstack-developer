import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import { projectData as initialProjectData } from "./ProjectData";
import AddProjectModal from "./AddProjectModal";
import DeployStatus from "./DeployStatus";

function Projects() {
  const [showModal, setShowModal] = useState(false);
  const [projectData, setProjectData] = useState(initialProjectData);
  const [deployStatus, setDeployStatus] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddProject = (newProject) => {
    // console.log("newProject : ", newProject);
    setProjectData([...projectData, newProject]);
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Button variant="primary" onClick={handleShow}>
          Add New Project
        </Button>
        {deployStatus && <DeployStatus />}
        {/* <DeployStatus /> */}
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projectData.map((project, idx) => (
            <Col md={4} className="project-card" key={idx}>
              <ProjectCard
                imgPath={project.imgPath}
                isBlog={false}
                title={project.title}
                description={project.description}
                ghLink={project.ghLink}
                demoLink={project.demoLink}
              />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Menambahkan AddProjectModal */}
      <AddProjectModal
        show={showModal}
        onClose={handleClose}
        onAdd={handleAddProject}
        setStatus={setDeployStatus}
      />
    </Container>
  );
}

export default Projects;
