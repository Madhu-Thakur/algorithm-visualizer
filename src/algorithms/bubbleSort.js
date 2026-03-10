export const bubbleSort = async (
  array,
  setArray,
  speed,
  setActive,
  setSwapping,
  setSorted
) => {

  let arr = [...array];

  for (let i = 0; i < arr.length; i++) {

    for (let j = 0; j < arr.length - i - 1; j++) {

      setActive([j, j + 1]);

      await new Promise(r => setTimeout(r, speed));

      if (arr[j] > arr[j + 1]) {

        setSwapping([j, j + 1]);

        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        setArray([...arr]);

        await new Promise(r => setTimeout(r, speed));

      }

      setSwapping([]);

    }

    setSorted(prev => [...prev, arr.length - i - 1]);

  }

  setActive([]);

};