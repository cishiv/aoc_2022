import { readInput } from "./utils/reader";

const dayTwo = async () => {
  const loseConditions = ["A Z", "B X", "C Y"];
  const tieConditions = ["A X", "B Y", "C Z"];
  readInput(2, (_err0: any, data: string) => {
    console.time("day_two");
    let scorePartOne = 0;
    let scorePartTwo = 0;
    const lines = data.split("\n");

    lines.forEach((line: string) => {
      const [opponent, player] = line.split(" ");
      if (player === "X") {
        scorePartOne += 1
        // part 2 logic
        // select the losing condition that matches the opponent, and take the L (0 points)
        if (opponent == "A") {
          scorePartTwo += 3;
        } else if (opponent == "B") {
          scorePartTwo += 1;
        } else {
          scorePartTwo += 2;
        }
      } else if (player === "Y") {
        scorePartOne += 2

        // part 2 logic
        // make the same play as the opponent, and take the tie (3 points)
        scorePartTwo += 3;
        if (opponent == "A") {
          scorePartTwo += 1;
        } else if (opponent == "B") {
          scorePartTwo += 2;
        } else {
          scorePartTwo += 3;
        }
      } else {
        scorePartOne += 3
        // part 2 logic
        // make the winning play against the opponent, and take the win (6 points
        scorePartTwo += 6;
        if (opponent == "A") {
          scorePartTwo += 2;
        } else if (opponent == "B") {
          scorePartTwo += 3;
        } else {
          scorePartTwo += 1;
        }
      }
  
      if (loseConditions.includes(line)) {
        scorePartOne += 0; // refactor
      } else if (tieConditions.includes(line)) {
        scorePartOne += 3;
      } else {
        scorePartOne += 6;
      }
    });

    console.log("Part 1", scorePartOne);
    console.log("Part 2", scorePartTwo);
    console.timeEnd("day_two");
  });
}

const dayTwoLookupTable = async () => {
  readInput(2, (_err0: any, data: string) => {
    console.time("day_two_lookup_table");
    let scorePartOne = 0;
    let scorePartTwo = 0;
    const lines = data.split("\n");
    const lookupTable: any = {
      "A X": 1 + 3,
      "A Y": 2 + 6,
      "A Z": 3 + 0,
      "B X": 1 + 0,
      "B Y": 2 + 3,
      "B Z": 3 + 6,
      "C X": 1 + 6,
      "C Y": 2 + 0,
      "C Z": 3 + 3,
    };

    const lookupTablePartTwo: any = {
      "A X": 3 + 0,
      "A Y": 1 + 3,
      "A Z": 2 + 6,
      "B X": 1 + 0,
      "B Y": 2 + 3,
      "B Z": 3 + 6,
      "C X": 2 + 0,
      "C Y": 3 + 3,
      "C Z": 1 + 6,
    };

    lines.forEach((line: string) => {
      scorePartOne += lookupTable[line];
      scorePartTwo += lookupTablePartTwo[line];
    });

    console.log("Part 1", scorePartOne);
    console.log("Part 2", scorePartTwo);
    console.timeEnd("day_two_lookup_table");
  });
}

dayTwo();
dayTwoLookupTable();
export {};