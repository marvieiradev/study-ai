import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "../components/Card";
import DashboardMetrics from "../components/DashboardMetrics";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { InsightsCard } from "../components/InsightsCard";
import { IoDocumentText, IoRocketSharp } from "react-icons/io5";
import { FaBook } from "react-icons/fa6";
import { GenerateStudy } from "../components/GenerateStudy";
import { useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { MdInsights } from "react-icons/md";

interface StudyData {
  tema: string;
  resumo: string[];
  insights: string[];
  dicas: string[];
}

export default function Dashboard({ studyData }: { studyData: StudyData }) {
  const navigate = useNavigate();
  const [showGenerate, setShowGenerate] = useState(false);
  const init = sessionStorage.getItem("init");

  if (!studyData && !init) {
    navigate("/");
  }

  return (
    <>
      <div className="h-full md:h-screen flex flex-col bg-foreground/5 text-default md:overflow-hidden">
        <Header />
        {studyData && (
          <div className="w-full mx-auto px-4 mt-3 -mb-1">
            <Card>
              <div className="flex flex-col md:flex-row justify-between items-center md:shrink-0">
                <h1 className="text-lg font-bold text-foreground-dark mb-4 md:mb-0">
                  {studyData?.tema ? studyData.tema : "Sem estudos"}
                </h1>
                <div className="flex gap-4 md:gap-8 md:mt-0">
                  <Button type="outline" onClick={() => setShowGenerate(true)}>
                    Estudar
                    <FaBook className="h-4 w-4" />
                  </Button>
                  <Button type="normal" onClick={() => navigate("/game")}>
                    Praticar
                    <IoRocketSharp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="md:flex-1 md:min-h-0 mx-auto w-full p-4">
          <div className="h-full grid gap-3 grid-cols-1 md:auto-rows-fr md:grid-cols-3 md:grid-rows-3">
            <div className="md:col-span-1 md:row-span-3">
              <Card>
                <CardHeader>
                  <div className="bg-primary/15 p-1 rounded-lg">
                    <IoDocumentText className="h-5 w-5 text-primary-dark" />
                  </div>
                  <h1>Resumo Inteligente</h1>
                </CardHeader>
                <CardContent>
                  <p className=" text-foreground flex flex-col gap-2">
                    {studyData?.resumo.map((item, i) => (
                      <span
                        className="flex rounded-2xl bg-primary-light/10 text-start p-2"
                        key={i}
                      >
                        {item}
                      </span>
                    ))}
                  </p>
                  {studyData?.resumo.length <= 0 && <p>Sem Dados</p>}
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2 md:row-span-1">
              <Card>
                <CardHeader>
                  <div className="bg-primary/15 p-1 rounded-lg">
                    <MdInsights className="h-5 w-5 text-primary-dark" />
                  </div>
                  <h1>Métricas</h1>
                </CardHeader>
                <DashboardMetrics />
              </Card>
            </div>

            <div className="md:col-span-1 md:row-span-2 md:col-start-2">
              <Card>
                <CardHeader>
                  <div className="bg-primary/15 p-1 rounded-lg">
                    <FaLightbulb className="h-5 w-5 text-primary-dark" />
                  </div>
                  <h1>Dicas</h1>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {studyData?.dicas.map((item, i) => (
                      <InsightsCard key={i} text={item} />
                    ))}
                    {studyData?.dicas.length <= 0 && <p>Sem Dados</p>}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-1 md:row-span-2 md:col-start-3">
              <Card>
                <CardHeader>
                  <div className="bg-primary/15 p-1 rounded-lg">
                    <GiBrain className="h-5 w-5 text-primary-dark" />
                  </div>
                  <h1>Insights</h1>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {studyData?.insights.map((item, i) => (
                      <InsightsCard key={i} text={item} />
                    ))}
                    {studyData?.insights.length <= 0 && <p>Sem Dados</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <GenerateStudy
        open={showGenerate}
        onClose={() => setShowGenerate(false)}
      />
    </>
  );
}
