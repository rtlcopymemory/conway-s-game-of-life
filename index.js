const width = 20;
const height = 20;

const aliveSymbol = "O";
const deadSymbol = " ";

const state = Object.freeze({
  DEAD: 0,
  ALIVE: 1
});

function print_grid(ground) {
  console.clear(); // TODO check if its working
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (ground[i][j] === state.ALIVE) process.stdout.write(aliveSymbol);
      else process.stdout.write(deadSymbol);
    }
    process.stdout.write("\n");
  }
}

function count_neighbors(ground, row, column) {
  let count = 0;

  // top
  if (ground[row - 1] !== undefined) count += ground[row - 1][column];

  // top-left
  if (
    ground[row - 1] !== undefined &&
    ground[row - 1][column - 1] !== undefined
  )
    count += ground[row - 1][column - 1];

  // left
  if (ground[row][column - 1] !== undefined) count += ground[row][column - 1];

  // bottom-left
  if (
    ground[row + 1] !== undefined &&
    ground[row + 1][column - 1] !== undefined
  )
    count += ground[row + 1][column - 1];

  // bottom
  if (ground[row + 1] !== undefined) count += ground[row + 1][column];

  // bottom-right
  if (
    ground[row + 1] !== undefined &&
    ground[row + 1][column + 1] !== undefined
  )
    count += ground[row + 1][column + 1];

  // right
  if (ground[row][column + 1] !== undefined) count += ground[row][column + 1];

  // top-right
  if (
    ground[row - 1] !== undefined &&
    ground[row - 1][column + 1] !== undefined
  )
    count += ground[row - 1][column + 1];

  return count;
}

function step(ground) {
  /* Check all the adjecent cells:
    - if a cell has < 2 neighbors it dies
    - if a cell has 2 or 3 neighbors it lives
    - if a cell has > 3 neighbors it dies
    - if a dead cell has 3 live neighbors it lives
    */
  let next_ground = JSON.parse(JSON.stringify(ground));
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let neighbors = count_neighbors(ground, i, j);
      if (neighbors < 2) next_ground[i][j] = state.DEAD;
      if (neighbors > 3) next_ground[i][j] = state.DEAD;
      if (neighbors === 3) next_ground[i][j] = state.ALIVE;
    }
  }
  return next_ground;
}

function init_ground() {
  let ground = [];
  for (let i = 0; i < height; i++) {
    ground[i] = [];
    for (let j = 0; j < width; j++) {
      ground[i][j] = state.DEAD;
    }
  }
  return ground;
}

function run(grid) {
  print_grid(grid);
  grid = step(grid);
  setTimeout(() => {
    run(grid);
  }, 1000);
}

function setup() {
  let grid = init_ground();

  grid[0][1] = state.ALIVE;
  grid[1][2] = state.ALIVE;
  grid[2][2] = state.ALIVE;
  grid[2][1] = state.ALIVE;
  grid[2][0] = state.ALIVE;

  run(grid);
}

setup();
