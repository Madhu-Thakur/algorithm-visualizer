export const mergeSort = async (array, setArray, speed, setActive, setSwapping, setSorted) => {
  let arr = [...array];

  const merge = async (left, mid, right) => {
    let temp = [];
    let i = left;
    let j = mid + 1;

    // Set active elements being compared
    setActive([i, j]);

    while (i <= mid && j <= right) {
      // Update active elements for comparison
      setActive([i, j]);
      await new Promise(resolve => setTimeout(resolve, speed));

      if (arr[i] <= arr[j]) {
        temp.push(arr[i]);
        i++;
      } else {
        temp.push(arr[j]);
        j++;
      }
    }

    while (i <= mid) {
      temp.push(arr[i]);
      i++;
    }

    while (j <= right) {
      temp.push(arr[j]);
      j++;
    }

    // Update the array and show the merge process
    for (let k = 0; k < temp.length; k++) {
      arr[left + k] = temp[k];
      
      // Highlight the position being updated
      setSwapping([left + k]);
      setArray([...arr]);
      
      await new Promise(resolve => setTimeout(resolve, speed));
    }

    // Clear swapping highlight
    setSwapping([]);
  };

  const sort = async (left, right) => {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    // Recursively sort left and right halves
    await sort(left, mid);
    await sort(mid + 1, right);

    // Merge the sorted halves
    await merge(left, mid, right);
    
    // Mark the merged portion as sorted
    setSorted(prev => {
      const newSorted = [...prev];
      for (let k = left; k <= right; k++) {
        if (!newSorted.includes(k)) {
          newSorted.push(k);
        }
      }
      return newSorted;
    });
  };

  // Clear states at start
  setActive([]);
  setSwapping([]);
  setSorted([]);

  await sort(0, arr.length - 1);

  // Mark all elements as sorted when complete
  setSorted(Array.from({ length: arr.length }, (_, i) => i));
  setActive([]);
  setSwapping([]);
};
