import React from "react";

export enum ButtonType {
	danger = "danger",
	info = "info",
	warning = "warning",
	success = "success",
	link = "link"
}

interface IProps {
	buttonText?: string;
	buttonType: ButtonType;
	submit?: boolean;
	iconName?: string;
	outlined: boolean;
	onClick?: (e: any) => void;
	name?: string;
}

class Button extends React.Component<IProps, {}> {
	render() {
		const isSubmit = this.props.submit ? "submit" : undefined;

		return (
			<button
				type={isSubmit}
				name={this.props.name}
				onClick={this.props.onClick}
				className={`button is-${this.props.buttonType}${
					this.props.outlined === true ? " is-outlined" : ""
				}`}>
				{this.props.iconName != null && (
					<span className={"icon is-small"}>
						<i className={`fas fa-${this.props.iconName}`} />
					</span>
				)}
				<span>{this.props.buttonText}</span>
			</button>
		);
	}
}

export default Button;
