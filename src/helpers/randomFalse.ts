export const randomFalse = (probabilityOfResultBeingTrue: number) => {
  if (probabilityOfResultBeingTrue > 1)
    throw new Error("Probabilities should not be larger than 1");
  return Math.random() > probabilityOfResultBeingTrue;
};
