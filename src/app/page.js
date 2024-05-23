"use client"

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function Home() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("YOUR_API_ENDPOINT", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
      <div className="container mx-auto text-center m-5">
        <h1 className="text-xl">Card Info Extraction Tool</h1>
        <div
            {...getRootProps()}
            className="border-dashed border-2 border-gray-400 p-5 my-5 cursor-pointer"
        >
          <input {...getInputProps()} />
          {preview ? (
              <img src={preview} alt="Preview" className="mx-auto" />
          ) : (
              <p>Drop an image here, or click to select one</p>
          )}
        </div>
        <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
  );
}
