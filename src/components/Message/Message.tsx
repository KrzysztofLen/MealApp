import React from "react";

export enum MessageType {
    danger = "danger",
    info = "info",
    warning = "warning",
    success = "success",
    link = "link"
}

interface IProps {
    message: string,
    type: MessageType
}

class Message extends React.Component<IProps, {}> {
    render() {
        return (
            <article className={`message is-${this.props.type}`}>
                <div className={"message-body"}>
                    {this.props.message}
                </div>
            </article>
        )
    }
}

export default Message;