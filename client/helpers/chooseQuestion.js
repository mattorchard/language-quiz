const chooseRandomElement = array =>
  array[Math.floor(Math.random() * array.length)];

const crunch = (min, max, value) =>
  Math.max(1, value - min) / Math.max(1, max - min);

const selectWeightedIndex = weights => {
  let roll = Math.random();
  for (let index = 0; index < weights.length; index++) {
    const weight = weights[index];
    if (roll <= weight) {
      return index;
    }
    roll -= weight;
  }
  return weights.length - 1;
};

const chooseQuestion = questions => {
  const neverAskedQuestions = questions
    .map((question, index) => [index, question]) // Keep track of the question index
    .filter(([, question]) => question.submissions.length === 0); // Find elements with no submissions

  if (neverAskedQuestions.length > 0) {
    console.log("Selected random unasked question");
    const [index] = chooseRandomElement(neverAskedQuestions);
    return index;
  }

  const submissionAmounts = questions.map(
    question => question.submissions.length
  );
  const minAsks = Math.min(...submissionAmounts);
  const maxAsks = Math.max(...submissionAmounts);

  const weights = questions.map(({ submissions }) => {
    const numAsks = submissions.length;
    const numCorrect = submissions.filter(sub => sub.isCorrect).length;
    const numIncorrect = numAsks - numCorrect;

    const relativeAskFrequency = crunch(minAsks, maxAsks, numAsks);

    const isMostRecentCorrect = submissions[submissions.length - 1].isCorrect;
    const mostRecentMultiplier = isMostRecentCorrect ? 1.5 : 1;

    return (
      (numIncorrect * 2 - numCorrect * mostRecentMultiplier) /
      relativeAskFrequency
    );
  });

  const minWeight = Math.min(...weights);
  const maxWeight = Math.max(...weights);

  const absoluteProbabilities = weights.map(weight =>
    crunch(minWeight, maxWeight, weight)
  );

  return selectWeightedIndex(absoluteProbabilities);
};

export default chooseQuestion;
