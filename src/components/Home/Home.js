import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import Robot3D from "../utils/Robot3D";
import Computer3D from "../utils/Computer3D";
import React, { Suspense } from "react";

const Man3D = React.lazy(() => import("../utils/Man3D"));

function Home() {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <Container
        fluid
        className="home-section d-flex align-items-center justify-content-center"
        id="home"
        style={{
          minHeight: "100vh",
          color: "#fff",
          overflow: "hidden",
          display: "flex", // Use flexbox for layout
          flexDirection: "column", // Stack children vertically
          justifyContent: "center", // Center vertically
        }}
      >
        <Particle />
        <Container className="home-content">
          <Row className="align-items-center">
            <Col md={7} className="home-header">
              <h1
                style={{ paddingBottom: 15, color: "#fff" }}
                className="heading"
              >
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name" style={{ color: "#00bcd4" }}>
                  {" "}
                  Ridwan Taufik
                </strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            {/* 3D Animation */}
            <Col className="home-header" md={5} style={{ height: "600px" }}>
              {/* <Robot3D /> */}
              <Suspense fallback={<div>Loading...</div>}>
                <Man3D />
              </Suspense>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* Computer3D is now centered properly */}
      <Home2 />
    </section>
  );
}

export default Home;
