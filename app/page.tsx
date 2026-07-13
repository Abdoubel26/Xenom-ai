"use client";

import SideBar from "./components/SideBar";
import Main from "./components/Main";

export default function Home() {
  return (
    <main className="flex flex-row min-h-full">
      <SideBar />
      <Main />
    </main>
  );
}