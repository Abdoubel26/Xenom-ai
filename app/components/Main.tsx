"use client";

import { useContext } from "react";
import { Context } from "../context/context";
import { CircleDot, User, Image, Mic, SendHorizontal } from "lucide-react";

function Main() {
  const context = useContext(Context);
  if (!context) return null;

  const { onSent, recentPrompt, showResult, loading, ResultData, setInput, input } = context;

  return (
    <div className="w-full flex flex-col justify-between h-screen bg-white text-black">

      <div className="flex justify-between items-center p-4">
        <p className="text-2xl font-bold tracking-tight">Xenom AI</p>
        <div className="bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-300">
          <User className="w-6 h-6 text-gray-700" />
        </div>
      </div>

      {!showResult ? (
        <div className="flex flex-col items-center justify-center flex-1 px-4">
          <div className="p-2 mb-8 max-w-4xl w-full text-left">
            <p className="bg-linear-to-r text-5xl sm:text-6xl from-blue-500 to-red-600 bg-clip-text text-transparent font-semibold">
              Hello, Cosmic Explorer!
            </p>
            <p className="font-semibold sm:text-6xl text-4xl text-gray-300 mt-2">
              Ready to explore the universe?
            </p>
          </div>

         
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-5 px-[5%] no-scrollbar">
          <div className="flex items-start mb-7 gap-3">
            <div className="bg-gray-300 p-2 rounded-full shrink-0">
              <User className="h-5 w-5 text-gray-700" />
            </div>
            <div className="my-1 p-3 bg-gray-100 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl max-w-[80%]">
              <p className="text-sm">{recentPrompt}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CircleDot className="h-9 w-9 p-1.5 bg-blue-100 text-blue-600 rounded-full shrink-0 animate-pulse" />
            <div className="flex-1">
              {loading ? (
                <div className="w-full flex flex-col gap-3 mt-2">
                  <div className="animate-pulse rounded-xl bg-linear-to-r from-blue-100 via-gray-100 to-blue-100 h-5 w-[90%]"></div>
                  <div className="animate-pulse rounded-xl bg-linear-to-r from-blue-100 via-gray-100 to-blue-100 h-5 w-[95%]"></div>
                  <div className="animate-pulse rounded-xl bg-linear-to-r from-blue-100 via-gray-100 to-blue-100 h-5 w-[60%]"></div>
                </div>
              ) : (
                <div
                  className="text-[16px] font-normal leading-relaxed prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: ResultData }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="w-full flex flex-col items-center px-4 pb-4">

        {!showResult && (
           <div className="flex flex-col lg:flex-row gap-3 justify-center w-full">
            {[
              "What exactly is a black hole?",
              "How old is the universe?",
              "What is the black hole information paradox?",
              "Why do accrection disks form around black holes?"
            ].map((promptText, i) => (
              <div
                key={i}
                onClick={() => onSent(promptText)}
                className="bg-gray-100 p-4 rounded-xl flex flex-col justify-between text-gray-700 cursor-pointer h-36 lg:w-60 w-full transition-all hover:bg-gray-200 border border-gray-200"
              >
                <p className="text-sm font-medium leading-snug">{promptText}</p>
                <CircleDot className="h-8 w-8 p-1.5 bg-white text-blue-500 self-end rounded-full shadow-sm" />
              </div>
            ))}
          </div>
        )}
        <div className="sm:w-[70%] mt-4 w-full bg-blue-50/70 border border-blue-100 rounded-full flex items-center px-4 py-2 shadow-sm">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={loading ? "" : input}
            className="w-full bg-transparent py-2 text-md focus:outline-none text-gray-800 placeholder-gray-400"
            placeholder="Enter a prompt here"
            onKeyDown={(e) => e.key === "Enter" && onSent()}
          />
          <div className="flex items-center gap-3 text-gray-500 shrink-0">
            <Image className="h-5 w-5 cursor-pointer hover:text-gray-800" />
            <Mic className="h-5 w-5 cursor-pointer hover:text-gray-800" />
            {input !== "" && (
              <SendHorizontal
                onClick={() => onSent()}
                className="h-9 w-9 cursor-pointer p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all"
              />
            )}
          </div>
        </div>
        <p className="text-xs text-center text-gray-400 mt-3 max-w-2xl">
          Xenom may display inaccurate info, including about people, so double-check its responses. Your privacy and Xenom Apps
        </p>
      </div>
    </div>
  );
}

export default Main;