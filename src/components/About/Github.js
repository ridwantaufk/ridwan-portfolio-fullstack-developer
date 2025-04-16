import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import CryptoJS from "crypto-js";

const decryptToken = (encryptedToken) => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, "secret-key");
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};

function Github() {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);

  const decryptedToken = decryptToken(
    "U2FsdGVkX18pEWAT8U85SNN+PgrYvqJ7VmvqvHniOUZXgHjgxziWS5yk9L87+goqSV8s+lYplyoCoVNwFFZhOA=="
  );

  useEffect(() => {
    const fetchData = async () => {
      let allEvents = [];
      let page = 1;

      try {
        while (true) {
          const response = await axios.get(
            `https://api.github.com/users/ridwantaufk/events?page=${page}`,
            {
              headers: {
                Authorization: `${decryptedToken.trim()}`,
              },
            }
          );

          if (response.data.length === 0) {
            break;
          }

          allEvents = [...allEvents, ...response.data];
          page++;
        }

        setGithubData(allEvents);
        // console.log("response : ", allEvents);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setGithubData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [decryptedToken]);

  return (
    <Row className="justify-content-center" style={{ paddingBottom: "20px" }}>
      <Col xs={12} md={10} lg={8}>
        {" "}
        {/* Adjusted column size for better alignment */}
        <h1
          className="project-heading text-center"
          style={{ paddingBottom: "20px", color: "white" }}
        >
          <strong className="purple">GitHub</strong> Activity
        </h1>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status" variant="primary" />
            <p style={{ color: "white" }}>Loading events...</p>
          </div>
        ) : (
          <>
            {githubData && githubData.length > 0 ? (
              <Card
                className="shadow-sm"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <Card.Header
                  as="h5"
                  className="text-center"
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    marginBottom: "10px",
                  }}
                >
                  Recent GitHub Events
                </Card.Header>
                <ListGroup
                  variant="flush"
                  style={{
                    maxHeight: "500px", // Adjusted to give more space for content
                    overflowY: "auto",
                    backgroundColor: "transparent",
                    color: "white",
                    padding: "0",
                    border: "none",
                    borderRadius: "15px",
                  }}
                >
                  {githubData.map((event, index) => (
                    <ListGroupItem
                      key={index}
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        padding: "15px", // Added more padding for readability
                        wordWrap: "break-word",
                        whiteSpace: "normal",
                        overflow: "visible",
                        transition: "box-shadow 0.3s ease-in-out", // Smooth transition for box-shadow
                      }}
                    >
                      <div
                        className="d-flex flex-column"
                        style={{
                          maxWidth: "70%", // Adjusted for better alignment
                          overflow: "hidden",
                        }}
                      >
                        <strong>{event.type}</strong>
                        <p style={{ marginBottom: "0", color: "#6c757d" }}>
                          {event.repo.name}
                        </p>
                      </div>
                      <div className="d-flex flex-column align-items-end">
                        <span style={{ color: "#6c757d" }}>
                          {new Date(event.created_at).toLocaleString()}
                        </span>
                        <Button
                          variant="link"
                          href={event.repo.url.replace(
                            "api.github.com",
                            "github.com"
                          )}
                          target="_blank"
                          style={{ color: "#6c757d", textAlign: "right" }}
                        >
                          View Repo
                        </Button>
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Card>
            ) : (
              <Card
                className="shadow-sm"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <Card.Body className="text-center" style={{ color: "white" }}>
                  <h5>No events to display.</h5>
                  <p>Please check your GitHub token and permissions.</p>
                </Card.Body>
              </Card>
            )}
          </>
        )}
      </Col>
    </Row>
  );
}

export default Github;
