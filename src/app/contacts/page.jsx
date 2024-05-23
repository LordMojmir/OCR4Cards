import React from "react";
import contactsData from "../data/contactsData.json";

const ContactPage = () => {
return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-5">
        {contactsData.map((contact, index) => (
            <div
                key={index}
                className="bg-white text-black rounded-lg shadow-md p-4"
            >
                <h2 className="text-xl font-bold mb-2">
                    {contact.firstname} {contact.lastname}
                </h2>
                <h4>Phone: </h4>
                {contact.phone.map((phoneNumber, index) => (
                    <p key={index} className="ml-5">
                        {phoneNumber}
                    </p>
                ))}
                <h4>Email:</h4>
                <p>
                    {contact.email.map((email, index) => (
                        <span key={index} className="ml-5">
                            {email}
                            <br />
                        </span>
                    ))}
                </p>
            </div>
        ))}
    </div>
);
};

export default ContactPage;
