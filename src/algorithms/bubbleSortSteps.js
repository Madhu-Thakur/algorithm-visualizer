export const bubbleSortSteps = (array) => {
  const arr = [...array];
  const steps = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // compare step
      steps.push({
        type: "compare",
        indices: [j, j + 1],
        description: `Comparing arr[${j}] (${arr[j]}) with arr[${j + 1}] (${arr[j + 1]})`
      });

      if (arr[j] > arr[j + 1]) {
        // swap step
        steps.push({
          type: "swap",
          indices: [j, j + 1],
          values: [arr[j], arr[j + 1]],
          description: `Swapping arr[${j}] (${arr[j]}) with arr[${j + 1}] (${arr[j + 1]})`
        });

        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    
    // Mark the last i+1 elements as sorted after each pass
    steps.push({
      type: "sorted",
      indices: [arr.length - i - 1],
      description: `Position ${arr.length - i - 1} is now sorted`
    });
  }

  return steps;
};
