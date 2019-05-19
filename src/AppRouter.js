import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import OrdersView from "./Views/OrdersView";
import HistoryView from "./Views/HistoryView";
// import NoMatch from "../components/NoMatch/NoMatch";
import Header from "./components/Header/Header";
import Page from "./components/Page/Page";

class AppRouter extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Header/>
					<Switch>
						{/*<Route path="/" exact component={OrdersView} title="Index Page"/>*/}
						{/*<Route path="/history" component={HistoryView}/>*/}
						<Route path="/" exact
							render={props => (
								<Page {...props} component={OrdersView} title="Orders" />
							)}
						/>
						<Route path="/history" exact
						       render={props => (
							       <Page {...props} component={HistoryView} title="History" />
						       )}
						/>
						{/*<Route component={NoMatch}/>*/}
					</Switch>
					{/*<Navigation/>*/}
				</div>
			</Router>
		)
	}
}

export default AppRouter;
