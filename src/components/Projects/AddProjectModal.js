import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { addProjectToGitHub } from "../../services/githubServices";

const AddProjectModal = ({ show, onClose, onAdd, setStatus }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [newProject, setNewProject] = useState({
    imgPath: "",
    title: "",
    description: "",
    ghLink: "",
    demoLink: "",
  });
  const [cropData, setCropData] = useState(null);
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    title: "",
    imgPath: "",
  });
  const [cropperVisible, setCropperVisible] = useState(true);

  const cropperRef = useRef(null);

  const resetForm = (isLoginReset = false) => {
    setCredentials({ username: "", password: "" });
    if (!isLoginReset) {
      setNewProject({
        imgPath: "",
        title: "",
        description: "",
        ghLink: "",
        demoLink: "",
      });
      setCropData(null);
      setCropperVisible(true);
    }
    setFormErrors({
      username: "",
      password: "",
      title: "",
      imgPath: "",
    });
  };

  const handleLogin = () => {
    setFormErrors({ username: "", password: "" });

    if (credentials.username === "" && credentials.password === "") {
      setIsAuth(true);
    } else {
      setCredentials({ username: "", password: "" });

      if (credentials.username !== "") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          username: "Wrong username!",
        }));
      }
      if (credentials.password !== "") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          password: "Wrong password!",
        }));
      }
    }
  };

  const handleAdd = async () => {
    let errors = {};

    // Validasi input
    if (!newProject.title) {
      errors.title = "Title is required!";
    }
    if (!newProject.imgPath || newProject.imgPath === "") {
      errors.imgPath = "Please upload and crop an image!";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Kirim project ke GitHub
      await addProjectToGitHub(newProject);
      //   onAdd(newProject);

      // Set deploy status to checking
      setStatus(true);

      resetForm();
      setIsAuth(false);
      onClose();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleKeyDownUsername = (e) => {
    if (e.key === "Enter") {
      document.getElementById("formPassword").focus();
    }
  };

  const handleKeyDownPassword = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        setNewProject((prevState) => ({
          ...prevState,
          imgPath: img.src,
        }));
      };
    };
    reader.readAsDataURL(file);
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedImage = cropperRef.current.getCroppedCanvas().toDataURL();

      setCropData(croppedImage);
      setNewProject((prevState) => ({
        ...prevState,
        imgPath: croppedImage,
      }));

      setCropperVisible(false);
    } else {
      console.log("Cropper is not initialized.");
    }
  };

  const onCropperInit = (cropperInstance) => {
    cropperRef.current = cropperInstance;
  };

  useEffect(() => {
    if (!show) {
      setCropData(null);
      setNewProject((prev) => ({ ...prev, imgPath: "" }));
      setCropperVisible(true);
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={() => {
        resetForm();
        onClose();
      }}
      size="lg"
      className="modal-dark-theme"
    >
      <Modal.Header closeButton>
        <Modal.Title>{isAuth ? "Add Project" : "Login"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isAuth ? (
          <Form>
            <Form.Group className="mb-2" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                className="custom-placeholder"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                isInvalid={formErrors.title}
                placeholder="Enter project title"
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formImgPath">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageUpload}
                isInvalid={formErrors.imgPath}
              />
              {newProject.imgPath && cropperVisible ? (
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Cropper
                    ref={cropperRef}
                    src={newProject.imgPath}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      zIndex: 1,
                    }}
                    aspectRatio={16 / 9}
                    guides={false}
                    viewMode={1}
                    responsive={true}
                    autoCropArea={1}
                    onInitialized={onCropperInit}
                  />
                  <Button
                    onClick={handleCrop}
                    className="mt-2"
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 10,
                      backgroundColor: "#007bff",
                      color: "white",
                    }}
                  >
                    Crop Image
                  </Button>
                </div>
              ) : newProject.imgPath ? (
                <div>
                  <img
                    src={cropData || newProject.imgPath}
                    alt="Cropped Preview"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                  {formErrors.imgPath && (
                    <div
                      style={{
                        color: "red",
                        marginTop: "5px",
                        fontSize: "0.9rem",
                      }}
                    >
                      {formErrors.imgPath}
                    </div>
                  )}
                </div>
              ) : (
                <div></div>
              )}
              <Form.Control.Feedback type="invalid">
                {formErrors.imgPath}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                className="custom-placeholder"
                as="textarea"
                rows={3}
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                placeholder="Enter project description"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formGhLink">
              <Form.Label>GitHub Link</Form.Label>
              <Form.Control
                className="custom-placeholder"
                value={newProject.ghLink}
                onChange={(e) =>
                  setNewProject({ ...newProject, ghLink: e.target.value })
                }
                placeholder="Enter GitHub repository link"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formDemoLink">
              <Form.Label>Demo Link</Form.Label>
              <Form.Control
                className="custom-placeholder"
                value={newProject.demoLink}
                onChange={(e) =>
                  setNewProject({ ...newProject, demoLink: e.target.value })
                }
                placeholder="Enter project demo link"
              />
            </Form.Group>
          </Form>
        ) : (
          <Form>
            <Form.Group className="mb-2" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className="custom-placeholder"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                onKeyDown={handleKeyDownUsername}
                isInvalid={formErrors.username}
                placeholder="Enter your username"
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="custom-placeholder"
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                onKeyDown={handleKeyDownPassword}
                isInvalid={formErrors.password}
                placeholder="Enter your password"
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            resetForm();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={isAuth ? handleAdd : handleLogin}>
          {isAuth ? "Add Project" : "Login"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProjectModal;
