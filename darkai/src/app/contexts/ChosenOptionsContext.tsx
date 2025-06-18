'use client'
import {createContext, ReactNode, useContext, useState} from "react";

interface ChosenOptions {
    ilsdx: string,
    ilidx: string
}

interface ChosenOptionsContextType {
    chosenOptions: ChosenOptions,
    setChosenOptions: (chosenOptions:ChosenOptions) => void
}

const ChosenOptionsContext = createContext<ChosenOptionsContextType | undefined>(undefined);

export const ChosenOptionsProvider = ({children} : {children:ReactNode}) => {
    const [chosenOptions, setChosenOptions] = useState<ChosenOptions>({
        ilsdx: 'gold',
        ilidx: 'base'
    })

    return(
        <ChosenOptionsContext.Provider value={{chosenOptions, setChosenOptions}}>
            {children}
        </ChosenOptionsContext.Provider>
    )
}

export const useChosenOptions = () => {
    const context = useContext(ChosenOptionsContext);
    if(!context) {
        throw new Error('No context provided');
    }
    return context;
}