"use client";

import React, {useState, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import axios from "axios";
import SingleContactView from "../components/SingelContactCard";
import {saveOcrDataToFirebase} from "@/app/components/firebaseFunctions";
import SpinnerElement from "@/app/components/SpinnerElement";


export default function Home() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [backendRunning, setBackendState] = useState("notSubmitted");

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }, []);

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    const handleSubmit = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append("image", image);
        console.log("Before try block");
        setBackendState("submitted");
        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                console.log("Image uploaded successfully:", response.data);
                setResult(response.data.data);
                const userId = "oq6e7XMHmZ5liQafLjf8";
                await saveOcrDataToFirebase(userId, response.data.data);
                setPreview(null);
                setBackendState("finished");
            } else {
                setBackendState("error");
                console.error("Error with status code:", response.status);
            }
        } catch (error) {
            setBackendState("error");
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Card Info Extraction Tool</h1>

            <div
                {...getRootProps()}
                className="border-dashed border-4 border-gray-500 p-6 my-6 text-center cursor-pointer rounded-lg hover:bg-gray-800"
            >
                <input {...getInputProps()} />
                {preview ? (
                    <img src={preview} alt="Preview" className="mx-auto mt-2 rounded"/>
                ) : (
                    <p>Drop an image here, or click to select one</p>
                )}
            </div>

            {backendRunning === "error" && (
                <div
                    onClick={() => setBackendState("finished")}
                    className="flex items-center justify-center p-4 bg-red-300 border border-red-500 text-red-700 rounded relative m-3 transition-all ease-in-out duration-300"
                    role="alert"
                >
                    <strong className="font-bold mr-2">Error:</strong>
                    <span className="block sm:inline">Something went wrong.</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20">
                            <title>Close</title>
                            <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z"/>
                        </svg>
                    </span>
                </div>
            )}

            <button
                onClick={handleSubmit}
                className="w-full bg-gray-500 text-white font-semibold py-3 rounded hover:bg-gray-800 transition-all ease-in-out duration-300 disabled:opacity-50"
                disabled={backendRunning === "submitted"}
            >
                <div className="flex items-center justify-between w-full px-4">
                    <span className="mx-auto">Submit</span>
                    {backendRunning === "submitted" && (
                        <SpinnerElement className="ml-2"/> // Adjusted for visual balance
                    )}
                </div>
            </button>

            {result && (
                <div className="mt-6 p-4 bg-gray-500 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-white">Processed Result:</h2>
                    {result.length > 0 && (
                        <div className="space-y-4">
                            {result.map((contact, index) => (
                                <SingleContactView key={index} contact={{
                                    ...contact,
                                    email: [contact.email], // Assuming email and phone are originally strings
                                    phone: [contact.phone]  // Wrap them as arrays to use .join(", ")
                                }}/>
                            ))}
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}
