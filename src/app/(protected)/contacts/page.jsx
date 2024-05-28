"use client"

import React, { useState, useEffect } from "react";
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getAllUserContacts } from "@/app/components/firebaseFunctions";
import { useAppContext } from "@/app/context";

function ContactPageFirestore() {
    const [userData, setUserData] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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
            } catch (error) {
                console.error("Error fetching document: ", error);
            } finally {
                try {
                    const allContacts = await getAllUserContacts("oq6e7XMHmZ5liQafLjf8");
                    setContacts(allContacts);
                    setFilteredContacts(allContacts);
                } catch (error) {
                    console.error("Error fetching contacts: ", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = contacts.filter(contact =>
            `${contact.firstname} ${contact.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredContacts(filtered);
    }, [searchTerm, contacts]);

    const formatDate = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleString();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>No data found</div>;
    }

    return (

        <div className="container mx-auto text-center m-5 box-border p-2">

            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="mb-4 border rounded text-black w-full box-border p-2"
            />

            <h2 className="text-xl mt-5">Contacts</h2>
            {filteredContacts.length > 0 ? (
                filteredContacts.map((contact, index) => (
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
