import { getQuestions } from "../repositories/questionRepository";
import { useMemo } from "preact/hooks";

const useStats = () => useMemo(() => getQuestions(), []);

const StatsPage = () => {
  const questions = useStats();
  return (
    <main>
      <h2>Stats</h2>
      <p>No Stats are being tracked yet, so here's the raw data being used</p>
      <pre>{JSON.stringify(questions, null, 2)}</pre>
    </main>
  );
};

export default StatsPage;
