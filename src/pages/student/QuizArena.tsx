import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { quizTopics, type QuizTopic } from "../../data/quizQuestions";

const topicDetails: Record<QuizTopic, { icon: string; description: string }> = {
  React: {
    icon: "⚛",
    description: "Components, hooks, JSX, and state battles.",
  },
  JavaScript: {
    icon: "JS",
    description: "Core language, arrays, async, and modern syntax.",
  },
  Python: {
    icon: "Py",
    description: "Functions, data types, loops, and clean logic.",
  },
  Database: {
    icon: "DB",
    description: "SQL, keys, joins, and table strategy.",
  },
  "HTML & CSS": {
    icon: "CSS",
    description: "Semantic markup, selectors, layout, and styling.",
  },
};

function QuizArena() {
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic>("React");
  const navigate = useNavigate();

  const startRun = () => {
    navigate("/student/arena/solo", {
      state: {
        topic: selectedTopic,
      },
    });
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-green-600 text-white">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-green-100">
              SOLO RUN
            </p>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              ⚔️ Quiz Arena
            </h1>

            <p className="mt-3 max-w-2xl text-green-50">
              Pick a topic, protect your lives, and build a combo streak
              before the timer runs out.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 rounded-2xl bg-white/10 p-4">
            {[
              ["10", "Questions"],
              ["3", "Lives"],
              ["15s", "Timer"],
            ].map(([value, label]) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold">{value}</p>
                <p className="mt-1 text-xs text-green-100">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-green-600">
              CHOOSE YOUR ARENA
            </p>

            <h2 className="mt-1 text-2xl font-bold">Select a topic</h2>
          </div>

          <button
            onClick={startRun}
            className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Start Run
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quizTopics.map((topic) => {
            const detail = topicDetails[topic];
            const isSelected = selectedTopic === topic;

            return (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`rounded-2xl border bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-md ${
                  isSelected
                    ? "border-green-500 ring-2 ring-green-100"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold ${
                      isSelected
                        ? "bg-green-600 text-white"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    {detail.icon}
                  </div>

                  <div>
                    <h3 className="font-bold">{topic}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {detail.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default QuizArena;
