import React from "react";

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
            orderOwner: "",
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
                <div className={"form"}>
                    <form action="" onSubmit={this.onSubmit} className={"form__form"}>
                        {this.state.error != "" && <span className="message__error">{this.state.error}</span>}

                        <div className={"field"}>
                            <div className={"field-label is-normal"}>
                                <label className={"form__label"} htmlFor="">Orders from:</label>
                            </div>
                            <p className={"control has-icons-left has-icons-right"}>
                                <input type="text" className={"input"} placeholder={"Name of the restaurant"}
                                       onChange={this.onOrderNameChange}/>
                                <span className={"icon is-small is-left"}>
                                    <i className={"fas fa-signature"}/>
                                </span>
                            </p>
                        </div>

                        <div className={"control"}>
                            <div className={"field-label is-normal"}>
                                <label className={"form__label"} htmlFor="">Owner name</label>
                            </div>
                            <div className={"select"}>
                                <select className={"select"} value={this.state.orderOwner}
                                        onChange={this.onOrderOwnerNameChange}>
                                    <option value="" disabled>Select owner:</option>
                                    {peoplesName.map((name: string, idx: number) => {
                                        return <option key={idx}>{name}</option>
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className={"form__buttons"}>
                            <button className="button is-danger is-outlined" onClick={this.props.onClose}>
                                <span>Cancel</span>
                                <span className="icon is-small">
                              <i className="fas fa-times"/>
                            </span>
                            </button>
                            <button className={"button is-success"}>
                                <span className={"icon is-small"}>
                                  <i className={"fas fa-check"}/>
                                </span>
                                <span>Create</span>
                            </button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default OrderForm;