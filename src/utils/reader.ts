import fs = require('fs');

export const readInputSync = (day: number) => {
  const input = fs.readFileSync(`inputs/day-${day}`, 'utf8');
  return input;
};

