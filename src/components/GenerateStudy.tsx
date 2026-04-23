import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Textarea } from "./Textarea";
import { useState, type SetStateAction } from "react";
import { generateStudyContent } from "../services/gemini";
import { estudo } from "../data/estudo";
import { IoMdCloseCircle } from "react-icons/io";
import { Loading } from "./Loading";
import { Alert } from "./Alert";
import { IoSparkles } from "react-icons/io5";

export function GenerateStudy({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [invisible, setInvisible] = useState(false);

  const navigate = useNavigate();
  const hasStudy = localStorage.getItem("studyai_data")!;
  const data = JSON.parse(hasStudy);

  if (!open) return null;

  async function handleGenerate() {
    if (!text) return;
    try {
      setShowLoading(true);
      setInvisible(true);
      const data = await generateStudyContent(text);
      setStudyData(data);
    } catch (err) {
      showAlertError();
    } finally {
      setShowLoading(false);
      navigate(0);
    }
  }

  function generateTestData() {
    setShowLoading(true);
    const text = JSON.parse(
      JSON.stringify(estudo[Math.floor(Math.random() * estudo.length)])
    );
    setTimeout(() => {
      setStudyData(text);
      setShowLoading(false);
      navigate(0);
    }, 4000);
  }

  function showAlertError() {
    setShowLoading(false);
    setShowAlert(true);
  }

  return (
    <>
      <div
        className={`w-full h-full bg-card-background/80 fixed inset-x-0 z-50 p-5 ${
          invisible ? "opacity-0" : ""
        }`}
      >
        <div className="h-full w-full flex flex-col items-center bg-card-background border-4 border-card-background rounded-2xl text-foreground-dark p-4 inset-x-0 z-50">
          <div className="flex w-full justify-end">
            <button className="" onClick={onClose}>
              <IoMdCloseCircle className="h-8 w-8 text-foreground cursor-pointer" />
            </button>
          </div>
          <div className="max-w-7xl justify-around items-center w-full flex flex-col gap-6 mt-8">
            <div className="flex gap-2 items-center justify-center max-w-5xl mb-2 md:mb-8">
              <h1 className="text-base md:text-2xl text-foreground">
                Use o{" "}
                <span className="bg-clip-text text-transparent bg-linear-to-r from-secondary to-primary font-bold">
                  Study AI
                </span>{" "}
                para gerar um estudo inteligente, com resumo, dicas e um modo
                prática totalmente interativo.
              </h1>
            </div>

            <Textarea
              value={text}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setText(e.target.value)
              }
              placeholder="Cole aqui o texto que deseja estudar"
              className="h-50 max-w-5xl border-2 border-card-border"
            />
            <Button type="normal" onClick={handleGenerate}>
              <IoSparkles className="w-5 h-5 " />
              Gerar Estudo
            </Button>
          </div>
          <div
            className="text-sm md:text-base cursor-pointer mt-4 md:mt-8 text-decoration-line: underline text-primary"
            onClick={generateTestData}
          >
            Ou clique aqui para gerar dados simulados
          </div>
          {hasStudy && data.tema && (
            <p className="font-semibold text-sm md:text-base mt-4 md:mt-8 mb-4 md:mb-8 text-secondary p-2 rounded-sm bg-secondary-light/20">
              Já existe um estudo! Gerar um novo estudo, substituirá o estudo
              atual.
            </p>
          )}
        </div>
      </div>
      <Loading open={showLoading} />
      <Alert
        open={showAlert}
        onNo={() => setShowAlert(false)}
        onYes={generateTestData}
      />
    </>
  );
}
function setStudyData(data: any) {
  localStorage.setItem("studyai_data", JSON.stringify(data));
}
