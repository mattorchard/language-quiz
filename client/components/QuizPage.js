import { Fragment } from "preact";
import QuizForm from "./QuizForm";
import { useReducer } from "preact/hooks";
import {
  getQuestions,
  saveQuestions,
} from "../repositories/questionRepository";
import "./QuizPage.css";

const chooseRandomElement = array => Math.floor(Math.random() * array.length);

const initQuizReducer = () => {
  const questions = getQuestions();
  return {
    questions,
    currentQuestionIndex: chooseRandomElement(questions),
  };
};

const quizReducer = (state, action) => {
  if (action === "next") {
    return {
      ...state,
      currentQuestionIndex: chooseRandomElement(state.questions),
      answered: false,
    };
  }
  const correct = action === "correct";
  const questions = [...state.questions];
  const currentQuestion = questions[state.currentQuestionIndex];
  currentQuestion.submissions = [
    ...currentQuestion.submissions,
    {
      at: new Date(),
      correct,
    },
  ];
  saveQuestions(questions);
  return {
    ...state,
    correct,
    questions,
    answered: true,
  };
};

const clean = text =>
  text
    .trimStart()
    .trimEnd()
    .toLowerCase();

const QuizPage = () => {
  const [state, dispatch] = useReducer(quizReducer, null, initQuizReducer);
  const currentQuestion = state.questions[state.currentQuestionIndex];
  const handleAnswer = userAnswer => {
    const isCorrect = clean(userAnswer) === clean(currentQuestion.answer);
    dispatch(isCorrect ? "correct" : "incorrect");
  };

  return (
    <main>
      <QuizForm
        prompt={currentQuestion.prompt}
        onAnswer={handleAnswer}
        disabled={state.answered}
      />
      {state.answered && (
        <div className="quiz-page__answer-card">
          {state.isCorrect ? (
            <span className="quiz-page__answer-card__correct">
              🎊 Correct 🎊
            </span>
          ) : (
            <div>
              Incorrect, the correct answer is{" "}
              <strong className="quiz-page__answer-card__correction">
                {currentQuestion.answer}
              </strong>
            </div>
          )}

          <button
            type="button"
            onClick={() => dispatch({ type: "next" })}
            className="quiz-page__answer-card__next-btn"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default QuizPage;
