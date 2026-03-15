export const dfs = (grid, start, goal) => {
  const stack = [start];
  const visited = new Set();
  const parents = {};
  const order = [];

  const key = (r,c)=>`${r}-${c}`;

  while(stack.length>0){
    const node = stack.pop();
    const id = key(node.row,node.col);

    if(visited.has(id)) continue;

    visited.add(id);
    order.push(node);

    if(node.row===goal.row && node.col===goal.col){
      break;
    }

    const directions=[
      [1,0],
      [-1,0],
      [0,1],
      [0,-1]
    ];

    for(const [dr,dc] of directions){
      const nr=node.row+dr;
      const nc=node.col+dc;

      if(
        nr>=0 && nr<grid.length &&
        nc>=0 && nc<grid[0].length
      ){
        const neighborId = key(nr, nc);
        if (!visited.has(neighborId)) {
          stack.push({row:nr,col:nc});
          parents[neighborId] = node;
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
