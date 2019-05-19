import database from '../../firebase/firebase';
import {editOrder} from "./orders";

export const ADD_MEAL = "ADD_MEAL";

// ADD_MEAL
export const addMeal = (meal) => ({
	type: ADD_MEAL,
	meal
});

export const startAddMeal = (id, meal = {}) => async (dispatch) => {
	return database.ref(`orders/${id}/meals`).push(meal).then((ref) => {
		dispatch(addMeal({
			id: ref.key,
			ordersID: id,
			...meal
		}));
	});
};

export const EDIT_MEAL = "EDIT_MEAL";

// EDIT_ORDER
export const editMeal = (updates) => ({
	type: EDIT_MEAL,
	updates
});

export const startEditMeal = (updates) => (dispatch) => {
	return database.ref(`orders/${updates.orderID}/meals/${updates.mealID}`).update({
		mealName: updates.mealName,
		orderer: updates.orderer,
		prize: updates.prize}).then(() => {
		dispatch(editMeal(updates));
	});
};