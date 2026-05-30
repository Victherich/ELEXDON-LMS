import React, { createContext } from "react";


export const Context = createContext();

const ContextProvider = ({children})=>{
const state = "hey"
const api_domain ="https://elexdontech.com/apiLMS"
const api_key="MY_SUPER_SECRET_ELEXDON_KEY"

const universitySubscriptionPrice = 4000

    return(
        <Context.Provider value={{api_domain,api_key, universitySubscriptionPrice}}>
{children}
        </Context.Provider>
    )
}

export default ContextProvider