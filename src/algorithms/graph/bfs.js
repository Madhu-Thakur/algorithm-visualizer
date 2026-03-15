export const bfs = (grid, start, goal) => {
  const queue = [start];
  const visited = new Set();
  const parents = {};
  const order = [];

  const key = (r, c) => `${r}-${c}`;

  visited.add(key(start.row, start.col));

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    if (node.row === goal.row && node.col === goal.col) {
      break;
    }

    const directions = [
      [1,0],
      [-1,0],
      [0,1],
      [0,-1]
    ];

    for (const [dr,dc] of directions) {
      const newRow = node.row + dr;
      const newCol = node.col + dc;

      if (
        newRow >= 0 &&
        newRow < grid.length &&
        newCol >= 0 &&
        newCol < grid[0].length
      ) {
        const id = key(newRow,newCol);

        if (!visited.has(id)) {
          visited.add(id);
          queue.push({row:newRow,col:newCol});
          parents[id] = node;
        }
      }
    }
  }

  // Reconstruct path from goal to start
  const path = [];
  let current = goal;
  const goalKey = key(goal.row, goal.col);
  
  if (parents[goalKey]) {
    while (current) {
      path.unshift(current);
      const currentKey = key(current.row, current.col);
      current = parents[currentKey];
    }
  }

  return { order, path };
};
