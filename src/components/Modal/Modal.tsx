import React from "react";

interface IProps {
    isOpen: boolean,
    component: JSX.Element,
    title: string,
    onClick: (e: any) => void
}

interface IState {
    isOpen: boolean
}

class Modal extends React.Component<IProps, IState> {
    render() {
        return (
            <div className={`modal ${this.props.isOpen ? "is-active" : null}`}>
                <div className="modal-background"/>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{this.props.title}</p>
                        <button className="delete" aria-label="close" onClick={this.props.onClick}/>
                    </header>
                    <section className="modal-card-body">
                        {this.props.component}
                    </section>

                </div>
            </div>
        )
    }
}

export default Modal;