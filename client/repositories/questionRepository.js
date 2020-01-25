import questionSheet from "../datasheets/greek";

const LOCAL_STORAGE_QUESTION_KEY = "greek-questions-v1";

const initQuestions = () =>
  questionSheet.map(question => ({ ...question, submissions: [] }));

export const getQuestions = () => {
  const questionsRaw = localStorage.getItem(LOCAL_STORAGE_QUESTION_KEY);
  return questionsRaw ? JSON.parse(questionsRaw) : initQuestions();
};

export const saveQuestions = questions =>
  localStorage.setItem(LOCAL_STORAGE_QUESTION_KEY, JSON.stringify(questions));
