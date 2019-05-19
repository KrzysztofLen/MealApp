import React from "react";
import {connect} from "react-redux";
import OrdersList from "./OrdersList";
import {OrdersEnum} from "../../main";

interface IOrder {
    orderName: string,
    orderOwner: string,
    status?: string
}

interface IProps {
    orders: Array<IOrder>,
    history?: boolean
}

class OrdersSummary extends React.Component<IProps, {}> {
    public render(): JSX.Element {
        if (this.props.orders.length === 0) {
            return (
                <article className={"message is-info"}>
                    <div className={"message-body"}>
                        {OrdersEnum.noOrder}
                    </div>
                </article>
            )
        }

        return (
            <React.Fragment>
                <div className={"ordersSummary__labels"}>
                    <label className={"ordersSummary__orderLabel"}>Order from</label>
                    <label className={"ordersSummary__ownerLabel"}>Owner</label>
                    <label className={"ordersSummary__prizeLabel"}>Prize</label>
                </div>
                {this.props.orders.map((order: any, idx: number) => {
                    return <OrdersList key={order.id} id={idx} history={this.props.history} {...order}/>
                })}
            </React.Fragment>
        )
    }
}

export default OrdersSummary;