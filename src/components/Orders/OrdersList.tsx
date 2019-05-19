import React from "react";
import {connect} from "react-redux";
import {startAddMeal} from "../../Redux/actions/meals";
import {startEditOrder} from "../../Redux/actions/orders";
import MealsForm from "../Meals/MealsForm";
import Modal from "../Modal/Modal";
import MealsList from "../Meals/MealsList";
import _ from "lodash";
import {StatusEnum} from "./../../utils";

interface IProps {
    id: string,
    orderName: string,
    orderOwner: string,
    status?: string,
    prize: string,
    startAddMeal: (id: string, meal: IMeal) => void,
    startEditOrder: (updates: any) => void,
    meals: Array<IMeal>,
    history?: boolean
}

interface IMeal {
    mealName: string,
    orderer: string,
    prize: string
}

interface IState {
    open: boolean,
    toggle: boolean
}

class OrdersList extends React.Component<IProps, IState> {
    state: IState = {
        open: false,
        toggle: false
    }

    onSubmit = (meal: IMeal) => {
        this.props.startAddMeal(this.props.id, meal);
        this.setState({open: false});
    }

    onDialogOpen = () => {
        this.setState({open: true});
    }

    onDialogClose = () => {
        this.setState({open: false});
    };

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

    render() {
        return (
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
                    <Modal open={this.state.open} onClose={this.onDialogClose} title={"Create Meal"}
                           component={<MealsForm order={this.props} onSubmit={this.onSubmit}
                                                 onClose={this.onDialogClose}/>}/>

                    <div className={"ordersList__statuses"}>
                        <span className={"ordersList__statusLabel"}>Status:</span>

                        <div className={"buttons has-addons"}>
                            <span className={`button ${this.props.status === StatusEnum.opened ? "is-primary is-selected" : ""}`}
                                  onClick={this.onChangeOrderStatus.bind(this, StatusEnum.opened)}>
                                {StatusEnum.opened}</span>
                            <span className={`button ${this.props.status === StatusEnum.finalized ? "is-primary is-selected" : ""}`}
                                  onClick={this.onChangeOrderStatus.bind(this, StatusEnum.finalized)}>{StatusEnum.finalized}
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
        )
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    startAddMeal: (id: string, meal: IMeal) => dispatch(startAddMeal(id, meal)),
    startEditOrder: (updates: any) => dispatch(startEditOrder(updates))
});

export default connect(undefined, mapDispatchToProps)(OrdersList);