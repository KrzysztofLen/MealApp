export default ["John Travolta", "Bruce Willis", "Andrew Mead"];

export enum StatusEnum {
	ordered = "Ordered",
	opened = "Opened",
	delivered = "Delivered",
    finalized = "Finalized"
}

export const objectsToArray = (values: any) => {
	const array: Array<object> = [];

	for (let key in values) {
		array.push({
			id: key,
			...values[key]
		})
	}

	return array;
};