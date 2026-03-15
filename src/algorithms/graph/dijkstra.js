export const dijkstra = (grid, start, goal) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const distances = {};
  const visited = new Set();
  const parents = {};
  const order = [];

  const key = (r,c) => `${r}-${c}`;

  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      distances[key(r,c)] = Infinity;
    }
  }

  distances[key(start.row,start.col)] = 0;

  const queue = [start];

  while(queue.length>0){
    queue.sort((a,b)=>distances[key(a.row,a.col)] - distances[key(b.row,b.col)]);

    const node = queue.shift();
    const id = key(node.row,node.col);

    if(visited.has(id)) continue;

    visited.add(id);
    order.push(node);

    if(node.row===goal.row && node.col===goal.col){
      break;
    }

    const directions = [
      [1,0],
      [-1,0],
      [0,1],
      [0,-1]
    ];

    for(const [dr,dc] of directions){
      const nr=node.row+dr;
      const nc=node.col+dc;

      if(
        nr>=0 && nr<rows &&
        nc>=0 && nc<cols &&
        grid[nr][nc].type!=="wall"
      ){
        const newDist = distances[id] + 1;

        if(newDist < distances[key(nr,nc)]){
          distances[key(nr,nc)] = newDist;
          parents[key(nr,nc)] = node;
          queue.push({row:nr,col:nc});
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
