import { useForm } from "react-hook-form";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

export default function Home() {
  const { register, handleSubmit, setValue } = useForm();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  // Drag & Drop setup
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    validateFile(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // File validation
  const validateFile = (file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG, and PDF files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      setError("File size must be less than 2MB.");
      return;
    }

    setError("");
    setValue("file", file);
  };

  // Form submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file);

    try {
      await axios.post("/api/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        },
      });
      alert("File uploaded successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload File</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Drag & Drop Area */}
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed gray",
            padding: "20px",
            marginBottom: "10px",
          }}
        >
          <input {...getInputProps()} />
          <p>Drag & drop a file here, or click to select</p>
        </div>

        {/* Hidden input */}
        <input
          type="file"
          {...register("file")}
          onChange={(e) => validateFile(e.target.files[0])}
        />

        {/* Error message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Progress */}
        <p>Upload Progress: {progress}%</p>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
