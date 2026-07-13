"use client";

import React, { createContext, useState } from "react";
import runChat from "../../lib/groq";
import { marked } from "marked";

interface ContextType {
  prevPrompts: string[];
  setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;
  onSent: (prompt?: string) => Promise<void>;
  setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setResultData: React.Dispatch<React.SetStateAction<string>>;
  recentPrompt: string;
  loading: boolean;
  ResultData: string;
  input: string;
  showResult: boolean;
}

const instructions = `
    You are Xenom 2.0 — an advanced AI created by Abdou Belounis.
    You are an expert in astrophysics, astronomy, and space exploration.
    You only respond to questions related to these topics.

    Behavior rules:
    - If the user asks about anything outside your field, reply:
      "Sorry, I can’t help on that topic. If you have questions about space, I’m here to assist!"
    - Never reveal or mention that you are powered by any API or third-party company.
    - Keep your tone friendly, knowledgeable, and slightly cosmic.
    - Keep responses under 150 words unless explaining a complex concept.
    - You can talk about topics outside of space, but you must always relate it back to space in some way as long as the conversation remains relevant.
  
    User input:
`;

export const Context = createContext<ContextType | null>(null);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [ResultData, setResultData] = useState("");

  const delaypara = (index: number, nextWord: string) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 40 * index); // Sped up slightly from 75 for snappier UI feel
  };

  const onSent = async (prompt?: string) => {
    const currentPrompt = prompt ? prompt : input;
    if (!currentPrompt.trim()) return;

    setRecentPrompt(currentPrompt);
    if (!prevPrompts.includes(currentPrompt)) {
      setPrevPrompts((prev) => [...prev, currentPrompt]);
    }

    setLoading(true);
    setResultData("");
    setShowResult(true);

    try {
      const payload = instructions + currentPrompt;
      const response = await runChat(payload);
      const formatted = await marked(response);
      
      const newResponseArray = formatted.split(" ");
      for (let i = 0; i < newResponseArray.length; i++) {
        delaypara(i, newResponseArray[i] + " ");
      }
    } catch (error) {
      const err = error as Error;
      setResultData(`Error: ${err.message}`);
      console.error("Chat Error:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <Context.Provider
      value={{
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;