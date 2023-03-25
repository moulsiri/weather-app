import {createContext} from 'react';

export const GlobalContext=createContext(null);

const Context=({value,children})=>{
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

export default Context;