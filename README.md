# 🚀 StudyAI

StudyAI é uma plataforma de estudos inteligente com IA que transforma conteúdos em experiências gamificadas de aprendizado.

O usuário pode colar qualquer texto e a IA automaticamente:

- identifica o tema
- gera resumos
- cria insights
- fornece dicas de estudo
- cria exercícios gamificados

Tudo isso dentro de uma interface moderna inspirada em plataformas como Duolingo e dashboards inteligentes.

---

# ✨ Funcionalidades

## 🧠 Geração Inteligente com IA

A aplicação utiliza Google Gemini para:

- analisar conteúdos
- gerar resumos
- identificar assuntos principais
- criar insights automáticos
- sugerir dicas de aprendizado
- gerar exercícios dinâmicos

---

# 🎮 Sistema Gamificado

O StudyAI possui um sistema de exercícios inspirado em apps de aprendizado modernos.

## Tipos de exercícios

### ✅ Quiz

Perguntas de múltipla escolha.

Exemplo:

```txt
Qual é o terceiro planeta do sistema solar?
A) Mercúrio
B) Vênus
C) Terra
D) Marte
```

---

### ✍️ Responder

O usuário precisa digitar uma palavra.

Exemplo:

```txt
A ____ é o terceiro planeta do sistema solar.
```

Resposta:

```txt
Terra
```

---

### 🧩 Completar

O usuário precisa montar a frase na ordem correta.

Exemplo:

```txt
A ___ é o ___ planeta do sistema ___
```

Respostas:

```txt
Terra
terceiro
solar
```

## Recursos do modo completar

- palavras embaralhadas
- slots visuais interativos
- clique para adicionar palavras
- clique no slot para remover palavras
- comparação por ordem correta
- reset de tentativa

---

# 📊 Dashboard Inteligente

O dashboard exibe:

- resumo do conteúdo
- insights gerados pela IA
- dicas de estudo
- métricas do usuário
- conquistas desbloqueadas

---

# 📈 Sistema de Métricas

As métricas funcionam como o perfil permanente do usuário.

Elas permanecem salvas mesmo quando o conteúdo atual é apagado.

## Métricas disponíveis

- XP
- Nível
- Precisão (%)
- Exercícios respondidos
- Sessões concluídas
- Melhor pontuação
- Sequência de dias (streak)

---

# 🏆 Sistema de Conquistas

O app possui conquistas desbloqueáveis.

Exemplos:

- Primeiros Passos
- Mandando Bem
- Focado
- On Fire 🔥
- Mestre

---

# 💾 Persistência de Dados

A aplicação utiliza LocalStorage para:

- manter métricas
- salvar progresso
- armazenar estudos atuais
- manter conquistas desbloqueadas

---

# 🎨 UI/UX

O projeto utiliza:

- tema light
- detalhes neon
- layout responsivo
- componentes reutilizáveis
- interface gamificada

---

# 🛠️ Tecnologias

## Frontend

- React
- Vite
- TailwindCSS
- React Router

## IA

- Google Gemini API

---

# 🎥 Demonstração

[![Assistir vídeo](https://github.com/marvieiradev/study-ai/blob/master/src/assets/screenshot.webp)](https://www.youtube.com/watch?v=Uj4__5Uj70A)

---

# 📂 Estrutura do Projeto

```txt
src/
 ├── components/
 │    ├── Achievements
 │    ├── Alert
 │    ├── Button
 │    ├── Card
 │    ├── CardMetrics
 │    ├── CardResults
 │    ├── ChartBar
 │    ├── ChartDoughnut
 │    ├── DashboardMetrics
 │    ├── GameButton
 │    ├── GameFeedback
 │    ├── GameModeComplete
 │    ├── GameModeQuiz
 │    ├── GameModeRespond
 │    ├── GameOver
 │    ├── GenerateStudy
 │    ├── Header
 │    ├── InsightsCard
 │    ├── Loading
 │    ├── ProgressBar
 │    ├── SemiCircleProgress
 │    ├── TextArea

 │
 ├── pages/
 │    ├── Home
 │    ├── Dashboard
 │    ├── Game
 │
 ├── services/
 │    ├── ai.js
 │
 ├── utils/
 │    ├── storage.js
 │    ├── metrics.js
```

---

# ⚡ Fluxo da Aplicação

```txt
Home
 ↓
Gerar estudo com IA
 ↓
Dashboard inteligente
 ↓
Modo gamificado
 ↓
Métricas e conquistas
```

---

# 🔥 Diferenciais do Projeto

- IA aplicada ao aprendizado
- Dashboard inteligente
- Sistema gamificado
- Métricas persistentes
- Conquistas desbloqueáveis
- UX inspirada em apps modernos
- Exercícios dinâmicos gerados automaticamente

---

# 🚀 Futuras Melhorias

- Upload de PDF
- Upload de imagens
- Flashcards inteligentes
- Ranking online
- Sistema de login
- Banco de dados real
- Sons e animações
- Modo multiplayer
- Recomendações personalizadas com IA

---

# 📄 Licença

Projeto desenvolvido para fins educacionais e participação em competição de programação.
