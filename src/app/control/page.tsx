'use client'

import { useEffect, useState } from "react";


export default function Control() {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = async (action: string) => {
    const response = await fetch("/api/slider", { method: "POST", body: JSON.stringify({ action: action }) });
    const result = await response.json();
    setCurrentIndex(result.index);
    console.log(result);
  }

  useEffect(() => {
    const fetchCurrentIndex = async () => {
      const response = await fetch("/api/slider");
      const result = await response.json();
      setCurrentIndex(result.index);
    }
    fetchCurrentIndex();
  });

  return <div className="h-[100dvh] bg-white flex flex-col items-center justify-start overflow-hidden overflow-y-hidden gap-2 overscroll-y-none">
    <div className="p-4 text-xl bg-[#221543] w-full h-[10vh] font-bold text-white flex items-center justify-center">
      <div className="flex-1">Controle Slide</div>
      <div>Atual: {currentIndex}</div>
    </div>

    <div className="flex flex-row gap-2 flex-1 w-full px-2">
      <button onClick={() => handleChange("back")} className="bg-[#321f63] p-2 rounded-lg w-full text-white font-bold tracking-widest">VOLTAR</button>
      <button onClick={() => handleChange("next")} className="bg-[#321f63] p-2 rounded-lg w-full text-white font-bold tracking-widest">AVANÇAR</button>
    </div>
    <div className="w-full px-2 pb-4 h-[10%]">
      <button onClick={() => handleChange("clear")} className="bg-[#321f63] text-white p-2 rounded-lg w-full h-full font-bold tracking-widest">INÍCIO</button>
    </div>
  </div>
}