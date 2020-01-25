import QuizForm from "./QuizForm";
import { useReducer } from "preact/hooks";
import {
  getQuestions,
  saveQuestions,
} from "../repositories/questionRepository";
import "./QuizPage.css";
import chooseQuestion from "../helpers/chooseQuestion";

const initQuizReducer = () => {
  const questions = getQuestions();
  return {
    questions,
    currentQuestionIndex: chooseQuestion(questions),
  };
};

const quizReducer = (state, action) => {
  if (action.type === "next") {
    return {
      ...state,
      currentQuestionIndex: chooseQuestion(state.questions),
      answered: false,
    };
  }
  if (action.type !== "answer") {
    console.warn("Unexpected action", action);
    return state;
  }
  const questions = [...state.questions];
  const currentQuestion = questions[state.currentQuestionIndex];
  const userAnswer = clean(action.userAnswer);
  const isCorrect = userAnswer === clean(currentQuestion.answer);

  currentQuestion.submissions = [
    ...currentQuestion.submissions,
    {
      at: new Date(),
      isCorrect,
      userAnswer,
    },
  ];
  saveQuestions(questions);
  return {
    ...state,
    isCorrect,
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
  const handleAnswer = userAnswer => dispatch({ type: "answer", userAnswer });

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
