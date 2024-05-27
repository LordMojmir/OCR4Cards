// SingleContactView.jsx
import React from 'react';

export default function SingleContactView({ contact }) {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-bold mb-2">Contact Information</h3>
            <p><strong>Company:</strong> {contact.company}</p>
            <p><strong>Name:</strong> {contact.firstname} {contact.lastname}</p>
            <p><strong>Address:</strong> {contact.address}</p>
            <p><strong>Email:</strong> {contact.email.join(", ")}</p>
            <p><strong>Phone:</strong> {contact.phone.join(", ")}</p>
        </div>
    );
}
