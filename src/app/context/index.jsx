"use client"

import {createContext, useState, useContext} from "react";

const AppContext = createContext({
    uID: "",
    setUUID: (data) => {}
});

export function AppWraper({children}) {
    let [id, setId] = useState("eEccrbfDkGaqftXqTvZ9BrXcwG53")

    return (
        <AppContext.Provider value={{uID: id, setUUID: setId}}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}