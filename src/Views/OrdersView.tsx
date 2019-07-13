import React from "react";
import { connect } from "react-redux";
import OrderForm from "./../components/Orders/OrdersForm";
import { startAddOrder } from "./../Redux/actions/orders";
import OrdersSummary from "./../components/Orders/OrdersSummary";
import Modal from "./../components/Modal/Modal";
import { OrdersEnum } from "../main";

interface IOrder {
  orderName: string;
  orderOwner: string;
}

interface IProps {
  startAddOrder: (order: IOrder) => void;
  order: Array<any>;
}

interface IState {
  isOpen: boolean;
}

class Order extends React.Component<IProps, IState> {
  state: IState = {
    isOpen: false
  };

  private onSubmit = (order: IOrder): void => {
    this.props.startAddOrder(order);
    this.setState({ isOpen: false });
  };

  private onDialogOpen = (): void => {
    this.setState({ isOpen: true });
  };

  private onDialogClose = (e: any): void => {
    e.preventDefault();
    this.setState({ isOpen: false });
  };

  public render(): JSX.Element {
    return (
      <div className={"meals_app has-background-grey-darker"}>
        <div className={"orders"}>
          <button className={"button is-warning"} onClick={this.onDialogOpen}>
            <span className={"icon is-small"}>
              <i className={`fas fa-plus-circle`} aria-hidden="true" />
            </span>
            <span>Create Order</span>
          </button>
          <Modal
            isOpen={this.state.isOpen}
            onClick={this.onDialogClose}
            title={"Create Order"}
            component={
              <OrderForm
                onClick={this.onDialogClose}
                isOpen={this.state.isOpen}
                onSubmit={this.onSubmit}
              />
            }
          />
          <OrdersSummary
            orders={this.props.order.filter(
              order => order.status === OrdersEnum.opened
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    order: state.order
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  startAddOrder: (order: IOrder) => dispatch(startAddOrder(order))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
