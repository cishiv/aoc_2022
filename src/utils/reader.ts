import fs = require('fs');

export const readInputSync = (day: number) => {
  const input = fs.readFileSync(`inputs/day-${day}`, 'utf8');
  return input;
};

export const readInput = (day: number, callback: any) => {
  return fs.readFile(`inputs/day-${day}`, 'utf8', callback);
};
