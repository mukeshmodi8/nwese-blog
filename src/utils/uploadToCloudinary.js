// src/utils/uploadToCloudinary.js

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "happyblog_unsigned"); // 👈 SAME NAME
  formData.append("folder", "blogs");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/ddtutiqh5/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("Cloudinary error:", data);
    throw new Error(data.error?.message || "Upload failed");
  }

  return data.secure_url; // 👈 IMPORTANT
};
