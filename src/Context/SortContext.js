import { createContext, useContext, useState } from "react";

const SortContext = createContext();

export const SortProvider = ({ children }) => {

    const [sortBy, setSortBy] = useState("default");

    return (

        <SortContext.Provider
            value={{
                sortBy,
                setSortBy,
            }}
        >

            {children}

        </SortContext.Provider>

    );

};

export const useSort = () => useContext(SortContext);