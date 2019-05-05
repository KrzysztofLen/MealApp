import React from "react";
import Icon from '@material-ui/core/Icon';

interface IProps {
    mealName: string,
    orderer: string,
    prize: string
}

class MealsList extends React.Component<IProps, {}> {
    onClick = () => {
        console.log(this.props);
    }

    render() {
        //console.log(this.props);
        return (
            <div className={"mealsList"}>
                <div className={"mealsList__values"}>
                    <div className={"mealsList__name"}>{this.props.mealName}</div>
                    <div className={"mealsList__owner"}>{this.props.orderer}</div>
                    <div className={"mealsList__prize"}>{(this.props.prize).replace(/,/g, '.')}</div>
                    <div className={"mealsList__edits"}>
                        <Icon className={"mealsList__edit"} onClick={this.onClick}>edit</Icon>
                        <Icon>delete_forever</Icon>
                    </div>
                </div>
            </div>
        )
    }
}

export default MealsList;