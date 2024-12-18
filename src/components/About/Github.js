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

function Github() {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Menggunakan token dari variabel lingkungan
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/users/ridwantaufk/events",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGithubData(response.data);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setGithubData([]); // Set githubData menjadi array kosong jika terjadi error
      } finally {
        setLoading(false); // Set loading menjadi false setelah data selesai diambil
      }
    };

    fetchData();
  }, [token]); // Gunakan token sebagai dependensi jika perlu

  return (
    <Row className="justify-content-center" style={{ paddingBottom: "20px" }}>
      <Col xs={12} md={8} lg={6}>
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
                  style={{ backgroundColor: "transparent", color: "white" }}
                >
                  Recent GitHub Events
                </Card.Header>
                <ListGroup
                  variant="flush"
                  style={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    backgroundColor: "transparent",
                    color: "white",
                  }}
                >
                  {githubData.map((event, index) => (
                    <ListGroupItem
                      key={index}
                      className="d-flex justify-content-between align-items-center"
                      style={{ backgroundColor: "transparent", border: "none" }}
                    >
                      <div>
                        <strong>{event.type}</strong>
                        <p style={{ marginBottom: "0", color: "#6c757d" }}>
                          {event.repo.name}
                        </p>
                      </div>
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
                        style={{ color: "#6c757d" }}
                      >
                        View Repo
                      </Button>
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
