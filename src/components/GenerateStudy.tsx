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
        className={`w-full h-full bg-foreground-dark/90 fixed inset-x-0 z-50 p-5 ${
          invisible ? "opacity-0" : ""
        }`}
      >
        <div className="flex w-full h-full justify-center items-center">
          <div className="h-full w-full max-w-5xl flex flex-col items-center bg-card-background border-4 border-card-background rounded-2xl text-foreground-dark p-4 inset-x-0 z-50">
            <div className="flex w-full justify-end">
              <button className="" onClick={onClose}>
                <IoMdCloseCircle className="h-8 w-8 text-foreground hover:text-foreground-dark cursor-pointer" />
              </button>
            </div>
            <div className="flex flex-col h-full justify-around items-center w-full gap-6">
              <div className="max-w-7xl justify-center items-center w-full flex flex-col gap-6">
                <div className="gap-2 items-center justify-center max-w-4xl mb-2 md:mb-8">
                  <h1 className="text-xl md:text-3xl mb-4 bg-clip-text text-transparent bg-linear-to-r from-primary to-primary-accent font-bold">
                    Tudo pronto para começar seu aprendizado?
                  </h1>
                  <h2 className="text-base md:text-lg text-foreground">
                    Basta digitar ou colar o tema que você deseja dominar no
                    campo abaixo.
                  </h2>
                  <h2 className="text-base md:text-lg text-foreground">
                    Depois, clique em{" "}
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-primary-accent font-bold">
                      Gerar Estudo
                    </span>{" "}
                    para que nossa inteligência crie seu roteiro personalizado
                    com resumos e exercícios.
                  </h2>
                </div>

                <Textarea
                  value={text}
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setText(e.target.value)}
                  placeholder="Cole aqui o texto que deseja estudar"
                  className="h-50 max-w-5xl border-2 border-card-border"
                />
                <Button type="normal" onClick={handleGenerate}>
                  <IoSparkles className="w-7 h-7 " />
                  <span className="text-lg">Gerar Estudo</span>
                </Button>
              </div>
              <div>
                <div
                  className="text-sm md:text-base cursor-pointer mt-4 md:mt-8 text-decoration-line: underline text-primary"
                  onClick={generateTestData}
                >
                  Ou clique aqui para gerar dados simulados
                </div>
                {hasStudy && data.tema && (
                  <p className="font-semibold text-sm md:text-base mt-4 md:mt-8 mb-4 md:mb-8 text-foreground p-2 rounded-sm bg-secondary-light/20">
                    Já existe um estudo! Gerar um novo estudo, substituirá o
                    estudo atual.
                  </p>
                )}
              </div>
            </div>
          </div>
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
