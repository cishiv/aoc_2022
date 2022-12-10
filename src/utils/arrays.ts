export const partition = (array: string[], n: number): string[][] => {
	return array.length ? [array.splice(0, n)].concat(partition(array, n)) : [];
};

export class _Array<T> extends Array<T> {
	static range(from: number, to: number, step: number): number[] {
		return Array.from(Array(Math.floor((to - from) / step) + 1)).map(
			(v, k) => from + k * step
		);
	}
}

export const intersect = (a: number[], b: number[]): number[] => {
	return a.filter((x) => b.includes(x));
};