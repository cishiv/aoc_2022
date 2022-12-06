import { readInput } from "./utils/reader"

const daySix = () => {
	readInput(6, (_: any, d: string) => {
		const seenBeforePacketMarkers: string[] = [];
		let partOne = -1;

		const signalParts = d.split("");

		console.time("day_six_part_one");
		for(let i = 0; i < signalParts.length; i++) {
			const part = signalParts[i];
			if (!seenBeforePacketMarkers.includes(part) && seenBeforePacketMarkers.length < 4) {
				seenBeforePacketMarkers.push(part);
			} else if (seenBeforePacketMarkers.includes(part)) {
				seenBeforePacketMarkers.indexOf(part) === 0 ? seenBeforePacketMarkers.shift() : seenBeforePacketMarkers.splice(0, seenBeforePacketMarkers.indexOf(part) + 1);
				seenBeforePacketMarkers.push(part);
			}

			if (seenBeforePacketMarkers.length === 4) {
				partOne = i + 1;
				break;
			}
		}
		console.log("Part One", partOne);
		console.timeEnd("day_six_part_one");

		const seenBeforeMessageMarkers: string[] = [];
		let partTwo = -1;

		console.time("day_six_part_two");
		for(let i = 0; i < signalParts.length; i++) {
			const part = signalParts[i];
			if (!seenBeforeMessageMarkers.includes(part) && seenBeforeMessageMarkers.length < 14) {
				seenBeforeMessageMarkers.push(part);
			} else if (seenBeforeMessageMarkers.includes(part)) {
				seenBeforeMessageMarkers.indexOf(part) === 0 ? seenBeforeMessageMarkers.shift() : seenBeforeMessageMarkers.splice(0, seenBeforeMessageMarkers.indexOf(part) + 1);
				seenBeforeMessageMarkers.push(part);
			}

			if (seenBeforeMessageMarkers.length === 14) {
				partTwo = i + 1;
				break;
			}
		}

		console.log("Part Two", partTwo);
		console.timeEnd("day_six_part_two");
	});
}

daySix()

export {}