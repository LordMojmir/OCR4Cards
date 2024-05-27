"use client";

import React, { useState, useEffect } from "react";
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getAllUserContacts } from "@/app/components/firebaseFunctions";
import {useAppContext} from "@/app/context";

function ContactPageFirestore() {
    const [userData, setUserData] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { uID, setUUID } = useAppContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "users", "oq6e7XMHmZ5liQafLjf8", "accounts", "Kk3j1rxO8JFF6e02YsEO");
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
                try {
                    let test_uid = "oq6e7XMHmZ5liQafLjf8"
                    const allContacts = await getAllUserContacts(test_uid);
                    setContacts(allContacts);
                        
                } catch (error) {
                    console.error("Error fetching contacts: ", error);

                }finally{
                    setLoading(false);

                }

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
        <div className="container mx-auto text-center m-5">
            <h1 className="text-xl">User Information</h1>
            <p><strong>Company:</strong> {userData.company}</p>
            <p><strong>Created At:</strong> {formatDate(userData.createdAt)}</p>
            <p><strong>First Name:</strong> {userData.firstname}</p>
            <p><strong>Last Name:</strong> {userData.lastname}</p>
            <p><strong>Emails:</strong> {userData.mails.join(', ')}</p>
            <p><strong>Phones:</strong> {userData.phones.join(', ')}</p>

            <h2 className="text-xl mt-5">Contacts</h2>
            {contacts.length > 0 ? (
                contacts.map((contact, index) => (
                    <div key={index} className="bg-gray-100 p-4 text-left text-black mt-4 rounded shadow-md">
                        <p><strong>Company:</strong> {contact.company}</p>
                        <p><strong>Name:</strong> {contact.firstname} {contact.lastname}</p>
                        <p><strong>Address:</strong> {contact.address}</p>
                        <p><strong>Emails:</strong> {contact.email.join(', ')}</p>
                        <p><strong>Phones:</strong> {contact.phone.join(', ')}</p>
                        <p><strong>Created At:</strong> {formatDate(contact.createdAt)}</p>
                    </div>
                ))
            ) : (
                <p>No contacts found.</p>
            )}
        </div>
    );
}

export default ContactPageFirestore;
