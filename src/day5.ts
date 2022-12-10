import { readInput } from "./utils/reader";

const dayFive = () => {
	readInput(5, (_: any, d: string) => {
		const out = d.split("\n\n");
		const rawCrates = out[0].split("\n");

		// So that we can support n number of crates
		const indicies = [...rawCrates]
			.reverse()[0]
			.split("")
			.map((i: string, idx: number) => parseInt(i) ? { idx, i: parseInt(i) } : { idx, i: -1 })
			.filter((q: { idx: number, i: number } ) => q.i !== -1);

		const indexMap = new Map<number, number>([...indicies].map((q: { idx: number, i: number } ) => [q.i, q.idx]));

		const crates = new Map<number, string[]>(
			[...indicies]
				.map((q: { idx: number, i: number } ) => [q.idx, []])
		);
    
		// Build the initial crate configuration
		rawCrates.slice(0, rawCrates.length - 1)
			.map((crateCol: string) => {
				return crateCol
					.split("")
					.map((s: string, idx0: number) => {
						return {
							idx: idx0,
							val: s
						};
					})
					.filter((s: { idx: number, val: string }) => s.val.length > 0 && s.val.charCodeAt(0) > 64 && s.val.charCodeAt(0) < 91);
			})
			.forEach((crateCol: { idx: number, val: string }[]) => {
				crateCol
					.forEach((crate: { idx: number, val: string }) => {
						const found = crates.get(crate.idx);
						if (found) {
							found.push(crate.val);
						} else {
							crates.set(crate.idx, [crate.val]);
						}
					});
			});

		// Since we're mutating the crates, we need to clone them
		const partOneCrates = new Map<number, string[]>([...crates].map((q: [number, string[]]) => [q[0], [...q[1]]]));
		const partTwoCrates = new Map<number, string[]>([...crates].map((q: [number, string[]]) => [q[0], [...q[1]]]));

		// Part One
		console.time("day_five_part_one");
		out[1]
			.split("\n")
			.map((s: string) => s
				.split(/\s+/)
				.filter((s: string) => s.length > 0 && !isNaN(parseInt(s)))
				.map(Number))
			.forEach((i: number[]) => {
				const fIdx = indexMap.get(i[1]);
				const tIdx = indexMap.get(i[2]);
				if (fIdx && tIdx) {
					const f = partOneCrates.get(fIdx);
					const t = partOneCrates.get(tIdx);
					if (f && t) {
						const toMove = f.splice(0, i[0]).filter((s: string) => s.length > 0).reverse();
						t.unshift(...toMove);
					}
				}
			});
    
		const partOne = [...partOneCrates.values()].map((i) => i.length > 0 ? i.join("")[0] : [" "]).join("");
		console.log("Part One", partOne);
		console.timeEnd("day_five_part_one");
    
		// Part Two
		console.time("day_five_part_two");
		out[1]
			.split("\n")
			.map((s: string) => s
				.split(/\s+/)
				.filter((s: string) => s.length > 0 && !isNaN(parseInt(s)))
				.map(Number))
			.forEach((i: number[]) => {
				const fIdx = indexMap.get(i[1]);
				const tIdx = indexMap.get(i[2]);
				if (fIdx && tIdx) {
					const f = partTwoCrates.get(fIdx);
					const t = partTwoCrates.get(tIdx);
					if (f && t) {
						const toMove = f.splice(0, i[0]).filter((s: string) => s.length > 0);
						t.unshift(...toMove);
					}
				}
			});

		const partTwo = [...partTwoCrates.values()].map((i) => i.length > 0 ? i.join("")[0] : [" "]).join("");
		console.log("Part Two", partTwo);
		console.timeEnd("day_five_part_two");
	});
};

dayFive();

export {};