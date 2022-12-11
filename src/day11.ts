import { readInput } from "./utils/reader";

type Monkey = {
  items: number[];
  operation: (old: number) => number;
  // returns the monkey to pass to
  test: (stress: number) => number;
  divisor: number;
  business: number;
}

const dayElevenOne = () => {
	const troop: Map<number, Monkey> = new Map([]);
	let allDivisors = 1;
	readInput(11, (_: any, d: string) => {
		console.time("dayElevenOne");
		d.split("\n\n").map((x) => x.split("\n")).forEach((x) => {
			const ops = x[2].trim().replace("Operation:", "").trim().split(" ");
			const testCondition = parseInt(x[3].trim().replace("Test:", "").trim().split(" ")[2]);
			const trueOutcome = parseInt(x[4].trim().replace("If true: throw to monkey ", ""));
			const falseOutcome = parseInt(x[5].trim().replace("If false: throw to monkey ", ""));
			const monkey: Monkey = {
				items: x[1].split(",").map((x) => parseInt(x.trim().replace("Starting items: ", ""))),
				operation: (old: number) => {
					let operandTwo = ops[4] === "old" ? old : parseInt(ops[4]);
					switch (ops[3]) {
					case "+":
						return old + operandTwo;
					case "-":
						return old - operandTwo;
					case "*":
						return old * operandTwo;
					case "/":
						return old / operandTwo;
					case "%":
						return old % operandTwo;
					default:
						return old;
					}
				},
				divisor: testCondition,
				test: (stress: number) => {
					return stress % testCondition === 0 ? trueOutcome : falseOutcome;
				},
				business: 0
			};
			allDivisors *= testCondition;
			troop.set(parseInt(x[0].split(" ")[1].replace(":", "")), monkey);
			// console.log(`For monkey ${x[0].split(" ")[1].replace(":", "")} the test condition is ${testCondition} and the true outcome is ${trueOutcome} and the false outcome is ${falseOutcome} and the starting items are ${x[1].split(",").map((x) => parseInt(x.trim().replace("Starting items: ", "")))} and the operation is ${ops[3]} ${ops[4]}`);
		});
		const monkeyBusiness = simulate(troop, 20, allDivisors);
		console.log("Part One", monkeyBusiness);
		console.timeEnd("dayElevenOne");
	});
};

const dayElevenTwo = () => {
	const troop: Map<number, Monkey> = new Map([]);
	let allDivisors = 1;
	readInput(11, (_: any, d: string) => {
		console.time("dayElevenTwo");
		d.split("\n\n").map((x) => x.split("\n")).forEach((x) => {
			const ops = x[2].trim().replace("Operation:", "").trim().split(" ");
			const testCondition = parseInt(x[3].trim().replace("Test:", "").trim().split(" ")[2]);
			const trueOutcome = parseInt(x[4].trim().replace("If true: throw to monkey ", ""));
			const falseOutcome = parseInt(x[5].trim().replace("If false: throw to monkey ", ""));
			const monkey: Monkey = {
				items: x[1].split(",").map((x) => parseInt(x.trim().replace("Starting items: ", ""))),
				operation: (old: number) => {
					let operandTwo = ops[4] === "old" ? old : parseInt(ops[4]);
					switch (ops[3]) {
					case "+":
						return old + operandTwo;
					case "-":
						return old - operandTwo;
					case "*":
						return old * operandTwo;
					case "/":
						return old / operandTwo;
					case "%":
						return old % operandTwo;
					default:
						return old;
					}
				},
				divisor: testCondition,
				test: (stress: number) => {
					return stress % testCondition === 0 ? trueOutcome : falseOutcome;
				},
				business: 0
			};
			allDivisors *= testCondition;
			troop.set(parseInt(x[0].split(" ")[1].replace(":", "")), monkey);
			// console.log(`For monkey ${x[0].split(" ")[1].replace(":", "")} the test condition is ${testCondition} and the true outcome is ${trueOutcome} and the false outcome is ${falseOutcome} and the starting items are ${x[1].split(",").map((x) => parseInt(x.trim().replace("Starting items: ", "")))} and the operation is ${ops[3]} ${ops[4]}`);
		});

		const monkeyBusiness2 = simulate(troop, 10000, allDivisors, false);
		console.log("Part Two", monkeyBusiness2);
		console.timeEnd("dayElevenTwo");
	});
};

const simulate = (troop: Map<number, Monkey>, rounds: number, allDivisors: number, reduceStress: boolean = true): number => {
	// start from the first monkey
	// the monkey starts inspecting an item
	// because of the inspection, the operation is applied to the item value to indicate stress
	// after the inspection, the escalated stress is reduced (divided by 3 and rounded down to the nearest integer)
	// the stress is then tested against the test condition
	// if the test condition is met, the stress is thrown to the monkey indicated by the true outcome
	// if the test condition is not met, the stress is thrown to the monkey indicated by the false outcome
	// the monkey then inspects the next item
	// if the monkey has no more items to inspect, the monkey is done for this round
	// if a monkey has no items to inspect at a start of its turn, its turn is over
	// when a monkey is thrown an item, the item is added to the _end_ of the monkey's item list
	for(let i = 0; i < rounds; i++) {
		for(let j = 0; j < troop.size; j++) {
			const monkey = troop.get(j);
			if(monkey.items.length === 0) {
				continue;
			}
			// console.log(`Monkey ${j} ${monkey.items}`);
			while (monkey.items.length > 0) {
				const item = monkey.items[0];
				// inspect the item
				// console.log(`\tMonkey inspects an item with a worry level of ${item}`);
				const stress = monkey.operation(item);
				// console.log(`\tWorry level is escalated to ${stress}`);
				// reduce the stress
				const reducedStress = reduceStress ? Math.floor(stress / 3): stress % allDivisors;
				// console.log(`\tMonkey gets bored and reduces the worry level to ${reducedStress}`);
				// test the stress
				const nextMonkey = monkey.test(reducedStress);
				// console.log(`\tMonkey ${j} throws the stress to monkey ${nextMonkey}`);
				// throw the stress to the next monkey
				
				troop.get(nextMonkey).items.push(reducedStress);

				// remove the item from the current monkey
				monkey.items.splice(0, 1);
				// console.log(`Monkey has ${monkey.items.length} items left`);
				// increment the business
				monkey.business++;
			}
		}
	}

	// console.log(troop);
	const sortedTroop = Array.from(troop.values()).sort((a, b) => b.business - a.business);
	return sortedTroop[0].business * sortedTroop[1].business;
};

dayElevenOne();
dayElevenTwo();

export {};