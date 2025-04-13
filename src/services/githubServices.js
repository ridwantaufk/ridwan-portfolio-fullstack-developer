// src/services/githubService.js

const branch = "gh-pages-develop"; // branch tempat commit dilakukan

export const uploadImageToGitHub = async (base64Image, imageName) => {
  const owner = process.env.REACT_APP_GITHUB_OWNER;
  const repo = process.env.REACT_APP_GITHUB_REPO;
  const accessToken = process.env.REACT_APP_GITHUB_TOKEN;

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/src/Assets/Projects/${imageName}.png?ref=${branch}`;

  const data = {
    message: `Upload image: ${imageName}.png`,
    content: base64Image.split("base64,")[1],
    branch,
  };

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (response.ok) {
    return result.content.download_url;
  } else {
    console.error(result);
    throw new Error("Gagal upload gambar ke GitHub");
  }
};

export const getFileSha = async () => {
  const owner = process.env.REACT_APP_GITHUB_OWNER;
  const repo = process.env.REACT_APP_GITHUB_REPO;
  const accessToken = process.env.REACT_APP_GITHUB_TOKEN;

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/src/components/Projects/ProjectData.js?ref=${branch}`;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await response.json();

  if (response.ok) {
    return result.sha;
  } else {
    console.error(result);
    throw new Error("Gagal ambil SHA file ProjectData.js");
  }
};

export const updateProjectDataFile = async (
  newProjectData,
  imageName,
  fileSha
) => {
  const owner = process.env.REACT_APP_GITHUB_OWNER;
  const repo = process.env.REACT_APP_GITHUB_REPO;
  const accessToken = process.env.REACT_APP_GITHUB_TOKEN;

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/src/components/Projects/ProjectData.js?ref=${branch}`;

  // Ambil konten lama dulu
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const fileJson = await response.json();
  const decodedContent = atob(fileJson.content);

  // Tambahkan import baru
  const newImportLine = `import ${imageName} from "../../Assets/Projects/${imageName}.png";`;

  const updatedImports = decodedContent.replace(
    /(import .*?";)(?![\s\S]*import)/,
    (match) => `${match}\n${newImportLine}`
  );

  // Tambahkan project baru di array
  const newProjectEntry = `  {
    imgPath: ${imageName},
    title: "${newProjectData.title}",
    description: "${newProjectData.description}",
    ghLink: "${newProjectData.ghLink}",
    demoLink: "${newProjectData.demoLink || "#"}",
  },`;

  const updatedProjectArray = updatedImports.replace(
    /(export const projectData = \[\n)([\s\S]*?)(\n\];)/,
    (match, start, entries, end) =>
      `${start}${entries.trimEnd()},\n${newProjectEntry}${end}`
  );

  // Encode dan push ulang
  const newEncodedContent = btoa(
    unescape(encodeURIComponent(updatedProjectArray))
  );

  const data = {
    message: `Add new project "${newProjectData.title}"`,
    content: newEncodedContent,
    sha: fileSha,
    branch,
  };

  const updateRes = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const updateResult = await updateRes.json();

  if (!updateRes.ok) {
    console.error(updateResult);
    throw new Error("Gagal update ProjectData.js");
  }
};

export const addProjectToGitHub = async (newProject) => {
  const imageName = newProject.title.toLowerCase().replace(/[^a-z0-9]/gi, "-");

  const imageUrl = await uploadImageToGitHub(newProject.imgPath, imageName);
  const fileSha = await getFileSha();
  await updateProjectDataFile(newProject, imageName, fileSha);

  console.log(
    "✅ Project berhasil ditambahkan & commit dikirim ke branch:",
    branch
  );
};
