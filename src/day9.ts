import { readInput } from "./utils/reader";

type Point = {
  x: number;
  y: number;
};

const dayNinePartOne = () => {
	readInput(9, (_: any, d: string) => {
		console.time("dayNineOne");
		let hX = 0;
		let hY = 0;
		const path = d.split("\n")
			.map((i: string) => i
				.split(" ")).map((i: string[]) => {
				const move = i[0];
				const step = parseInt(i[1]);
          
				const points = [];

				points.push({ x: hX, y: hY })
				for(let i = 0; i < step; i++) {
					move === "R" ? hX += 1 : move === "L" ? hX -= 1 : move === "D" ? hY -= 1 : move === "U" ? hY += 1 : null;
					points.push({ x: hX, y: hY })
				}
				return points;
			})
			.flat();
		console.log("Part One", new Set(sim(path).map((i: Point) => `${i.x},${i.y}`)).size);
		console.timeEnd("dayNineOne");
	});
}

const dayNinePartTwo = () => {
	readInput(9, (_: any, d: string) => {
		console.time("dayNineTwo");
		let hX = 0;
		let hY = 0;
		let path: Point[] = d.split("\n")
			.map((i: string) => i
				.split(" ")).map((i: string[]) => {
				const move = i[0];
				const step = parseInt(i[1]);
          
				const points = [];

				points.push({ x: hX, y: hY })
				for(let i = 0; i < step; i++) {
					move === "R" ? hX += 1 : move === "L" ? hX -= 1 : move === "D" ? hY -= 1 : move === "U" ? hY += 1 : null;
					points.push({ x: hX, y: hY })
				}
				return points;
			})
			.flat();


		for (let i = 0; i < 9; i++) {
			path = sim(path)
		}

		console.log("Part Two", new Set(path.map((i: Point) => `${i.x},${i.y}`)).size);
		console.timeEnd("dayNineTwo");
	});
}

const sim = (path: {x: number, y: number}[]) => {

	const knot: Point[] = [{ x: 0, y: 0 }];

	for (let j = 0; j < path.length; j++) {
  		const prevPath = path;
  		const leader = prevPath[j];
  		let tX = knot[j].x;
  		let tY = knot[j].y;
  		const seperation = Math.sqrt(Math.pow(leader.x - tX, 2) + Math.pow(leader.y - tY, 2));
  		if (seperation > 1) {
  			const horizontal = leader.x === tX;
  			const vertical = leader.y === tY;
  			if (horizontal) {
  				if (leader.y > tY) {
  					tY += 1;
  				} else {
  					tY -= 1;
  				}
  			} else if (vertical) {
  				if (leader.x > tX) {
  					tX += 1;
  				} else {
  					tX -= 1;
  				}
  			} else {
  				const positiveX = tX < leader.x;
  				const positiveY = tY < leader.y;
  				if (seperation > 1.5) {
  					if (positiveX && positiveY) {
  						tX += 1;
  						tY += 1;
  					} else if (positiveX && !positiveY) {
  						tX += 1;
  						tY -= 1;
  					} else if (!positiveX && positiveY) {
  						tX -= 1;
  						tY += 1;
  					} else {
  						tX -= 1;
  						tY -= 1;
  					}
  				}
  			}
  		}
  		knot.push({ x: tX, y: tY });
	}

	// console.log(knots.get(n - 1).pop());
	return knot;
}

dayNinePartOne();
dayNinePartTwo();

export {};