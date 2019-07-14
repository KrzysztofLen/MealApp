import React from "react";

interface IProps {
	isOpen: boolean;
	title?: string;
	onClose?: (e: any) => void;
}

class Modal extends React.Component<IProps, {}> {
	render() {
		return (
			<div className={`modal ${this.props.isOpen ? "is-active" : null}`}>
				<div className="modal-background" />
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title">{this.props.title}</p>
						<button
							className="delete"
							aria-label="close"
							onClick={this.props.onClose}
						/>
					</header>
					<section className="modal-card-body">
						{this.props.children}
					</section>
				</div>
			</div>
		);
	}
}

export default Modal;
