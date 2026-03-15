export const selectionSortSteps = (array) => {
  const arr = [...array];
  const steps = [];

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    // Mark current position as active
    steps.push({
      type: "active",
      indices: [i],
      description: `Finding minimum in unsorted portion starting at position ${i}`
    });

    for (let j = i + 1; j < arr.length; j++) {
      // Compare current element with minimum
      steps.push({
        type: "compare",
        indices: [i, j],
        description: `Comparing arr[${j}] (${arr[j]}) with current minimum arr[${minIndex}] (${arr[minIndex]})`
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        steps.push({
          type: "update_min",
          indices: [j],
          description: `New minimum found at position ${j}: ${arr[j]}`
        });
      }
    }

    // Check if swap is needed
    if (minIndex !== i) {
      // Mark elements to be swapped
      steps.push({
        type: "swap",
        indices: [i, minIndex],
        values: [arr[i], arr[minIndex]],
        description: `Swapping arr[${i}] (${arr[i]}) with arr[${minIndex}] (${arr[minIndex]})`
      });

      // Perform the swap
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }

    // Mark position as sorted
    steps.push({
      type: "sorted",
      indices: [i],
      description: `Position ${i} is now sorted`
    });
  }

  return steps;
};