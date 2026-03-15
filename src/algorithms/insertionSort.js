export const insertionSort = async (array, setArray, speed, setActive, setSwapping, setSorted) => {
  let arr = [...array];

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    // Mark the current element being inserted as active
    setActive([i]);

    while (j >= 0 && arr[j] > key) {
      // Mark elements being compared and shifted
      setActive([j, i]);
      setSwapping([j + 1]);

      arr[j + 1] = arr[j];
      j--;

      setArray([...arr]);

      await new Promise(resolve => setTimeout(resolve, speed));
    }

    // Place the key in its correct position
    if (j + 1 !== i) {
      setSwapping([j + 1]);
      arr[j + 1] = key;
      setArray([...arr]);
      
      await new Promise(resolve => setTimeout(resolve, speed));
      setSwapping([]);
    }

    setActive([]);
    
    // Mark sorted portion
    setSorted(prev => {
      const newSorted = [...prev];
      for (let k = 0; k <= i; k++) {
        if (!newSorted.includes(k)) {
          newSorted.push(k);
        }
      }
      return newSorted;
    });
  }

  // Clear all states when complete
  setActive([]);
  setSwapping([]);
};
