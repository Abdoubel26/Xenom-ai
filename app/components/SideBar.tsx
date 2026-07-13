"use client";

import { useContext, useState } from "react";
import { Context } from "../context/context";
import { Menu, Plus, MessageSquare, HelpCircle, History, Settings } from "lucide-react";
import  Link  from "next/link";

function SideBar() {
  const [extended, setExtended] = useState(false);
  const context = useContext(Context);

  if (!context) return null;

  const { onSent, prevPrompts, setRecentPrompt, setLoading, setShowResult, setResultData, setInput } = context;

  async function loadPrompt(prompt: string) {
    setRecentPrompt(prompt);
    await onSent(prompt);
  }

  function newchat() {
    setLoading(false);
    setShowResult(false);
    setRecentPrompt("");
    setInput("");
    setResultData("");
  }

  return (
    <div className={`hidden flex-col md:flex min-h-screen justify-between bg-[#f0f4f9] pr-6 pl-1.5 transition-all duration-200 ${!extended ? "w-20" : "w-70"}`}>
      <div className="h-[75%]">
        <Menu
          onClick={() => setExtended((prev) => !prev)}
          className={`h-11 w-11 cursor-pointer hover:bg-gray-300 mt-2 rounded-full p-2.5 transition-all ${!extended ? "rotate-180" : ""}`}
        />

        <div className={`${!extended ? "-ml-6 flex justify-center items-center" : ""}`}>
          <div
            onClick={() => (extended ? newchat() : setExtended(true))}
            className={`flex items-center my-5 cursor-pointer bg-gray-300 p-2 rounded-full hover:bg-gray-200 transition-all ${!extended ? "justify-center" : ""}`}
          >
            <Plus className="h-5 w-5" />
            {extended ? <p className="ml-2 text-sm font-medium">New Chat</p> : null}
          </div>
        </div>

        {extended ? <p className="mb-2 border-b text-sm font-semibold text-gray-500 px-2">Recent</p> : null}
        {extended ? (
          <div className="flex flex-col overflow-y-auto max-h-[60vh] no-scrollbar">
            {prevPrompts.map((item, index) => (
              <div
                onClick={() => loadPrompt(item)}
                key={index}
                className="flex items-center my-1 py-2 cursor-pointer hover:bg-gray-200 rounded-xl border border-gray-300 transition-all px-2"
              >
                <MessageSquare className="h-4 w-4 text-gray-600 mr-2 shrink-0" />
                <p className="text-sm truncate">{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 mb-4 pl-2">
        <div className="flex items-center cursor-pointer group" onClick={() => setExtended(true)}>
          <HelpCircle className="h-5 w-5 text-gray-600" />
          {extended ? (
            <Link 
                href="https://abdoubelounis.vercel.app/" 
                className="font-thin pl-2 text-sm group-hover:underline text-gray-600"
            >
                Help
            </Link>
            ) : null
        }
        </div>

        <div className="flex items-center cursor-pointer group" onClick={() => setExtended(true)}>
          <History className="h-5 w-5 text-gray-600" />
          {extended ? <p className="font-thin pl-2 text-sm group-hover:underline">History</p> : null}
        </div>

        <div className="flex items-center cursor-pointer group" onClick={() => setExtended(true)}>
          <Settings className="h-5 w-5 text-gray-600" />
          {extended ? <p className="font-thin pl-2 text-sm group-hover:underline">Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default SideBar;