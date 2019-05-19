import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import 'bulma/css/bulma.css';
import './App.scss';
import AppRouter from "./AppRouter";
import {startFetchOrders} from "./Redux/actions/orders";
import configureStore from './Redux/store/configureStore';
import "./firebase/firebase";
import Loader from "./components/Loader/Loader";

const store = configureStore();

function Index() {
	return (
		<Provider store={store}>
			<AppRouter/>
		</Provider>
	);
}

ReactDOM.render(<Loader/>, document.getElementById('root'));

store.dispatch(startFetchOrders()).then(() => {
	ReactDOM.render(<Index />, document.getElementById('root'));
});

export default Index;
