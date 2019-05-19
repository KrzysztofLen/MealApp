import React from "react";
import {connect} from "react-redux";
import {startAddMeal} from "../../Redux/actions/meals";
import {startDeleteOrder, startEditOrder} from "../../Redux/actions/orders";
import MealsForm from "../Meals/MealsForm";
import Modal from "../Modal/Modal";
import MealsList from "../Meals/MealsList";
import OrderDelete from "./OrderDelete";
import _ from "lodash";
import {OrdersEnum} from "../../main";

interface IProps {
    id: string,
    orderName: string,
    orderOwner: string,
    status?: string,
    prize: string,
    startAddMeal: (id: string, meal: IMeal) => void,
    startEditOrder: (updates: any) => void,
    meals: Array<IMeal>,
    history?: boolean,
    startDeleteOrder: (id: string) => void
}

interface IMeal {
    mealName: string,
    orderer: string,
    prize: string
}

interface IState {
    open: boolean,
    toggle: boolean
    openConfirm: boolean
}

class OrdersList extends React.Component<IProps, IState> {
    state: IState = {
        open: false,
        toggle: false,
        openConfirm: false
    }

    onSubmit = (meal: IMeal) => {
        this.props.startAddMeal(this.props.id, meal);
        this.setState({open: false});
    }

    onDialogOpen = () => {
        this.setState({open: true});
    }

    onDialogClose = () => {
        this.setState({open: false, openConfirm: false});
    };

    private onCofirmOpen = (): void => {
        this.setState({openConfirm: true});
    }


    prizeSummaryRender() {
        let summary: number = 0;

        _.map(this.props.meals, (meal: IMeal) => {
            summary += (parseFloat(meal.prize.replace(/[.,\s]/g, '')));
        });

        return summary / 100;
    }

    onChangeOrderStatus = (status: string) => {
        const id = this.props.id;

        this.props.startEditOrder({
            id,
            status
        });
    }

    private onToggle = () => {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    private onDeleteOrder = () => {
        const orderID = this.props.id;
        this.props.startDeleteOrder(orderID);
        this.setState({openConfirm: false});
    }

    render() {
        return (
            <div className={"ordersList__container"}>
                <div className={`ordersList ${this.state.toggle ? "open" : "close"}`} onClick={this.onToggle}>
                    <div className={"ordersList__values"}>
                        <div className={"ordersList__name"}>{this.props.orderName}</div>
                        <div className={"ordersList__owner"}>{this.props.orderOwner}</div>
                        <div className={"ordersList__prize"}>{this.prizeSummaryRender()}</div>
                        <div className={"ordersList__icon"}>
                        <span className="icon">
                            <i className={`fas ${this.state.toggle ? "fa-angle-up" : "fa-angle-down"}`}/>
                        </span>
                        </div>
                    </div>
                    <div className={"ordersList__status"}>
                        {this.props.history !== true && <button onClick={this.onDialogOpen}>
							Add Meal
						</button>}
                        <Modal isOpen={this.state.open} onClick={this.onDialogClose} title={"Create Meal"}
                               component={<MealsForm order={this.props} onSubmit={this.onSubmit}
                                                     onClick={this.onDialogClose}/>}/>

                        <div className={"ordersList__statuses"}>
                            <span className={"ordersList__statusLabel"}>Status:</span>

                            <div className={"buttons has-addons"}>
                            <span
                                className={`button ${this.props.status === OrdersEnum.opened ? "is-primary is-selected" : ""}`}
                                onClick={this.onChangeOrderStatus.bind(this, OrdersEnum.opened)}>
                                {OrdersEnum.opened}</span>
                                <span
                                    className={`button ${this.props.status === OrdersEnum.finalized ? "is-primary is-selected" : ""}`}
                                    onClick={this.onChangeOrderStatus.bind(this, OrdersEnum.finalized)}>{OrdersEnum.finalized}
                            </span>
                            </div>
                        </div>

                    </div>

                    <div className={"ordersList__meals"}>
                        <div className={"ordersSummary__labels"}>
                            <label className={"ordersSummary__orderLabel"}>Meal</label>
                            <label className={"ordersSummary__ownerLabel"}>Orderer</label>
                            <label className={"ordersSummary__prizeLabel"}>Prize</label>
                        </div>
                        {_.map(this.props.meals, (meal: IMeal, idx: number) => {
                            return <MealsList key={idx} {...meal} orderID={this.props.id} order={this.props}/>;
                        })}
                    </div>
                </div>

                <div className={"ordersList__delete"} onClick={this.onCofirmOpen}>
                    <span className="icon">
                        <i className="fas fa-trash-alt has-text-white"/>
                    </span>
                </div>
                <OrderDelete isOpen={this.state.openConfirm} onConfirmDelete={this.onDeleteOrder} onClick={this.onDialogClose}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    startAddMeal: (id: string, meal: IMeal) => dispatch(startAddMeal(id, meal)),
    startEditOrder: (updates: any) => dispatch(startEditOrder(updates)),
    startDeleteOrder: (id: string) => dispatch(startDeleteOrder(id))
});

export default connect(undefined, mapDispatchToProps)(OrdersList);