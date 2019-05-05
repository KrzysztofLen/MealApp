import React from 'react';
import {connect} from 'react-redux';
import Icon from "@material-ui/core/Icon/Icon";
import Button from "@material-ui/core/Button/Button";
import OrderForm from "./../components/Orders/OrdersForm";
import {startAddOrder} from "./../Redux/actions/orders";
import OrdersSummary from "./../components/Orders/OrdersSummary";
import Modal from "./../components/Modal/Modal";
import {StatusEnum} from "../utils";

interface IOrder {
    orderName: string,
    orderOwner: string
}

interface IProps {
    startAddOrder: (order: IOrder) => void,
    order: Array<any>
}

class Order extends React.Component<IProps, {}> {
    state = {
        open: false
    }

    onSubmit = (order: IOrder) => {
        this.props.startAddOrder(order);
        this.setState({open: false});
        //this.props.history.push('/');
    }

    onDialogOpen = () => {
        this.setState({open: true});
    }

    onDialogClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <div className={"content"}>
                <div className={"orders"}>
                    <Button variant="contained" onClick={this.onDialogOpen}>
                        <Icon>add</Icon>
                        Create Order
                    </Button>
                    <Modal open={this.state.open} onClose={this.onDialogClose}
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
