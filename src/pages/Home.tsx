import { useEffect, useState, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../components/Textarea";
import { Button } from "../components/Button";
import { generateStudyContent } from "../services/gemini";

export default function Home({
  setStudyData,
}: {
  setStudyData: (data: any) => void;
}) {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const hasData = localStorage.getItem("studyai_data") !== null;
    if (hasData) {
      navigate("/dashboard");
    }
  }, []);

  async function handleGenerate() {
    if (!text) return;

    try {
      const data = await generateStudyContent(text);
      console.log("Dados gerados:", data);
      setStudyData(data);
      navigate("/dashboard");
    } catch (err) {
      alert("Erro ao gerar conteúdo");
    }
  }

  function canUseAI() {
    const count = Number(localStorage.getItem("ai_usage") || 0);

    if (count >= 5) {
      alert("Limite diário atingido");
      return false;
    }

    localStorage.setItem("ai_usage", String(count + 1));
    return true;
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
