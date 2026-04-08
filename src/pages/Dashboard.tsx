import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";

interface StudyData {
  tema: string;
  resumo: string[];
  insights: string[];
  dicas: string[];
}

export default function Dashboard({ studyData }: { studyData: StudyData }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-cyan-400">{studyData.tema}</h1>

          <button
            onClick={() => navigate("/game")}
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-xl shadow-lg shadow-cyan-500/30 transition"
          >
            Praticar 🚀
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Resumo">
            {studyData.resumo.map((item, i) => (
              <p key={i}>• {item}</p>
            ))}
          </Card>

          <Card title="Insights">
            {studyData.insights.map((item, i) => (
              <p key={i}>• {item}</p>
            ))}
          </Card>

          <Card title="Dicas">
            {studyData.dicas.map((item, i) => (
              <p key={i}>• {item}</p>
            ))}
          </Card>

          <Card title="Métricas">
            <p>📚 Flashcards: 0</p>
            <p>🧠 Exercícios: 0</p>
            <p>⚡ Status: Pronto para prática</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
