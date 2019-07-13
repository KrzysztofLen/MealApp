import React from "react";
import {connect} from "react-redux";

import {OrdersEnum, ordersLabels} from "../../main";

import OrdersList from "./OrdersList";
import Message, {MessageType} from "../Message/Message";
import Label from "../Label/Label";

interface IOrder {
  orderName: string;
  orderOwner: string;
  status?: string;
}

interface IProps {
  orders: Array<IOrder>;
  history?: boolean;
}

class OrdersSummary extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    return (
      <React.Fragment>
        {this.props.orders.length === 0 ? (
          <Message message={OrdersEnum.noOrder} type={MessageType.info}/>
        ) : (
          <Label labels={ordersLabels} />
        )}

        {this.props.orders.map((order: IOrder, idx: number) => {
          return (
            <OrdersList
              key={idx}
              id={idx}
              history={this.props.history}
              {...order}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default OrdersSummary;
