import { getQuestions } from "../repositories/questionRepository";
import { useMemo } from "preact/hooks";
import "./StatsPage.css";

const getMeta = allSubmissions => {
  let numAsks = 0;
  let numCorrect = 0;
  allSubmissions.forEach(submission => {
    numAsks++;
    if (submission.isCorrect) {
      numCorrect++;
    }
  });
  return { numAsks, numCorrect };
};

const useStats = () =>
  useMemo(() => {
    const questions = getQuestions();
    const answeredQuestions = questions.filter(
      question => question.submissions.length > 0
    );
    const allSubmissions = answeredQuestions.flatMap(
      question => question.submissions
    );

    return {
      questions,
      ...getMeta(allSubmissions),
      answeredQuestions: answeredQuestions.length,
      unansweredQuestions: questions.length - answeredQuestions.length,
    };
  }, []);

const StatsPage = () => {
  const { numCorrect, numAsks, unansweredQuestions } = useStats();
  return (
    <main className="stats-page">
      <h2>Stats</h2>
      {unansweredQuestions > 0 && (
        <p className="stats-page__unanswered-warning">
          {unansweredQuestions} questions have no responses
        </p>
      )}
      <dl>
        <dt>Total Answers:</dt>
        <dd className="stats-page__value">{numAsks}</dd>
        <dt>Total Correct Responses</dt>
        <dd className="stats-page__value">{numCorrect}</dd>
        <dt>Average</dt>
        <dd className="stats-page__value">
          {Math.round((100 * numCorrect) / numAsks)}%
        </dd>
      </dl>
    </main>
  );
};

export default StatsPage;
