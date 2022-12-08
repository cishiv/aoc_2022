import { readInput } from "./utils/reader";

const dayEight = () => {
	readInput(8, (_: any, d: string) => {
		const grid = d
			.split("\n")
			.map((i: string) => i
				.split("")
				.map((j: string) => parseInt(j)))
  
		console.time("dayEightOne")

		const partOne: number = grid
			.map((row: number[], y: number) => 
			 row
					.filter((col: number, x: number) => {
						return (x === 0 || x === row.length - 1 || y === 0 || y === grid.length - 1) || 
        (col > Math.max(...row.slice(0, x).map((i: number) => i)) ||
        col >  Math.max(...row.slice(x + 1).map((i: number) => i)) ||
        col > Math.max(...grid.slice(0, y).map((i: number[]) => i[x])) ||
        col > Math.max(...grid.slice(y + 1).map((i: number[]) => i[x])))
					})
			).flat().length;

		console.log("Part One", partOne);
		console.timeEnd("dayEightOne");

		console.time("dayEightTwo");
		const partTwo = grid.map((row: number[], y: number) => {
			return row.map((col: number, x: number) => {
				const xLeft =  [...row.slice(0, x).map((i: number, j: number) => i)].reverse();
				const xRight = [...row.slice(x + 1).map((i: number, j: number) => i)];
				const xUp = [...grid.slice(0, y).map((i: number[], j: number) => i[x])].reverse();
				const xDown = [...grid.slice(y + 1).map((i: number[], j: number) => i[x])];

			  let xLeftSV = 0;
				for(let i = 0; i < xLeft.length; i++) {
					if(xLeft[i] >= col) {
						xLeftSV++;
						break;
					} else {
						xLeftSV++;
					}
				}

				let xRightSV = 0;
				for(let i = 0; i < xRight.length; i++) {
					if(xRight[i] >= col) {
						xRightSV++;
						break;
					} else {
						xRightSV++;
					}
				}

				let xUpSV = 0;
				for(let i = 0; i < xUp.length; i++) {
					if(xUp[i] >= col) {
						xUpSV++;
						break;
					} else {
						xUpSV++;
					}
				}

				let xDownSV = 0;
				for(let i = 0; i < xDown.length; i++) {
					if(xDown[i] >= col) {
						xDownSV++;
						break;
					} else {
						xDownSV++;
					}
				}

				return xLeftSV * xRightSV * xUpSV * xDownSV;
			});
		}).flat();
		console.log("Part Two", Math.max(...partTwo));
		console.timeEnd("dayEightTwo")
	});
}

dayEight();

export default {}