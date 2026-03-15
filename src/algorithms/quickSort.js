export const quickSort = async (array, setArray, speed, setActive, setSwapping, setSorted) => {
  let arr = [...array];

  const partition = async (low, high) => {
    let pivot = arr[high];
    let i = low - 1;

    // Mark pivot as active
    setActive([high]);

    for (let j = low; j < high; j++) {
      // Mark current element and pivot as active
      setActive([j, high]);

      if (arr[j] < pivot) {
        i++;

        // Mark elements to be swapped
        setSwapping([i, j]);

        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        setArray([...arr]);

        await new Promise(resolve => setTimeout(resolve, speed));
        
        // Clear swapping state
        setSwapping([]);
      }
    }

    // Final swap with pivot
    setSwapping([i + 1, high]);
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    setArray([...arr]);

    await new Promise(resolve => setTimeout(resolve, speed));
    setSwapping([]);

    return i + 1;
  };

  const sort = async (low, high) => {
    if (low < high) {
      const pi = await partition(low, high);

      // Mark sorted elements after partition
      setSorted(prev => {
        const newSorted = [...prev];
        for (let k = low; k <= high; k++) {
          if (!newSorted.includes(k)) {
            newSorted.push(k);
          }
        }
        return newSorted;
      });

      await sort(low, pi - 1);
      await sort(pi + 1, high);
    }
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
