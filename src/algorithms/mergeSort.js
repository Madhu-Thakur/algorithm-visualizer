export const mergeSort = async (array, setArray, speed) => {

  let arr = [...array];

  const merge = async (left, mid, right) => {

    let temp = [];
    let i = left;
    let j = mid + 1;

    while (i <= mid && j <= right) {

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

    for (let k = 0; k < temp.length; k++) {

      arr[left + k] = temp[k];

      setArray([...arr]);

      await new Promise(resolve =>
        setTimeout(resolve, speed)
      );

    }

  };

  const sort = async (left, right) => {

    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    await sort(left, mid);
    await sort(mid + 1, right);

    await merge(left, mid, right);

  };

  await sort(0, arr.length - 1);

};