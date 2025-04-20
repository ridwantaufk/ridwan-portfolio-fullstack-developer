import React, { useEffect, useRef } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

function ResumeNew() {
  const pdfContainerRef = useRef(null);

  useEffect(() => {
    const loadingTask = getDocument(
      `${window.location.origin}/ridwan-portfolio-fullstack-developer/assets/CV_Ridwan_Taufik_Programmer.pdf`
    );

    loadingTask.promise.then((pdf) => {
      const totalPages = pdf.numPages;

      pdfContainerRef.current.innerHTML = "";

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        pdf.getPage(pageNum).then((page) => {
          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          page.render({
            canvasContext: context,
            viewport: viewport,
          });

          pdfContainerRef.current.appendChild(canvas);
        });
      }
    });
  }, []);

  return (
    <div>
      <Container fluid className="resume-section">
        <Row
          style={{
            justifyContent: "center",
            position: "relative",
            marginBottom: "30px",
          }}
        >
          <Button
            variant="primary"
            href={`${window.location.origin}/ridwan-portfolio-fullstack-developer/assets/CV_Ridwan_Taufik_Programmer.pdf`}
            target="_blank"
            download="CV_Ridwan_Taufik_Programmer.pdf"
            className="download-btn"
            style={{
              maxWidth: "250px",
              padding: "10px 20px",
            }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        {/* PDF Rendering dengan Canvas */}
        <Row style={{ justifyContent: "center" }}>
          <div
            ref={pdfContainerRef}
            className="pdf-container"
            style={{
              maxWidth: "100%",
              width: "90%",
              overflow: "auto",
              margin: "0 auto",
            }}
          />
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
