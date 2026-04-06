import { useState, type SetStateAction } from "react";
import { Button } from "./components/Button";
import { Card, CardContent } from "./components/Card";
import { Textarea } from "./components/Textarea";
import { motion } from "framer-motion";

export default function StudyAI() {
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">StudyAI</h1>
          <Button variant="outline">Histórico</Button>
        </div>

        {/* Input */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4 space-y-4">
            <Textarea
              placeholder="Cole aqui seu conteúdo de estudo..."
              value={text}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setText(e.target.value)
              }
              className="bg-zinc-950 border-zinc-800 min-h-37.5"
            />
            <Button className="w-full">Gerar Estudo Inteligente</Button>
          </CardContent>
        </Card>

        {/* Dashboard */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Resumo */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">Resumo</h2>
                <p className="text-zinc-400 text-sm">
                  Aqui aparecerá o resumo gerado pela IA...
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Flashcards */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4 space-y-3">
                <h2 className="text-xl font-semibold">Flashcards</h2>
                <div className="p-3 bg-zinc-800 rounded-xl">
                  <p className="font-medium">Pergunta:</p>
                  <p className="text-zinc-400">O que é IA?</p>
                </div>
                <div className="p-3 bg-zinc-800 rounded-xl">
                  <p className="font-medium">Resposta:</p>
                  <p className="text-zinc-400">
                    Simulação da inteligência humana.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quiz */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4 space-y-3">
                <h2 className="text-xl font-semibold">Quiz</h2>
                <p className="text-sm">O que é Inteligência Artificial?</p>
                <div className="space-y-2">
                  <Button variant="secondary" className="w-full">
                    A) Opção 1
                  </Button>
                  <Button variant="secondary" className="w-full">
                    B) Opção 2
                  </Button>
                  <Button variant="secondary" className="w-full">
                    C) Opção 3
                  </Button>
                  <Button variant="secondary" className="w-full">
                    D) Opção 4
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Desempenho */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">Desempenho</h2>
                <p className="text-zinc-400 text-sm">Gráfico virá aqui...</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
