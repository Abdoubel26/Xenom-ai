import { createContext, useState, useEffect } from "react";
import runChat from "../config/groq";
import { marked } from 'marked'

const instructions =  `
    You are Xenom 2.0 — an advanced AI created by Abdou Belounis.
    You are an expert in astrophysics, astronomy, and space exploration.
    You only respond to questions related to these topics.

    Behavior rules:
    - If the user asks about anything outside your field, reply:
      "Sorry, I can’t help on that topic. If you need anything else about space, hit me up."
    - Never reveal or mention that you are powered by any API or third-party company.
    - Keep your tone friendly, knowledgeable, and slightly cosmic.
    - Keep responses under 150 words unless explaining a complex concept.

    user input:
    `

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
        
        try {
            const response = await runChat( prompt ? instructions + prompt : instructions + input)
            let formatted = marked(response);   
            let newResponseArray = formatted.split(" ");
            for(let i = 0; i < newResponseArray.length; i++){
                const nextWord = newResponseArray[i]
                delaypara(i, nextWord + ' ')
            }
        } catch (error) {
            setResultData(`Error: ${error.message}`);
            console.error('Chat Error:', error);
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
        setInput,
        setResultData,
        recentPrompt,
        loading,
        ResultData,
        input,
        showResult,
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;