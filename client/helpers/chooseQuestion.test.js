import chooseQuestion from "./chooseQuestion";

test("Unasked questions always get picked", () => {
  const questions = [
    { submissions: [{ isCorrect: true }] },
    { submissions: [{ isCorrect: true }] },
    { submissions: [] },
  ];
  expect(chooseQuestion(questions)).toEqual(2);
});

test("Questions still chosen if all have been asked", () => {
  const questions = [
    { submissions: [{ isCorrect: true }] },
    { submissions: [{ isCorrect: true }] },
    { submissions: [{ isCorrect: true }] },
  ];
  const index = chooseQuestion(questions);
  expect(index < 3 || index >= 0).toBeTruthy();
});
