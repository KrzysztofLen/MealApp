import React from "react";
import {connect} from "react-redux";
import Modal from "../Modal/Modal";
import MealsEditForm from "./MealsEditForm";
import {startEditMeal} from "../../Redux/actions/meals";

interface IProps {
    mealName: string,
    orderer: string,
    prize: string,
    orderID: string,
    order: any,
    startEditMeal: (updates: any) => void,
}

interface IState {
    open: boolean
}

class MealsList extends React.Component<IProps, IState> {
    state = {
        open: false
    }

    onDialogOpen = (e: any) => {
        e.preventDefault();
        this.setState({open: true});
    }

    onDialogClose = (e: any) => {
        e.preventDefault();
        this.setState({open: false});
    };

    onSubmit = (updates: any) => {
        this.props.startEditMeal(updates);
        this.setState({open: false});
    }

    public render(): JSX.Element {
        return (
            <div className={"mealsList"}>
                <div className={"mealsList__values"}>
                    <div className={"mealsList__name"}>{this.props.mealName}</div>
                    <div className={"mealsList__owner"}>{this.props.orderer}</div>
                    <div className={"mealsList__prize"}>{(this.props.prize).replace(/,/g, '.')}</div>
                    <div className={"mealsList__edits"}>
                        <div className={"mealsList__edit"} onClick={this.onDialogOpen}>edit</div>
                    </div>
                </div>

                <Modal isOpen={this.state.open} onClick={this.onDialogClose} title={"Edit Meal"}
                       component={<MealsEditForm onSubmit={this.onSubmit}
                                                 onClick={this.onDialogClose}
                                                 meal={this.props}
                                                 order={this.props.order}/>}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    startEditMeal: (updates: any) => dispatch(startEditMeal(updates))
});

export default connect(undefined, mapDispatchToProps)(MealsList);