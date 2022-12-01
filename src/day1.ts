import { readInput, readInputSync } from "./utils/reader";
// initial solution
const dayOne = () => {
  console.time("day_one");
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
  console.timeEnd("day_one");
}

// perf (?) solution
const dayOnePerf = async () => {
  readInput(1, (err: NodeJS.ErrnoException | null, data: string) => {
    console.time("day_one_perf");
    if (err) {
      console.error(err);
      return;
    }
    let maximums: number[] = [];
    let currentElf = 0;
    data.split("\n").forEach((line: string) => {
      if (line === "") {
        maximums.push(currentElf);
        currentElf = 0;
      } else {
        currentElf += Number(line);
      }
    });
    console.log("Part 1", Math.max(...maximums));
    console.log("Part 2", [...maximums].sort((a, b) => b - a).slice(0,3).reduce((a, b) => a + b));

    console.timeEnd("day_one_perf");
  });
}


const dayOneGolf = () => {
  readInput(1, (_: NodeJS.ErrnoException | null, data: string) => {
    console.time("day_one_golf");

    const maximums = data.split("\n\n")
    .map((subarray: string) => subarray.split("\n")
    .map((line: string) => Number(line))
    .reduce((a: number, b: number) => a + b))
    .sort((a: number, b: number) => b - a);

    console.log("Part 1", maximums[0]);
    console.log("Part 2", maximums.slice(0,3).reduce((a: number, b: number) => a + b));

    console.timeEnd("day_one_golf");
  });
}

dayOne();
dayOnePerf();
dayOneGolf();

export {};