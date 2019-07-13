export default ["John Raviolii", "Bruce Rolls", "Ed Edowski"];

export enum OrdersEnum {
    noOrder = "Sorry currently there is no orders :(",
    opened = "Opened",
    finalized = "Finalized"
}

export enum ErrorMessageEnum {
    provideValue = "FAILURE! You must provide a value"
}

export const ordersLabels: Array<string> = ["Order from", "Owner", "Prize"];
export const mealsLabels: Array<string> = ["Meal", "Orderer", "Prize"];