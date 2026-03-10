export const insertionSort = async (array, setArray, speed) => {

  let arr = [...array];

  for (let i = 1; i < arr.length; i++) {

    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {

      arr[j + 1] = arr[j];
      j--;

      setArray([...arr]);

      await new Promise(resolve =>
        setTimeout(resolve, speed)
      );

    }

    arr[j + 1] = key;

    setArray([...arr]);

  }

};