import React from "react";
import {connect} from "react-redux";
import Button, {ButtonType} from "../Button/Button";
import {startDeleteOrder} from "../../Redux/actions/orders";

interface IProps {
	orderId: string;
	isOpen: boolean;
	onClose: (e: any) => void;
	startDeleteOrder: (id: string) => void;
}

class OrderDelete extends React.Component<IProps, {}> {
	private onDeleteOrder = () => {
		this.props.startDeleteOrder(this.props.orderId);
		this.props.onClose((e: any) => e);
	};

	render() {
		return (
			<React.Fragment>
				<section className="modal-body">
					<h4 className="subtitle is-4">Are you sure?</h4>
				</section>
				<div className={"form__buttons"}>
					<Button
						buttonText={"Cancel"}
						buttonType={ButtonType.danger}
						iconName={"times"}
						outlined={true}
						onClick={this.props.onClose}
					/>

					<Button
						buttonText={"Delete"}
						buttonType={ButtonType.success}
						iconName={"check"}
						onClick={this.onDeleteOrder}
						outlined={false}
					/>
				</div>
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch: any) => ({
	startDeleteOrder: (id: string) => dispatch(startDeleteOrder(id))
});

export default connect(
	undefined,
	mapDispatchToProps
)(OrderDelete);
