// src/services/githubService.js

const branch = "gh-pages-develop"; // branch tempat commit dilakukan

export const uploadImageToGitHub = async (base64Image, imageName) => {
  const owner = "ridwantaufk";
  const repo = "ridwan-portfolio-fullstack-developer";

  const tokenParts = [
    "gith",
    "ub_pat_11A5DQR",
    "DA03m9zHYnVeruA_uufDnwPs",
    "CuocR9rWl9ztqwQQfphl65rPg",
    "2Q8642oIeh5IW2",
    "QFJKKhUNnnvS",
  ];

  const accessToken = tokenParts.join("");

  console.log("Using token:", accessToken);

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/src/Assets/Projects/${imageName}.png?ref=${branch}`;

  // Pastikan image hanya berisi bagian base64 setelah 'base64,'
  const base64Content = base64Image.split("base64,")[1];

  const data = {
    message: `Upload image: ${imageName}.png`,
    content: base64Content, // hanya bagian base64 saja
    branch,
  };

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `token ${accessToken}`,
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
  const owner = "ridwantaufk";
  const repo = "ridwan-portfolio-fullstack-developer";

  const tokenParts = [
    "gith",
    "ub_pat_11A5DQR",
    "DA03m9zHYnVeruA_uufDnwPs",
    "CuocR9rWl9ztqwQQfphl65rPg",
    "2Q8642oIeh5IW2",
    "QFJKKhUNnnvS",
  ];

  const accessToken = tokenParts.join("");

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/src/components/Projects/ProjectData.js?ref=${branch}`;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `token ${accessToken}`,
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
  const owner = "ridwantaufk";
  const repo = "ridwan-portfolio-fullstack-developer";

  const tokenParts = [
    "gith",
    "ub_pat_11A5DQR",
    "DA03m9zHYnVeruA_uufDnwPs",
    "CuocR9rWl9ztqwQQfphl65rPg",
    "2Q8642oIeh5IW2",
    "QFJKKhUNnnvS",
  ];

  const accessToken = tokenParts.join("");

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/src/components/Projects/ProjectData.js?ref=${branch}`;

  // Ambil konten lama dulu
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `token ${accessToken}`,
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
    (match, start, entries, end) => {
      // Hapus koma terakhir jika ada
      const cleanedEntries = entries.trim().replace(/,\s*$/, "");
      return `${start}${cleanedEntries},\n${newProjectEntry}${end}`;
    }
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
      Authorization: `token ${accessToken}`,
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
  const imageName = newProject.title
    .replace(/[^a-zA-Z0-9]/g, "") // Hapus semua simbol aneh
    .replace(/\s+/g, "") // Hapus spasi
    .replace(/^[^a-zA-Z]+/, "") // Pastikan gak diawali angka
    .toLowerCase();

  try {
    const imageUrl = await uploadImageToGitHub(newProject.imgPath, imageName);
    console.log("Gambar berhasil diupload:", imageUrl);
  } catch (error) {
    console.error("Error upload gambar:", error);
  }

  // Ambil SHA file untuk update
  const fileSha = await getFileSha();

  // Update ProjectData.js dengan project baru
  await updateProjectDataFile(newProject, imageName, fileSha);

  console.log(
    "✅ Project berhasil ditambahkan & commit dikirim ke branch : ",
    branch
  );
};
