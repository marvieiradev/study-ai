import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import DashboardMetrics from "../components/DashboardMetrics";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { InsightsCard } from "../components/InsightsCard";

interface StudyData {
  tema: string;
  resumo: string[];
  insights: string[];
  dicas: string[];
}

export default function Dashboard({ studyData }: { studyData: StudyData }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen flex flex-col bg-gray-100 text-white md:overflow-hidden">
        <Header />
        {studyData && (
          <div className="max-w-6xl w-full mx-auto p-4 flex justify-between items-center md:shrink-0">
            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              {studyData.tema}
            </h1>
            <Button onClick={() => navigate("/")}>Estudar</Button>
            <Button onClick={() => navigate("/game")}>Praticar</Button>
          </div>
        )}

        <div className="md:flex-1 md:min-h-0 max-w-7xl mx-auto w-full p-4">
          <div className="h-full grid gap-4 grid-cols-1 md:auto-rows-fr md:grid-cols-3 md:grid-rows-3">
            <div className="md:col-span-1 md:row-span-3">
              <Card title="Resumo">
                <p className="text-justify text-gray-700">
                  {studyData.resumo.map((item, i) => (
                    <span key={i}>{item}</span>
                  ))}
                </p>
              </Card>
            </div>

            <div className="md:col-span-2 md:row-span-1">
              <Card title="Métricas">
                <DashboardMetrics />
              </Card>
            </div>

            <div className="md:col-span-1 md:row-span-2 md:col-start-2">
              <Card title="Dicas">
                {studyData.dicas.map((item, i) => (
                  <p key={i}>• {item}</p>
                ))}
              </Card>
            </div>

            <div className="md:col-span-1 md:row-span-2 md:col-start-3">
              <Card title="Insights">
                <div className="grid  gap-4">
                  {studyData.insights.map((item, i) => (
                    <InsightsCard key={i} text={item} />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
