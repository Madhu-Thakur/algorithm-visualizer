export const quickSort = async (array, setArray, speed) => {

  let arr = [...array];

  const partition = async (low, high) => {

    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {

      if (arr[j] < pivot) {

        i++;

        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        setArray([...arr]);

        await new Promise(resolve =>
          setTimeout(resolve, speed)
        );
      }

    }

    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    setArray([...arr]);

    await new Promise(resolve =>
      setTimeout(resolve, speed)
    );

    return i + 1;
  };

  const sort = async (low, high) => {

    if (low < high) {

      const pi = await partition(low, high);

      await sort(low, pi - 1);
      await sort(pi + 1, high);

    }

  };

  await sort(0, arr.length - 1);

};