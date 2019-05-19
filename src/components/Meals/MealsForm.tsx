import React from "react";
import {connect} from "react-redux";
import _ from "lodash";
import peoplesName from "../../main";

enum ErrorMessageEnum {
    provideValue = "FAILURE! You must provide a value",
    ordererExist = "Sorry only one person can add meal",
    correctPrize = "Please provide prize with decimal"
}

interface IOrder {
    orderName: string,
    orderOwner: string,
    meals?: Array<IMeal>
}

interface IMeal {
    mealName: string,
    orderer: string,
    prize: string
}

interface IProps {
    onSubmit: (meal: IMeal) => void,
    onClick: (e: any) => void,
    order: IOrder
}

interface IState {
    mealName: string,
    orderer: string,
    prize: string,
    error: string
}

class MealsForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            mealName: "",
            orderer: "John Travolta",
            prize: "",
            error: ""
        };
    }

    handleValidation = () => {
        let formIsValid: boolean = true;
        let errors = "";

        if(this.onCheckOrderer()) {
            formIsValid = false;
            errors = ErrorMessageEnum.ordererExist;
        }

        if(this.onCheckPrize() === false) {
            formIsValid = false;
            errors = ErrorMessageEnum.correctPrize;
        }

        if (!this.state.mealName || !this.state.prize) {
            formIsValid = false;
            errors = ErrorMessageEnum.provideValue;
        }

        this.setState({error: errors});
        return formIsValid;
    }

    onMealNameChange = (e: any) => {
        const mealName: string = e.target.value;
        this.setState({mealName}, () => this.handleValidation());
    }

    onMealPrizeChange = (e: any) => {
        const prize: string = e.target.value;
        this.setState({prize}, () => this.handleValidation());
    }

    onOrdererMealNameChange = (e: any) => {
        const orderer: string = e.target.value;
        this.setState({orderer});
    }

    onCheckPrize(): boolean {
        const prize: any = this.state.prize;
        return (prize) % 1 != 0;
    }

    onCheckOrderer = () => {
        let ordererExist: boolean = false;

        _.mapValues(this.props.order.meals, (meal: IMeal) => {
            if (meal.orderer == this.state.orderer) {
                ordererExist = true;
            }
        });

        return ordererExist;
    }

    onSubmit = (e: any) => {
        e.preventDefault();

        if (this.handleValidation()) {
            this.props.onSubmit({
                mealName: this.state.mealName,
                orderer: this.state.orderer,
                prize: this.state.prize
            })
        } else {
            console.warn("Invalid");
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className={"form"}>
                    <form action="" onSubmit={this.onSubmit} className={"form__form"}>
                        {this.state.error != "" && <span className="message__error">{this.state.error}</span>}

                        <div className={"form__control"}>
                            <label className={"form__label"} htmlFor="">Meal name</label>
                            <input type="text" placeholder={"Name of the meal"} onChange={this.onMealNameChange}/>
                        </div>

                        <div className={"form__control"}>
                            <label className={"form__label"} htmlFor="">Orderer name</label>
                            <select value={this.state.orderer} onChange={this.onOrdererMealNameChange}>
                                {peoplesName.map((name: string, idx: number) => {
                                    return <div key={idx}>{name}</div>
                                })}
                            </select>
                        </div>

                        <div className={"form__control"}>
                            <label className={"form__label"} htmlFor="">Prize</label>
                            <input type="text" placeholder={"e.g. 20.00"} onChange={this.onMealPrizeChange}/>
                        </div>

                        <div className={"form__buttons"}>
                            <button onClick={this.props.onClick} color="primary">Cancel</button>
                            <button className={"form__submit"}>Add</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default MealsForm;