import React, {ChangeEvent, FormEvent} from "react";

import peoplesName, {OrdersEnum, ErrorMessageEnum} from "../../main";

interface IProps {
    onSubmit: (order: any) => void,
    onClick: (e: any) => void,
    isOpen: boolean
}

interface IState {
    fields: IFields,
    errors: any
}

interface IFields {
    orderName: string,
    orderOwner: string

    [propName: string]: string;
}

class OrderForm extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            fields: {
                orderName: "",
                orderOwner: ""
            },
            errors: {}
        };
    }

    handleValidation = () => {
        let formIsValid: boolean = true;
        let errors: any = {};

        if (!this.state.fields.orderName) {
            formIsValid = false;
            errors.orderName = ErrorMessageEnum.provideValue;
        }

        if (!this.state.fields.orderOwner) {
            formIsValid = false;
            errors.orderOwner = ErrorMessageEnum.provideValue;
        }

        this.setState({errors});
        return formIsValid;
    }

    private onValueChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {fields, errors} = this.state;
        const inputName: string = e.target.name;
        fields[inputName] = e.target.value;
        errors[inputName] = null;

        this.setState({fields, errors});
    }

    private onSubmit = (e: FormEvent) => {
        e.preventDefault();

        this.handleValidation();

        if (this.handleValidation()) {
            this.props.onSubmit({
                orderName: this.state.fields.orderName,
                orderOwner: this.state.fields.orderOwner,
                status: OrdersEnum.opened
            })
        } else {
            console.warn("Invalid");
        }
    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <div className={"form"}>
                    <form action="" onSubmit={this.onSubmit} className={"form__form"}>
                        <div className={"field"}>
                            <div className={"field-label is-normal"}>
                                <label className={"form__label"} htmlFor="">Orders from:</label>
                            </div>
                            <p className={"control has-icons-left has-icons-right"}>
                                <input type="text" name={"orderName"}
                                       className={`${this.state.errors.orderName ? "input is-danger" : "input"}`}
                                       placeholder={"Name of the restaurant"}
                                       onChange={this.onValueChange}/>
                                {this.state.errors.orderName &&
								<article className="message is-danger is-small">
									<div className="message-body">{this.state.errors.orderName}</div>
								</article>
                                }
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
                                <select className={"select"} name={"orderOwner"} value={this.state.fields.orderOwner}
                                        onChange={this.onValueChange}>
                                    <option value="" disabled>Select owner:</option>
                                    {peoplesName.map((name: string, idx: number) => {
                                        return <option key={idx}>{name}</option>
                                    })}
                                </select>
                                {this.state.errors.orderOwner &&
								<article className="message is-danger is-small">
									<div className="message-body">{this.state.errors.orderOwner}</div>
								</article>
                                }
                            </div>
                        </div>

                        <div className={"form__buttons"}>
                            <button className="button is-danger is-outlined" onClick={this.props.onClick}>
                                <span>Cancel</span>
                                <span className="icon is-small">
                              <i className="fas fa-times"/>
                            </span>
                            </button>
                            <button type={"submit"} className={"button is-success"}>
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