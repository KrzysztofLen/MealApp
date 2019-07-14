export default ["John Raviolii", "Bruce Rolls", "Ed Edowski"];

export enum OrderStatus {
	Opened = "Opened",
	Finalized = "Finalized"
}

export enum ErrorMessageEnum {
	provideValue = "FAILURE! You must provide a value"
}

export const ordersLabels: Array<string> = ["Order from", "Owner", "Prize"];
export const mealsLabels: Array<string> = ["Meal", "Orderer", "Prize"];
