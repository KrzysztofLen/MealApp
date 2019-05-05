import React from "react";
import {NavLink, Route} from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar/AppBar";
import {createStyles, withStyles} from "@material-ui/core";

interface ISideMenuLinkProps {
    to: string,
    activeOnlyWhenExact?: boolean,
    id: number,
    name: string,
    onClick: (event: Event) => void
}

export const NavigationItem = ({to, activeOnlyWhenExact, id, name, onClick}: ISideMenuLinkProps) => {
    return (
        <Route path={to}
               exact={activeOnlyWhenExact}
               children={({match}: any, index: number) => (
                   <li key={index}
                       className={match ? "navigation__item navigation__item--active" : "navigation__item"}>
                       <NavLink to={to} id={id} className={"navigation__link"} onClick={onClick}>{name}</NavLink>
                   </li>
               )}
        />
    );
};

const styles = createStyles({
    tabs: {
        background: "transparent",
        height: "52px",
        boxShadow: "none",
        marginTop: "50px"
    }
});

interface IProps {
    classes: {
        tabs: string
    }
}

class Navigation extends React.Component<IProps, {}> {
    state = {
        value: 0,
    };

    onHandleClick = (event: any) => {
        this.setState({value: parseInt(event.target.id)});
    };

    render() {
        return (
            <AppBar position="relative" className={this.props.classes.tabs}>
                <ul className={"navigation"}>
                    <NavigationItem activeOnlyWhenExact={true} to="/" id={0} name={"Active"}
                                    onClick={this.onHandleClick}/>
                    <NavigationItem to="/history" id={1} name={"History"} onClick={this.onHandleClick}/>
                </ul>
            </AppBar>

        )
    }
}
export default withStyles(styles)(Navigation);