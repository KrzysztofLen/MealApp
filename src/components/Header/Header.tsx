import React from 'react';
import {createStyles, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const styles = createStyles({
    root: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        height: 60,
        backgroundColor: "#0277bd",
        boxShadow: "none",
        zIndex: 99999
    }
});

interface IProps {
    classes: {
        root: string
    }
}

class Header extends React.Component<IProps, {}> {
    render() {
        return (
            <React.Fragment>
                <AppBar className={this.props.classes.root}>
                    <div className={"header__title"}>
                        <h1>Meal App</h1>
                    </div>

                    <div className={"header__button"}>
                        <Button variant="contained">
                            <Icon>highlight_off</Icon>
                            Sign Out
                        </Button>
                    </div>
                </AppBar>

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Header);
