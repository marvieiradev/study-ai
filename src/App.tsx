import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";

export default function App() {
  const [studyData, setStudyData] = useState<any>(null);

  const initData = `{
    "tema": "",
    "resumo": [],
    "insights": [],
    "dicas": [],
    "exercicios": []
}`;

  // 🔁 Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("studyai_data");
      if (saved) setStudyData(JSON.parse(saved));
    } catch (e) {
      localStorage.removeItem("studyai_data");
    }
  }, []);

  // 💾 Save to localStorage
  useEffect(() => {
    if (studyData) {
      localStorage.setItem("studyai_data", JSON.stringify(studyData));
    }
  }, [studyData]);

  return (
    <Routes>
      <Route path="/" element={<Home setStudyData={setStudyData} />} />
      <Route path="/dashboard" element={<Dashboard studyData={studyData} />} />
      <Route
        path="/game"
        element={
          studyData ? <Game studyData={studyData} /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}
