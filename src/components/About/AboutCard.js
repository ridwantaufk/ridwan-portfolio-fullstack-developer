import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hello, I am <span className="purple">Ridwan Taufik</span> from{" "}
            <span className="purple">Bandung, Indonesia</span>.
            <br />I am a passionate{" "}
            <b className="purple">JavaScript Specialist</b> with expertise as a{" "}
            <b className="purple">Full-Stack Developer</b>. I specialize in
            modern JavaScript technologies such as{" "}
            <b className="purple">React.js, Node.js, Express.js, Next.js,</b>{" "}
            and <b className="purple">Vue.js</b>. My skills extend to working
            with databases like <b className="purple">PostgreSQL</b> and
            building <b className="purple">RESTful APIs</b>.
            <br />
            <br />
            Additionally, I have experience with real-time technologies like{" "}
            <b className="purple">Socket.IO</b> and{" "}
            <b className="purple">WebSockets</b>, and I focus on ensuring robust
            application security using <b className="purple">JWT</b>, cookies,
            and encryption. I am also familiar with tools like{" "}
            <b className="purple">AJAX</b>, <b className="purple">jQuery</b>,
            and <b className="purple">RTC</b>.
            <br />
            <br />
            Apart from JavaScript, I have worked with{" "}
            <b className="purple">PHP</b> using frameworks like{" "}
            <b className="purple">Laravel</b> and <b className="purple">Yii</b>.
            I also have experience in <b className="purple">Python</b> projects,
            especially in <b className="purple">Machine Learning</b> and{" "}
            <b className="purple">Data Mining/Analytics</b>, and I am currently
            expanding my knowledge with <b className="purple">Django</b>.
            <br />
            <br />
            For version control, I am proficient with{" "}
            <b className="purple">Git</b>, using platforms like{" "}
            <b className="purple">GitHub</b> and{" "}
            <b className="purple">Bitbucket</b>. I deploy applications using{" "}
            <b className="purple">Vercel</b> and{" "}
            <b className="purple">Railway</b>, and have experience with
            cloud-based database storage solutions.
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Building Integrated Websites with Server and
              Database
            </li>
            <li className="about-activity">
              <ImPointRight /> Developing RESTful APIs for Web and Mobile
              Applications
              <li className="about-activity">
                <ImPointRight /> Creating Realistic 3D Animations
              </li>
              <li className="about-activity">
                <ImPointRight /> Exploring Data Security, Finding
                Vulnerabilities, and Enhancing Security
              </li>
              <li className="about-activity">
                <ImPointRight /> Building Real-Time Applications
              </li>
              <li className="about-activity">
                <ImPointRight /> Experimenting with Emerging Technologies and
                Tools
              </li>
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Create with purpose, innovate with passion, and build a legacy that
            lasts."
          </p>
          <footer className="blockquote-footer">Ridwan Taufik</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
