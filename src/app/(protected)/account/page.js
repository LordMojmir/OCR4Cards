"use client"

import { useAppContext } from "@/app/context";

export default function AccountPage() {
    const { uID, setUUID } = useAppContext();

    const updateUUID = () => {
        setUUID("New UUID Value");
    };

    return (
        <>
            <h1>Account Page UUID: {uID}</h1>
            <button onClick={updateUUID}>Set UUID</button>
        </>
    );
}
