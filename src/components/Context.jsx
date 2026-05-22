import React, { createContext } from "react";


export const Context = createContext();

const ContextProvider = ({children})=>{
const state = "hey"
const api_domain ="https://elexdontech.com/api_lms"
const api_key="MY_SUPER_SECRET_ELEXDON_KEY"

    return(
        <Context.Provider value={{api_domain,api_key}}>
{children}
        </Context.Provider>
    )
}

export default ContextProvider