export const astar = (grid, start, goal) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const openSet = [start];
  const visited = new Set();
  const parents = {};
  const order = [];

  const key = (r,c)=>`${r}-${c}`;

  const gScore = {};
  const fScore = {};

  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      gScore[key(r,c)] = Infinity;
      fScore[key(r,c)] = Infinity;
    }
  }

  const heuristic = (a,b)=>{
    return Math.abs(a.row-b.row) + Math.abs(a.col-b.col);
  };

  gScore[key(start.row,start.col)] = 0;
  fScore[key(start.row,start.col)] = heuristic(start,goal);

  while(openSet.length>0){
    openSet.sort((a,b)=>fScore[key(a.row,a.col)] - fScore[key(b.row,b.col)]);

    const current = openSet.shift();
    const id = key(current.row,current.col);

    if(visited.has(id)) continue;

    visited.add(id);
    order.push(current);

    if(current.row===goal.row && current.col===goal.col){
      break;
    }

    const directions=[
      [1,0],
      [-1,0],
      [0,1],
      [0,-1]
    ];

    for(const [dr,dc] of directions){
      const nr=current.row+dr;
      const nc=current.col+dc;

      if(
        nr>=0 && nr<rows &&
        nc>=0 && nc<cols &&
        grid[nr][nc].type!=="wall"
      ){
        const tentative = gScore[id] + 1;

        if(tentative < gScore[key(nr,nc)]){
          gScore[key(nr,nc)] = tentative;
          fScore[key(nr,nc)] = tentative + heuristic({row:nr,col:nc},goal);
          parents[key(nr,nc)] = current;
          openSet.push({row:nr,col:nc});
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
