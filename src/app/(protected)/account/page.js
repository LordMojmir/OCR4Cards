"use client";

import { useAppContext } from "@/app/context";
import { useEffect, useState } from "react";
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function AccountPage() {
  const { uID, setUUID } = useAppContext();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUUID = () => {
    setUUID("Not set");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(
          db,
          "users",
          "oq6e7XMHmZ5liQafLjf8",
          "accounts",
          "Kk3j1rxO8JFF6e02YsEO"
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
        // console.log("uID: ", uID)
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString(); // You can format the date as needed
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No data found</div>;
  }

  return (
    <>
      <div className="container mx-auto text-center m-5">
        <h1 className="text-xl bg-blue-900 rounded-sm mb-5">Your Account Information</h1>
        <p>
          <strong>Company:</strong> {userData.company}
        </p>
        <p>
          <strong>Created At:</strong> {formatDate(userData.createdAt)}
        </p>
        <p>
          <strong>First Name:</strong> {userData.firstname}
        </p>
        <p>
          <strong>Last Name:</strong> {userData.lastname}
        </p>
        <p>
          <strong>Emails:</strong> {userData.mails.join(", ")}
        </p>
        <p>
          <strong>Phones:</strong> {userData.phones.join(", ")}
        </p>

        <h1><strong>Account UUID:</strong> {uID}</h1>
      <button className="bg-red-600 p-3 rounded-xl " onClick={updateUUID}>Logout</button>


      </div>

    </>
  );
}
