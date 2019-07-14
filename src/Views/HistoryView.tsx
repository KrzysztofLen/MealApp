import React from "react";
import {connect} from "react-redux";
import {IOrder} from "../components/Orders/OrderCreate";
import {OrderStatus} from "../main";
import Message, {MessageType} from "../components/Message/Message";
import Order from "../components/Orders/Order";

interface IProps {
	orders: Array<IOrder>;
}

class History extends React.Component<IProps, {}> {
	render() {
		const finalizedOrders: Array<IOrder> = this.props.orders.filter(
			(order: IOrder) => order.status === OrderStatus.Finalized
		);

		return (
			<div className={"meals_app has-background-grey-darker"}>
				<div className={"orders"}>
					{finalizedOrders.length === 0 && (
						<Message
							message={"Sorry currently there is no orders :("}
							type={MessageType.info}
						/>
					)}

					{finalizedOrders.map((order: IOrder, idx: number) => {
						return <Order key={idx} {...order} />;
					})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		orders: state.orders
	};
};

export default connect(mapStateToProps)(History);
