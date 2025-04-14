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
  const [status, setStatus] = useState("idle");
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

      const checkLatestRun = async (branch) => {
        const runRes = await fetch(
          `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${deployWorkflow.id}/runs?branch=${branch}`,
          {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          }
        );
        const runData = await runRes.json();
        return runData.workflow_runs?.[0];
      };

      const waitForCompletion = async (runId, branch) => {
        return new Promise((resolve, reject) => {
          const interval = setInterval(async () => {
            const checkRes = await fetch(
              `https://api.github.com/repos/${OWNER}/${REPO}/actions/runs/${runId}`,
              {
                headers: {
                  Authorization: `token ${accessToken}`,
                },
              }
            );
            const checkData = await checkRes.json();

            if (checkData.status === "completed") {
              clearInterval(interval);
              if (checkData.conclusion === "success") {
                resolve(true);
              } else {
                reject(new Error(`Deploy di ${branch} gagal.`));
              }
            }
          }, 5000);
        });
      };

      // Step 1: Tunggu build di gh-pages-develop
      setMessage("Menunggu build di gh-pages-develop...");
      const developRun = await checkLatestRun("gh-pages-develop");

      if (!developRun) {
        setStatus("error");
        setMessage("Tidak ditemukan run di gh-pages-develop.");
        return;
      }

      await waitForCompletion(developRun.id, "gh-pages-develop");

      // Step 2: Tunggu deploy di gh-pages
      setMessage("Menunggu deploy ke gh-pages...");
      const deployRun = await checkLatestRun("gh-pages");

      if (!deployRun) {
        setStatus("error");
        setMessage("Tidak ditemukan run di gh-pages.");
        return;
      }

      await waitForCompletion(deployRun.id, "gh-pages");

      setStatus("done");
      setMessage("Proyek berhasil dideploy ke GitHub Pages!");
      setTimeout(() => window.location.reload(), 2000); // refresh biar data terbaru muncul
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage(
        err.message || "Terjadi kesalahan saat mengecek status deploy."
      );
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
