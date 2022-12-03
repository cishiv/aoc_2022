export const partition = (array: string[], n: number): string[][] => {
  return array.length ? [array.splice(0, n)].concat(partition(array, n)) : [];
} 