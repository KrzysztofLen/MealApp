import React from 'react';
import {connect} from 'react-redux';
import OrderForm from "./../components/Orders/OrdersForm";
import {startAddOrder} from "./../Redux/actions/orders";
import OrdersSummary from "./../components/Orders/OrdersSummary";
import Modal from "./../components/Modal/Modal";
import {StatusEnum} from "../utils";
import NavLink from "../components/Navigation/Navigation";

interface IOrder {
    orderName: string,
    orderOwner: string
}

interface IProps {
    startAddOrder: (order: IOrder) => void,
    order: Array<any>
}

interface IState {
    open: boolean
}

class Order extends React.Component<IProps, IState> {
    state = {
        open: false
    }

    onSubmit = (order: IOrder) => {
        this.props.startAddOrder(order);
        this.setState({open: false});
    }

    onDialogOpen = () => {
        this.setState({open: true});
    }

    onDialogClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <div className={"meals_app has-background-grey-darker"}>
                <div className={"orders"}>
                    <button className={"button is-warning"} onClick={this.onDialogOpen}>
                         <span className={"icon is-small"}>
                               <i className={`fas fa-plus-circle`} aria-hidden="true"/>
                           </span>
                        <span>Create Order</span>
                    </button>
                    <Modal open={this.state.open} onClose={this.onDialogClose} title={"Create Order"}
                           component={<OrderForm onClose={this.onDialogClose} onSubmit={this.onSubmit}/>}/>
                    <OrdersSummary orders={this.props.order.filter(order => order.status === StatusEnum.opened)}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        order: state.order
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    startAddOrder: (order: IOrder) => dispatch(startAddOrder(order))
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
