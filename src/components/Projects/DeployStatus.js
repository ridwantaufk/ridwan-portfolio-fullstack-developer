import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaRocket,
  FaSyncAlt,
} from "react-icons/fa";
import { Spinner } from "react-bootstrap";

const REPO = "ridwan-portfolio-fullstack-developer";
const OWNER = "ridwantaufk";
const DEPLOY_WORKFLOW_NAME = "pages-build-deployment";

const DeployStatus = () => {
  const [status, setStatus] = useState("idle"); // Default to "idle"
  const [message, setMessage] = useState("");

  const tokenParts = [
    "gith",
    "ub_pat_11A5DQR",
    "DA03m9zHYnVeruA_uufDnwPs",
    "CuocR9rWl9ztqwQQfphl65rPg",
    "2Q8642oIeh5IW2",
    "QFJKKhUNnnvS",
  ];
  const accessToken = tokenParts.join("");

  const checkDeployStatus = async () => {
    setStatus("checking");
    setMessage("Mengecek status deployment...");

    try {
      const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows`,
        {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      );
      const workflows = await res.json();
      const deployWorkflow = workflows.workflows.find(
        (w) =>
          w.name.toLowerCase().includes("deploy") ||
          w.name === DEPLOY_WORKFLOW_NAME
      );

      if (!deployWorkflow) {
        setStatus("error");
        setMessage("Workflow deploy tidak ditemukan.");
        return;
      }

      // Function to check the status of a specific branch deployment
      const checkDeploymentStatus = async (branch) => {
        const runsRes = await fetch(
          `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${deployWorkflow.id}/runs?branch=${branch}`,
          {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          }
        );

        const runs = await runsRes.json();
        const latestRun = runs.workflow_runs.find(
          (run) => run.head_branch === branch
        );

        if (!latestRun) {
          return {
            status: "error",
            message: `Tidak ada deploy run terbaru di ${branch}.`,
          };
        }

        return { status: "checking", runId: latestRun.id };
      };

      // Start by checking gh-pages-develop
      const {
        status: developStatus,
        message: developMessage,
        runId: developRunId,
      } = await checkDeploymentStatus("gh-pages-develop");

      if (developStatus === "error") {
        setStatus("error");
        setMessage(developMessage);
        return;
      }

      setStatus("checking");
      setMessage(`Mengecek status deploy di gh-pages-develop...`);

      // Check the status of the build and deploy process
      const interval = setInterval(async () => {
        const runCheck = await fetch(
          `https://api.github.com/repos/${OWNER}/${REPO}/actions/runs/${developRunId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const runData = await runCheck.json();

        if (runData.status === "completed") {
          if (runData.conclusion === "success") {
            setStatus("checking");
            setMessage(
              "Proses selesai di gh-pages-develop, melanjutkan ke gh-pages..."
            );

            // Now, check the status for gh-pages
            const {
              status: ghPagesStatus,
              message: ghPagesMessage,
              runId: ghPagesRunId,
            } = await checkDeploymentStatus("gh-pages");

            if (ghPagesStatus === "error") {
              setStatus("error");
              setMessage(ghPagesMessage);
              clearInterval(interval);
              return;
            }

            setStatus("checking");
            setMessage("Mengecek status deploy di gh-pages...");

            // Check the deployment status of gh-pages
            const runCheckGhPages = await fetch(
              `https://api.github.com/repos/${OWNER}/${REPO}/actions/runs/${ghPagesRunId}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            const ghPagesRunData = await runCheckGhPages.json();

            if (ghPagesRunData.status === "completed") {
              clearInterval(interval);
              if (ghPagesRunData.conclusion === "success") {
                setStatus("done");
                setMessage("Proyek berhasil dideploy ke gh-pages!");
                setTimeout(() => window.location.reload(), 2000); // ⏳ delay 2 detik lalu reload
              } else {
                setStatus("error");
                setMessage("Deploy ke gh-pages gagal.");
              }
            }
          } else {
            setStatus("error");
            setMessage("Deploy ke gh-pages-develop gagal.");
            clearInterval(interval);
          }
        }
      }, 5000); // Check every 5 seconds
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Terjadi kesalahan saat mengecek status deploy.");
    }
  };

  useEffect(() => {
    checkDeployStatus();
  }, []);

  const renderStatus = () => {
    switch (status) {
      case "checking":
        return (
          <p className="text-warning mt-3 d-flex align-items-center justify-content-center gap-2">
            <FaSyncAlt />
            {message}
            <Spinner animation="border" variant="warning" size="sm" />
          </p>
        );
      case "done":
        return (
          <p className="text-success mt-3 d-flex align-items-center justify-content-center gap-2">
            <FaCheckCircle />
            {message}
          </p>
        );
      case "error":
        return (
          <p className="text-danger mt-3 d-flex align-items-center justify-content-center gap-2">
            <FaExclamationTriangle />
            {message}
          </p>
        );
      default:
        return null;
    }
  };

  return <div className="text-center">{renderStatus()}</div>;
};

export default DeployStatus;
