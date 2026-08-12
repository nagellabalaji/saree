import { createContext, useContext, useState } from "react";

const PriceContext = createContext();

export const PriceProvider = ({ children }) => {

    const [price, setPrice] = useState("All");

    return (

        <PriceContext.Provider
            value={{
                price,
                setPrice,
            }}
        >

            {children}

        </PriceContext.Provider>

    );

};

export const usePrice = () => useContext(PriceContext);