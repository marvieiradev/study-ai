import { useNavigate } from "react-router-dom";

interface StudyData {
  tema: string;
  resumo: string[];
  insights: string[];
  dicas: string[];
}

export default function Dashboard({ studyData }: { studyData: StudyData }) {
  const navigate = useNavigate();

  return (
    <div className="">
      <h1>{studyData.tema}</h1>

      <h2>Resumo</h2>
      {studyData.resumo.map((item, i) => (
        <p key={i}>• {item}</p>
      ))}

      <h2>Insights</h2>
      {studyData.insights.map((item, i) => (
        <p key={i}>• {item}</p>
      ))}

      <h2>Dicas</h2>
      {studyData.dicas.map((item, i) => (
        <p key={i}>• {item}</p>
      ))}

      <button onClick={() => navigate("/game")}>Praticar</button>
    </div>
  );
}
