import React from "react";
import Navigation from "../Navigation/Navigation";

interface IProps {
	title: string;
	component: JSX.Element;
}

class Page extends React.Component<IProps, {}> {
	public componentDidMount(): void {
		document.title = this.props.title;
	}

	private renderPageComponent(): JSX.Element {
		const PageComponent: any = this.props.component;

		return <PageComponent />;
	}

	public render(): JSX.Element {
		return (
			<React.Fragment>
				<h1 className={"page__title"}>{this.props.title}</h1>
				<Navigation />
				{this.renderPageComponent()}
			</React.Fragment>
		);
	}
}

export default Page;
