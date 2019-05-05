import React from 'react';
import {connect} from 'react-redux';
import OrdersSummary from "./../components/Orders/OrdersSummary";

interface IProps {
    order: Array<any>
}

class History extends React.Component<IProps, {}> {
    render() {
        return (
            <div className={"content"}>
                <div className={"history"}>
                    <OrdersSummary history={true} orders={this.props.order.filter(order => order.status === "Finalized")}/>
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

export default connect(mapStateToProps)(History);

