import { readInput } from "./utils/reader";

type Tree = { x: number, y:number, value: number };

const dayEight = () => {
	readInput(8, (_: any, d: string) => {
		const grid = d
			.split("\n")
			.map((i: string) => i
				.split("")
				.map((j: string) => parseInt(j)))
  
		console.time("dayEightOne")
		const partOne: number = grid.map((row: number[], y: number) => {
			return row.map((col: number, x: number) => {
				const xLeft: Tree[] =  
					[...row.slice(0, x).map((i: number, j: number) => {
						return {
							x: j,
							y: y,
							value: i
						}
					}),
					].sort((a: any, b: any) => b.x - a.x);

				const xRight: Tree[] = [
					...row.slice(x + 1).map((i: number, j: number) => {
						return {
							x: j + (x + 1),
							y: y,
							value: i
						}
					}),
				]
          
				const xUp: Tree[] = [
					...grid.slice(0, y).map((i: number[], j: number) => {
						return {
							x: x,
							y: j,
							value: i[x]
						}}),
				].sort((a: any, b: any) => b.y - a.y);

				const xDown: Tree[]= [
					...grid.slice(y + 1).map((i: number[], j: number) => {
						return {
							x: x,
							y: j + (y + 1),
							value: i[x]
						}}),
				];

				// if col is an edge, then it is visible
				if (x === 0 || x === row.length - 1 || y === 0 || y === grid.length - 1) {
					return 1;
				} else if (
					col > Math.max(...xDown.map((i: Tree) => i.value)) ||
          col > Math.max(...xUp.map((i: Tree) => i.value)) ||
          col > Math.max(...xLeft.map((i: Tree) => i.value)) ||
          col > Math.max(...xRight.map((i: Tree) => i.value))) {
					return 1;
				} else {
					return 0;
				}
			});
		}).flat().filter((i: number) => i === 1).length;

		console.log("Part One", partOne);
		console.timeEnd("dayEightOne");

		console.time("dayEightTwo");
		const partTwo = grid.map((row: number[], y: number) => {
			return row.map((col: number, x: number) => {
				const xLeft =  
					[...row.slice(0, x).map((i: number, j: number) => {
						return {
							x: j,
							y: y,
							value: i
						}
					}),
					].sort((a: any, b: any) => b.x - a.x);

				const xRight = [
					...row.slice(x + 1).map((i: number, j: number) => {
						return {
							x: j + (x + 1),
							y: y,
							value: i
						}
					}),
				]
          
				const xUp = [
					...grid.slice(0, y).map((i: number[], j: number) => {
						return {
							x: x,
							y: j,
							value: i[x]
						}}),
				].sort((a: any, b: any) => b.y - a.y);

				const xDown = [
					...grid.slice(y + 1).map((i: number[], j: number) => {
						return {
							x: x,
							y: j + (y + 1),
							value: i[x]
						}}),
				];

			  let xLeftSV = 0;
				for(let i = 0; i < xLeft.length; i++) {
					if(xLeft[i].value >= col) {
						xLeftSV++;
						break;
					} else {
						xLeftSV++;
					}
				}

				let xRightSV = 0;
				for(let i = 0; i < xRight.length; i++) {
					if(xRight[i].value >= col) {
						xRightSV++;
						break;
					} else {
						xRightSV++;
					}
				}

				let xUpSV = 0;
				for(let i = 0; i < xUp.length; i++) {
					if(xUp[i].value >= col) {
						xUpSV++;
						break;
					} else {
						xUpSV++;
					}
				}

				let xDownSV = 0;
				for(let i = 0; i < xDown.length; i++) {
					if(xDown[i].value >= col) {
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