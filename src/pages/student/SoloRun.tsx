import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  quizQuestions,
  quizTopics,
  type QuizQuestion,
  type QuizTopic,
} from "../../data/quizQuestions";

interface ArenaResult {
  topic: QuizTopic;
  score: number;
  correct: number;
  wrong: number;
  total: number;
  bestCombo: number;
  xp: number;
  coins: number;
}

interface LocationState {
  topic?: QuizTopic;
}

const questionTime = 15;
const totalLives = 3;
const totalQuestions = 10;

function shuffleItems<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function isQuizTopic(topic: unknown): topic is QuizTopic {
  return typeof topic === "string" && quizTopics.includes(topic as QuizTopic);
}

function SoloRun() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const topic = isQuizTopic(state?.topic) ? state.topic : "React";

  const questions = useMemo(() => {
    return shuffleItems(
      quizQuestions.filter((question) => question.topic === topic)
    )
      .slice(0, totalQuestions)
      .map((question) => ({
        ...question,
        options: shuffleItems(question.options),
      }));
  }, [topic]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(totalLives);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questionTime);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | "timeout" | null>(
    null
  );

  const currentQuestion: QuizQuestion | undefined = questions[currentIndex];
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const finishRun = (
    finalScore: number,
    finalCorrect: number,
    finalWrong: number,
    finalBestCombo: number
  ) => {
    const accuracy = finalCorrect / totalQuestions;
    const xp = Math.round(finalScore / 12 + finalCorrect * 8 + finalBestCombo * 5);
    const coins = Math.round(finalScore / 60 + finalCorrect * 2 + accuracy * 10);
    const result: ArenaResult = {
      topic,
      score: finalScore,
      correct: finalCorrect,
      wrong: finalWrong,
      total: totalQuestions,
      bestCombo: finalBestCombo,
      xp,
      coins,
    };

    navigate("/student/arena/results", {
      replace: true,
      state: {
        result,
      },
    });
  };

  const moveNext = (
    nextLives: number,
    nextScore: number,
    nextCorrect: number,
    nextWrong: number,
    nextBestCombo: number
  ) => {
    const isLastQuestion = currentIndex + 1 >= totalQuestions;

    window.setTimeout(() => {
      if (isLastQuestion || nextLives <= 0) {
        finishRun(nextScore, nextCorrect, nextWrong, nextBestCombo);
        return;
      }

      setCurrentIndex((index) => index + 1);
      setSelectedAnswer("");
      setFeedback(null);
      setTimeLeft(questionTime);
    }, 900);
  };

  const markWrong = (reason: "wrong" | "timeout") => {
    if (!currentQuestion || feedback) {
      return;
    }

    const nextLives = lives - 1;
    const nextWrong = wrong + 1;

    setFeedback(reason);
    setCombo(0);
    setLives(nextLives);
    setWrong(nextWrong);
    moveNext(nextLives, score, correct, nextWrong, bestCombo);
  };

  const handleAnswer = (answer: string) => {
    if (!currentQuestion || feedback) {
      return;
    }

    setSelectedAnswer(answer);

    if (answer !== currentQuestion.answer) {
      markWrong("wrong");
      return;
    }

    const nextCombo = combo + 1;
    const multiplier = 1 + nextCombo * 0.25;
    const earnedPoints = Math.round((100 + timeLeft * 8) * multiplier);
    const nextScore = score + earnedPoints;
    const nextCorrect = correct + 1;
    const nextBestCombo = Math.max(bestCombo, nextCombo);

    setFeedback("correct");
    setCombo(nextCombo);
    setBestCombo(nextBestCombo);
    setCorrect(nextCorrect);
    setScore(nextScore);
    moveNext(lives, nextScore, nextCorrect, wrong, nextBestCombo);
  };

  useEffect(() => {
    if (feedback) {
      return;
    }

    if (timeLeft <= 0) {
      markWrong("timeout");
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [feedback, timeLeft]);

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-green-600">
              {topic.toUpperCase()} SOLO RUN
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Question {currentIndex + 1} of {totalQuestions}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-green-50 px-4 py-3">
              <p className="text-xs text-gray-500">Score</p>
              <p className="font-bold text-green-700">{score}</p>
            </div>

            <div className="rounded-2xl bg-red-50 px-4 py-3">
              <p className="text-xs text-gray-500">Lives</p>
              <p className="font-bold text-red-600">
                {"❤️".repeat(lives)}
                {"♡".repeat(totalLives - lives)}
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 px-4 py-3">
              <p className="text-xs text-gray-500">Combo</p>
              <p className="font-bold text-orange-600">🔥 x{combo}</p>
            </div>

            <div className="rounded-2xl bg-gray-50 px-4 py-3">
              <p className="text-xs text-gray-500">Timer</p>
              <p className="font-bold text-gray-900">{timeLeft}s</p>
            </div>
          </div>
        </div>

        <div className="mt-5 h-2 rounded-full bg-gray-100">
          <div
            className="h-2 rounded-full bg-green-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            {timeLeft > 5 ? "Focus" : "Hurry"}
          </div>

          {feedback && (
            <div
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                feedback === "correct"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {feedback === "correct" ? "Correct!" : "Wrong!"}
            </div>
          )}
        </div>

        <h2 className="mt-6 text-xl font-bold sm:text-2xl">
          {currentQuestion.question}
        </h2>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {currentQuestion.options.map((option) => {
            const isCorrect = option === currentQuestion.answer;
            const isSelected = selectedAnswer === option;
            const showCorrect = feedback && isCorrect;
            const showWrong = feedback && isSelected && !isCorrect;

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={Boolean(feedback)}
                className={`min-h-20 rounded-2xl border p-4 text-left font-medium transition ${
                  showCorrect
                    ? "border-green-500 bg-green-50 text-green-700"
                    : showWrong
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50"
                } disabled:cursor-not-allowed`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
          Points scale with correct answers, remaining time, and combo
          multiplier.
        </div>
      </section>
    </div>
  );
}

export default SoloRun;
