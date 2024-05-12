import React, { useState } from "react";

const ImageUploader = ({ onImageUpload }) => {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file && file.size < maxSizeInBytes) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        onImageUpload(imageDataURL);
      };
      reader.readAsDataURL(file);
    } else {
      onImageUpload(null);
    }
  };

  const handleManualFileSelect = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file && file.size < maxSizeInBytes) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        onImageUpload(imageDataURL);
      };
      reader.readAsDataURL(file);
    } else {
      onImageUpload(null);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: dragging ? "2px dashed #333" : "2px dashed #ddd",
        padding: "20px",
        borderRadius: "5px",
        color: "#fff",
      }}
    >
      <p>Arrastra y suelta una imagen aquí</p>
      <p>O selecciona manualmente:</p>
      <input type="file" accept="image/*" onChange={handleManualFileSelect} />
    </div>
  );
};

export default ImageUploader;
