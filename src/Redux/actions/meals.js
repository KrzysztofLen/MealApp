import database from '../../firebase/firebase';

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
