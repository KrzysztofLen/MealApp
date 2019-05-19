import database from '../../firebase/firebase';
import {objectsToArray} from "../../utils/utils";

export const ADD_ORDERS = "ADD_ORDERS";

// ADD_ORDER
export const addOrders = (order) => ({
	type: ADD_ORDERS,
	order
});

export const startAddOrder = (order = {}) => async (dispatch) => {
	return database.ref("orders").push(order).then((ref) => {
		dispatch(addOrders({
			id: ref.key,
			...order
		}));
	});
};

export const FETCH_ORDERS = "FETCH_ORDERS";

// FETCH_ORDERS
export const fetchOrders = (orders) => ({
	type: FETCH_ORDERS,
	orders
});

export const startFetchOrders = () => (dispatch) => {
	return database.ref("orders").once("value").then((snapshot) => {
		const orders = [];

		snapshot.forEach((childSnapshot) => {
			orders.push({
				id: childSnapshot.key,
				...childSnapshot.val(),
				meals: objectsToArray(childSnapshot.val().meals)
			});
		});

		dispatch(fetchOrders(orders));
	});
};

export const EDIT_ORDER = "EDIT_ORDER";

// EDIT_ORDER
export const editOrder = (status) => ({
	type: EDIT_ORDER,
	status
});

export const startEditOrder = (updates) => (dispatch) => {
	return database.ref(`orders/${updates.id}`).update({status: updates.status}).then(() => {
		dispatch(editOrder(updates));
	});
};