import { Fragment } from "preact";
import QuizForm from "./QuizForm";
import { useReducer } from "preact/hooks";
import {
  getQuestions,
  saveQuestions,
} from "../repositories/questionRepository";

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
      <h2>Quiz</h2>
      <QuizForm
        prompt={currentQuestion.prompt}
        onAnswer={handleAnswer}
        disabled={state.answered}
      />
      {state.answered && (
        <Fragment>
          {state.correct ? (
            "🎊 Correct 🎊"
          ) : (
            <Fragment>
              Wrong, the correct answer was{" "}
              <strong>{currentQuestion.answer}</strong>
            </Fragment>
          )}
          <button type="button" onClick={() => dispatch("next")}>
            Next
          </button>
        </Fragment>
      )}
    </main>
  );
};

export default QuizPage;
