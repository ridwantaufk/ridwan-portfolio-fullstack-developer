import React, { useState, useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";

function ResumeNew() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pdfPath = `${window.location.origin}/Assets/CV_Ridwan_Taufik_Programmer.pdf`;

  // PDF A4 size in pixels (8.27 x 11.69 inches at 96 DPI)
  const pdfMaxWidth = 794; // Width of A4 in pixels
  const previewWidth =
    width > pdfMaxWidth ? `${pdfMaxWidth}px` : `${width * 0.9}px`; // Responsive adjustment

  return (
    <div>
      <Container fluid className="resume-section">
        {/* Download Button */}
        <Row
          style={{
            justifyContent: "center",
            position: "relative",
            marginBottom: "30px", // Add space between button and preview
          }}
        >
          <Button
            variant="primary"
            href={pdfPath}
            target="_blank"
            download="CV_Ridwan_Taufik_Programmer.pdf" // Menambahkan atribut download
            style={{
              maxWidth: "250px",
              padding: "10px 20px", // Adjust padding for better appearance
            }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        {/* Display the PDF */}
        <Row style={{ justifyContent: "center" }}>
          <div
            style={{
              maxWidth: "100%",
              width: previewWidth,
              overflow: "hidden",
            }}
          >
            <object
              data={pdfPath}
              type="application/pdf"
              width="100%"
              height="1123px" // Adjust height as needed for A4
              style={{
                borderRadius: "15px", // Optional: Rounded corners
              }}
            >
              <p>
                Your browser does not support PDFs.{" "}
                <a href={pdfPath} target="_blank" rel="noopener noreferrer">
                  Download the PDF
                </a>
              </p>
            </object>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
