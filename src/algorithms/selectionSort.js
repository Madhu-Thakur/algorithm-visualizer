export const selectionSort = async (array, setArray, speed) => {

  let arr = [...array];

  for (let i = 0; i < arr.length; i++) {

    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }

      await new Promise(resolve =>
        setTimeout(resolve, speed)
      );
    }

    if (minIndex !== i) {

      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;

      setArray([...arr]);

    }

  }

};