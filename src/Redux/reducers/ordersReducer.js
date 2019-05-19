import {ADD_ORDERS, EDIT_ORDER, FETCH_ORDERS} from "./../actions/orders";
import {ADD_MEAL, EDIT_MEAL} from "../actions/meals";
import _ from "lodash";

// Orders reducers
const orderReducersDefaultState = [];

export default (state = orderReducersDefaultState, action) => {
	switch (action.type) {
		case ADD_ORDERS:
			return [...state, action.order];
		case ADD_MEAL:
			return state.map((order) => {
				if (order.id === action.meal.ordersID) {
					const meals = [];

					_.map(order.meals, (meal) => meals.push(meal));

					return {
						...order,
						meals: [
							...meals,
							action.meal
						]
					}
				} else {
					return order;
				}
			});
		case EDIT_MEAL:
			return state.map((order) => {
				if(order.id === action.updates.orderID) {
					const meals = [];

					_.map(order.meals, (meal) => meals.push(meal));

					const objIndex = meals.findIndex((meal => meal.id === action.updates.mealID));
					meals[objIndex] = action.updates;

					return {
						...order,
						meals: [
							...meals
						]
					}
				} else {
					return order;
				}
			});
		case EDIT_ORDER:
			return state.map((order) => {
				if(order.id === action.status.id) {
					return {
						...order,
						...action.status
					}
				} else {
					return order;
				}
			});
		case FETCH_ORDERS:
			return action.orders;
		default:
			return state;
	}
};