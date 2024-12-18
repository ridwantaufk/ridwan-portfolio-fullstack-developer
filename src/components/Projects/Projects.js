import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import traininginformationsystem from "../../Assets/Projects/traininginformationsystem.png";
import faceRecognition from "../../Assets/Projects/faceRecognition.png";
import landingpage from "../../Assets/Projects/landingpage.png";
import brownies from "../../Assets/Projects/brownies.png";
import hospitalinformationsystem from "../../Assets/Projects/hospitalinformationsystem.png";
import sparepart from "../../Assets/Projects/sparepart.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={brownies}
              isBlog={false}
              title="Brownies Ordering System"
              description="A feature-packed brownies ordering app built with ReactJS (frontend) and Node.js/Express (backend). It uses WebSockets for real-time updates, JWT and cookies for secure authentication, and follows RESTful API principles. PostgreSQL handles data storage. Deployed on Railway (backend) and Vercel (frontend). Check the GitHub repo for code and documentation."
              ghLink="https://github.com/ridwantaufk/order-kue"
              demoLink="https://order-kue-brownies.vercel.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={sparepart}
              isBlog={false}
              title="Vehicle Sparepart Ordering System"
              description="A vehicle spare part ordering system built with native JavaScript, HTML, and CSS. This app allows users to browse and order car spare parts easily. It features a simple, responsive interface with efficient product listing and ordering functionality."
              ghLink="https://github.com/ridwantaufk/UAS_Ridwan_Taufik"
              demoLink="https://ridwantaufk.github.io/UAS_Ridwan_Taufik/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={landingpage}
              isBlog={false}
              title="Landing Page Portfolio"
              description="A personal portfolio landing page built using HTML, JavaScript, jQuery, and Bootstrap. This landing page showcases projects and skills with a clean and responsive design, providing an elegant introduction to the creator's work."
              ghLink="https://github.com/ridwantaufk/portfolio_ridwan"
              demoLink="https://ridwantaufk.github.io/portfolio_ridwan/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={traininginformationsystem}
              isBlog={false}
              title="Training Information System"
              description="Developed a Training Information System using PHP with Yii1 framework. The system utilizes AJAX to handle form submissions asynchronously and JavaScript to enhance the frontend experience. The application uses PostgreSQL as the database for storing and managing training data."
              ghLink="https://github.com/ridwantaufk/sistem-informasi-diklat"
              demoLink="#"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={hospitalinformationsystem}
              isBlog={false}
              title="Hospital Information System"
              description="A comprehensive hospital or clinic management system built with PHP using the Yii1 framework and MySQL database. This system includes various features such as patient data management, doctor and nurse records, transaction history, care types, and more. It also provides detailed reports like daily, weekly, monthly, and yearly reports, as well as visit statistics through graphical views. The system incorporates Role-Based Access Control (RBAC) for secure user management and offers tools like data backups and user settings to ensure smooth operations and data integrity."
              ghLink="https://github.com/ridwantaufk/sistem-informasi-klinik-yii1"
              demoLink="#"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={faceRecognition}
              isBlog={false}
              title="Face Recognition and Emotion Detection"
              description="Created an application for face detection and recognition that can analyze expressions, emotions, character traits, age, gender, and much more. The application is built using Python with the Django framework and various face recognition libraries to detect and identify faces and their attributes."
              ghLink="https://github.com/ridwantaufk/face-recognition"
              demoLink="#"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
