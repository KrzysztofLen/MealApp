import React from "react";
import {connect} from "react-redux";
import {startAddMeal} from "../../Redux/actions/meals";
import {startEditOrder} from "../../Redux/actions/orders";
import MealsForm from "../Meals/MealsForm";
import Modal from "../Modal/Modal";
import MealsList from "../Meals/MealsList";
import OrderDelete from "./OrderDelete";
import _ from "lodash";
import {OrderStatus} from "../../main";
import Button, {ButtonType} from "../Button/Button";
import {ModalProvider, ModalConsumer} from "../Modal/Context/ModalContext";

interface IProps {
	id: string;
	orderName: string;
	orderOwner: string;
	status?: string;
	prize: string;
	startAddMeal: (id: string, meal: IMeal) => void;
	startEditOrder: (updates: any) => void;
	meals: Array<IMeal>;
	history?: boolean;
}

interface IMeal {
	mealName: string;
	orderer: string;
	prize: string;
}

interface IState {
	toggle: boolean;
}

class Order extends React.Component<IProps, IState> {
	state: IState = {
		toggle: false
	};

	onSubmit = (meal: IMeal) => {
		this.props.startAddMeal(this.props.id, meal);
	};

	prizeSummaryRender() {
		let summary: number = 0;

		_.map(this.props.meals, (meal: IMeal) => {
			summary += parseFloat(meal.prize.replace(/[.,\s]/g, ""));
		});

		return summary / 100;
	}

	onChangeOrderStatus = (status: string) => {
		const id = this.props.id;

		this.props.startEditOrder({
			id,
			status
		});
	};

	private onToggle = () => {
		this.setState(prevState => ({
			toggle: !prevState.toggle
		}));
	};

	render() {
		return (
			<div className={"ordersList__container"}>
				<div
					className={`ordersList ${this.state.toggle ? "open" : "close"}`}
					onClick={this.onToggle}>
					<div className={"ordersList__values"}>
						<div className={"ordersList__name"}>
							{this.props.orderName}
						</div>
						<div className={"ordersList__owner"}>
							{this.props.orderOwner}
						</div>
						<div className={"ordersList__prize"}>
							{this.prizeSummaryRender()}
						</div>
						<div className={"ordersList__icon"}>
							<span className="icon">
								<i
									className={`fas ${
										this.state.toggle
											? "fa-angle-up"
											: "fa-angle-down"
									}`}
								/>
							</span>
						</div>
					</div>
					<div className={"ordersList__status"}>
						<ModalProvider>
							<ModalConsumer>
								{modalProps => (
									<React.Fragment>
										<Button
											buttonText={"Add Meal"}
											buttonType={ButtonType.link}
											outlined={false}
											name={"meal"}
											onClick={modalProps.showModal}
										/>

										<Modal
											title={"Create Meal"}
											isOpen={modalProps.show}
											onClose={modalProps.hideModal}>
											<MealsForm
												order={this.props}
												onSubmit={this.onSubmit}
												onClick={modalProps.hideModal}
											/>
										</Modal>
									</React.Fragment>
								)}
							</ModalConsumer>
						</ModalProvider>

						<div className={"ordersList__statuses"}>
							<span className={"ordersList__statusLabel"}>Status:</span>

							<div className={"buttons has-addons"}>
								<span
									className={`button ${
										this.props.status === OrderStatus.Opened
											? "is-primary is-selected"
											: ""
									}`}
									onClick={this.onChangeOrderStatus.bind(
										this,
										OrderStatus.Opened
									)}>
									{OrderStatus.Opened}
								</span>
								<span
									className={`button ${
										this.props.status === OrderStatus.Finalized
											? "is-primary is-selected"
											: ""
									}`}
									onClick={this.onChangeOrderStatus.bind(
										this,
										OrderStatus.Finalized
									)}>
									{OrderStatus.Finalized}
								</span>
							</div>
						</div>
					</div>

					<div className={"ordersList__meals"}>
						{/*{this.props.meals.length > 0 && (*/}
						{/*<Label labels={mealsLabels} />*/}
						{/*)}*/}

						{_.map(this.props.meals, (meal: IMeal, idx: number) => {
							return (
								<MealsList
									key={idx}
									{...meal}
									orderID={this.props.id}
									order={this.props}
								/>
							);
						})}
					</div>
				</div>

				<ModalProvider>
					<ModalConsumer>
						{modalProps => (
							<React.Fragment>
								<Button
									name={"delete"}
									buttonType={ButtonType.danger}
									outlined={true}
									iconName={"trash-alt"}
									onClick={modalProps.showModal}
								/>

								<Modal
									title={"Delete order"}
									isOpen={modalProps.show}
									onClose={modalProps.hideModal}>
									<OrderDelete
										isOpen={modalProps.show}
										orderId={this.props.id}
										onClose={modalProps.hideModal}
									/>
								</Modal>
							</React.Fragment>
						)}
					</ModalConsumer>
				</ModalProvider>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch: any) => ({
	startAddMeal: (id: string, meal: IMeal) => dispatch(startAddMeal(id, meal)),
	startEditOrder: (updates: any) => dispatch(startEditOrder(updates))
});

export default connect(
	undefined,
	mapDispatchToProps
)(Order);
