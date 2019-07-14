import React from "react";
import {connect} from "react-redux";
import Modal from "./../components/Modal/Modal";
import {ordersLabels, OrderStatus} from "../main";
import Button, {ButtonType} from "../components/Button/Button";
import OrderCreate, {IOrder} from "../components/Orders/OrderCreate";
import {
	ModalConsumer,
	ModalProvider
} from "../components/Modal/Context/ModalContext";
import Order from "../components/Orders/Order";
import Message, {MessageType} from "../components/Message/Message";
import Label from "../components/Label/Label";

interface IProps {
	orders: Array<IOrder>;
}

class OrdersView extends React.Component<IProps, {}> {
	public render(): JSX.Element {
		const openedOrders: Array<IOrder> = this.props.orders.filter(
			(order: IOrder) => order.status === OrderStatus.Opened
		);

		return (
			<div className={"meals_app has-background-grey-darker"}>
				<div className={"orders"}>
					<ModalProvider>
						<ModalConsumer>
							{modalProps => (
								<React.Fragment>
									<Button
										buttonText={"Create Order"}
										buttonType={ButtonType.success}
										outlined={true}
										onClick={modalProps.showModal}
										iconName={"plus-circle"}
									/>

									<Modal
										title={"Create Order"}
										isOpen={modalProps.show}
										onClose={modalProps.hideModal}>
										<OrderCreate onClose={modalProps.hideModal} />
									</Modal>
								</React.Fragment>
							)}
						</ModalConsumer>
					</ModalProvider>

					{openedOrders.length === 0 ? (
						<Message
							message={"Sorry currently there is no orders :("}
							type={MessageType.info}
						/>
					) : (
						<Label labels={ordersLabels} />
					)}

					{openedOrders.map((order: IOrder, idx: number) => {
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

export default connect(
	mapStateToProps,
	undefined
)(OrdersView);
