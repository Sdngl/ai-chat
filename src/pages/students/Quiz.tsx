import { useState } from "react";

function Quiz() {
  const [selected, setSelected] = useState("");

  const options = [
    "A reusable UI component",
    "A database",
    "A programming language",
    "A CSS framework",
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-medium text-green-600">
        REACT FUNDAMENTALS
      </p>

      <h1 className="mt-2 text-3xl font-bold">Lesson Quiz</h1>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Question 1 of 10</span>
          <span>10%</span>
        </div>

        <h2 className="mt-6 text-xl font-bold">
          What is a React component?
        </h2>

        <div className="mt-6 space-y-3">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                selected === option
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          disabled={!selected}
          className="mt-6 w-full rounded-xl bg-green-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
}

export default Quiz;