import { readInput } from "./utils/reader";

const daySeven = () => {
	readInput(7, (_: any, d: string) => {
		console.time("daySevenOne");
		const input = d.split("\n");
		const path: string[] = [];
		const fileSystem = new Map<string, string[]>();
		let listing = false;
		for (const line of input) {
			if (line.includes("$ cd ") ) {
				listing = false;
				const directory = line.split("$ cd ")[1];
				if (directory !== "..") {
					path.push(directory);
					continue;
				}
				else {
					path.pop();
					continue;
				}
			} else if (line === "$ ls") {
				listing = true;
				continue;
			}

			if (listing) {
				const currentDirectory = fileSystem.get(path.join("/"));
				if (currentDirectory) {
					currentDirectory.push(line);
				} else {
					fileSystem.set(path.join("/"), [line]);
				}
			}
		}

		const sizes: number[] = [];
		fileSystem.forEach((value, key) => {
			const size = directorySize(key, value, fileSystem);
			sizes.push(size);
		});

		const partOne = sizes.sort((a, b) => b - a).filter((i, _) => i <= 100000).reduce((a, b) => a + b, 0);

		console.log("Part One", partOne);
		console.timeEnd("daySevenOne");

		console.time("daySevenTwo");
		const TOTAL_SPACE_AVAILABLE = 70000000;
		const REQUIRED_SPACE = 30000000;
		const unusedSpace = TOTAL_SPACE_AVAILABLE -  sizes.sort((a, b) => b - a)[0];
		const spaceToClear = REQUIRED_SPACE - unusedSpace;

		console.log("Part Two", sizes.filter((i, _) => i >= spaceToClear).sort((a, b) => a - b)[0]);
		console.timeEnd("daySevenTwo");
	});

};

const directorySize = (source: string, contents: string[], fileSystem: Map<string, string[]>) => {
	let size = 0;
	for (const file of contents) {
		if (file.includes("dir")) {
			const directory = fileSystem.get(source + "/" + file.split(" ")[1]);
			if (directory) {
				size += directorySize(source + "/" + file.split(" ")[1], directory!, fileSystem);
			}
		} else {
			size += parseInt(file.split(" ")[0]);
		}
	}
	return size;
};

daySeven();

export {};