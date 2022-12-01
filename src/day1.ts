import { readInputSync } from "./utils/reader";

const day_one = () => {
  const input = readInputSync(1).split("\n");
  let elves = new Map<number, number>();
  let currentElf = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "") {
      currentElf++;
      continue;
    } else {
      if (elves.has(currentElf)) {
        let current: number | undefined = elves.get(currentElf);
        if (current !== undefined) {
          elves.set(currentElf, current  + parseInt(input[i]));
        }
      } else {
        elves.set(currentElf, parseInt(input[i]));
      }
    }
  };
  const partTwo = [...elves.values()].sort((a, b) => b - a).slice(0,3).reduce((a, b) => a + b);
  console.log("Part 1", Math.max(...elves.values()));
  console.log("Part 2", partTwo);
}

day_one();

export {};