export const selectionSort = async (array, setArray, speed, setActive, setSwapping, setSorted) => {
  let arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    // Mark current position and comparison elements as active
    setActive([i]);

    for (let j = i + 1; j < arr.length; j++) {
      // Update active elements being compared
      setActive([i, j]);
      
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }

      await new Promise(resolve => setTimeout(resolve, speed));
    }

    // Clear active state before potential swap
    setActive([]);

    if (minIndex !== i) {
      // Mark elements to be swapped
      setSwapping([i, minIndex]);
      
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;

      setArray([...arr]);

      await new Promise(resolve => setTimeout(resolve, speed));
      
      // Clear swapping state
      setSwapping([]);
    }

    // Mark current position as sorted
    setSorted(prev => [...prev, i]);
  }

  // Clear all states when complete
  setActive([]);
  setSwapping([]);
};
