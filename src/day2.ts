import { mod } from "./utils/math";
import { readInput } from "./utils/reader";

type Result = {
  p1: number;
  p2: number;
}
const dayTwoModGolf = async () => {
  readInput(2, (_: any, d: string) => {
    console.time("day_two_golf_mod");
    const r: Result = d.split("\n")
    .map((l: string) => 
      l.split(" ").map((c: string) => c === "A" || c === "X" ? 0 : c === "B" || c === "Y" ? 1 : 2)
    )
    .map((t: number[]) => {
      return {
        p1: t[1] + 1 + (2 - mod(t[0] - t[1] + 1, 3)) * 3,
        p2: t[1] * 3 + mod(t[0] + t[1] - 1, 3) + 1
      }
    })
    .reduce((a: Result, g: Result) => {
      a.p1 += g.p1;
      a.p2 += g.p2;
      return a;
    }, { p1: 0, p2: 0 });
    console.log("p1", r.p1, "p2", r.p2);
    console.timeEnd("day_two_golf_mod");
  });
}

const dayTwoLookupFP = async () => {
  readInput(2, (_: any, d: string) => {
    console.time("day_two_golf");
    const r = d.split("\n")
    .map((l: any) => {
      return {
        p1:
          (l === "A X") ? 4 : (l === "A Y") ? 8 : (l === "A Z") ? 3 :
          (l === "B X") ? 1 : (l === "B Y") ? 5 : (l === "B Z") ? 9 :
          (l === "C X") ? 7 : (l === "C Y") ? 2 : (l === "C Z") ? 6 :
          0,
          p2:
          (l === "A X") ? 3 : (l === "A Y") ? 4 : (l === "A Z") ? 8 :
          (l === "B X") ? 1 : (l === "B Y") ? 5 : (l === "B Z") ? 9 :
          (l === "C X") ? 2 : (l === "C Y") ? 6 : (l === "C Z") ? 7 :
          0,
      }
    }).reduce((a: any, g: any) => {
      a.p1 += g.p1;
      a.p2 += g.p2;
      return a;
    }, { p1: 0, p2: 0 });
    console.log("p1", r.p1, "p2", r.p2);
    console.timeEnd("day_two_golf");
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

const dayTwoIterative = async () => {
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

dayTwoIterative();
dayTwoLookupTable();
dayTwoLookupFP();
dayTwoModGolf();

export {};

// 1 - rock
// 2 - paper
// 3 - scissors

// A X - 0 -> 4
// A Y - (-1) -> 8
// A Z - (-2) -> 3

// B X - 1 - > 1
// B Y - 0 - > 5
// B Z - (-1) - > 9

// C X - 2 - > 7
// C Y - 1 - > 2
// C Z - 0 - > 6

// (l === "A X") ? 4 : (l === "A Y") ? 8 : (l === "A Z") ? 3 :
// (l === "B X") ? 1 : (l === "B Y") ? 5 : (l === "B Z") ? 9 :
// (l === "C X") ? 7 : (l === "C Y") ? 2 : (l === "C Z") ? 6 :
// 0,
// p2:
// (l === "A X") ? 3 : (l === "A Y") ? 4 : (l === "A Z") ? 8 :
// (l === "B X") ? 1 : (l === "B Y") ? 5 : (l === "B Z") ? 9 :
// (l === "C X") ? 2 : (l === "C Y") ? 6 : (l === "C Z") ? 7 :