export const bubbleSortSteps = (array) => {

  const arr = [...array];
  const steps = [];

  for (let i = 0; i < arr.length; i++) {

    for (let j = 0; j < arr.length - i - 1; j++) {

      // compare step
      steps.push({
        type: "compare",
        i: j,
        j: j + 1
      });

      if (arr[j] > arr[j + 1]) {

        // swap step
        steps.push({
          type: "swap",
          i: j,
          j: j + 1
        });

        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

      }

    }

  }

  return steps;

};