import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import myImg from "../../Assets/pp_ridwan.jpg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

function Home2() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark-theme" : "light-theme"}>
      <Container fluid className="home-about-section" id="about">
        <Button
          onClick={toggleTheme}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
          }}
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Button>
        <Container>
          <Row>
            <Col md={8} className="home-about-description">
              <h1
                style={{
                  fontSize: "2.6em",
                  fontWeight: "bold",
                  color: darkMode ? "white" : "black",
                }}
              >
                LET ME <span className="purple"> INTRODUCE </span> MYSELF
              </h1>
              <p
                className="home-about-body"
                style={{
                  color: darkMode ? "white" : "black",
                  textAlign: "justify", // Added justify alignment
                }}
              >
                I am a passionate{" "}
                <b className="purple">JavaScript Specialist</b> with expertise
                as a <b className="purple">Full-Stack Developer</b>. My skill
                set includes modern JavaScript technologies such as{" "}
                <b className="purple">
                  React.js, Node.js, Express.js, Next.js,
                </b>
                and <b className="purple">Vue.js</b>. I am also proficient in
                working with databases like
                <b className="purple">PostgreSQL</b> and building{" "}
                <b className="purple">RESTful APIs</b>.
                <br />
                <br />I have experience with real-time technologies like{" "}
                <b className="purple">Socket.IO</b> and{" "}
                <b className="purple">WebSockets</b>, and I ensure robust
                application security using <b className="purple">JWT</b>,
                cookies, and encryption. Additionally, I am familiar with other
                tools and technologies like{" "}
                <b className="purple">AJAX, jQuery, RTC,</b> and more.
                <br />
                <br />
                Aside from JavaScript, I have experience with{" "}
                <b className="purple">PHP</b>, working on frameworks such as
                <b className="purple">Laravel</b> and{" "}
                <b className="purple">Yii</b>. I have also worked on{" "}
                <b className="purple">Python</b>
                projects, including <b className="purple">
                  Machine Learning
                </b>{" "}
                and <b className="purple">Data Mining/Analytics</b>. Currently,
                I am expanding my knowledge with{" "}
                <b className="purple">Django</b>.
                <br />
                <br />
                For version control and repository hosting, I am proficient with{" "}
                <b className="purple">Git</b>, using platforms like{" "}
                <b className="purple">GitHub</b> and{" "}
                <b className="purple">Bitbucket</b>. I deploy applications using{" "}
                <b className="purple">Vercel</b> and{" "}
                <b className="purple">Railway</b>, and I am experienced with
                <b className="purple">cloud-based database storage</b>{" "}
                solutions.
              </p>
            </Col>

            <Col md={3} className="myAvtar" style={{ marginTop: "30px" }}>
              {" "}
              {/* Added margin */}
              <Tilt>
                <img
                  src={myImg}
                  className="img-fluid avatar-img"
                  alt="avatar"
                  style={{ marginTop: "80px" }}
                />
              </Tilt>
            </Col>
          </Row>

          <Row>
            <Col md={12} className="home-about-social">
              <h1
                style={{
                  fontSize: "2em",
                  fontWeight: "bold",
                  color: darkMode ? "white" : "black",
                }}
              >
                FIND ME ON
              </h1>
              <p
                style={{
                  color: darkMode ? "white" : "black",
                  textAlign: "justify", // Added justify alignment
                }}
              >
                Feel free to <span className="purple">connect </span>with me
              </p>
              <ul className="home-about-social-links">
                <li className="social-icons">
                  <a
                    href="https://github.com/ridwantaufk"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour  home-social-icons"
                  >
                    <AiFillGithub />
                  </a>
                </li>
                <li className="social-icons">
                  <a
                    href="https://wa.me/6281312025217"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour  home-social-icons"
                  >
                    <FaWhatsapp />
                  </a>
                </li>
                <li className="social-icons">
                  <a
                    href="https://linkedin.com/in/ridwan-taufik-b3624325a"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour  home-social-icons"
                  >
                    <FaLinkedinIn />
                  </a>
                </li>
                <li className="social-icons">
                  <a
                    href="https://instagram.com/ridwantaufk"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour home-social-icons"
                  >
                    <AiFillInstagram />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default Home2;
