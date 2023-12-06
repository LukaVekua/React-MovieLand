import { createContext, useState } from "react";

export const context = createContext(undefined)

export default function ContextProvider({ children }) {
    const [visibility, setVisibility] = useState(false)
    return <context.Provider value={{
        visibility,
        setVisibility
    }}>
        {children}
    </context.Provider>
}

