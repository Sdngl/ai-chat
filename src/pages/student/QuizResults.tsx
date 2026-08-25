import { Link, Navigate, useLocation } from "react-router-dom";

import { type QuizTopic } from "../../data/quizQuestions";

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
  result?: ArenaResult;
}

function QuizResults() {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const result = state?.result;

  if (!result) {
    return <Navigate to="/student/arena" replace />;
  }

  const accuracy = Math.round((result.correct / result.total) * 100);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="relative overflow-hidden rounded-3xl bg-green-600 p-6 text-center text-white sm:p-10">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="grid h-full grid-cols-6 gap-3 p-4 text-3xl">
            {["✦", "●", "◆", "✧", "▲", "■", "✦", "◆", "●", "✧", "■", "▲"].map(
              (shape, index) => (
                <span key={`${shape}-${index}`} className="animate-pulse">
                  {shape}
                </span>
              )
            )}
          </div>
        </div>

        <div className="relative">
          <p className="text-sm font-semibold text-green-100">
            RUN COMPLETE
          </p>

          <h1 className="mt-2 text-4xl font-bold">Victory Results</h1>

          <p className="mt-3 text-green-50">
            {result.topic} arena score locked in for this frontend run.
          </p>

          <p className="mt-6 text-6xl font-bold">{result.score}</p>
          <p className="mt-1 text-sm text-green-100">Final Score</p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [`${accuracy}%`, "Accuracy"],
          [String(result.correct), "Correct"],
          [String(result.wrong), "Wrong"],
          [`x${result.bestCombo}`, "Best Combo"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="rounded-2xl border border-gray-200 bg-white p-5 text-center"
          >
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="mt-1 text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
          <p className="text-sm font-semibold text-green-700">XP EARNED</p>
          <p className="mt-2 text-4xl font-bold text-green-800">
            +{result.xp}
          </p>
        </div>

        <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-6">
          <p className="text-sm font-semibold text-yellow-700">COINS EARNED</p>
          <p className="mt-2 text-4xl font-bold text-yellow-800">
            +{result.coins}
          </p>
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          to="/student/arena/solo"
          state={{ topic: result.topic }}
          className="flex-1 rounded-xl bg-green-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Play Again
        </Link>

        <Link
          to="/student/arena"
          className="flex-1 rounded-xl border border-gray-200 bg-white px-5 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Back to Arena
        </Link>
      </div>
    </div>
  );
}

export default QuizResults;
