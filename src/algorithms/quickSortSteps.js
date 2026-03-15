export const quickSortSteps = (array) => {
  const arr = [...array];
  const steps = [];

  const partition = (low, high) => {
    let pivot = arr[high];
    let i = low - 1;

    // Mark pivot as active
    steps.push({
      type: "pivot",
      indices: [high],
      description: `Choosing pivot: arr[${high}] = ${pivot}`
    });

    for (let j = low; j < high; j++) {
      // Mark current element and pivot as active
      steps.push({
        type: "compare",
        indices: [j, high],
        description: `Comparing arr[${j}] (${arr[j]}) with pivot ${pivot}`
      });

      if (arr[j] < pivot) {
        i++;
        steps.push({
          type: "swap",
          indices: [i, j],
          values: [arr[i], arr[j]],
          description: `Swapping arr[${i}] (${arr[i]}) with arr[${j}] (${arr[j]})`
        });

        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }

    // Final swap with pivot
    steps.push({
      type: "swap",
      indices: [i + 1, high],
      values: [arr[i + 1], arr[high]],
      description: `Placing pivot at correct position ${i + 1}`
    });

    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
  };

  const sort = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);

      // Recursively sort left and right partitions
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  };

  sort(0, arr.length - 1);
  return steps;
};