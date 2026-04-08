import { useState, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../components/Textarea";
import { Button } from "../components/Button";

export default function Home({
  setStudyData,
}: {
  setStudyData: (data: any) => void;
}) {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  function handleGenerate() {
    // ⚠️ MOCK (substituir pela IA depois)
    const mock = {
      tema: "Sistema Solar",
      resumo: ["O sistema solar possui 8 planetas"],
      insights: ["A Terra é o único planeta com vida conhecida"],
      dicas: ["Estude pelos planetas em ordem"],
      flashcards: [],
      exercicios: [],
    };

    setStudyData(mock);
    navigate("/dashboard");
  }

  return (
    <div className="">
      <h1>StudyAI</h1>
      <Textarea
        value={text}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setText(e.target.value)
        }
        placeholder="Cole aqui o texto que deseja estudar"
      />
      <Button onClick={handleGenerate}>Gerar</Button>
    </div>
  );
}
