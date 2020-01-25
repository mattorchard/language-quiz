import { useState, useEffect } from "preact/hooks";

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
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <label>
        Prompt
        <input type="text" disabled value={prompt} />
      </label>
      <label>
        Answer
        <input
          type="text"
          value={draft}
          disabled={disabled}
          onInput={event => setDraft(event.currentTarget.value)}
        />
      </label>
      <button type="reset">Clear</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuizForm;
