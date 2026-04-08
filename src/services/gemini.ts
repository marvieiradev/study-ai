import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateStudyContent(text: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const result = await model.generateContent(prompt(text));
  const response = await result.response;
  const raw = response.text().replace(/```json|```/g, "");

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Erro ao parsear:", raw);
    throw new Error("IA retornou formato inválido");
  }
}

const prompt = (userText: string) => `
Analise o conteúdo abaixo e retorne um JSON válido com:

- tema (string)
- resumo (array de strings)
- insights (array de strings)
- dicas (array de strings)
- exercicios (array com 10 itens mistos)

========================
TIPOS DE EXERCÍCIOS
========================

1. QUIZ (múltipla escolha)
{
  "type": "quiz",
  "question": "...",
  "options": ["A","B","C","D"],
  "answer": "..."
}

2. INPUT (resposta curta - UMA PALAVRA APENAS)
⚠️ REGRA OBRIGATÓRIA:
- resposta deve ter APENAS UMA palavra
- sem frases
- sem artigos (ex: "a", "o", "um")

Exemplo:
{
  "type": "input",
  "question": "A ___ é o terceiro planeta do sistema solar",
  "answer": "Terra"
}

3. COMPLETE (3 lacunas fixas)
⚠️ REGRAS OBRIGATÓRIAS:
- A frase deve ter EXATAMENTE 3 lacunas (___)
- Sempre 3 respostas
- As respostas DEVEM estar NA ORDEM CORRETA da frase
- Cada resposta deve ser UMA palavra

Exemplo:
{
  "type": "complete",
  "sentence": "A ___ é o ___ planeta do sistema ___",
  "answers": ["Terra","terceiro","solar"]
}

========================
REGRAS GERAIS
========================

- Gere EXATAMENTE 10 exercícios
- Misture os tipos (quiz, input, complete)
- NÃO repita perguntas
- NÃO use markdown
- NÃO explique nada
- Retorne APENAS JSON válido

IMPORTANTE:
- O campo "answers" no tipo COMPLETE deve estar na ORDEM CORRETA
- O usuário irá montar a resposta na ordem clicada
- A comparação será feita com base nessa ordem

Conteúdo:
${userText}
`;
