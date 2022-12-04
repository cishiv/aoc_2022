import { intersect, _Array } from "./utils/arrays";
import { readInput } from "./utils/reader"

const dayFour = () => {
	readInput(4, (_: any, d: string) => {
		const nn = d.split("\n")
			.map((pair: string) => pair
				.split(",")
				.map((opts: string) => opts
					.split("-")
					.map(Number)));
		console.time("day_four_part_1");
		const partOne = nn.map((p: number[][]) => {
			return (p[0][0] >= p[1][0] && p[0][1] <= p[1][1]) || (p[0][0] <= p[1][0] && p[0][1] >= p[1][1]) ? 1 : 0;
		}).reduce((a: number, g: number) => a + g, 0);
		console.timeEnd("day_four_part_1");

		console.time("day_four_part_2");
		const partTwo = nn.map((p: number[][]) => {
			return intersect(_Array.range(p[0][0], p[0][1], 1), _Array.range(p[1][0], p[1][1], 1)).length > 0 ? 1 : 0;
		}).reduce((a: number, g: number) => a + g, 0);
		console.timeEnd("day_four_part_2");

		console.log("Part 1", partOne);
		console.log("Part 2", partTwo);
	});
}

dayFour();
export {}