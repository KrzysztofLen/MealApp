import React, {Component, createContext} from "react";

export const ModalContext = createContext({
	show: false,
	showModal: () => null,
	hideModal: () => null
});

export const ModalConsumer = ModalContext.Consumer;

export class ModalProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			showModal: this.showModal,
			hideModal: this.hideModal
		};
	}

	showModal = () => {
		this.setState({
			show: true
		});
	};

	hideModal = () => {
		this.setState({
			show: false
		});
	};

	render() {
		return (
			<ModalContext.Provider value={this.state}>
				{this.props.children}
			</ModalContext.Provider>
		);
	}
}
