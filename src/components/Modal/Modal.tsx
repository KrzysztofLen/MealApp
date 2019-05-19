import React from "react";

interface IProps {
    onClose: () => void;
    open: boolean,
    component: JSX.Element,
    title: string
}

export default (props: IProps) => {
    return (
        <div className={`modal ${props.open ? "is-active" : null}`}>
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{props.title}</p>
                    <button className="delete" aria-label="close" onClick={props.onClose} />
                </header>
                <section className="modal-card-body">
                    {props.component}
                </section>

            </div>
        </div>
    )
}