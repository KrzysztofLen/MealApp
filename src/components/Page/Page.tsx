import React from 'react';
import Navigation from "../Navigation/Navigation";

interface IProps {
    title: string,
    component: JSX.Element
}

class Page extends React.Component<IProps, {}> {
    componentDidMount() {
        document.title = this.props.title
    }

    renderPageComponent() {
        const PageComponent: any = this.props.component;

        return <PageComponent/>;
    }

    render() {

        return (
            <React.Fragment>
                <h1 className={"page__title"}>{this.props.title}</h1>
                <Navigation/>
                {this.renderPageComponent()}
            </React.Fragment>
        )
    }
}

export default Page;