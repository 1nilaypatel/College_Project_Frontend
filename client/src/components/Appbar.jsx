import weather from "../assets/weather.png"

export default function Appbar() {
  return (
    <div className="border p-2 flex justify-start items-center bg-slate-300">
      <div className="px-14">
        <img style={{height: "40px"}} src={weather} alt="Logo" />
      </div>
      <div className="text-2xl flex gap-2">
        <p className="font-bold text-slate-600">Environment</p>
        <p className="text-slate-900">Analysis</p>
      </div>
    </div>
  );
}
