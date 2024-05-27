"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import contactsData from '../data/contactsData.json';
import SingleContactView from "../components/SingelContactCard";
import {saveOcrDataToFirebase} from "@/app/components/firebaseFunctions";

export default function Home() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleSubmit = async () => {
        if (!image) return;

        // Using local JSON data for testing
        // setResult(contactsData);
        // return;

        // Commented out the actual backend request for testing purposes

        const formData = new FormData();
        formData.append("image", image);
        console.log("Before try block");
        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                console.log("Image uploaded successfully:", response.data);
                setResult(response.data.data); // Store the result in the state

                const userId = "oq6e7XMHmZ5liQafLjf8"; // Specific user ID
                await saveOcrDataToFirebase(userId, response.data.data);
            } else {
                console.error("Error with status code:", response.status);
            }
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
            {result && (
                <div className="mt-5 bg-black m-2">
                    <h2 className="text-lg">Processed Result:</h2>
                    {result.length > 0 && (
                        <div className="bg-gray-100 p-4 text-left text-black mt-4 rounded shadow-md">
                            {result.map((contact, index) => (
                                <SingleContactView key={index} contact={contact} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
