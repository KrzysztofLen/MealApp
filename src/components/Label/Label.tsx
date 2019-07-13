import React from "react";

interface IProps {
  labels: Array<string>;
}

class Label extends React.Component<IProps, {}> {
  render() {
    return (
      <div className={"labels"}>
        {this.props.labels.map((label: string) => {
          return <label className={"labels__label"}>{label}</label>;
        })}
      </div>
    );
  }
}

export default Label;
