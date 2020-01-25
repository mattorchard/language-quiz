import { useState, useEffect } from "preact/hooks";
import "./QuizForm.css";

const QuizForm = ({ prompt, onAnswer, disabled }) => {
  const [draft, setDraft] = useState("");
  const handleSubmit = event => {
    event.preventDefault();
    onAnswer(draft);
  };
  const handleReset = event => {
    event.preventDefault();
    setDraft("");
  };
  // Clear draft on new prompt
  useEffect(() => setDraft(""), [prompt]);

  return (
    <form className="quiz-form" onSubmit={handleSubmit} onReset={handleReset}>
      <label className="quiz-form__prompt">
        Prompt
        <input type="text" disabled value={prompt} />
      </label>
      <label className="quiz-form__answer">
        Answer
        <input
          type="text"
          value={draft}
          disabled={disabled}
          onInput={event => setDraft(event.currentTarget.value)}
        />
      </label>
      <div role="group" className="quiz-form__actions">
        <button type="reset" disabled={disabled}>
          Clear
        </button>
        <button type="submit" disabled={disabled}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default QuizForm;
