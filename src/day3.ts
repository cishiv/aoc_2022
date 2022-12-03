import { readFile } from "fs";
import { partition } from "./utils/arrays";

type Instance = {
  firstIndex: number;
  secondIndex?: number;
  thirdIndex?: number;
}

const dayThree = () => {
  readFile("inputs/day-3", "utf8", (_, data) => {
    console.time("day_three_part_one");
    const partOne = data
      .split("\n")
      .map((rucksack: string) => {
        const occurences: Map<string, Instance> = new Map();
        rucksack
        .split("")
        .forEach((item: string, idx: number) => {
          const found = occurences.get(item);
          if (found !== undefined && idx >= (rucksack.length / 2) && found.firstIndex < (rucksack.length / 2)) {
            occurences.set(item, {
              firstIndex: found.firstIndex,
              secondIndex: idx
            });
          } else {
            occurences.set(item, {
              firstIndex: idx,
            });
          }
        });
        return occurences;
      }).map((rucksack: Map<string, Instance>) => {
        let priority = 0;
        rucksack.forEach((instance: Instance, item: string) => {
          if (instance.secondIndex) {
            priority += asciiToPriority(item);
          }
        });
        return priority;
      }).reduce((a: number, b: number) => a + b, 0);;
    console.log("Part One", partOne);
    console.timeEnd("day_three_part_one");

    console.time("day_three_part_two");
    const partTwo = partition(data.split("\n"), 3)
      .map((combined: string[]) => {
        return {
          p1L: combined[0].length,
          p2L: combined[1].length,
          combined: combined.join(""),
        }
      })
      .map((combined: { p1L: number, p2L: number, combined: string }) => {
        const occurences: Map<string, Instance> = new Map();
        combined.combined
        .split("")
        .forEach((item: string, idx: number) => {
          const found = occurences.get(item);
          if (found !== undefined) {
            if (idx >= combined.p1L && idx < (combined.p1L + combined.p2L) && found.firstIndex < combined.p1L) {
              occurences.set(item, {
                firstIndex: found.firstIndex,
                secondIndex: idx
              });
            } else if (idx >= (combined.p1L + combined.p2L) && found.secondIndex && found.secondIndex < (combined.p1L + combined.p2L)) {
              occurences.set(item, {
                firstIndex: found.firstIndex,
                secondIndex: found.secondIndex,
                thirdIndex: idx
              });
            }
          } else {
            occurences.set(item, {
              firstIndex: idx,
            });
          }
        });
        return occurences;
      })
      .map((rucksack: Map<string, Instance>) => {
        let priority = 0;
        rucksack.forEach((instance: Instance, item: string) => {
          if (instance.secondIndex && instance.thirdIndex) {
            priority += asciiToPriority(item);
          }
        });
        return priority;
      })
      .reduce((a: number, b: number) => a + b, 0);
    console.log("Part Two", partTwo);
    console.timeEnd("day_three_part_two");

  });
}

const asciiToPriority = (char: string) => {
  const asciiCode = char.charCodeAt(0);
  if (asciiCode >= 65 && asciiCode <= 90) {
    return asciiCode - 38;
  } else {
    return asciiCode - 96;
  }
}

dayThree();

export {};