import React from "react";
import {connect} from "react-redux";
import OrdersList from "./OrdersList";

interface IOrder {
    orderName: string,
    orderOwner: string,
    status?: string
}

interface IProps {
    orders: Array<IOrder>,
    history?: boolean
}

enum OrdersEnum {
    noOrder = "Sorry currently there is no orders :("
}

class OrdersSummary extends React.Component<IProps, {}> {
    render() {
        return (
            <React.Fragment>
                {this.props.orders.length === 0 ? (
                    <div className={"ordersSummary__noOrders"}>
                        <span>{OrdersEnum.noOrder}</span>
                    </div>
                ) : (
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
                )}
            </React.Fragment>
        )
    }
}

export default OrdersSummary;