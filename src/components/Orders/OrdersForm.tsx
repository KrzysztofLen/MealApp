import React from "react";
import Button from "@material-ui/core/Button/Button";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import peoplesName, {StatusEnum} from "../../utils";

enum ErrorMessageEnum {
    provideValue = "FAILURE! You must provide a value"
}

interface IProps {
    onSubmit: (order: any) => void,
    onClose: () => void
}

interface IState {
    orderName: string,
    orderOwner: string,
    error: string
}

class OrderForm extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            orderName: "",
            orderOwner: "John Travolta",
            error: ""
        };
    }

    handleValidation = () => {
        let formIsValid: boolean = true;
        let errors = "";

        if (!this.state.orderName) {
            formIsValid = false;
            errors = ErrorMessageEnum.provideValue;
        }

        this.setState({error: errors});
        return formIsValid;
    }

    onOrderNameChange = (e: any) => {
        const orderName: string = e.target.value;
        this.setState({orderName}, () => this.handleValidation());
    }

    onOrderOwnerNameChange = (e: any) => {
        const orderOwner: string = e.target.value;
        this.setState({orderOwner});
    }

    onSubmit = (e: any) => {
        e.preventDefault();

        if (this.handleValidation()) {
            this.props.onSubmit({
                orderName: this.state.orderName,
                orderOwner: this.state.orderOwner,
                status: StatusEnum.opened
            })
        } else {
            console.warn("Invalid");
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className={"modal__title"}>
                    <span>Create Order</span>
                </div>
                <div className={"form"}>
                    <form action="" onSubmit={this.onSubmit} className={"form__form"}>
                        {this.state.error != "" && <span className="message__error">{this.state.error}</span>}

                        <div className={"form__control"}>
                            <label className={"form__label"} htmlFor="">Orders from:</label>
                            <TextField type="text" placeholder={"Name of the restaurant"}
                                       onChange={this.onOrderNameChange}/>
                        </div>

                        <div className={"form__control"}>
                            <label className={"form__label"} htmlFor="">Owner name</label>
                            <Select value={this.state.orderOwner} onChange={this.onOrderOwnerNameChange}>
                                {peoplesName.map((name: string, idx: number) => {
                                    return <MenuItem key={idx} value={name}>{name}</MenuItem>
                                })}
                            </Select>
                        </div>

                        <div className={"form__buttons"}>
                            <Button onClick={this.props.onClose} color="primary">
                                Cancel
                            </Button>
                            <button className={"form__submit"}>Create</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default OrderForm;