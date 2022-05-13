import { createContext, useContext, useState } from "react";


const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [required, setRequired] = useState(true);
    const value = { required, setRequired };
    return (
        <MainContext.Provider value={value} >
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => useContext(MainContext); 