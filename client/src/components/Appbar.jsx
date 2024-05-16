import { useState } from "react";
import weather from "../assets/weather.png"

export default function Appbar() {
  return (
    <div className="border p-2 flex justify-between items-center bg-slate-300">
      <div className="px-14">
        <img style={{height: "40px"}} src={weather} alt="Logo" />
      </div>
    </div>
  );
}
