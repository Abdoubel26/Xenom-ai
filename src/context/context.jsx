import { createContext, useState } from "react";
import runChat from "../config/gemini";
import { marked } from 'marked'

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState('')
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompts, setPrevPrompts] = useState([])
    const [loading, setLoading] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [ResultData, setResultData] = useState('')

    const onSent = async (prompt) => {
        setRecentPrompt(prompt ? prompt : input )
        if(!prevPrompts.includes(prompt)){
            setPrevPrompts(prev=>[...prev, prompt ? prompt : input])
        }
        
        setLoading(true)
        setResultData('');
        setShowResult(true)
        const response = await runChat( prompt ? prompt : input)
        let formatted = marked(response);   
        let newResponseArray = formatted.split(" ");
        for(let i = 0; i < newResponseArray.length; i++){
            const nextWord = newResponseArray[i]
            delaypara(i, nextWord + ' ')
        }
        setLoading(false)
        setInput('')
    }

    const delaypara = (index, nextWord) =>{
        setTimeout( () => {
            setResultData(prev=>prev+nextWord);
        }, 75*index)
    }

    
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        setLoading,
        setShowResult,
        setResultData,
        setInput,
        setResultData,
        recentPrompt,
        loading,
        ResultData,
        input,
        setInput,
        showResult,
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;