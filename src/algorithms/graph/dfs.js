export const dfs = (grid, start, goal) => {

  const stack = [start];
  const visited = new Set();
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
        stack.push({row:nr,col:nc});
      }

    }

  }

  return order;

};