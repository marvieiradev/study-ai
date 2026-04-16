import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import DashboardMetrics from "../components/DashboardMetrics";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { InsightsCard } from "../components/InsightsCard";
import { IoRocketSharp } from "react-icons/io5";
import { FaBook } from "react-icons/fa6";

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
          <div className="max-w-7xl w-full mx-auto p-4 py-2 mt-2 flex justify-between items-center md:shrink-0">
            <h1 className="text-2xl font-bold text-gray-800 mt-2">
              {studyData.tema}
            </h1>
            <Button onClick={() => navigate("/")}>
              Estudar
              <FaBook className="h-5 w-5" />
            </Button>
            <Button onClick={() => navigate("/game")}>
              Praticar
              <IoRocketSharp className="h-5 w-5" />
            </Button>
          </div>
        )}

        <div className="md:flex-1 md:min-h-0 max-w-7xl mx-auto w-full p-4">
          <div className="h-full grid gap-3 grid-cols-1 md:auto-rows-fr md:grid-cols-3 md:grid-rows-3">
            <div className="md:col-span-1 md:row-span-3">
              <Card title="Resumo Inteligente">
                <p className=" text-gray-700 flex flex-col gap-2">
                  {studyData.resumo.map((item, i) => (
                    <p
                      className="flex rounded-2xl bg-gray-100 text-start p-2"
                      key={i}
                    >
                      {item}
                    </p>
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
                <div className="grid grid-cols-2  gap-4">
                  {studyData.dicas.map((item, i) => (
                    <InsightsCard key={i} text={item} />
                  ))}
                </div>
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
