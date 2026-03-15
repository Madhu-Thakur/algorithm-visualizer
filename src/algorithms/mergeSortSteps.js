export const mergeSortSteps = (array) => {
  const arr = [...array];
  const steps = [];

  const merge = (left, mid, right) => {
    let temp = [];
    let i = left;
    let j = mid + 1;
    let k = 0;

    // Compare and merge elements
    while (i <= mid && j <= right) {
      steps.push({
        type: "compare",
        indices: [i, j],
        description: `Comparing arr[${i}] (${arr[i]}) with arr[${j}] (${arr[j]})`
      });

      if (arr[i] <= arr[j]) {
        temp.push(arr[i]);
        i++;
      } else {
        temp.push(arr[j]);
        j++;
      }
    }

    // Copy remaining elements from left subarray
    while (i <= mid) {
      temp.push(arr[i]);
      i++;
    }

    // Copy remaining elements from right subarray
    while (j <= right) {
      temp.push(arr[j]);
      j++;
    }

    // Copy back to original array
    for (let idx = 0; idx < temp.length; idx++) {
      steps.push({
        type: "merge",
        indices: [left + idx],
        values: [arr[left + idx], temp[idx]],
        description: `Placing ${temp[idx]} at position ${left + idx}`
      });
      arr[left + idx] = temp[idx];
    }
  };

  const sort = (left, right) => {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    // Recursively sort left and right halves
    sort(left, mid);
    sort(mid + 1, right);

    // Merge the sorted halves
    merge(left, mid, right);
  };

  sort(0, arr.length - 1);
  return steps;
};