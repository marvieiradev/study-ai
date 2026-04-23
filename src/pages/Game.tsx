import { useEffect, useState } from "react";
import {
  updateAfterAnswer,
  finishSession,
  checkAchievements,
} from "../services/metrics";
import { useNavigate } from "react-router-dom";
import { GoHeartFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import GameFeedback from "../components/GameFeedback";
import { GameModeRespond } from "../components/GameModeRespond";
import { GameModeComplete } from "../components/GameModeComplete";
import { GameModeQuiz } from "../components/GameModeQuiz";
import GameOver from "../components/GameOver";
import { FaStar } from "react-icons/fa6";

export default function Game({ studyData }: { studyData: any }) {
  const [current, setCurrent] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [activeTime, setActiveTime] = useState(true);

  const exercises = studyData.exercicios || [];
  const exercise = exercises[current];
  const gameOver = lives <= 0;
  const resultGameOver = gameOver ? false : true;

  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (activeTime) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      // @ts-expect-error
      clearInterval(interval);
    }
    // @ts-expect-error
    return () => clearInterval(interval);
  }, [activeTime]);

  function handleNext() {
    if (current + 1 < exercises.length) {
      setCurrent(current + 1);
    } else {
      setActiveTime(false);
      setShowGameOver(true);
      finishSession(score);
      checkAchievements();
    }
    setShowFeedback(false);
    if (gameOver) setShowGameOver(true);
  }

  function handleCorrect() {
    setIsCorrect(true);
    setScore(score + 10);
    updateAfterAnswer(true);
    checkAchievements();
    setIsCorrect(true);
    setShowFeedback(true);
  }

  function handleWrong() {
    setLives(lives - 1);
    setIsCorrect(false);
    setShowFeedback(true);
    if (gameOver) {
      setCurrent(0);
      setLives(3);
      setScore(0);
    }
    updateAfterAnswer(false);
    checkAchievements();
  }

  if (!exercise) return <p className="text-foreground">Sem exercícios</p>;

  return (
    <>
      <div className="min-h-screen w-full bg-default text-foreground-dark p-6 flex flex-col gap-6 max-w-3xl mx-auto">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <GoHeartFill className="w-5 h-5 text-error" />
            <span className="text-foreground text-lg md:text-xl font-semibold">
              {" "}
              {lives}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <FaStar className="w-5 h-5 text-warning" />
            <span className="text-foreground text-lg md:text-xl font-semibold">
              {" "}
              {score}
            </span>
          </div>
          <div className="flex gap-2 items-center ">
            <button
              className="cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <AiFillCloseCircle className="w-7 h-7 text-foreground" />
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <div className="bg-card-border rounded-full h-4 overflow-hidden">
            <div
              className={`bg-linear-to-r from-secondary to-primary h-4 rounded-full transition-all duration-500`}
              style={{
                width: `${((current + 1) / exercises.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-foreground font-semibold text-md">
            Exercício {current + 1}/{exercises.length}
          </p>
        </div>

        <div
          className={`${
            showFeedback ? "blur-[1px] opacity-40 pointer-events-none" : ""
          }`}
        >
          {exercise.type === "quiz" && (
            <GameModeQuiz
              exercise={exercise}
              onCorrect={handleCorrect}
              onWrong={handleWrong}
            />
          )}

          {exercise.type === "input" && (
            <GameModeRespond
              exercise={exercise}
              onCorrect={handleCorrect}
              onWrong={handleWrong}
            />
          )}

          {exercise.type === "complete" && (
            <GameModeComplete
              exercise={exercise}
              onCorrect={handleCorrect}
              onWrong={handleWrong}
            />
          )}
        </div>
        <GameFeedback
          open={showFeedback}
          onContinue={handleNext}
          isCorrect={isCorrect}
        />

        <GameOver
          open={showGameOver}
          result={resultGameOver}
          precision={Math.round((score / (exercises.length * 10)) * 100)}
          time={seconds}
          xp={score}
        />
      </div>
    </>
  );
}
