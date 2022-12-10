import { readFileSync, readFile, createReadStream } from 'fs';
import * as readline from "readline";

export const readInputSync = (day: number) => {
	const input = readFileSync(`inputs/day-${day}`, 'utf8');
	return input;
};

export const readInput = (day: number, callback: any) => {
	return readFile(`inputs/day-${day}`, 'utf8', callback);
};

export const readInputByLine = async (day: number, callback: any) => {
	const fileStream = createReadStream(`inputs/day-${day}`);
	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	rl.on('line', (line: string) => {
		callback(line);
	});
};