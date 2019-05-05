import React from "react";
import {connect} from "react-redux";
import {startAddMeal} from "../../Redux/actions/meals";
import {startEditOrder} from "../../Redux/actions/orders";
import MealsForm from "../Meals/MealsForm";
import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";
import Modal from "../Modal/Modal";
import MealsList from "../Meals/MealsList";
import _ from "lodash";
import {createStyles, withStyles} from "@material-ui/core";
import {StatusEnum} from "./../../utils";

const styles = createStyles({
    icon: {
        fontSize: "18px",
        position: "absolute",
        left: "16px"
    }
});

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
    classes: {
        icon: string
    }
}

interface IMeal {
    mealName: string,
    orderer: string,
    prize: string
}

class OrdersList extends React.Component<IProps, {}> {
    state = {
        open: false
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

    render() {
        return (
            <div className={"ordersList"}>
                <div className={"ordersList__values"}>
                    <div className={"ordersList__name"}>{this.props.orderName}</div>
                    <div className={"ordersList__owner"}>{this.props.orderOwner}</div>
                    <div className={"ordersList__prize"}>{this.prizeSummaryRender()}</div>
                </div>
                <div className={"ordersList__status"}>
                    {this.props.history !== true && <Button variant="contained" onClick={this.onDialogOpen}>
						<Icon>add</Icon>
						Add Meal
					</Button>}
                    <Modal open={this.state.open} onClose={this.onDialogClose}
                           component={<MealsForm order={this.props} onSubmit={this.onSubmit}
                                                 onClose={this.onDialogClose}/>}/>

                    <div className={"ordersList__statuses"}>
                        <span className={"ordersList__statusLabel"}>Status:</span>
                        <button className={this.props.status === StatusEnum.opened ? "btn btn-info btn-arrow-right btn-arrow-right--active" : "btn btn-info btn-arrow-right"}
                                onClick={this.onChangeOrderStatus.bind(this, StatusEnum.opened)}>
                            <Icon className={this.props.classes.icon}>edit</Icon>
                            {StatusEnum.opened}
                        </button>
                        <button className={this.props.status === StatusEnum.finalized ? "btn btn-info btn-arrow-right btn-arrow-right--active" : "btn btn-info btn-arrow-right"}
                                onClick={this.onChangeOrderStatus.bind(this, StatusEnum.finalized)}>
                            <Icon className={this.props.classes.icon}>lock</Icon>
                            {StatusEnum.finalized}
                        </button>
                        <button className={"btn btn-info btn-arrow-right"} disabled>
                            <Icon className={this.props.classes.icon}>phone</Icon>
                            {StatusEnum.ordered}</button>
                        <button className={"btn btn-info btn-arrow-right"} disabled>
                            <Icon className={this.props.classes.icon}>check</Icon>
                            {StatusEnum.delivered}</button>
                    </div>

                </div>

                <div className={"ordersList__meals"}>
                    <div className={"ordersSummary__labels"}>
                        <label className={"ordersSummary__orderLabel"}>Meal</label>
                        <label className={"ordersSummary__ownerLabel"}>Orderer</label>
                        <label className={"ordersSummary__prizeLabel"}>Prize</label>
                    </div>
                    {_.map(this.props.meals, (meal: IMeal, idx: number) => {
                        return <MealsList key={idx} {...meal} />;
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

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(OrdersList));