import { readInput } from "./utils/reader";

const dayTenPartOne = () => {
	readInput(10, (_: any, d: string) => {
		console.time("dayTenOne");
		let currentClockCycle = 0;
		let registerX = 1;

		const CPU_OPERATIONS: Map<number, number> = new Map([]);
		const instructionSet = d.split("\n").map((instr: string) => instr.split(" "));
		instructionSet.forEach((instr: string[]) => {
			if (instr[0] === "noop") {
				currentClockCycle += 1;
				CPU_OPERATIONS.set(currentClockCycle, registerX);
			} else {
				if (instr[0] === "addx") {
					// wait for 1 cycle
					currentClockCycle += 1;
					CPU_OPERATIONS.set(currentClockCycle, registerX);
					// update the register on the second cycle
					currentClockCycle += 1;
					// "during"
					CPU_OPERATIONS.set(currentClockCycle, registerX);
					// increment after
					registerX += parseInt(instr[1]);
				}
			}
		});
		// get the register values "during" 20th, 60th, 100th, 140th, 180th and 220th values, multiplied by the clock cycle
		console.log("Part One",
			(CPU_OPERATIONS.get(20) * 20) +
      (CPU_OPERATIONS.get(60) * 60) +
      (CPU_OPERATIONS.get(100) * 100) +
      (CPU_OPERATIONS.get(140) * 140) +
      (CPU_OPERATIONS.get(180) * 180) +
      (CPU_OPERATIONS.get(220) * 220)
		);
		console.timeEnd("dayTenOne");
	});
};

dayTenPartOne();

export {};