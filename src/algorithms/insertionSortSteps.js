export const insertionSortSteps = (array) => {
  const arr = [...array];
  const steps = [];

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    // Mark current element being inserted
    steps.push({
      type: "active",
      indices: [i],
      description: `Inserting element at position ${i}: ${key}`
    });

    while (j >= 0 && arr[j] > key) {
      // Mark elements being compared and shifted
      steps.push({
        type: "compare",
        indices: [j, i],
        description: `Comparing arr[${j}] (${arr[j]}) with key ${key}`
      });

      steps.push({
        type: "shift",
        indices: [j + 1],
        values: [arr[j + 1], arr[j]],
        description: `Shifting arr[${j}] to position ${j + 1}`
      });

      arr[j + 1] = arr[j];
      j--;
    }

    // Place the key in its correct position
    if (j + 1 !== i) {
      steps.push({
        type: "insert",
        indices: [j + 1],
        values: [arr[j + 1], key],
        description: `Inserting key ${key} at position ${j + 1}`
      });
      arr[j + 1] = key;
    }

    // Mark sorted portion
    steps.push({
      type: "sorted",
      indices: Array.from({ length: i + 1 }, (_, k) => k),
      description: `First ${i + 1} elements are now sorted`
    });
  }

  return steps;
};