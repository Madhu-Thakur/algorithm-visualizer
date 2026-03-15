export const bubbleSort = async (
  array,
  setArray,
  speed,
  setActive,
  setSwapping,
  setSorted
) => {

  let arr = [...array];
  let sortedIndices = [];

  for (let i = 0; i < arr.length; i++) {

    for (let j = 0; j < arr.length - i - 1; j++) {

      // show comparison
      setActive([j, j + 1]);

      await new Promise(r => setTimeout(r, speed));

      if (arr[j] > arr[j + 1]) {

        // show swap
        setSwapping([j, j + 1]);

        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        setArray([...arr]);

        await new Promise(r => setTimeout(r, speed));

      }

      // reset states
      setSwapping([]);
      // setActive([]);

    }
    setActive([]);

    // mark sorted element
    sortedIndices.push(arr.length - i - 1);
    setSorted([...sortedIndices]);

  }

};