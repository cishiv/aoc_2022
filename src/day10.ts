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


const dayTenPartTwo = () => {
	readInput(10, (_: any, d: string) => {
		// The CRT is 40 pixels wide and 6 pixels ta
		// At each clock cycle, there is a pixel position denoted by the register value
		// the clock cycle determines the viewing window available on the cry
		// every 40 cycles, the CRT shifts down by 1 pixel
		// During cycle  8: CRT draws pixel in position 7
		// Current CRT row: ##..##..
		// End of cycle  8: finish executing addx -3 (Register X is now 8)
		// Sprite position: .......###..............................
		// registerX is the middle of the sprite (the sprite is 3 pixels wide) -> 0 indexed

		console.time("dayTenTwo");
		let currentClockCycle = 0;
		let registerX = 1;

    type Register = {
      value: number;
      pixel: string;
      output?: string;
    }

    const CPU_OPERATIONS: Map<number, Register> = new Map([]);
    const instructionSet = d.split("\n").map((instr: string) => instr.split(" "));
    instructionSet.forEach((instr: string[]) => {
    	let pixels = ".".repeat(40).split("");

    	if (registerX > 0) {
    		// the sprite is 3 pixels wide, we need to place it in the correct position in the pixels array
    		// one after the mid point
    		if (registerX + 1 <= 40) {
    			pixels[registerX + 1] = "#";
    		}

    		// one before the mid point
    		if (registerX - 1 >= 0) {
    			pixels[registerX - 1] = "#";
    		}

    		// the mid point
    		pixels[registerX] = "#";
    	}

    	if (instr[0] === "noop") {
    		currentClockCycle += 1;
    		// register is idx
    		CPU_OPERATIONS.set(currentClockCycle, {
    			value: registerX,
    			pixel: pixels.join(""),
    		});
    	} else {
    		if (instr[0] === "addx") {
    			// wait for 1 cycle
    			currentClockCycle += 1;
    			CPU_OPERATIONS.set(currentClockCycle, {
    				value: registerX,
    				pixel: pixels.join(""),
    			});
    			// update the register on the second cycle
    			currentClockCycle += 1;
    			// "during"
    			CPU_OPERATIONS.set(currentClockCycle, {
    				value: registerX,
    				pixel: pixels.join(""),
    			});
    			// increment after
    			registerX += parseInt(instr[1]);
    		}
    	}
    });

    let rowCount = 1;
    let output = "";
    for (let i = 1; i <= Array.from(CPU_OPERATIONS.keys()).length; i++) {
    	// check whether the pixel position at a particular clock cycle is "visible" on the CRT
    	const pixels = CPU_OPERATIONS.get(i)?.pixel;
    	// the "viewable window" at a given clock cycle is i units wide
    	const window = pixels.split("").slice(0, i + 1)[rowCount - 1];
    	output += window;
    	if (rowCount === 40) {
    		console.log(output);
    		CPU_OPERATIONS.get(i).output = output;
    		output = "";
    		rowCount = 0;
    	}
    	rowCount++;
    }
    console.timeEnd("dayTenTwo");
	});
};

dayTenPartOne();
dayTenPartTwo();

export {};