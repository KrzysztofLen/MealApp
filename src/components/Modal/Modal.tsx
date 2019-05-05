import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {createStyles, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";

interface IProps {
    onClose: () => void;
    open: boolean,
    component: JSX.Element,
    classes: {
        closeButton: string
    }
}

const styles = createStyles({
    closeButton: {
        position: "absolute",
        right: 0,
        top: 0,
        color: "#ccc",
        padding: "15px"
    }
});

class Modal extends React.Component<IProps, {}> {
    render() {
        return (
            <Dialog onClose={this.props.onClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <IconButton aria-label="Close" className={this.props.classes.closeButton} onClick={this.props.onClose}>
                    <CloseIcon/>
                </IconButton>
                {this.props.component}
            </Dialog>
        );
    }
}

export default withStyles(styles)(Modal);